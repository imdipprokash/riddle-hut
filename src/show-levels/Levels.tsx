import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {hp, wp} from '../../helper/constant';
import {getAllRiddles, getPlayHistory} from '../../helper/Firebase';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

type Props = {};

interface riddlesProps {
  id: number;
  hint: string;
  created_at: CreatedAt;
  question: string;
  answer: string;
}

interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-3346761957556908/1398682855';
const Levels = (props: Props) => {
  const [riddleList, setRiddleList] = React.useState<riddlesProps[]>([]);
  const [playHistory, setPlayHistory] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setLoading(true);
    getAllRiddles().then((res: any) => {
      setLoading(false);

      setRiddleList(res);
    });

    getPlayHistory().then((res: any) => {
      setPlayHistory(res);
    });
  }, []);

  const RenderItem = ({
    item,
    index,
  }: {
    item: {question: string};
    index: number;
  }) => {
    const isSolved = playHistory.some(
      (history: {solved_question: string}) =>
        history.solved_question === item.question,
    );
    return (
      <View
        style={{
          padding: 8,
          backgroundColor: isSolved ? 'lightblue' : 'lightgray', //
          width: wp(90),
          borderRadius: hp(1),
          paddingHorizontal: hp(2),
          height: hp(12),
        }}>
        {!isSolved && (
          <Image
            source={require('../../assets/icons/lock.png')}
            style={{
              position: 'absolute',
              width: wp(7),
              height: hp(4),
              alignSelf: 'flex-end',
              margin: 20,
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
        data={riddleList || []}
        contentContainerStyle={{gap: hp(1.5)}}
        renderItem={({item, index}) => (
          <>
            <RenderItem index={index} item={item} />
            {(index + 1) % 5 === 0 && index !== 0 ? (
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
        keyExtractor={item => item.id.toString()}
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
                // styles.titleStyle,
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

export default Levels;

const styles = StyleSheet.create({
  title: {
    fontSize: hp(3),
    textAlign: 'center',
    fontFamily: 'KanchenjungaBold',
  },
});
