import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {hp, Keyword, wp} from '../helper/constant';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../type';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitIdInterstitial = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-3346761957556908~9788610089';

const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterstitial, {
  keywords: Keyword,
});

type Props = {showBackBtn?: boolean};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Header = ({showBackBtn}: Props) => {
  const nav = useNavigation<NavigationProp>();
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

  // Interstitial ads
  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {},
    );

    const unsubscribeOpened = interstitial.addAdEventListener(
      AdEventType.OPENED,
      () => {},
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        interstitial.load(); // Load the ad again when it is closed
        nav.navigate('EarnSrc');
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeOpened();
      unsubscribeClosed();
    };
  }, []);

  return (
    <View style={styles.mainStyle}>
      {showBackBtn ? (
        <></>
      ) : (
        <TouchableOpacity
          onPress={() => {
            if (interstitial.loaded) {
              interstitial.show();
            } else {
              nav.navigate('EarnSrc');
            }
          }}
          style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <Animated.Image
            source={require('../assets/icons/bill.png')}
            style={[
              styles.iconStyle,
              {
                transform: [
                  {
                    rotate: shakeAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['-5deg', '5deg'],
                    }),
                  },
                ],
              },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Image source={require("../assets/icons/coinIcon.png")} style={styles.iconStyle} resizeMode='contain' />
        <Text style={styles.textStyle}>900</Text>
      </View> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: hp(2),
    position: 'absolute',
    width: wp(100),
  },
  textStyle: {
    fontSize: wp(7),
    fontFamily: 'KanchenjungaBold',
  },
  iconStyle: {width: wp(8.5), height: hp(6), marginTop: hp(1.5)},
});
