import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppColors} from './src/utils/constants';
import MainSrc from './src/screens/MainSrc';
import PlaySrc from './src/screens/GameSrc/PlaySrc';
import {RootSiblingParent} from 'react-native-root-siblings';
import AboutSrc from './src/screens/AboutSrc';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <NavigationContainer>
            <StatusBar
              translucent
              backgroundColor={'transparent'}
              barStyle={'light-content'}
            />
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                contentStyle: {backgroundColor: AppColors.bgColor},
              }}>
              <Stack.Screen name="MainSrc" component={MainSrc} />
              <Stack.Screen name="PlaySrc" component={PlaySrc} />
              <Stack.Screen name="ResumeSrc" component={PlaySrc} />
              <Stack.Screen name="AboutSrc" component={AboutSrc} />

              {/*  */}
              <Stack.Screen name="MyTabs">
                {props => <MyTabs {...props} extraData={{}} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
