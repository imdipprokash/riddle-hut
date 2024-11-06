import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppColors, ScreenHeight, ScreenWidth} from '../utils/constants';
import Sound from 'react-native-sound';

type Props = {
  onClose: () => void;
  status?: 'error' | 'success';
  message?: string;
};

const FailToast = ({onClose, message}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        width: ScreenWidth,
        height: ScreenHeight,
        backgroundColor: 'transparent',
        position: 'absolute',
      }}>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          width: ScreenWidth * 0.85,
          height: ScreenHeight * 0.26,
          borderRadius: 8,
          elevation: 5,
          flexDirection: 'column',
          backgroundColor: 'white',
          top: '45%',
          borderColor: AppColors.underlayColor,
          borderWidth: 4,
          alignItems: 'center',
          gap: 10,
        }}>
        {/* Header section*/}
        <View style={{position: 'absolute', top: -40, flexDirection: 'row'}}>
          <Image
            source={require('../assets/Images/Star.png')}
            style={{width: 70, height: 70, marginRight: 5}}
          />
        </View>
        <Text
          style={{
            fontSize: 50,
            paddingHorizontal: 10,
            fontFamily: 'JosefinSans-Bold',
            color: 'black',
            top: 35,
          }}>
          Failed !!
        </Text>

        <View style={{flexDirection: 'row', gap: 20, marginTop: 50}}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: AppColors.activeBtnColor,
              paddingVertical: 6,
              paddingHorizontal: 15,
              borderRadius: 16,
              width: ScreenWidth * 0.4,
            }}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'JosefinSans-Bold',
                paddingBottom: 5,
                color: 'white',
                textAlign: 'center',
              }}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FailToast;

const styles = StyleSheet.create({});
