import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeAd, NativeAdView, TestIds } from 'react-native-google-mobile-ads';

type Props = {}

const ShowNativeAds = (props: Props) => {
    const [nativeAd, setNativeAd] = useState<NativeAd>();

    useEffect(() => {
        NativeAd.createForAdRequest(TestIds.NATIVE)
            .then(setNativeAd)
            .catch(console.error);
    }, []);

    if (!nativeAd) {
        return null;
    }
    return (
        <View>
            <NativeAdView nativeAd={nativeAd}>
                <Text>ShowNativeAds</Text>
            </NativeAdView>

        </View>
    )
}

export default ShowNativeAds

const styles = StyleSheet.create({})