import React, {useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import {wp, hp} from '../helper/constant';

interface ToastMsgProps {
  onClose: () => void;
  message: string;
  type: 'success' | 'error';
}

const ToastMsg: React.FC<ToastMsgProps> = ({onClose, message, type}) => {
  const slideAnim = React.useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onClose());
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.modalContainer,
        {
          backgroundColor: type === 'success' ? '#d4edda' : '#f8d7da',
          transform: [{translateY: slideAnim}],
        },
      ]}>
      <Text
        style={[styles.message, {color: type === 'success' ? 'green' : 'red'}]}>
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: wp(95),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: hp(0.1),
    bottom: hp(4),
    position: 'absolute',
    zIndex: 9999,
    alignSelf: 'center',
  },
  title: {
    fontSize: hp(2),
    textAlign: 'center',
    fontFamily: 'KanchenjungaBold',
  },
  message: {
    fontSize: hp(1.8),
    color: '#666',
    textAlign: 'center',
    fontFamily: 'KanchenjungaRegular',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: hp(1),
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ToastMsg;
