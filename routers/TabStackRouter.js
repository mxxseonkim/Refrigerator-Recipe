import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ManegeTabRouter from './ManegeTabRouter';
import MenuButton from './MenuButton';
import Receipt from '../screens/Receipt'
import ReceiptList from '../screens/ReceiptList'
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabStack = createBottomTabNavigator();

const ManegeStack = createStackNavigator();
const ManegeStackScreen = ({ navigation }) => {
  return (
    <ManegeStack.Navigator>
      <ManegeStack.Screen
        name="Manegetab"
        component={ManegeTabRouter}
        options={{ 
          title: "냉장고 관리",
          headerLeft: () => <MenuButton />  
        }}
      />
    </ManegeStack.Navigator>
  );
};

const RecipeStack = createStackNavigator();
const RecipeStackScreen = ({ navigation }) => {
  return (
    <RecipeStack.Navigator initRouteName="recipet">
      <RecipeStack.Screen
        name="receiptList"
        component={ReceiptList}
        options={{ 
          title: "레시피",
          headerLeft: () => <MenuButton />
         }}
      />
      <RecipeStack.Screen
        name="recipet"
        component={Receipt}
        options={{ 
          title: "레시피",
          headerLeft: () => <MenuButton />
         }}
      />
    </RecipeStack.Navigator>
  );
};


const TabStackRouter = () => {
    return(
        <TabStack.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon : ({ focused, color, size }) => {
              var iconName; 
              if (route.name === 'ManegeStack') {
                  iconName = focused ? 'md-fast-food' : 'md-fast-food-outline';
              } else if (route.name === 'RecipeStack') {
                  iconName = focused ? 'md-receipt' : 'md-receipt-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
            <TabStack.Screen name="ManegeStack" component={ManegeStackScreen} options={{ title: "냉장고 관리" }} />
            <TabStack.Screen name="RecipeStack" component={RecipeStackScreen} options={{ title: "레시피 추천" }}/>
        </TabStack.Navigator>
    );
};

export default TabStackRouter;

