import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScreenWidth, ScreenHeight, AppColors} from '../utils/constants';

type Props = {
  yesHandler: () => void;
  noHandler: () => void;
};

const AlertModal = ({yesHandler, noHandler}: Props) => {
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
          gap: 20,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'JosefinSans-Bold',
            paddingBottom: 5,
            textAlign: 'center',
            marginTop: 10,
          }}>
          Are you sure ?
        </Text>
        <Text
          style={{
            fontSize: 23,
            fontFamily: 'JosefinSans-Bold',
            paddingBottom: 5,
            textAlign: 'center',
            marginTop: -4,
          }}>
          All level will be restart !
        </Text>
        <View style={{flexDirection: 'row', gap: 20}}>
          <TouchableOpacity
            onPress={yesHandler}
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
                color: 'lightgray',
                textAlign: 'center',
              }}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={noHandler}
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
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AlertModal;

const styles = StyleSheet.create({});
