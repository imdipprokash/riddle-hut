import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import {wp, hp} from '../helper/constant';
import BannerAds from './BannerAds';
import {BannerAdSize} from 'react-native-google-mobile-ads';

interface VersionModalProps {
  message: string;
  link: string;
}

const VersionModal: React.FC<VersionModalProps> = ({message, link}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image
            source={require('../assets/imgs/logo_bg.png')}
            style={{width: wp(20), height: hp(10)}}
            resizeMode="contain"
          />
          <Text style={styles.title}>{message}</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(link);
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: wp(80),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: hp(1),
  },
  title: {
    fontSize: hp(2),
    textAlign: 'center',
    fontFamily: 'KanchenjungaBold',
  },
  message: {
    fontSize: hp(1.7),
    color: '#666',
    textAlign: 'center',
    fontFamily: 'KanchenjungaRegular',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: hp(1),
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default VersionModal;
