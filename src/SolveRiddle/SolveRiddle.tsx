import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {formatDate, hp, wp} from '../../helper/constant';
import {getPlayHistory} from '../../helper/Firebase';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

type Props = {};

interface playHistoryProps {
  id: string;
  timestamp: Timestamp;
  hint: string;
  solved_question: string;
  answer: string;
  uid: string;
}

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

const SolveRiddle = (props: Props) => {
  const [playHistory, setPlayHistory] = React.useState<playHistoryProps[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    getPlayHistory().then((res: any) => {
      setLoading(false);
      setPlayHistory(res);
    });
  }, []);

  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-3346761957556908/1398682855';

  const renderItem = ({item}: {item: playHistoryProps}) => {
    return (
      <View style={styles.riddleContainer}>
        <Text style={styles.titleStyle}>Q. {item?.solved_question || ''}</Text>
        <Text style={[styles.titleStyle, {fontSize: wp(4.5)}]}>
          hint. {item?.hint || ''}
        </Text>
        <Text style={[styles.titleStyle]}>Ans. {item?.answer || ''}</Text>
        <Text style={[styles.titleStyle]}>
          Time. {formatDate(item?.timestamp)}
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, paddingHorizontal: wp(5), paddingVertical: hp(3)}}>
      <Text
        style={[
          styles.titleStyle,
          {
            textAlign: 'center',
            marginBottom: hp(0.8),
            fontSize: hp(3),
            fontFamily: 'KanchenjungaBold',
          },
        ]}>
        Solved Riddles
      </Text>
      <FlatList
        data={playHistory}
        contentContainerStyle={{gap: hp(1)}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <>
            {renderItem({item})}
            {(index + 1) % 3 === 0 && index !== 0 ? (
              <View style={{alignItems: 'center', marginVertical: hp(2)}}>
                <BannerAd
                  unitId={adUnitId}
                  size={BannerAdSize.MEDIUM_RECTANGLE}
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                  }}
                />
              </View>
            ) : null}
          </>
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          loading ? (
            <Text
              style={{
                textAlign: 'center',
                marginVertical: hp(2),
                fontSize: hp(2.5),
              }}>
              Loading...
            </Text>
          ) : (
            <Text
              style={[
                styles.titleStyle,
                {
                  fontFamily: 'KanchenjungaBold',
                  textAlign: 'center',
                  fontSize: wp(5.2),
                  marginTop: hp(40),
                },
              ]}>
              You didn't solve any riddles 😢 !
            </Text>
          )
        }
      />
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
