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
};

const CustomKeyboard = ({answer, onPress}: Props) => {
  const [count, setCount] = useState(0);

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
  // setCount(prev => prev + 1);
  useEffect(() => {
    if (count === answer.length) {
      setCount(0);
      setFirstRowKeys((prev: any) => {
        return prev.map((item: any) => ({...item, isClick: false}));
      });
      setSecondRowKeys((prev: any) => {
        return prev.map((item: any) => ({...item, isClick: false}));
      });
    }
  }, [count]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingTop: ScreenHeight * 0.05,
          width: ScreenWidth * 0.96,
        }}>
        {firstRowKeys.map((item: any, index: number) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: 55,
              height: 60,
              backgroundColor: item?.isClick
                ? 'transparent'
                : AppColors.activeBtnColor,
              borderRadius: 10,
            }}
            key={index}
            disabled={item.isClick}
            onPress={() => {
              onPress(item.itemName);
              setCount(prev => prev + 1);

              firstRowKeys[index].isClick = true;
            }}>
            {!item?.isClick && (
              <Text
                style={{
                  fontFamily: 'JosefinSans-Bold',
                  fontSize: 30,
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
        }}>
        {secondRowKeys.map((item: any, index: number) => (
          <TouchableOpacity
            disabled={item.isClick}
            key={index}
            style={{
              width: 55,
              height: 60,
              backgroundColor: item?.isClick
                ? 'transparent'
                : AppColors.activeBtnColor,
              borderRadius: 10,
            }}
            activeOpacity={0.7}
            onPress={() => {
              onPress(item.itemName);
              setCount(prev => prev + 1);

              secondRowKeys[index].isClick = true;
            }}>
            {!item?.isClick && (
              <Text
                style={{
                  width: 55,
                  height: 60,

                  fontFamily: 'JosefinSans-Bold',
                  fontSize: 30,
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
