import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import MainRouter from './routers/MainRouter';

//NavigationContainer 정의 + MainRouter 호출
export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <MainRouter />
      </SafeAreaView>
    </NavigationContainer>
  );
}