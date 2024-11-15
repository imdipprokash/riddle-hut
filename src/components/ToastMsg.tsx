import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

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
    <Text
      style={{
        color: '#333',
        fontSize: 18,
        textAlign: 'center',
        position: 'absolute',
        bottom: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 5,
        margin: 'auto',
        alignSelf: 'center',
      }}>
      {message}
    </Text>
  );
};

export default ToastMsg;

const styles = StyleSheet.create({});
