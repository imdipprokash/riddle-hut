import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../helper/contant'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../type'

type Props = { showBackBtn?: boolean }
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Header = ({ showBackBtn }: Props) => {
  const nav = useNavigation<NavigationProp>()
  return (
    <View style={styles.mainStyle}>
      {showBackBtn ? <></> : <TouchableOpacity onPress={() => nav.navigate('EarnSrc')} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Image source={require("../assets/icons/bill.png")} style={styles.iconStyle} resizeMode='contain' />
        <Text style={styles.textStyle}>5</Text>
      </TouchableOpacity>}
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Image source={require("../assets/icons/coinIcon.png")} style={styles.iconStyle} resizeMode='contain' />
        <Text style={styles.textStyle}>900</Text>
      </View> */}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  mainStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: hp(2),
    position: 'absolute',
    width: wp(100)
  },
  textStyle: {
    fontSize: wp(7),
    fontFamily: 'KanchenjungaBold'
  },
  iconStyle: { width: wp(6), height: hp(4) }
})