import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors, ScreenHeight, ScreenWidth} from '../utils/constants';
import GameBtn from '../components/GameBtn';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../zustand/store';
import {showModal} from '../components/RootModal';
import AlertModal from '../components/AlertModal';

type Props = {};

const MainSrc = (props: Props) => {
  const nav: any = useNavigation();
  const level = useStore(state => state.level);
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={{width: ScreenWidth, height: ScreenHeight, position: 'absolute'}}
        source={require('../assets/BgImage.png')}
      />
      <View style={styles.mainViewStyle}>
        <Text
          style={{
            fontSize: 70,
            fontFamily: 'JosefinSans-Bold',
            paddingBottom: 5,
            textAlign: 'center',
            marginTop: 10,

            color: AppColors.activeBtnColor,
          }}>
          RiddleHut
        </Text>
        <View style={{gap: 20}}>
          <GameBtn
            title={'Play'}
            onPress={() => {
              if (level !== 0) {
                showModal((onClose: any) => (
                  <AlertModal
                    noHandler={() => {
                      onClose();
                    }}
                    yesHandler={() => {
                      onClose();
                      nav.navigate('PlaySrc');
                    }}
                  />
                ));
              } else {
                nav.navigate('PlaySrc');
              }
            }}
          />
          <GameBtn
            title={'Resume'}
            onPress={() => {
              nav.navigate('ResumeSrc');
            }}
          />
          <GameBtn title={'Setting'} />
        </View>
      </View>
    </View>
  );
};

export default MainSrc;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: ScreenHeight * 0.06,
    paddingHorizontal: ScreenWidth * 0.05,
    flex: 1,
  },
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
  },
});