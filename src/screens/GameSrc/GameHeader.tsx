import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenWidth} from '../../utils/constants';
import {useAppSelector} from '../../redux/hook';

type Props = {};

const GameHeader = (props: Props) => {
  const level = useAppSelector(state => state.level.currentLevel);
  const Coin = useAppSelector(state => state.coin.currentCoin);

  return (
    <View
      style={{
        flexDirection: 'row',
        width: ScreenWidth,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
      <View>
        <ImageBackground
          resizeMode="contain"
          source={require('../../assets/Images/roundRing.png')}
          style={{
            width: 110,
            height: 80,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <Image
            source={require('../../assets/Images/Star.png')}
            style={{width: 20, height: 20, marginRight: 5}}
          />
          <Text style={styles.textStyle}>{level}</Text>
        </ImageBackground>
      </View>
      <View>
        <ImageBackground
          resizeMode="contain"
          source={require('../../assets/Images/squreRing.png')}
          style={{
            width: 110,
            height: 80,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'center',
          }}>
          <Text style={[styles.textStyle, {fontSize: 30}]}>50</Text>
        </ImageBackground>
      </View>
      <View>
        <ImageBackground
          resizeMode="contain"
          source={require('../../assets/Images/roundRingRight.png')}
          style={{
            width: 110,
            height: 80,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.textStyle}>{Coin}</Text>

          <Image
            source={require('../../assets/Images/gem.png')}
            style={{width: 20, height: 20, marginLeft: 5}}
          />
        </ImageBackground>
      </View>
    </View>
  );
};

export default GameHeader;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25,
    fontFamily: 'ComicNeue-Bold',
    textAlign: 'center',
  },
});
