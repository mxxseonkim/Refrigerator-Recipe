import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import Search_id from './components/Search_id';
import Search_pw from './components/Search_pw';
import Search_pw2 from './components/Search_pw2';
import DrawerTabRouter from './routers/DrawerTabRouter';
import SplashScreen from './components/SplashScreen';

import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const AppStack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Search_id"
        component={Search_id}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Search_pw"
        component={Search_pw}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Search_pw2"
        component={Search_pw2}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <AppStack.Navigator initialRouteName="SplashScreen">
          <AppStack.Screen
            name="SplashScreen"
            component={SplashScreen}
            // Hiding header for Splash Screen
            options={{headerShown: false}}
          />
          <AppStack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />
          <AppStack.Screen
            name="DrawerTab"
            options={{headerShown: false}}
            component={DrawerTabRouter}
          />
        </AppStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}