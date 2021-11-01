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
import LoginScreen from '/Users/xiu0327/new_update/Refrigerator-Recipe/components/LoginScreen.js';
import MenuButton from './MenuButton';
import { Alert } from 'react-native';

const Drawer = createDrawerNavigator();

const ClientStack = createStackNavigator();

const LogoutStack = createStackNavigator();

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
      <DrawerItem label="로그아웃" onPress={async () => {
        try {
          await AsyncStorage.removeItem('user_id')
        } catch(e) {
          console.log(e);
        }
        goToScreen('Auth', {
          screen: 'Login',
        })
      }}/>

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