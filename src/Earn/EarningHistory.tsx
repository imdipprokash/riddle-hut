import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../../helper/constant';

type Props = {};

const EarningHistory = (props: Props) => {
  const tab1Data = ['Item 1', 'Item 2', 'Item 3'];
  const _renderItem = ({item}: {item: string}) => (
    <View style={styles?.riddleContainerView}>
      <View style={{flex: 1}}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: hp(2),
            fontFamily: 'KanchenjungaRegular',
          }}>
          {/* {item} */}
          Q. I have a ridge, but no mountain. I have a valley, but no river. I'm
          small, but not a pebble. What am I?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: hp(1.8),
              fontFamily: 'KanchenjungaRegular',
            }}>
            18/05/2025 9:26 AM
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: hp(2.3),
              fontFamily: 'KanchenjungaBold',
              color: 'darkgreen',
            }}>
            + ₹0.25
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={{
        width: wp(90),
        alignSelf: 'center',
        height: hp(65),
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={tab1Data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={_renderItem}
    />
  );
};

export default EarningHistory;

const styles = StyleSheet.create({
  riddleContainerView: {
    marginVertical: hp(0.4),
    backgroundColor: 'lightblue',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: hp(1),
    flexDirection: 'row',
    gap: wp(1),
  },
});
