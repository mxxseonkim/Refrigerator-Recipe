import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import List1 from '../components/List1';

const ManageTab = createMaterialTopTabNavigator();
function ManageTabRouter({Chk, Chk1, onDeltChk, onSlctChk}) {
  return (
    <ManageTab.Navigator initRouteName="coldStorageScreen">
      <ManageTab.Screen
        name="coldStorageScreen"
        options={{title: '냉장'}}
        children={() => (
          <List1
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
          <List1
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
          <List1
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
          <List1
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

export default ManageTabRouter;
