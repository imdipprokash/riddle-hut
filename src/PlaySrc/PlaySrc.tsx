import { StyleSheet, Text, View, TextInput, Image, Pressable, Animated } from 'react-native'
import LottieView from 'lottie-react-native'
import React, { useRef, useState, useEffect } from 'react'
import { generateUUID, hp, wp } from '../../helper/contant'
import { showModal } from '../../components/RootModal'
import WinModal from '../../components/WinModal'
import Riddle from "../../data/Riddle.json"


type Props = {}

const PlaySrc = (props: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const RiddleQestion = Riddle[currentQuestion]
  const [keyValueStore, setKeyValueStore] = useState<Record<string, string>>({});
  const [showCelebration, setShowCelebration] = useState<boolean>(false)
  const inputRefs = useRef<Record<string, TextInput | null>>({});
  const shakeAnimation = useRef(new Animated.Value(0)).current;

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
    const isCorrect = `${Object.values(keyValueStore).join('') + value}`.toLowerCase() === RiddleQestion.answer.toLowerCase();

    setKeyValueStore(prev => ({
      ...prev,
      [key]: value,
    }));

    if (isCorrect) {
      Object.values(inputRefs.current).forEach((ref) => {
        ref?.blur();
      });
      setCurrentQuestion((prev) => prev + 1)
      setShowCelebration(true);
      setKeyValueStore({})
      showModal((onClose: () => void) => (
        <WinModal
          message={RiddleQestion.answer}
          onClose={() => {
            setShowCelebration(false);
            onClose()
          }}
        />
      ));

    }
  };





  return (
    <View style={{ gap: hp(10) }}>
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
      <View style={{ alignItems: 'flex-end', paddingHorizontal: wp(4) }}>
        <Pressable>
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
        <Text style={[styles.textStyle, { fontFamily: 'KanchenjungaBold' }]}>Level {currentQuestion + 1}</Text>
        {/* Question */}
        <Text style={styles.textStyle}>{RiddleQestion.question}</Text>
      </View>

      {/* Answer input */}
      <View style={styles.ansView}>
        {/* <TextInput style={[styles.inputStyle, { backgroundColor: 'darkgreen', color: "#fff", padding: 10, width: wp(40), position: 'absolute', zIndex: 9999, display: 'none' }]} /> */}
        {RiddleQestion.answer.split('').map((char, index) => (
          <View key={generateUUID()} style={styles.charContainer}>
            <TextInput
              style={[
                styles.inputStyle,
              ]}
              value={keyValueStore[char]}
              placeholder="_"
              placeholderTextColor="#666"
              maxLength={1}
              ref={(ref) => {
                inputRefs.current[index.toString()] = ref;
              }}
              onChangeText={(text) => {
                updateKeyValueStore(char, text);
                if (text) {
                  if (index < RiddleQestion.answer.length - 1) {
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

