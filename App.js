import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import DrawerTabRouter from './routers/DrawerTabRouter';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <DrawerTabRouter />
      </SafeAreaView>
    </NavigationContainer>
  );
}