import * as React from 'react';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import Search_id from '../screens/Search_id';
import Search_pw from '../screens/Search_pw';
import Search_pw2 from '../screens/Search_pw2';

import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

//Stack ?��비게?��?�� ?��?��/?��?��
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    // 첫화�?/기본?���? Login ?��?��
    // Login, Register 컴포?��?�� ?��?���? ?���?
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
      <Stack.Screen
        name="Search_id"
        component={Search_id}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Search_pw"
        component={Search_pw}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Search_pw2"
        component={Search_pw2}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
}
