import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../../helper/contant'

type Props = {}

const HomeSrc = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.imgStyle} source={require("../../assets/imgs/logo_bg.png")} />
      <Text style={styles.headingText}>Riddle Hut</Text>
    </View>
  )
}

export default HomeSrc

const styles = StyleSheet.create({
  imgStyle: {
    width: typeof wp === 'function' ? wp(50) : wp * 10,
    height: typeof hp === 'function' ? hp(25) : hp * 10,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  headingText: {
    fontFamily: 'KanchenjungaBold',
    fontSize: typeof wp === 'function' ? wp(13) : wp * 13,
    textAlign: 'center',
    marginTop: typeof hp === 'function' ? -hp(5) : -hp * 10,
    fontWeight:'900'
  }
})