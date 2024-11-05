import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppColors, ScreenHeight, ScreenWidth} from '../../utils/constants';

type Props = {
  KeyboardKeysArray: any;
  onPress: (e: string) => void;
};

const CustomKeyboard = ({KeyboardKeysArray, onPress}: Props) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingTop: ScreenHeight * 0.05,
          width: ScreenWidth * 0.96,
        }}>
        {KeyboardKeysArray[0].map((item: any) => (
          <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(item)}>
            <Text
              style={{
                width: 55,
                height: 60,
                backgroundColor: AppColors.activeBtnColor,
                borderRadius: 10,
                fontFamily: 'JosefinSans-Bold',
                fontSize: 30,
                textAlign: 'center',
              }}
              key={item}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingTop: ScreenHeight * 0.05,
          width: ScreenWidth * 0.96,
        }}>
        {KeyboardKeysArray[1].map((item: any) => (
          <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(item)}>
            <Text
              style={{
                width: 55,
                height: 60,
                backgroundColor: AppColors.activeBtnColor,
                borderRadius: 10,
                fontFamily: 'JosefinSans-Bold',
                fontSize: 30,
                textAlign: 'center',
              }}
              key={item}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CustomKeyboard;

const styles = StyleSheet.create({});
