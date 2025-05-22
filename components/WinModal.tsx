import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {wp, hp} from '../helper/constant';
import BannerAds from './BannerAds';
import {BannerAdSize} from 'react-native-google-mobile-ads';

interface WinModalProps {
  onClose: () => void;
  message: string;
}

const WinModal: React.FC<WinModalProps> = ({onClose, message}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image
            source={require('../assets/icons/trophy-prize.png')}
            style={{width: wp(18), height: hp(8)}}
            resizeMode="contain"
          />
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={[styles.title, {fontSize: hp(2.5)}]}> +₹0.25</Text>
          <Text style={styles.message}>{message}</Text>
          <BannerAds sizes={[BannerAdSize.BANNER]} />
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
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
    gap: hp(0.1),
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

export default WinModal;
