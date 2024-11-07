import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors, ScreenWidth} from '../../utils/constants';
import {useCoinStore, useStore} from '../../zustand/store';
import {showModal} from '../../components/RootModal';
import BulbToast from '../../components/BulbToast';
import ToastMsg from '../../components/ToastMsg';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adsId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-3346761957556908/3830921102';

type Props = {
  bulbHandler: () => void;
};
const rewarded = RewardedAd.createForAdRequest(adsId, {
  keywords: [
    'insurance',
    'mortgage',
    'investment',
    'credit card',
    'lawyer',
    'online degree',
    'crypto',
    'enterprise software',
  ],
});

const GameGemHeader = ({bulbHandler}: Props) => {
  const {decreaseCoin, coin, increaseCoin} = useCoinStore(state => state);
  const [loaded, setLoaded] = useState(false);
  const [isGetGem, setGetGem] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log(reward);

        setLoaded(false);
        bulbHandler();
        rewarded.load();
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  // if (isGetGem) {
  //   increaseCoin();
  //   showModal((onClose: () => void) => <GetGemToast onClose={onClose} />);
  // } else {

  // }

  const SkipByShowAds = async (onClose: () => void) => {
    rewarded.load();
    if (loaded) {
      onClose();
      rewarded.show();
    } else {
      onClose();
      rewarded.load();
      showModal((onClose: any) => (
        <ToastMsg
          onClose={() => {
            onClose();
          }}
          message="No ads found !"
        />
      ));
    }
  };

  const bulbIconHandler = () => {
    rewarded.load();
    showModal((onClose: any) => (
      <BulbToast
        onClose={onClose}
        coinDeductHandler={() => {
          if (coin > 90) {
            onClose();
            decreaseCoin();
            bulbHandler();
          } else {
            // onClose();
            rewarded.load();
            showModal((onClose: any) => (
              <ToastMsg
                message="Not enough gem available !!"
                onClose={onClose}
              />
            ));
          }
        }}
        showAdsHandler={() => {
          SkipByShowAds(onClose);
        }}
      />
    ));
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: ScreenWidth,
        // justifyContent: 'space-between',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        marginTop: -10,
      }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={bulbIconHandler}
        style={{
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: AppColors.activeBtnColor,
          borderRadius: 9999,
        }}>
        <View style={styles.signViewStyle}>
          <Text style={styles.textStyle}>+</Text>
        </View>

        <Image
          resizeMode="contain"
          source={require('../../assets/Images/bulb.png')}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        activeOpacity={0.7}
        onPress={bulbHandler}
        style={{
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: AppColors.activeBtnColor,
          borderRadius: 9999,
        }}>
        <View style={styles.signViewStyle}>
          <Text style={styles.textStyle}>+</Text>
        </View>
        <Image
          resizeMode="contain"
          source={require('../../assets/Images/gem.png')}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default GameGemHeader;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 28,
    fontFamily: 'ComicNeue-Bold',
    color: 'white',
    textAlign: 'center',
    top: -8,
  },
  signViewStyle: {
    // position: 'absolute',
    width: 23,
    height: 23,
    backgroundColor: 'blue',
    borderRadius: 9999,
    position: 'absolute',
    top: -3,
    right: -6,
  },
});
