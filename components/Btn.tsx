import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
  Animated,
} from 'react-native';
//@ts-ignore
import PlayIcon from '../assets/icons/playIcon.png';
import {hp, wp} from '../helper/constant';
interface BtnProps {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
}
const Btn: React.FC<BtnProps> = ({title, onPress, style, textStyle}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Animated.View
      style={[styles.mainContainer, {transform: [{scale: scaleAnim}]}]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, style]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
          <Image
            source={PlayIcon}
            resizeMode="contain"
            style={{width: 40, height: 40}}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    height: hp(9),
    backgroundColor: '#000',
    borderRadius: 10,
    paddingRight: 8,
  },
  button: {
    backgroundColor: '#16a34a',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    height: hp(8),
  },
  text: {
    color: '#f2f2f2',
    fontSize: hp(3.5),
    // fontWeight: 'bold',
    fontFamily: 'KanchenjungaRegular',
  },
});

export default Btn;
