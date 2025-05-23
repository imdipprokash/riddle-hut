import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import React, {useRef, useState, useEffect} from 'react';
import {hp, Keyword, wp} from '../../helper/constant';
import {showModal} from '../../components/RootModal';
import WinModal from '../../components/WinModal';
import FailedModal from '../../components/FailedModal';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  RewardedInterstitialAd,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import HintModal from '../../components/HintModal';
import ShowHint from '../../components/ShowHint';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {increment, incrementBy} from '../store/slices/counterSlice';
import {
  addEarningHistory,
  addPlayHistory,
  getRiddleById,
  getUserInfo,
  updateUserInfo,
} from '../../helper/Firebase';
import BannerAds from '../../components/BannerAds';

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-3346761957556908/8953206413';
const adUnitIdInRe = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : 'ca-app-pub-3346761957556908/4881024062';

const adUnitIdInterstitial = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-3346761957556908~9788610089';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: Keyword,
});
const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
  adUnitIdInRe,
  {
    keywords: Keyword,
  },
);

const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterstitial, {
  keywords: Keyword,
});

type Props = {};

export interface RiddleProps {
  id: number;
  hint: string;
  created_at: CreatedAt;
  answer: string;
  question: string;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

const PlaySrc = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const riddleNo = useSelector((state: RootState) => state.counter.value);
  const [Riddle, setRiddle] = useState<RiddleProps>();
  const [keyValueStore, setKeyValueStore] = useState<Record<string, string>>(
    {},
  );
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const inputRefs = useRef<Record<string, TextInput | null>>({});
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const [showAns, setShowAns] = useState(false);
  const [showHint, setShowHint] = useState(false);

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
        ]),
      ).start();
    };

    startShake();
  }, [shakeAnimation]);

  const updateKeyValueStore = (key: string, value: string) => {
    // check if match with the answare
    const isCorrect =
      `${Object.values(keyValueStore).join('') + value}`.toLowerCase() ===
      Riddle?.answer.toLowerCase();

    if (isCorrect) {
      setKeyValueStore({});
      Object.values(inputRefs.current).forEach(ref => {
        ref?.blur();
      });

      setShowCelebration(true);
      addPlayHistory({
        solvedQuestion: Riddle.question,
        answer: Riddle.answer,
        hint: Riddle.hint,
      });

      // Earn history
      addEarningHistory({question: Riddle.question});
      if (interstitial.loaded) {
        interstitial.show();
      } else {
        showModal((onClose: () => void) => (
          <WinModal
            message={Riddle?.answer || ''}
            onClose={() => {
              setShowCelebration(false);
              onClose();
              dispatch(increment());
            }}
          />
        ));
      }
    } else {
      // check if the length of the answer is equal to the length of the riddle
      const checkLength =
        `${Object.values(keyValueStore).join('') + value}`.length ===
        Riddle?.answer.length;
      if (checkLength) {
        // wong ans
        showModal((onClose: () => void) => (
          <FailedModal
            message={Riddle.answer}
            onClose={() => {
              setShowCelebration(false);
              onClose();
              setKeyValueStore({});
            }}
            ViewAds={() => {
              setShowCelebration(false);
              onClose();
              setKeyValueStore({});
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

  // get current level
  useEffect(() => {
    getUserInfo().then((res: any) => {
      dispatch(incrementBy({value: res?.current_level || 1}));
    });
  }, []);

  // Get riddle by id and update user info
  useEffect(() => {
    getRiddleById({id: riddleNo + 1}).then((res: any) => {
      setRiddle(res[0]);
      console.log('Riddle', res, riddleNo);
    });

    // update user info
    updateUserInfo({current_level: Number(riddleNo) || 1}).then((res: any) => {
      console.log(res);
    });
  }, [riddleNo]);

  useEffect(() => {
    if (showAns) {
      setShowCelebration(true);

      showModal((onClose: () => void) => (
        <WinModal
          message={Riddle?.answer || ''}
          onClose={() => {
            setShowCelebration(false);
            setShowAns(false);
            dispatch(increment());
            onClose();
            // Play history
            addPlayHistory({
              solvedQuestion: Riddle?.question || '',
              answer: Riddle?.answer || '',
              hint: Riddle?.hint || '',
            });
            // Earn history
            addEarningHistory({question: Riddle?.question || ''});
            // update user info
          }}
        />
      ));
    }
  }, [showAns]);

  useEffect(() => {
    if (showHint) {
      showModal((onClose: () => void) => (
        <ShowHint
          message={Riddle?.hint || ''}
          onClose={() => {
            setShowHint(false);
            onClose();
          }}
        />
      ));
    }
  }, [showHint]);

  // Rewards ads

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {},
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        setShowAns(true);
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
      () => {},
    );
    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        setShowHint(true);
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
        message={Riddle?.answer || ''}
        onClose={() => {
          onClose();
        }}
        ViewAds={() => {
          onClose();
          setKeyValueStore({});
          if (rewarded.loaded) {
            rewarded.show();
          }
        }}
        showInstAds={() => {
          if (rewardedInterstitial.loaded) {
            rewardedInterstitial.show();
          }
          onClose();
        }}
      />
    ));
  };

  // Interstitial ads
  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {},
    );

    const unsubscribeOpened = interstitial.addAdEventListener(
      AdEventType.OPENED,
      () => {},
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        interstitial.load(); // Load the ad again when it is closed

        showModal((onClose: () => void) => (
          <WinModal
            message={Riddle?.answer || ''}
            onClose={() => {
              setShowCelebration(false);
              onClose();
              dispatch(increment());
            }}
          />
        ));
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeOpened();
      unsubscribeClosed();
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={{gap: hp(10), flex: 1}}>
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
      <View
        style={{alignItems: 'flex-end', paddingHorizontal: wp(4), top: hp(2)}}>
        <Pressable onPress={HintModalHandler}>
          <Animated.Image
            source={require('../../assets/icons/bulb.png')}
            resizeMode="contain"
            style={{
              width: wp(12),
              height: hp(6.5),
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
        <Text
          style={[
            styles.textStyle,
            {fontFamily: 'KanchenjungaBold', fontSize: wp(7)},
          ]}>
          Riddle {riddleNo + 1}
        </Text>
        {/* Question */}
        <Text style={styles.textStyle}>{Riddle?.question || ''}</Text>
      </View>
      {/* Answer input */}
      <View style={{flex: 1}}>
        <View style={styles.ansView}>
          {Riddle?.answer.split('').map((char, index) => (
            <View key={index} style={styles.charContainer}>
              <TextInput
                style={[styles.inputStyle]}
                value={keyValueStore[index] || ''}
                placeholder="_"
                placeholderTextColor="#666"
                maxLength={1}
                ref={ref => {
                  inputRefs.current[index.toString()] = ref;
                }}
                onChangeText={text => {
                  setKeyValueStore(prev => ({
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
      {/* ads */}
      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
        }}>
        <BannerAds />
      </View>
    </KeyboardAvoidingView>
  );
};

export default PlaySrc;

const styles = StyleSheet.create({
  questionContainer: {
    backgroundColor: '#f2f2f2',
    marginHorizontal: wp(8),
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    borderRadius: 8,
    elevation: 10,
  },

  textStyle: {
    fontSize: wp(6),
    fontFamily: 'KanchenjungaRegular',
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: wp(1),
    color: '#000',
  },
  ansView: {flexDirection: 'row', gap: wp(2), alignSelf: 'center'},

  inputStyle: {
    fontSize: wp(7.3),
    fontFamily: 'KanchenjungaBold',
    textAlign: 'center',
    borderColor: '#000',
    width: wp(10),
    height: hp(6.8),
    borderRadius: 4,
    color: '#000',
  },
  charContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(10),
    height: hp(5),
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    backgroundColor: '#fff1f2',
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
