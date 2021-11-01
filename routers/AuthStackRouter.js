import * as React from 'react';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

//Stack 네비게이터 정의/생성
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    // 첫화면/기본화면 Login 설정
    // Login, Register 컴포넌트 스크린 등록
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
}
