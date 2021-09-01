import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, SafeAreaView} from 'react-native';
// import DrawerTabRouter from './routers/DrawerTabRouter';
import RegisterScreen from './components/RegisterScreen';
import LogoutScreen from './components/LogoutScreen';
import LoginScreen from './components/LoginScreen';
// import SplashScreen from './components/SplashScreen';

import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// const Auth = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{title: ''}}
//       />
//       <Stack.Screen
//         name="Register"
//         component={RegiSterScreen}
//         options={{
//           title: '',
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Logout"
          component={LogoutScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({}); //이건 나중에 스타일js에 합치기

export default App;
