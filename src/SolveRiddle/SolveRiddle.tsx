import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import RiddleList from '../../data/Riddle.json';
import {hp, wp} from '../../helper/constant';

type Props = {};

const SolveRiddle = (props: Props) => {
  const maxSolved = useSelector((state: RootState) => state.counter.maxSolved);
  const itemIndex = Array.from({length: maxSolved}, (_, i) => i);
  const renderItem = ({item}: any) => {
    const riddle = RiddleList[item];
    return (
      <View style={styles.riddleContainer}>
        <Text style={styles.titleStyle}>Q. {riddle.question}</Text>
        <Text style={[styles.titleStyle, {fontSize: wp(4.5)}]}>
          hint. {riddle.hint}
        </Text>
        <Text style={[styles.titleStyle]}>Ans. {riddle.answer}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, paddingHorizontal: wp(5), paddingVertical: hp(3)}}>
      {itemIndex.length > 0 ? (
        <FlatList
          data={itemIndex}
          contentContainerStyle={{gap: hp(1)}}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      ) : (
        <Text>Please play riddle</Text>
      )}
    </View>
  );
};

export default SolveRiddle;

const styles = StyleSheet.create({
  riddleContainer: {
    borderWidth: 0.9,
    padding: 10,
    borderRadius: 8,
    gap: hp(1.5),
  },
  titleStyle: {
    fontSize: wp(5),
    fontFamily: 'KanchenjungaRegular',
    lineHeight: hp(2.5),
  },
});
