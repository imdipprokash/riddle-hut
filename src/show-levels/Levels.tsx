import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../../helper/constant';
import RiddleList from '../../data/Riddle.json';

type Props = {};

const Levels = (props: Props) => {
  const currentLevel = 1; // useSelector((state: RootState) => state.counter.value);
  const _renderItem = ({
    item,
    index,
  }: {
    item: {question: string};
    index: number;
  }) => {
    return (
      <View
        style={{
          padding: 8,
          backgroundColor: currentLevel < index + 1 ? 'lightgray' : 'lightblue', //
          width: wp(90),
          borderRadius: hp(1),
          paddingHorizontal: hp(2),
          height: hp(10),
        }}>
        {currentLevel < index + 1 && (
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
            fontSize: hp(2.2),
            fontFamily: 'KanchenjungaBold',
            textAlign: 'center',
          }}>
          Level {index + 1}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: hp(2),
            marginTop: hp(0.8),
            fontFamily: 'KanchenjungaRegular',
          }}>
          Q. {item?.question}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={styles.title}>Levels</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={RiddleList || []}
        contentContainerStyle={{gap: hp(1.5)}}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default Levels;

const styles = StyleSheet.create({
  title: {
    fontSize: hp(3),
    textAlign: 'center',
    fontFamily: 'KanchenjungaBold',
  },
});
