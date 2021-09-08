// ------------------------------ 이전 코드 ---------------------------

// import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {SafeAreaView} from 'react-native';
// import DrawerTabRouter from './routers/DrawerTabRouter';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <SafeAreaView style={{flex: 1}}>
//         <DrawerTabRouter />
//       </SafeAreaView>
//     </NavigationContainer>
//   );
// }

// -------------------------- 로그인 코드 -------------------------------

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
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
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};