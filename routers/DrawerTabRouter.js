import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import TabStackRouter from './TabStackRouter';
import ClientScreen from '../screens/ClientScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuButton from '../components/MenuButton';
import {Alert} from 'react-native';

//Stack 네비게이터 생성/정의
const ClientStack = createStackNavigator();
const ClientStackScreen = () => {
  return (
    // Client 컴포넌트 스크린 등록
    // headerLeft에 MenuButton 컴포넌트 등록
    <ClientStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 0, //for android
          shadowOpacity: 0, //for ios
          borderBottomWidth: 0, //for ios
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
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

const CustomDrawer = ({navigation}) => {
  // navigation.navigate() => goToScreen()으로 재정의하여 함수 사용
  // navigate('이동할 스크린', {screen : '다음으로 이동할 스크린' .... })
  // 이동할 순서를 정해줘서 navigator꼬임 방지
  const goToScreen = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

  // DrawerContentScrollView에 DrawerItem 정의
  // ['냉장고 관리', '레시피 추천', '회원 관리', '로그 아웃']
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
      <DrawerItem
        label="로그아웃"
        onPress={() =>
          //Alert 사용하여 로그아웃 최종 확인
          Alert.alert(
            '로그아웃',
            '정말 로그아웃 하시겠습니까?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
              },
              {
                text: 'OK',
                onPress: async () => {
                  // 로그아웃이기 때문에 로컬에 user_id를 삭제하고
                  // Login 스크린으로 돌아감
                  try {
                    await AsyncStorage.removeItem('user_id');
                  } catch (e) {
                    console.log(e);
                  }
                  goToScreen('Auth', {
                    screen: 'Login',
                  });
                },
              },
            ],
            {cancelable: false},
          )
        }
      />
    </DrawerContentScrollView>
  );
};

//Drawer 네비게이터 생성/정의
const Drawer = createDrawerNavigator();
export default function DrawerTabRouter() {
  return (
    // TabStack, ClientStack 컴포넌트 스크린 등록
    <Drawer.Navigator
      // drawerContent : Drawer에 등록될 항목 재정의 => Drawer 커스텀
      drawerContent={({navigation}) => (
        <CustomDrawer navigation={navigation} />
      )}>
      <Drawer.Screen name="TabStack" component={TabStackRouter} />
      <Drawer.Screen name="ClientStack" component={ClientStackScreen} />
    </Drawer.Navigator>
  );
}
