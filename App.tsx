import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootSiblingParent} from 'react-native-root-siblings';
import HomeSrc from './src/Home/HomeSrc';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import PlaySrc from './src/PlaySrc/PlaySrc';
import BannerAds from './components/BannerAds';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';
import SolveRiddle from './src/SolveRiddle/SolveRiddle';
import EarnSrc from './src/Earn/EarnSrc';
import Levels from './src/show-levels/Levels';
import {createUserInfo, signInAnonymously} from './helper/Firebase';
import {useNetInfoInstance} from '@react-native-community/netinfo';
import {showModal} from './components/RootModal';
import ToastMsg from './components/ToastMsg';
import {checkVersion} from 'react-native-check-version';
import VersionModal from './components/VersionModal';

type Props = {};

const App = (props: Props) => {
  const {netInfo, refresh} = useNetInfoInstance();
  useEffect(() => {
    if (!netInfo.isConnected) {
      showModal((onClose: () => void) => (
        <ToastMsg
          onClose={onClose}
          type="error"
          message="No Internet Connection"
        />
      ));
    }
  }, [netInfo]);

  useEffect(() => {
    checkVersionInfo();
  }, []);

  const checkVersionInfo = async () => {
    const version = await checkVersion();
    if (version.needsUpdate) {
      showModal(() => (
        <VersionModal
          message={`New update available! Enjoy better performance and new features.`}
          link={version.url}
        />
      ));
    }
  };

  useEffect(() => {
    // Uncomment the following line to enable anonymous sign-in
    signInAnonymously();
    // Replace the following values with actual user data as needed
    createUserInfo();
  }, []);
  const Stack = createNativeStackNavigator();

  return (
    <ImageBackground
      style={{flex: 1, opacity: 1}}
      source={require('./assets/imgs/bgImg.png')}
      resizeMode="cover">
      <SafeAreaProvider>
        <SafeAreaView
          style={{flex: 1}}
          edges={['top', 'bottom', 'left', 'right']}>
          {/* <Header /> */}
          <Provider store={store}>
            <PersistGate
              loading={<Text>Loading...</Text>}
              persistor={persistor}>
              <RootSiblingParent>
                <NavigationContainer>
                  <StatusBar
                    translucent
                    backgroundColor={'transparent'}
                    barStyle={'dark-content'}
                  />
                  <Stack.Navigator
                    initialRouteName="MainSrc"
                    screenOptions={{
                      headerShown: false,
                      contentStyle: {
                        backgroundColor: 'transparent',
                      },
                      animation: 'slide_from_right', // Adding transition animation
                    }}>
                    <Stack.Screen name="MainSrc" component={HomeSrc} />
                    <Stack.Screen name="PlaySrc" component={PlaySrc} />
                    <Stack.Screen name="SolveRiddle" component={SolveRiddle} />
                    <Stack.Screen name="EarnSrc" component={EarnSrc} />
                    <Stack.Screen name="Levels" component={Levels} />
                  </Stack.Navigator>
                </NavigationContainer>
              </RootSiblingParent>
            </PersistGate>
          </Provider>
          <View>
            <BannerAds />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
};

export default App;

const styles = StyleSheet.create({});
