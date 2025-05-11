import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { Keyword } from '../helper/contant';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    keywords: Keyword,
});

export function showRewardedAd(onRewardEarned: (reward: any) => void) {
    rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
        console.log('User earned reward of ', reward);
        onRewardEarned(reward);
    });

    rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        rewarded.show();
    });

    rewarded.load();
}

// Automatically load ads when the app opens
useEffect(() => {
    rewarded.load();
}, []);

// function App() {
//     const [loaded, setLoaded] = useState(false);

//     useEffect(() => {
//         const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
//             setLoaded(true);
//         });

//         // Start loading the rewarded ad straight away
//         rewarded.load();

//         // Unsubscribe from events on unmount
//         return () => {
//             unsubscribeLoaded();
//         };
//     }, []);

//     // No advert ready to show yet
//     if (!loaded) {
//         return null;
//     }

//     return (
//         <Button
//             title="Show Rewarded Ad"
//             onPress={() => {
//                 showRewardedAd(reward => {
//                     console.log('Reward earned:', reward);
//                 });
//             }}
//         />
//     );
// }

// export default App;
