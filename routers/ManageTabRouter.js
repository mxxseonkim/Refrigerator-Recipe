import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RefrigeratorScreen from '../screens/RefrigeratorScreen';

const ManageTab = createMaterialTopTabNavigator();
export default function ManageTabRouter() {
  return (
    <ManageTab.Navigator initRouteName="coldStorage">
      <ManageTab.Screen
        name="coldStorageScreen"
        component={RefrigeratorScreen}
        options={{title: '냉장'}}
        initialParams={{grocerytype: '냉장'}}
      />
      <ManageTab.Screen
        name="frozenScreen"
        component={RefrigeratorScreen}
        options={{title: '냉동'}}
        initialParams={{grocerytype: '냉동'}}
      />
      <ManageTab.Screen
        name="condimentScreen"
        component={RefrigeratorScreen}
        options={{title: '조미료'}}
        initialParams={{grocerytype: '조미료'}}
      />
      <ManageTab.Screen
        name="roomTemperatureScreen"
        component={RefrigeratorScreen}
        options={{title: '실온'}}
        initialParams={{grocerytype: '실온'}}
      />
    </ManageTab.Navigator>
  );
}