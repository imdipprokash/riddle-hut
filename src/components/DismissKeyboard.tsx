import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';

type Props = {};

const DismissKeyboard = ({children}: any) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;

const styles = StyleSheet.create({});
