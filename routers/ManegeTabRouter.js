import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ColdStorageScreen from '../screens/ColdStorageScreen';
import CondimentScreen from '../screens/CondimentScreen';
import FrozenScreen from '../screens/FrozenScreen';
import RoomTemperatureScreen from '../screens/RoomTemperatureScreen';

const ManegeTab = createMaterialTopTabNavigator();
function ManegeTabRouter() {
  return (
    <ManegeTab.Navigator initRouteName="coldStorage">
      <ManegeTab.Screen
        name="coldStorageScreen"
        component={ColdStorageScreen}
        options={{title: '냉장'}}
      />
      <ManegeTab.Screen
        name="frozenScreen"
        component={FrozenScreen}
        options={{title: '냉동'}}
      />
      <ManegeTab.Screen
        name="condimentScreen"
        component={CondimentScreen}
        options={{title: '조미료'}}
      />
      <ManegeTab.Screen
        name="roomTemperatureScreen"
        component={RoomTemperatureScreen}
        options={{title: '실온'}}
      />
    </ManegeTab.Navigator>
  );
}
export default ManegeTabRouter;
