import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {formatDate, hp, wp} from '../../helper/constant';
import {getEarningHistory} from '../../helper/Firebase';

type Props = {};

export interface ItemProps {
  id: string;
  question: string;
  timestamp: Timestamp;
  amount: number;
  uid: string;
}

export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

const EarningHistory = (props: Props) => {
  const [data, setData] = React.useState<ItemProps[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  useEffect(() => {
    if (loading) {
      getEarningHistory().then((res: any) => {
        setData(res);
        setLoading(false);
      });
    }
  }, [loading]);
  //
  const _renderItem = ({item}: {item: any}) => (
    <View style={styles?.riddleContainerView}>
      <View style={{flex: 1}}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: hp(2),
            fontFamily: 'KanchenjungaRegular',
          }}>
          Q. {item?.question}
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
            {formatDate(item?.timestamp)}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: hp(2.3),
              fontFamily: 'KanchenjungaBold',
              color: 'darkgreen',
            }}>
            + ₹{item?.amount}
          </Text>
        </View>
      </View>
    </View>
  );

  return loading ? (
    <ActivityIndicator size={40} />
  ) : (
    <FlatList
      contentContainerStyle={{
        width: wp(90),
        alignSelf: 'center',
        height: hp(65),
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={data}
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
