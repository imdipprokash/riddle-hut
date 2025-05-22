import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {formatDate, hp, wp} from '../../helper/constant';
import {getWithdrawHistory} from '../../helper/Firebase';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

type Props = {};

export interface WithdrawHistoryProps {
  id: string;
  status: string;
  payment_id: string;
  timestamp: Timestamp;
  amount: number;
  uid: string;
}

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-3346761957556908/1398682855';

const WithdrawHistory = (props: Props) => {
  const [data, setData] = React.useState<WithdrawHistoryProps[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  useEffect(() => {
    if (loading) {
      getWithdrawHistory().then((res: any) => {
        console.log('Withdraw History', res);
        setData(res);
        setLoading(false);
      });
    }
  }, [loading]);

  const _renderItem = ({item}: {item: WithdrawHistoryProps}) => (
    <View style={styles?.riddleContainerView}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: hp(2),
              fontFamily: 'KanchenjungaRegular',
            }}>
            {/* {item} */}
            UPI Id : xxxx{item?.payment_id?.slice(-10)}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: hp(2),
              fontFamily: 'KanchenjungaRegular',
              color: 'black', //darkgreen
              backgroundColor: 'yellow', //green // red //yellow
              paddingVertical: hp(0.2),
              borderRadius: 6,
              width: wp(25),
              textAlign: 'center',
            }}>
            {/* {item} Pending / Failed / Success*/}
            {item?.status || 'pending'}
          </Text>
        </View>
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
              color: 'red',
            }}>
            - ₹{item?.amount}
          </Text>
        </View>
      </View>
    </View>
  );

  return loading ? (
    <ActivityIndicator size={40} />
  ) : (
    <View style={{height: hp(59)}}>
      <FlatList
        contentContainerStyle={{
          width: wp(90),
          alignSelf: 'center',
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={data || []}
        keyExtractor={(item, index) => item.timestamp.toString()}
        renderItem={_renderItem}
        ListEmptyComponent={() => (
          <View style={{alignItems: 'center', marginVertical: hp(2)}}>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.MEDIUM_RECTANGLE}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default WithdrawHistory;

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
