import * as React from 'react';
import DrawerTabRouter from './DrawerTabRouter';
import SplashScreen from '../screens/SplashScreen';
import AuthStack from './AuthStackRouter';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

//Stack 네비게이터 정의/생성
const Stack = createStackNavigator();

export default function MainRouter() {
  return (
    // 첫화면/기본화면 SplashScreen으로 설정
    // SplashScreen, Auth, DrawerTab 컴포넌트 스크린 등록
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DrawerTab"
        options={{headerShown: false}}
        component={DrawerTabRouter}
      />
    </Stack.Navigator>
  );
}
