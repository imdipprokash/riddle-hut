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

import LottieView from 'lottie-react-native';
import {showModal} from '../../components/RootModal';
import WinToast from '../../components/WinToast';

type Props = {};

const ResumeSrc = (props: Props) => {
  const level = useStore((state: any) => state.level);
  const increaseLevel = useStore(state => state.increaseLevel);
  const decreaseLevel = useStore(state => state.decreaseLevel);

  let userInput = '';

  const [showCelebration, SetShowCelebration] = useState<boolean>(false);
  const [answer, setAnswer] = useState('');
  const [answerCharacterArray, setAnswerCharacterArray] = useState(
    Array(riddles[level].answer.length).fill(''),
  );

  useEffect(() => {
    console.log(level);
    setAnswerCharacterArray(Array(riddles[level].answer.length).fill(''));
  }, [level]);

  useEffect(() => {
    if (answer.length === riddles[level].answer.length) {
      if (answer === riddles[level].answer.toLowerCase()) {
        // triggerConfetti();
        SetShowCelebration(true);
        increaseLevel();
        setTimeout(() => {
          showModal((onClose: any) => (
            <WinToast
              HandlerPressPrevious={() => {
                onClose();
                decreaseLevel();
                SetShowCelebration(false);
              }}
              message={riddles[level].answer}
              onClose={() => {
                onClose();
                setAnswer('');
                SetShowCelebration(false);
              }}
            />
          ));
        }, 1500);
      } else {
        setAnswer('');
        setAnswerCharacterArray(Array(riddles[level].answer.length).fill(''));

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

      {showCelebration && (
        <LottieView
          source={require('../../assets/lottie/Confetti.json')}
          autoPlay={true}
          loop={true}
          style={styles.lottie}
          resizeMode="cover"
        />
      )}

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
            {riddles[level].question}
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
            answer={riddles[level].answer}
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

export default ResumeSrc;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: ScreenHeight * 0.06,
    flex: 1,
  },
  mainViewStyle: {
    flex: 1,
    gap: 16,
  },
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: 'none',
  },
});
