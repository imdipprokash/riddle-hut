import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../../helper/constant';

type Props = {};

const levels = (props: Props) => {
  const _renderItem = ({item}: {item: string}) => {
    return (
      <View
        style={{
          padding: 4,
          backgroundColor: item === 'hlw' ? 'lightgray' : 'lightblue', //
          width: wp(90),
          borderRadius: hp(1),
          paddingHorizontal: hp(2),
          height: hp(8),
        }}>
        {item === 'hlw' && (
          <Image
            source={require('../../assets/icons/lock.png')}
            style={{
              position: 'absolute',
              width: wp(7),
              height: hp(4),
              alignSelf: 'flex-end',
              margin: 8,
            }}
          />
        )}
        <Text
          numberOfLines={1}
          style={{
            fontSize: hp(2),
            fontFamily: 'KanchenjungaBold',
            textAlign: 'center',
          }}>
          Level 1
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: hp(2),
            fontFamily: 'KanchenjungaRegular',
          }}>
          Q. I have a ridge, but no mountain. I have a valley, but no river. I'm
          small, but not a pebble. What am I?
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={styles.title}>Levels</Text>
      <FlatList
        data={['hlw', 'hlw1', 'hlw2']}
        contentContainerStyle={{gap: hp(1.5)}}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default levels;

const styles = StyleSheet.create({
  title: {
    fontSize: hp(3),
    textAlign: 'center',
    fontFamily: 'KanchenjungaBold',
  },
});
