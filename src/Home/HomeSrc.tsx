import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../../helper/constant';

import Btn from '../../components/Btn';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../type';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {reset} from '../store/slices/counterSlice';
import Header from '../../components/Header';
import {showModal} from '../../components/RootModal';
import ConformationAlert from '../../components/ConformationAlert';

type Props = {};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeSrc = (props: Props) => {
  const nav = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const value = useSelector((state: RootState) => state.counter.value);
  const handlerNewPlay = () => {
    console.log('How', value);

    // if (Number(value) !== 0) {
    if (value) {
      showModal((onClose: () => void) => (
        <ConformationAlert
          yesHandler={() => {
            dispatch(reset());
            nav.navigate('PlaySrc');
            onClose();
          }}
          noHandler={onClose}
        />
      ));
    } else {
      dispatch(reset());
      nav.navigate('PlaySrc');
    }

    // }
  };
  return (
    <View style={{flex: 1}}>
      <Header />
      <Image
        style={styles.imgStyle}
        source={require('../../assets/imgs/logo_bg.png')}
      />
      <Text style={styles.headingText}>Riddle AI</Text>
      <View
        style={{
          gap: hp(3),
          paddingVertical: hp(7.5),
          marginHorizontal: wp(10),
        }}>
        {/* <Btn title={'Play'} onPress={handlerNewPlay} /> */}
        <Btn
          title={value === 0 ? 'Play' : 'Continue'}
          onPress={() => {
            nav.navigate('PlaySrc');
          }}
        />

        <Btn
          title={'Show Levels'}
          onPress={() => {
            nav.navigate('levels');
          }}
          style={{backgroundColor: '#0284c7'}}
        />
        <Btn
          title={'Solved Riddle'}
          onPress={() => {
            nav.navigate('SolveRiddle');
          }}
          style={{backgroundColor: '#e879f9'}}
        />
      </View>
    </View>
  );
};

export default HomeSrc;

const styles = StyleSheet.create({
  imgStyle: {
    marginTop: -hp(3),
    width: typeof wp === 'function' ? wp(50) : wp * 10,
    height: typeof hp === 'function' ? hp(35) : hp * 10,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  headingText: {
    fontFamily: 'KanchenjungaBold',
    fontSize: typeof wp === 'function' ? wp(13) : wp * 13,
    textAlign: 'center',
    marginTop: typeof hp === 'function' ? -hp(9) : -hp * 10,
    color: '#57534e',
  },
});
