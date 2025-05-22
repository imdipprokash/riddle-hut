import React, {useEffect, useRef} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  Animated,
} from 'react-native';
import {showRewardedAd} from './ShowRewardAds';
import {hp, wp} from '../helper/constant';
import BannerAds from './BannerAds';
import {BannerAdSize} from 'react-native-google-mobile-ads';

interface FailedModalProps {
  onClose: () => void;
  message: string;
  ViewAds?: () => void;
}

const FailedModal: React.FC<FailedModalProps> = ({onClose, ViewAds}) => {
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startShake = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnimation, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startShake();
  }, [shakeAnimation]);

  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image
            source={require('../assets/icons/sadIcon.png')}
            style={{width: wp(18), height: hp(8)}}
            resizeMode="contain"
          />
          <Text style={styles.title}>Wrong answer!</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
            <Pressable
              onPress={ViewAds}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'green',
                paddingHorizontal: 6,
                borderRadius: 8,
              }}>
              <Text style={[styles.title, {color: '#fff'}]}>Skip </Text>
              <Animated.Image
                source={require('../assets/icons/video-ad.png')}
                resizeMode="contain"
                style={{
                  width: wp(8),
                  height: hp(4),
                  transform: [
                    {
                      rotate: shakeAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['-5deg', '5deg'],
                      }),
                    },
                  ],
                }}
              />
            </Pressable>
          </View>
          <BannerAds sizes={[BannerAdSize.BANNER]} />
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
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'KanchenjungaBold',
  },
  message: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    // backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FailedModal;
