import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ManageTabRouter from './ManageTabRouter';
import MenuButton from './MenuButton';
import BookMark from './BookMark';
import RecipeList from '../screens/RecipeList'
import RecipeInfo from '../screens/RecipeInfo'
import Ionicons from 'react-native-vector-icons/Ionicons';


const TabStack = createBottomTabNavigator();

const ManageStack = createStackNavigator();
const ManageStackScreen = ({ navigation }) => {
  return (
    <ManageStack.Navigator>
      <ManageStack.Screen
        name="Managetab"
        component={ManageTabRouter}
        options={{ 
          title: "냉장고 관리",
          headerLeft: () => <MenuButton />  
        }}
      />
    </ManageStack.Navigator>
  );
};

const RecipeStack = createStackNavigator();
const RecipeStackScreen = ({ navigation }) => {
  return (
    <RecipeStack.Navigator initRouteName="RecipeList">
      <RecipeStack.Screen
        name="RecipeList"
        component={RecipeList}
        options={{ 
          title: "레시피",
          headerLeft: () => <MenuButton />
         }}
      />
      <RecipeStack.Screen
        name="RecipeInfo"
        component={RecipeInfo}
        options={({ route }) => ({
          title: route.params.title,
          headerLeft: () => <MenuButton />,
          headerRight: () => <BookMark />
        })}
      />
    </RecipeStack.Navigator>
  );
};


export default TabStackRouter = () => {
    return(
        <TabStack.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon : ({ focused, color, size }) => {
              var iconName; 
              if (route.name === 'ManageStack') {
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
            <TabStack.Screen name="ManageStack" component={ManageStackScreen} options={{ title: "냉장고 관리" }} />
            <TabStack.Screen name="RecipeStack" component={RecipeStackScreen} options={{ title: "레시피 추천" }}/>
        </TabStack.Navigator>
    );
};
