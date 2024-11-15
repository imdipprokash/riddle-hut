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
        <View
          style={{
            position: 'absolute',
            top: -ScreenHeight * 0.045,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../assets/Images/Star.png')}
            style={{
              width: ScreenWidth * 0.19,
              height: ScreenHeight * 0.08,
              marginRight: 5,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: ScreenWidth * 0.12,
            paddingHorizontal: 10,
            fontFamily: 'JosefinSans-Bold',
            color: 'black',
            top: ScreenHeight * 0.04,
          }}>
          Failed !!
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            marginTop: ScreenHeight * 0.06,
          }}>
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
                fontSize: ScreenWidth * 0.06,
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
