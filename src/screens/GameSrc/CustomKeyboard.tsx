import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppColors,
  ScreenHeight,
  ScreenWidth,
  splitToTwoArrays,
} from '../../utils/constants';

type Props = {
  answer: string;
  onPress: (e: string) => void;
  resetKeyboard: boolean;
};

const CustomKeyboard = ({answer, onPress, resetKeyboard}: Props) => {
  let KeyboardKeysArray = splitToTwoArrays(answer.split(''));
  let part1 = KeyboardKeysArray.slice(0, 6); // First 6 elements
  let part2 = KeyboardKeysArray.slice(6); // Remaining elements

  const [firstRowKeys, setFirstRowKeys] = useState(
    part1.map((item: any) => ({
      itemName: item,
      isClick: false,
    })),
  );
  const [secondRowKeys, setSecondRowKeys] = useState(
    part2.map((item: any) => ({
      itemName: item,
      isClick: false,
    })),
  );

  useEffect(() => {
    let KeyboardKeysArray = splitToTwoArrays(answer.split(''));
    let part1 = KeyboardKeysArray.slice(0, 6); // First 6 elements
    let part2 = KeyboardKeysArray.slice(6); // Remaining element

    setFirstRowKeys(
      part1.map((item: any) => ({
        itemName: item,
        isClick: false,
      })),
    );
    setSecondRowKeys(
      part2.map((item: any) => ({
        itemName: item,
        isClick: false,
      })),
    );
  }, [answer]);

  useEffect(() => {
    setFirstRowKeys((prev: any) => {
      return prev.map((item: any) => ({...item, isClick: false}));
    });
    setSecondRowKeys((prev: any) => {
      return prev.map((item: any) => ({...item, isClick: false}));
    });
  }, [resetKeyboard]);

  return (
    <View
      style={{
        width: ScreenWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingTop: ScreenHeight * 0.05,
          width: ScreenWidth * 0.96,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {firstRowKeys.map((item: any, index: number) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: ScreenWidth * 0.131,
              height: ScreenHeight * 0.065,
              backgroundColor: item?.isClick
                ? 'transparent'
                : AppColors.activeBtnColor,
              borderRadius: 10,
            }}
            key={index}
            disabled={item.isClick}
            onPress={() => {
              onPress(item.itemName);

              firstRowKeys[index].isClick = true;
            }}>
            {!item?.isClick && (
              <Text
                style={{
                  fontFamily: 'JosefinSans-Bold',
                  fontSize: ScreenWidth * 0.07,

                  textAlign: 'center',
                }}
                key={item}>
                {item.itemName}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingTop: ScreenHeight * 0.05,
          width: ScreenWidth * 0.96,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {secondRowKeys.map((item: any, index: number) => (
          <TouchableOpacity
            disabled={item.isClick}
            key={index}
            style={{
              width: ScreenWidth * 0.131,
              height: ScreenHeight * 0.065,
              backgroundColor: item?.isClick
                ? 'transparent'
                : AppColors.activeBtnColor,
              borderRadius: 10,
            }}
            activeOpacity={0.7}
            onPress={() => {
              onPress(item.itemName);

              secondRowKeys[index].isClick = true;
            }}>
            {!item?.isClick && (
              <Text
                style={{
                  fontFamily: 'JosefinSans-Bold',
                  fontSize: ScreenWidth * 0.07,
                  textAlign: 'center',
                }}>
                {item.itemName}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CustomKeyboard;

const styles = StyleSheet.create({});
