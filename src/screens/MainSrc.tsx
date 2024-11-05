import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenHeight, ScreenWidth} from '../utils/constants';
import GameBtn from '../components/GameBtn';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const MainSrc = (props: Props) => {
  const nav: any = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={{width: ScreenWidth, height: ScreenHeight, position: 'absolute'}}
        source={require('../assets/BgImage.png')}
      />
      <View style={styles.mainViewStyle}>
        <View style={{gap: 20}}>
          <GameBtn
            title={'Play'}
            onPress={() => {
              nav.navigate('PlaySrc');
            }}
          />
          <GameBtn title={'Resume'} />
          <GameBtn title={'Setting'} />
        </View>
      </View>
    </View>
  );
};

export default MainSrc;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: ScreenHeight * 0.06,
    paddingHorizontal: ScreenWidth * 0.05,
    flex: 1,
  },
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
  },
});
