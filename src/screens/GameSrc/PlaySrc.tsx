import {
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  AppColors,
  ScreenHeight,
  ScreenWidth,
  splitToTwoArrays,
} from '../../utils/constants';
import GameHeader from './GameHeader';
import GameGemHeader from './GameGemHeader';
import {riddles} from '../../data/riddle';
import CustomKeyboard from './CustomKeyboard';

type Props = {};

const PlaySrc = (props: Props) => {
  const [answer, setAnswer] = useState(
    Array(riddles[0].answer.length).fill(''),
  );
  const KeyboardKeysArray = splitToTwoArrays(riddles[0].answer.split(''));

  const handleKeyPress = (e: string) => {
    console.log(e);
  };
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={{width: ScreenWidth, height: ScreenHeight, position: 'absolute'}}
        source={require('../../assets/BgImage.png')}
      />
      <View style={styles.mainViewStyle}>
        {/* Header */}
        <GameHeader />
        {/* Game Gem Header */}
        <GameGemHeader />
        {/* Main Game content */}
        <View
          style={{
            width: ScreenWidth,
            alignItems: 'center',
            paddingTop: ScreenHeight * 0.1,
            gap: 30,
          }}>
          {/* Question */}
          <Text
            style={{
              width: ScreenWidth * 0.9,
              textAlign: 'center',
              fontSize: 25,
              fontFamily: 'JosefinSans-Regular',
            }}>
            {riddles[0].question}
          </Text>
          {/* input */}
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingTop: ScreenHeight * 0.05,
            }}>
            {answer.map((item, index) => (
              <TextInput
                editable={false}
                maxLength={1}
                value={item}
                onFocus={() => Keyboard.dismiss()}
                onKeyPress={() => Keyboard.dismiss()}
                style={{
                  height: 60,
                  width: 55,
                  fontSize: 30,
                  borderRadius: 16,
                  borderColor: AppColors.activeBtnColor,
                  borderWidth: 3,
                  paddingHorizontal: 14,
                  fontFamily: 'JosefinSans-Bold',
                  paddingTop: -10,
                  color: 'black',
                }}
              />
            ))}
          </View>
          {/* Keyboard */}

          <CustomKeyboard
            KeyboardKeysArray={KeyboardKeysArray}
            onPress={handleKeyPress}
          />
        </View>
      </View>
    </View>
  );
};

export default PlaySrc;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: ScreenHeight * 0.06,
    flex: 1,
  },
  mainViewStyle: {
    flex: 1,
    gap: 16,
  },
});
