import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppColors, ScreenHeight, ScreenWidth} from '../utils/constants';

type Props = {
  title: string;
  onPress?: () => void;
};

const GameBtn = ({title, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <ImageBackground
        source={require('../assets/Images/BtnBg.png')}
        style={{
          width: ScreenWidth * 0.8,
          height: ScreenHeight * 0.09,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          // backgroundColor: 'red',
        }}
        resizeMode="contain">
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            color: 'white',
            fontFamily: 'JosefinSans-Bold',
            marginTop: -10,
          }}>
          {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default GameBtn;

const styles = StyleSheet.create({});
