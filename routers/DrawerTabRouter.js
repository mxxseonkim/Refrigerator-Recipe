import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import TabStackRouter from './TabStackRouter';
import ClientScreen from '../screens/ClientScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuButton from './MenuButton';
import { Alert } from 'react-native';

const Drawer = createDrawerNavigator();

const ClientStack = createStackNavigator();

// function confirmModal() {
//   Alert.alert(
//     'Alert Title',
//     'My Alert Msg',
//     [
//       { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
//       {
//         text: 'Cancel',
//         onPress: () => console.log('Cancel Pressed'),
//       },
//       {
//         text: 'OK', onPress: async () => {
//           try {
//             await AsyncStorage.removeItem('user_id')
//           } catch (e) {
//             console.log(e);
//           }
//           goToScreen('Auth', {
//             screen: 'Login',
//           })
//         }
//       },
//     ],
//     { cancelable: false },
//   );
// };

const ClientStackScreen = () => {
  return (
    <ClientStack.Navigator>
      <ClientStack.Screen
        name="Client"
        component={ClientScreen}
        options={{
          title: '회원 관리',
          headerLeft: () => <MenuButton />,
        }}
      />
    </ClientStack.Navigator>
  );
};

const CustomDrawer = ({ navigation }) => {
  const goToScreen = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="냉장고 관리"
        onPress={() =>
          goToScreen('TabStack', {
            screen: 'ManageStack',
          })
        }
      />
      <DrawerItem
        label="레시피 추천"
        onPress={() =>
          goToScreen('TabStack', {
            screen: 'RecipeStack',
            params: {
              screen: 'RecipeList',
            },
          })
        }
      />
      <DrawerItem label="회원 관리" onPress={() => goToScreen('ClientStack')} />
      <DrawerItem label="로그아웃" onPress={() =>
        Alert.alert(
          '로그아웃',
          '정말 로그아웃 하시겠습니까?',
          [
            { text: '', onPress: () => console.log('Ask me later pressed') },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
            },
            {
              text: 'OK', onPress: async () => {
                try {
                  await AsyncStorage.removeItem('user_id')
                } catch (e) {
                  console.log(e);
                }
                goToScreen('Auth', {
                  screen: 'Login',
                })
              }
            },
          ],
          { cancelable: false },
        )} />
    </DrawerContentScrollView>
  );
};

export default function DrawerTabRouter() {
  return (
    <Drawer.Navigator
      drawerContent={({ navigation }) => (
        <CustomDrawer navigation={navigation} />
      )}>
      <Drawer.Screen name="TabStack" component={TabStackRouter} />
      <Drawer.Screen name="ClientStack" component={ClientStackScreen} />

    </Drawer.Navigator>
  );
}
