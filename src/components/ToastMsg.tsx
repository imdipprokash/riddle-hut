import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ScreenHeight, ScreenWidth} from '../utils/constants';

type Props = {
  onClose: () => void;
  status?: 'error' | 'success';
  message?: string;
};

const ToastMsg = ({onClose, status, message}: Props) => {
  useEffect(() => {
    setTimeout(onClose, 1500);
  }, []);
  return (
    <View
      style={{
        bottom: 15,
        position: 'absolute',
        alignSelf: 'center',
        width: ScreenWidth * 0.8,
        height: ScreenHeight * 0.06,
        borderRadius: 8,
        elevation: 5,
        flexDirection: 'row',
        overflow: 'hidden',
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 10,
          height: ScreenHeight * 0.07,
          backgroundColor: status === 'success' ? 'green' : 'red',
        }}
      />
      <Text
        style={{
          color: '#333',
          fontSize: 18,
          paddingHorizontal: 10,
          width: ScreenWidth * 0.68,
        }}>
        {message}
      </Text>
    </View>
  );
};

export default ToastMsg;

const styles = StyleSheet.create({});
