import {
  Alert,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors, ScreenHeight, ScreenWidth} from '../../utils/constants';
import GameHeader from './GameHeader';
import GameGemHeader from './GameGemHeader';
import {riddles} from '../../data/riddle';
import CustomKeyboard from './CustomKeyboard';
import {useStore} from '../../zustand/store';

type Props = {};

const PlaySrc = (props: Props) => {
  const bears = useStore((state: any) => state.bears);

  let userInput = '';

  const [showCelebration, SetShowCelebration] = useState<boolean>(false);
  const [answer, setAnswer] = useState('');
  const [answerCharacterArray] = useState(
    Array(riddles[bears].answer.length).fill(''),
  );

  useEffect(() => {
    if (answer.length === riddles[bears].answer.length) {
      if (answer === riddles[bears].answer.toLowerCase()) {
        SetShowCelebration(true);
        setAnswer('');
        Alert.alert('Wow 🥳');
      } else {
        SetShowCelebration(false);
        setAnswer('');

        userInput = '';
        Alert.alert('Wrong');
      }
    }
  }, [answer]);

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
            {riddles[1].question}
          </Text>
          {/* input */}
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingTop: ScreenHeight * 0.05,
            }}>
            {answerCharacterArray.map((item, index) => (
              <TextInput
                key={index}
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
                  backgroundColor:
                    item === '' ? 'transparent' : AppColors.activeBtnColor,
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
            answer={riddles[bears].answer}
            onPress={e => {
              answerCharacterArray[answer.length] = e;
              setAnswer(prev => {
                if (prev) {
                  return prev + e;
                } else {
                  return e;
                }
              });
            }}
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
