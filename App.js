import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, SafeAreaView } from "react-native";
import DrawerTabRouter from './routers/DrawerTabRouter'

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <DrawerTabRouter/>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;