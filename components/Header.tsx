import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../helper/contant'

type Props = { showBackBtn?: boolean }

const Header = ({ showBackBtn }: Props) => {
  return (
    <View style={styles.mainStyle}>
      {showBackBtn ? <></> : <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Image source={require("../assets/icons/bill.png")} style={{ width: wp(8), height: hp(5) }} resizeMode='contain' />
        <Text style={styles.textStyle}>20</Text>
      </View>}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Image source={require("../assets/icons/coinIcon.png")} style={{ width: wp(8), height: hp(5) }} resizeMode='contain' />
        <Text style={styles.textStyle}>1000</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  mainStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: hp(2),
  },
  textStyle: {
    fontSize: wp(7),
    fontFamily: 'KanchenjungaBold'
  }
})