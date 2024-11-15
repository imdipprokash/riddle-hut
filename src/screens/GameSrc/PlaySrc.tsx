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

import LottieView from 'lottie-react-native';
import {showModal} from '../../components/RootModal';
import WinToast from '../../components/WinToast';
import FailToast from '../../components/FailToast';
import AdsScreen from '../../components/ads/AdsScreen';
import GameComplete from '../../components/GameComplete';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {
  DecreaseLevel,
  IncreaseLevel,
  ResetLevel,
} from '../../redux/slices/levelSlice';
import {IncreaseCoin} from '../../redux/slices/coinSlice';

type Props = {};

const PlaySrc = (props: Props) => {
  const level = useAppSelector(state => state.level.currentLevel);
  const dispatch = useAppDispatch();

  console.log('This is the level ', level);

  const riddle = riddles[level]; //level

  const [showCelebration, SetShowCelebration] = useState<boolean>(false);
  const [answer, setAnswer] = useState('');
  const [answerCharacterArray, setAnswerCharacterArray] = useState(
    Array(riddle.answer.length).fill(''),
  );

  useEffect(() => {
    if (answer.length === riddle.answer.length) {
      if (answer === riddle.answer.toLowerCase()) {
        onSuccessHandler();
        showModal((onClose: any) => (
          <WinToast
            message={riddle.answer}
            onClose={() => {
              onClose();
              SetShowCelebration(false);
              if (level + 1 !== riddles.length) {
                dispatch(IncreaseLevel());
              } else {
                showModal((onClose: () => void) => (
                  <GameComplete
                    onClose={() => {
                      onClose();
                      // setLevelToZero();
                      dispatch(ResetLevel());
                    }}
                  />
                ));
              }
            }}
            HandlerPressPrevious={function (): void {
              if (level > 0) {
                dispatch(DecreaseLevel());
              }
              setAnswer('');
              setAnswerCharacterArray(Array(riddle.answer.length).fill(''));
              onClose();
              SetShowCelebration(false);
            }}
          />
        ));
      } else {
        showModal((onClose: any) => (
          <FailToast
            message={''}
            onClose={() => {
              onClose();
              setAnswer('');
              setAnswerCharacterArray(Array(riddle.answer.length).fill(''));
            }}
          />
        ));
      }
    }
  }, [answer]);

  const onSuccessHandler = () => {
    if (level < riddles.length) {
      dispatch(IncreaseLevel());
    }

    // Coin increase
    dispatch(IncreaseCoin());

    // clear answerArray
    setAnswerCharacterArray(Array(riddles[level + 1].answer.length).fill(''));

    // clear user input
    setAnswer('');

    // Show celebration
    SetShowCelebration(true);
  };

  const completeByAds = () => {
    showModal((onClose: any) => (
      <WinToast
        message={riddle.answer}
        onClose={() => {
          onClose();
          setAnswer('');
          setAnswerCharacterArray(Array(riddle.answer.length).fill(''));
          SetShowCelebration(false);
          if (level + 1 !== riddles.length) {
            dispatch(IncreaseLevel());
          } else {
            showModal((onClose: () => void) => (
              <GameComplete
                onClose={() => {
                  onClose();
                  dispatch(ResetLevel());
                }}
              />
            ));
          }
        }}
        HandlerPressPrevious={function (): void {
          if (level > 0) {
            dispatch(DecreaseLevel());
          }
          setAnswer('');
          setAnswerCharacterArray(Array(riddle.answer.length).fill(''));
          onClose();
          SetShowCelebration(false);
        }}
      />
    ));
  };

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
        <GameGemHeader
          bulbHandler={() => {
            SetShowCelebration(true);
            completeByAds();
          }}
        />
        {/* Main Game content */}
        <View
          style={{
            width: ScreenWidth,
            alignItems: 'center',
            paddingTop: ScreenHeight * 0.045,
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
            {riddle.question}
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
                  width: ScreenWidth * 0.131,
                  height: ScreenHeight * 0.065,
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
            answer={riddle.answer}
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
      <View style={{position: 'absolute', bottom: 1}}>
        <AdsScreen />
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
