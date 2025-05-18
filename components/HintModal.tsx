import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {wp, hp} from '../helper/constant';
import BannerAds from './BannerAds';
import {BannerAdSize} from 'react-native-google-mobile-ads';

interface HintModalProps {
  onClose: () => void;
  message: string;
  ViewAds?: () => void;
  showInstAds?: () => void;
}

const HintModal: React.FC<HintModalProps> = ({
  onClose,
  ViewAds,
  showInstAds,
}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Pressable
            onPress={() => {
              onClose();
              showInstAds?.();
            }}
            style={{
              flexDirection: 'row',
              gap: wp(2),
              alignItems: 'center',
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 8,
            }}>
            <Image
              source={require('../assets/icons/bulb.png')}
              style={{width: wp(12), height: hp(5)}}
              resizeMode="contain"
            />
            <Text style={styles.title}>Get Hint!</Text>
          </Pressable>
          <BannerAds sizes={[BannerAdSize.BANNER]} />

          <Pressable
            onPress={() => {
              onClose();
              ViewAds?.();
            }}
            style={{
              flexDirection: 'row',
              gap: wp(2),
              alignItems: 'center',
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderRadius: 8,
            }}>
            <Image
              source={require('../assets/icons/video-ad.png')}
              style={{width: wp(12), height: hp(5)}}
              resizeMode="contain"
            />
            <Text style={styles.title}>Skip </Text>
          </Pressable>

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
    gap: hp(2),
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'KanchenjungaBold',
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    fontFamily: 'KanchenjungaRegular',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HintModal;
