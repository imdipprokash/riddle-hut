import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppColors, ScreenWidth} from '../../utils/constants';
import {useCoinStore, useStore} from '../../zustand/store';
import {showModal} from '../../components/RootModal';
import BulbToast from '../../components/BulbToast';

type Props = {};

const GameGemHeader = (props: Props) => {
  const level = useStore((state: any) => state.level);
  const Coin = useCoinStore(state => state.coin);

  const bulbIconHandler = () => {
    // if coin is more then 100 then show the answer else ask to watch a video to get coin

    if (Coin > 90) {
      showModal((onClose: any) => (
        <BulbToast
          onClose={() => {
            onClose();
          }}
          coinDeductHandler={() => {}}
          showAdsHandler={() => {}}
        />
      ));
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: ScreenWidth,
        justifyContent: 'space-between',
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
          source={require('../../assets/Images/gem.png')}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
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
