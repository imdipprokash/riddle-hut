import { StyleSheet, Text, View, TextInput, Image, Pressable, Animated, Button, KeyboardAvoidingView } from 'react-native'
import LottieView from 'lottie-react-native'
import React, { useRef, useState, useEffect } from 'react'
import { hp, Keyword, wp } from '../../helper/contant'
import { showModal } from '../../components/RootModal'
import WinModal from '../../components/WinModal'
import RiddleList from "../../data/Riddle.json"
import FailedModal from '../../components/FailedModal'
import {
  RewardedAd, RewardedAdEventType, TestIds, RewardedInterstitialAd,
} from 'react-native-google-mobile-ads';
import HintModal from '../../components/HintModal'
import ShowHint from '../../components/ShowHint'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { increment } from '../store/slices/counterSlice'
import Header from '../../components/Header'

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-3346761957556908/8953206413';
const adUnitIdInRe = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : 'ca-app-pub-3346761957556908/4881024062';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: Keyword,
});
const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitIdInRe, {
  keywords: Keyword,
});

type Props = {}

const PlaySrc = (props: Props) => {

  const value = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();


  const [currentQuestion, setCurrentQuestion] = useState(value)
  const [Riddle, setRiddle] = useState(RiddleList[currentQuestion])
  const [keyValueStore, setKeyValueStore] = useState<Record<string, string>>({});
  const [showCelebration, setShowCelebration] = useState<boolean>(false)
  const inputRefs = useRef<Record<string, TextInput | null>>({});
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const [loaded, setLoaded] = useState(false);
  const [loadedInR, setLoadedInR] = useState(false);

  useEffect(() => {
    const startShake = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnimation, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startShake();
  }, [shakeAnimation]);

  const updateKeyValueStore = (key: string, value: string) => {
    // check if match with the answare
    const isCorrect = `${Object.values(keyValueStore).join('') + value}`.toLowerCase() === Riddle.answer.toLowerCase();

    if (isCorrect) {
      setKeyValueStore({})
      Object.values(inputRefs.current).forEach((ref) => {
        ref?.blur();
      });
      dispatch(increment())
      setCurrentQuestion((prev) => prev + 1)
      setRiddle(RiddleList[currentQuestion + 1])
      setShowCelebration(true);

      showModal((onClose: () => void) => (
        <WinModal
          message={Riddle.answer}
          onClose={() => {
            setShowCelebration(false);
            onClose()
          }}
        />
      ));

    } else {
      // check the length if not match clear ans

      const checkLength = `${Object.values(keyValueStore).join('') + value}`.length === Riddle.answer.length;
      if (checkLength) {
        // wong ans
        showModal((onClose: () => void) => (
          <FailedModal
            message={Riddle.answer}
            onClose={() => {
              setShowCelebration(false);
              onClose()
              setKeyValueStore({})
            }}
            ViewAds={() => {
              setShowCelebration(false);
              onClose()
              setKeyValueStore({})
              if (rewarded.loaded) {
                rewarded.show();
              }
            }}
          />
        ));
      }


      setKeyValueStore(prev => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handlerSkipViaAds = () => {
    setCurrentQuestion((prev) => prev + 1)
    dispatch(increment())
    setRiddle(RiddleList[currentQuestion + 1])
    setShowCelebration(true);

    showModal((onClose: () => void) => (
      <WinModal
        message={Riddle.answer}
        onClose={() => {
          setShowCelebration(false);
          onClose()
        }}
      />
    ));

  }


  // Rewards ads

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
        handlerSkipViaAds();
        setTimeout(() => {
          rewarded.load(); // Load the ad again after a short delay
        }, 1000);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);



  useEffect(() => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoadedInR(true);
      },
    );
    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        showModal((onClose: () => void) => <ShowHint onClose={onClose} message={Riddle.hint || ''} />)
        setTimeout(() => {
          rewardedInterstitial.load(); // Load the ad again after a short delay
        }, 1000);
      },
    );

    // Start loading the rewarded interstitial ad straight away
    rewardedInterstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);




  // Hint 
  const HintModalHandler = () => {
    showModal((onClose: () => void) => (
      <HintModal
        message={Riddle.answer}
        onClose={() => {
          onClose()
        }}
        ViewAds={() => {
          onClose()
          setKeyValueStore({})
          if (rewarded.loaded) {
            rewarded.show();
          }
        }}
        showInstAds={() => {

          if (rewardedInterstitial.loaded) {
            rewardedInterstitial.show()
          }
          onClose()
        }}
      />
    ));
  }






  return (
    <KeyboardAvoidingView behavior="padding" style={{ gap: hp(10) }}>
      <Header />
      {/* show celebtation */}
      {showCelebration && (
        <LottieView
          source={require('../../assets/lottie/Confetti.json')}
          autoPlay={true}
          loop={true}
          style={styles.lottie}
          resizeMode="cover"
        />
      )}
      {/* Show question */}
      <View style={{ alignItems: 'flex-end', paddingHorizontal: wp(4), top: hp(3) }}>
        <Pressable onPress={HintModalHandler}>
          <Animated.Image
            source={require('../../assets/icons/bulb.png')}
            resizeMode='contain'
            style={{
              width: wp(9),
              height: hp(6),
              transform: [
                {
                  rotate: shakeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['-5deg', '5deg'],
                  }),
                },
              ],
            }}
          />
        </Pressable>
      </View>


      {/* Question  Container*/}
      <View style={styles.questionContainer}>
        {/* Level */}
        <Text style={[styles.textStyle, { fontFamily: 'KanchenjungaBold', fontSize: wp(7) }]}>Riddle {currentQuestion + 1}</Text>
        {/* Question */}
        <Text style={styles.textStyle}>{Riddle.question}</Text>
      </View>
      {/* Answer input */}
      <View style={{ flex: 1 }}>
        <View style={styles.ansView}>
          {Riddle.answer.split('').map((char, index) => (
            <View key={index} style={styles.charContainer}>
              <TextInput
                style={[
                  styles.inputStyle,
                ]}
                value={keyValueStore[index] || ''}
                placeholder="_"
                placeholderTextColor="#666"
                maxLength={1}
                ref={(ref) => {
                  inputRefs.current[index.toString()] = ref;
                }}
                onChangeText={(text) => {
                  setKeyValueStore((prev) => ({
                    ...prev,
                    [index]: text,
                  }));
                  updateKeyValueStore(index.toString(), text);
                  if (text) {
                    if (index < Riddle.answer.length - 1) {
                      const nextInput = (index + 1).toString();
                      const nextInputRef = inputRefs.current?.[nextInput];
                      if (nextInputRef) {
                        nextInputRef.focus();
                      }
                    }
                  } else {
                    if (index > 0) {
                      const prevInput = (index - 1).toString();
                      const prevInputRef = inputRefs.current?.[prevInput];
                      if (prevInputRef) {
                        prevInputRef.focus();
                      }
                    }
                  }
                }}
              />
            </View>
          ))}
        </View>
      </View>


    </KeyboardAvoidingView>
  )
}

export default PlaySrc

const styles = StyleSheet.create({

  questionContainer: {
    backgroundColor: "#f2f2f2",
    marginHorizontal: wp(8),
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    borderRadius: 8,
    elevation: 10
  },

  textStyle: {
    fontSize: wp(6),
    fontFamily: 'KanchenjungaRegular',
    fontWeight: '600',
    textAlign: "center",
    paddingHorizontal: wp(1),
    color: '#000'

  },
  ansView: { flexDirection: 'row', gap: wp(2), alignSelf: 'center' },

  inputStyle: {
    fontSize: wp(7.3),
    fontFamily: 'KanchenjungaBold',
    textAlign: 'center',
    borderColor: '#000',
    width: wp(10),
    height: hp(6.8),
    borderRadius: 4,
    color: "#000",
  },
  charContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(10),
    height: hp(5),
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    backgroundColor: '#fff1f2'
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
})

