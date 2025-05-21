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
import {handleAnonymousAuth} from './helper/Firebase';

type Props = {};

const App = (props: Props) => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    handleAnonymousAuth();
  }, []);
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
