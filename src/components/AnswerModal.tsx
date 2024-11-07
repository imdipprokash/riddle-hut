import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppColors, ScreenHeight, ScreenWidth} from '../utils/constants';
import Sound from 'react-native-sound';
import {useCoinStore, useStore} from '../zustand/store';

type Props = {
  onClose: () => void;
  status?: 'error' | 'success';
  message?: string;
};

const AnswerModal = ({onClose, message}: Props) => {
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
            top: -35,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../assets/Images/bulb.png')}
            style={{width: 80, height: 80, marginRight: 5}}
            resizeMode="contain"
          />
        </View>

        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingTop: 50}}>
          <Text
            style={{
              top: 5,
              fontSize: 30,
              paddingHorizontal: 10,
              fontFamily: 'ComicNeue-Bold',
              color: 'black',
            }}>
            Get answer for ?
          </Text>
        </View>

        <View style={{gap: 10}}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: AppColors.bgColor,
              paddingVertical: 6,
              paddingHorizontal: 15,
              borderRadius: 16,
              alignItems: 'center',
              width: ScreenWidth * 0.35,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/Images/gem.png')}
                style={{width: 25, height: 25, marginTop: 0}}
              />
              <Text
                style={{
                  // top: 5,
                  fontSize: 25,
                  paddingHorizontal: 10,
                  fontFamily: 'ComicNeue-Bold',
                  color: 'black',
                }}>
                - 100
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: AppColors.bgColor,
              paddingVertical: 6,
              paddingHorizontal: 15,
              borderRadius: 16,
              borderColor: AppColors.activeBtnColor,
              borderWidth: 3,
              alignItems: 'center',
              width: ScreenWidth * 0.35,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/Images/videoIcon.png')}
                style={{width: 30, height: 30, marginTop: 0}}
              />
              <Text
                style={{
                  // top: 5,
                  fontSize: 25,
                  paddingHorizontal: 10,
                  fontFamily: 'ComicNeue-Bold',
                  color: 'black',
                }}>
                Ads
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AnswerModal;

const styles = StyleSheet.create({});
