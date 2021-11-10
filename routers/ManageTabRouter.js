import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RefrigeratorScreen from '../screens/RefrigeratorScreen';

//MaterialTopTab 네비게이터 생성/정의
const ManageTab = createMaterialTopTabNavigator();

export default function ManageTabRouter({Chk, Chk1, onDeltChk, onSlctChk}) {
  return (
    // 첫화면/기본화면 coldStorageScreen으로 설정
    // coldStorageScreen, frozenScreen, condimentScreen, roomTemperatureScreen 컴포넌트 스크린 등록
    // children 속성으로 RefrigeratorScreen 컴포넌트 등록
    // RefrigeratorScreen에 count, Chk, Chk1, onDeltChk, onSlctChk를 props로 전달
    // count는 냉장, 냉동, 조미료, 실온을 나눠서 데이터를 select 하기 위함
    <ManageTab.Navigator
      initRouteName="coldStorageScreen"
      tabBarOptions={{
        activeTintColor: 'salmon',
        inactiveTintColor: 'gray',
        pressColor: 'lightsalmon',
        indicatorStyle: {
          borderBottomWidth: 3,
          borderBottomColor: 'salmon',
        },
        labelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      }}>
      <ManageTab.Screen
        name="coldStorageScreen"
        options={{title: '냉장'}}
        children={() => (
          <RefrigeratorScreen
            count={1}
            Chk={Chk}
            Chk1={Chk1}
            onDeltChk={onDeltChk}
            onSlctChk={onSlctChk}
          />
        )}
      />
      <ManageTab.Screen
        name="frozenScreen"
        options={{title: '냉동'}}
        children={() => (
          <RefrigeratorScreen
            count={2}
            Chk={Chk}
            Chk1={Chk1}
            onDeltChk={onDeltChk}
            onSlctChk={onSlctChk}
          />
        )}
      />
      <ManageTab.Screen
        name="condimentScreen"
        options={{title: '조미료'}}
        children={() => (
          <RefrigeratorScreen
            count={3}
            Chk={Chk}
            Chk1={Chk1}
            onDeltChk={onDeltChk}
            onSlctChk={onSlctChk}
          />
        )}
      />
      <ManageTab.Screen
        name="roomTemperatureScreen"
        options={{title: '실온'}}
        children={() => (
          <RefrigeratorScreen
            count={4}
            Chk={Chk}
            Chk1={Chk1}
            onDeltChk={onDeltChk}
            onSlctChk={onSlctChk}
          />
        )}
      />
    </ManageTab.Navigator>
  );
}
