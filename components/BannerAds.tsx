import {
    GAMBannerAd,
    BannerAdSize,
    TestIds,
} from 'react-native-google-mobile-ads';
import React from 'react';

type Props = {
    sizes?: (BannerAdSize | "FLUID")[] | string[]
};

const BannerAds = ({ sizes }: Props) => {
    const adUnitId = __DEV__
        ? TestIds.BANNER
        : 'ca-app-pub-3346761957556908/1398682855';
    return (
        <GAMBannerAd
            unitId={adUnitId}
            sizes={sizes || [BannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
            onAdLoaded={() => { }}
            onAdFailedToLoad={error => { }}
        />
    );
};

export default BannerAds;
