import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors, ScreenHeight, ScreenWidth} from '../utils/constants';
import GameBtn from '../components/GameBtn';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const AboutSrc = (props: Props) => {
  const nav: any = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={{width: ScreenWidth, height: ScreenHeight, position: 'absolute'}}
        source={require('../assets/BgImage.png')}
      />
      <View style={styles.mainViewStyle}>
        <GameBtn
          title={'About'}
          onPress={() => {
            nav.navigate('AboutSrc');
          }}
        />
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'JosefinSans-Bold',
            paddingBottom: 5,
            color: '#333',
            textAlign: 'center',
          }}>
          I am Dipprokash Sardar, a skilled React Native developer with
          extensive experience building robust mobile and web applications. I
          specialize in React Native for mobile development and React.js for web
          applications, with additional expertise in RESTful API integration,
          Redux Toolkit, and Bluetooth communication for IoT-based mobile
          applications.
        </Text>
      </View>
    </View>
  );
};

export default AboutSrc;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: ScreenHeight * 0.06,
    paddingHorizontal: ScreenWidth * 0.05,
    flex: 1,
  },
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 20,
    marginTop: 30,
  },
});
