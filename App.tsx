import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import HomeSrc from './src/Home/HomeSrc';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from './components/Header';
import PlaySrc from './src/PlaySrc/PlaySrc';
import BannerAds from './components/BannerAds';

type Props = {}

const App = (props: Props) => {
  const Stack = createNativeStackNavigator();
  return (
    <ImageBackground style={{ flex: 1, opacity: 1 }} source={require("./assets/imgs/bgImg.png")} resizeMode="cover" >
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
          <Header />
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
                }}
              >
                <Stack.Screen name="MainSrc" component={HomeSrc} />
                <Stack.Screen name="PlaySrc" component={PlaySrc} />
              </Stack.Navigator>
            </NavigationContainer>
          </RootSiblingParent>
          <View>
            <BannerAds />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  )
}

export default App

const styles = StyleSheet.create({})