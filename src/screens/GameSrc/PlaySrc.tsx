import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
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

  const [riddle, setRiddle] = useState(riddles[level]);
  const [resetKeyboard, setResetKeyboard] = useState(false);

  const [showCelebration, SetShowCelebration] = useState<boolean>(false);
  const [answerCharacterArray, setAnswerCharacterArray] = useState(
    Array(riddle?.answer?.length | 0).fill(''),
  );

  const onCompleteHandler = () => {
    dispatch(IncreaseLevel());

    if (level === riddles.length - 1) {
      // Show game complete
      showModal((onClose: () => void) => (
        <GameComplete
          onClose={() => {
            onClose();
            dispatch(ResetLevel());
            setRiddle(riddles[0]);
            setAnswerCharacterArray(Array(riddles[0].answer.length).fill(''));
          }}
        />
      ));
    } else {
      setRiddle(riddles[level + 1]);
      setAnswerCharacterArray(Array(riddles[level + 1].answer.length).fill(''));
    }
  };

  const completeByAds = () => {
    showModal((onClose: any) => (
      <WinToast
        isAds={true}
        message={riddle.answer}
        onClose={() => {
          SetShowCelebration(false);
          onClose();
          onCompleteHandler();
        }}
        HandlerPressPrevious={() => {
          SetShowCelebration(false);
          onClose();
          dispatch(DecreaseLevel());
          level !== 0 && setRiddle(riddles[level - 1]);
          level !== 0 &&
            setAnswerCharacterArray(
              Array(riddles[level - 1].answer.length).fill(''),
            );
        }}
      />
    ));
  };

  // const

  const HandlerKeyPress = (e: string) => {
    const nextIndex = answerCharacterArray.findIndex(item => item === '');
    if (nextIndex !== -1) {
      const newArray = [...answerCharacterArray];
      newArray[nextIndex] = e;
      setAnswerCharacterArray(newArray);

      // when both length same
      if (nextIndex === answerCharacterArray.length - 1) {
        setResetKeyboard(!resetKeyboard);
        setAnswerCharacterArray(Array(riddle.answer.length).fill(''));

        if (
          riddle.answer
            .split('')
            .every((value, index) => value === newArray[index])
        ) {
          console.log('You win !');
          // increase level and coin based on that
          SetShowCelebration(true);
          dispatch(IncreaseCoin());

          showModal((onClose: () => void) => (
            <WinToast
              message={riddle.answer}
              onClose={() => {
                SetShowCelebration(false);
                onClose();
                onCompleteHandler();
              }}
              HandlerPressPrevious={() => {
                SetShowCelebration(false);
                onClose();

                dispatch(DecreaseLevel());
                level !== 0 && setRiddle(riddles[level - 1]);
                level !== 0 &&
                  setAnswerCharacterArray(
                    Array(riddles[level - 1].answer.length).fill(''),
                  );
              }}
            />
          ));
        } else {
          console.log('You lose !');
          showModal((onClose: () => void) => <FailToast onClose={onClose} />);
        }
      }
    }
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
                  width: ScreenWidth * 0.13,
                  height: ScreenHeight * 0.065,
                  fontSize: ScreenWidth * 0.08,
                  borderRadius: 16,
                  backgroundColor:
                    item === '' ? 'transparent' : AppColors.activeBtnColor,
                  borderColor: AppColors.activeBtnColor,
                  borderWidth: 3,
                  fontFamily: 'JosefinSans-Bold',
                  paddingTop: -10,
                  color: 'black',
                  textAlign: 'center',
                }}
              />
            ))}
          </View>
          {/* Keyboard */}
          <CustomKeyboard
            resetKeyboard={resetKeyboard}
            answer={riddle.answer}
            onPress={HandlerKeyPress}
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
