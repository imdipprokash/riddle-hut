import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../../helper/contant'

import Btn from '../../components/Btn'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../type'


type Props = {}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeSrc = (props: Props) => {
  const nav = useNavigation<NavigationProp>()
  return (
    <View style={{ flex: 1, }}>
      <Image style={styles.imgStyle} source={require("../../assets/imgs/logo_bg.png")} />
      <Text style={styles.headingText}>Riddle AI</Text>
      <View style={{ gap: hp(3), paddingVertical: hp(7.5), marginHorizontal: wp(10) }}>
        <Btn title={'Play'} onPress={() => { nav.navigate('PlaySrc') }} />
        <Btn title={'Continue'} onPress={() => { }} style={{ backgroundColor: "#0284c7" }} />
        <Btn title={'Solved Riddle'} onPress={() => { }} style={{ backgroundColor: "#e879f9" }} />
      </View>
    </View>
  )
}

export default HomeSrc

const styles = StyleSheet.create({
  imgStyle: {
    marginTop: -hp(3),
    width: typeof wp === 'function' ? wp(50) : wp * 10,
    height: typeof hp === 'function' ? hp(35) : hp * 10,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  headingText: {
    fontFamily: 'KanchenjungaBold',
    fontSize: typeof wp === 'function' ? wp(13) : wp * 13,
    textAlign: 'center',
    marginTop: typeof hp === 'function' ? -hp(10) : -hp * 10,
    color: "#57534e"
  }
})