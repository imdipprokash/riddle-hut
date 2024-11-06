import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppColors} from './src/utils/constants';
import MainSrc from './src/screens/MainSrc';
import PlaySrc from './src/screens/GameSrc/PlaySrc';
import {RootSiblingParent} from 'react-native-root-siblings';
import ResumeSrc from './src/screens/GameSrc/ResumeSrc';

type Props = {};

const App = (props: Props) => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function MyTabs({extraData}: any) {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={() => <></>} />
        <Tab.Screen name="Home1" component={() => <></>} />
      </Tab.Navigator>
    );
  }
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: AppColors.bgColor},
          }}>
          <Stack.Screen name="MainSrc" component={MainSrc} />
          <Stack.Screen name="PlaySrc" component={PlaySrc} />

          <Stack.Screen name="ResumeSrc" component={ResumeSrc} />

          {/*  */}
          <Stack.Screen name="MyTabs">
            {props => <MyTabs {...props} extraData={{}} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
};

export default App;

const styles = StyleSheet.create({});
