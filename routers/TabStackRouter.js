import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ManageTabRouter from './ManageTabRouter';
import MenuButton from './MenuButton';
import BookMark from '../components/BookMark';
import RecipeList from '../screens/RecipeList';
import RecipeInfo from '../screens/RecipeInfo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButton from './HeaderButton';
import CheckButton from '../components/CheckButton';
import {View} from 'react-native';
import {useState} from 'react';

const TabStack = createBottomTabNavigator();

const ManageStack = createStackNavigator();
const ManageStackScreen = ({navigation}) => {
  var [Chk, slctChk] = useState(true);
  var [Chk1, deltChk] = useState(false);

  const onSlctChk = chk => {
    slctChk(chk);
  };

  const onDeltChk = chk => {
    deltChk(chk);
  };

  return (
    <ManageStack.Navigator>
      <ManageStack.Screen
        name="ManageTab"
        children={() => (
          <ManageTabRouter
            Chk={Chk}
            Chk1={Chk1}
            onDeltChk={onDeltChk}
            onSlctChk={onSlctChk}
          />
        )}
        options={{
          title: '냉장고 관리',
          headerLeft: () => <MenuButton />,
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <CheckButton Chk1={Chk1} onDeltChk={onDeltChk} />
              <HeaderButton Chk={Chk} onSlctChk={onSlctChk} />
            </View>
          ),
        }}
      />
    </ManageStack.Navigator>
  );
};

const RecipeStack = createStackNavigator();
const RecipeStackScreen = ({navigation}) => {
  return (
    <RecipeStack.Navigator initRouteName="RecipeList">
      <RecipeStack.Screen
        name="RecipeList"
        component={RecipeList}
        options={{
          title: '레시피',
          headerLeft: () => <MenuButton />,
        }}
      />
      <RecipeStack.Screen
        name="RecipeInfo"
        component={RecipeInfo}
        options={({route}) => ({
          title: route.params.title,
          headerLeft: () => <MenuButton />,
          headerRight: () => <BookMark recipeId={route.params.id}/>,
        })}
      />
    </RecipeStack.Navigator>
  );
};

const TabStackRouter = () => {
  return (
    <TabStack.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
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
      }}>
      <TabStack.Screen
        name="ManageStack"
        component={ManageStackScreen}
        options={{title: '냉장고 관리'}}
      />
      <TabStack.Screen
        name="RecipeStack"
        component={RecipeStackScreen}
        options={{title: '레시피 추천'}}
      />
    </TabStack.Navigator>
  );
};

export default TabStackRouter;
