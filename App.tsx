import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import HomeSrc from './src/Home/HomeSrc';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Props = {}

const App = (props: Props) => {
  const Stack = createNativeStackNavigator();
  return (
    <ImageBackground style={{ flex: 1, opacity:0.9}} source={require("./assets/imgs/bgImg.png")} resizeMode="cover" >
      <SafeAreaProvider>
      <SafeAreaView style={{flex:1}} edges={['top', 'bottom', 'left', 'right']}>
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
              // contentStyle: { backgroundColor: AppColors.bgColor },
              contentStyle: {
                backgroundColor: 'transparent',
              }
            }}
          >
            <Stack.Screen name="MainSrc" component={HomeSrc} />
          </Stack.Navigator>

        </NavigationContainer>
      </RootSiblingParent>
      </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  )
}

export default App

const styles = StyleSheet.create({})