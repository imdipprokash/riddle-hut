import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppColors, ScreenHeight, ScreenWidth} from '../utils/constants';
import {useStore} from '../zustand/store';

type Props = {
  onClose: () => void;
  status?: 'error' | 'success';
  message?: string;
  HandlerPressPrevious: () => void;
};

const WinToast = ({onClose, HandlerPressPrevious, message}: Props) => {
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
          borderColor: AppColors.activeBtnColor,
          borderWidth: 4,
          alignItems: 'center',
          gap: 10,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onClose}
          style={{
            position: 'absolute',
            zIndex: 100,
            top: -25,
            right: 0,
            backgroundColor: AppColors.bgColor,
            width: 45,
            borderRadius: 999,
          }}>
          <Text
            style={{
              fontSize: 35,
              color: 'black',
              textAlign: 'center',
              marginTop: -5,
            }}>
            x
          </Text>
        </TouchableOpacity>

        {/* Header section*/}
        <View style={{position: 'absolute', top: -40, flexDirection: 'row'}}>
          <Image
            source={require('../assets/Images/Star.png')}
            style={{width: 50, height: 50, marginTop: 20}}
          />
          <Image
            source={require('../assets/Images/Star.png')}
            style={{width: 70, height: 70, marginRight: 5}}
          />
          <Image
            source={require('../assets/Images/Star.png')}
            style={{width: 50, height: 50, marginRight: 5, marginTop: 20}}
          />
        </View>
        <Text
          style={{
            fontSize: 50,
            paddingHorizontal: 10,
            fontFamily: 'JosefinSans-Bold',
            color: 'black',
            top: 10,
          }}>
          {message}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/Images/gem.png')}
            style={{width: 30, height: 30, marginTop: 15}}
          />
          <Text
            style={{
              top: 5,
              fontSize: 30,
              paddingHorizontal: 10,
              fontFamily: 'ComicNeue-Bold',
              color: 'black',
            }}>
            +50
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 20, marginTop: 5}}>
          <TouchableOpacity
            onPress={HandlerPressPrevious}
            style={{
              backgroundColor: AppColors.activeBtnColor,
              paddingVertical: 6,
              paddingHorizontal: 15,
              borderRadius: 16,
              width: ScreenWidth * 0.35,
            }}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'JosefinSans-Bold',
                paddingBottom: 5,
                color: 'white',
                textAlign: 'center',
              }}>
              Previous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: AppColors.activeBtnColor,
              paddingVertical: 6,
              paddingHorizontal: 15,
              borderRadius: 16,
              width: ScreenWidth * 0.35,
            }}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'JosefinSans-Bold',
                paddingBottom: 5,
                color: 'white',
                textAlign: 'center',
              }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WinToast;

const styles = StyleSheet.create({});
