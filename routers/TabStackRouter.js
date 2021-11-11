import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ManageTabRouter from './ManageTabRouter';
import MenuButton from '../components/MenuButton';
import BookMark from '../components/BookMark';
import RecipeList from '../screens/RecipeList';
import RecipeInfo from '../screens/RecipeInfo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddButton from '../components/AddButton';
import DeleteButton from '../components/DeleteButton';
import {View, Platform} from 'react-native';
import {useState} from 'react';

//Stack 네비게이터 생성/ 정의
const ManageStack = createStackNavigator();
const ManageStackScreen = ({navigation, Chk, slctChk}) => {
  // - TabStackRouter[ManageStackScreen]
  //   ㄴ> ManageTabRouter => props를 그대로 전달하는 역할
  //     ㄴ> RefrigeratorScreen => onSlctChk(!Chk)으로 값 변경 시(update, delete) 자신의 onSelect가 실행 됨
  //   ㄴ> DeleteButton => 여기서 onDeltChk(!Chk1)으로 값을 변경하면 RefrigeratorScreen의 UI가 바뀜
  //   ㄴ> AddButton => 여기서 onSlctChk(!Chk)으로 값을 변경(insert)하면 RefrigeratorScreen의 onSelect가 실행 됨

  // Chk1,deltChk 정의
  var [Chk1, deltChk] = useState(false);

  // Chk의 값이 이 컴포넌트까지 끌어올려져서 값이 변경 됨
  // 그리고 자동으로 바뀐 값을 prop로 전달
  const onSlctChk = chk => {
    slctChk(chk);
  };

  // Chk1의 값이 이 컴포넌트까지 끌어올려져서 값이 변경 됨
  // 그리고 자동으로 바뀐 값을 prop로 전달
  const onDeltChk = chk => {
    deltChk(chk);
  };

  return (
    // ManageTab 컴포넌트 스크린 등록
    <ManageStack.Navigator>
      <ManageStack.Screen
        name="ManageTab"
        children={() => (
          <ManageTabRouter
            //Chk, Chk1, onDeltChk, onSlctChk를 props로 전달
            Chk={Chk}
            Chk1={Chk1}
            onDeltChk={onDeltChk}
            onSlctChk={onSlctChk}
          />
        )}
        options={{
          title: '냉장고 관리',
          //header 왼쪽에 MenuButton 오른쪽에 DeleteButton, AddButton 컴포넌트 등록
          headerLeft: () => <MenuButton />,
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <DeleteButton
                //Chk1, onDeltChk props로 전달
                Chk1={Chk1}
                onDeltChk={onDeltChk}
              />
              <AddButton
                //Chk, onSlctChk를 props로 전달
                Chk={Chk}
                onSlctChk={onSlctChk}
              />
            </View>
          ),
        }}
      />
    </ManageStack.Navigator>
  );
};

//Stack 네비게이터 생성/ 정의
const RecipeStack = createStackNavigator();
const RecipeStackScreen = ({navigation, Chk}) => {
  // - TabStackRouter[RecipeStackScreen]
  //   ㄴ> RecipeList
  //   ㄴ> RecipeInfo => BookMark에서 변경한 mark의 값으로 토스트 메시지 띄움
  //   ㄴ> BookMark => 여기서 북마크 버튼을 눌려서 mark의 boolean 변경

  // mark, setMark 정의 / null로 초기화
  // mark 값이 이 컴포넌트까지 끌어올려져서 값이 변경 됨
  // 그리고 자동으로 바뀐 값을 prop로 전달
  const [mark, setMark] = useState(null);

  return (
    // RecipeList, RecipeInfo 컴포넌트 스크린 등록
    <RecipeStack.Navigator initRouteName="RecipeList">
      <RecipeStack.Screen
        name="RecipeList"
        children={({navigation}) => <RecipeList navigation={navigation} Chk={Chk}/>}
        options={{
          title: '레시피',
          //header 왼쪽에 MenuButton 컴포넌트 등록
          headerLeft: () => <MenuButton />,
        }}
      />
      <RecipeStack.Screen
        name="RecipeInfo"
        children={({route}) => (
          //mark와 data를 props로 전달
          <RecipeInfo mark={mark} data={route.params.data} />
        )}
        options={({route}) => ({
          // RecipeList에서 받아온 data.name으로 title 등록
          title: route.params.data.recipe_name,
          //header 왼쪽에 MenuButton 오른쪽에 BookMark 컴포넌트 등록
          headerLeft: () => <MenuButton />,
          headerRight: () => (
            <BookMark
              //mark, setMark, recipeId를 props로 전달
              recipeId={route.params.data.recipe_id}
              mark={mark}
              setMark={setMark}
            />
          ),
        })}
      />
    </RecipeStack.Navigator>
  );
};

//BottomTab 네비게이터 생성/정의
const TabStack = createBottomTabNavigator();
export default function TabStackRouter() {
  var [Chk, slctChk] = useState(true);

  return (
    <TabStack.Navigator
      // ManageStack, RecipeStack 컴포넌트 스크린 등록
      screenOptions={({route}) => ({
        // 스크린 옵션으로 현재 포커싱 된 route.name으로 Icon 색상 변경
        tabBarIcon: ({focused, color, size}) => {
          //(??) focused, color, size => 이게 어디서 인자를 보내는지 모르겠음.
          var iconName;
          if (Platform.OS !== 'ios') {
            if (route.name === 'ManageStack') {
              iconName = focused ? 'md-fast-food' : 'md-fast-food-outline';
            } else if (route.name === 'RecipeStack') {
              iconName = focused ? 'md-receipt' : 'md-receipt-outline';
            }
          } else {
            if (route.name === 'ManageStack') {
              iconName = focused ? 'ios-fast-food' : 'ios-fast-food-outline';
            } else if (route.name === 'RecipeStack') {
              iconName = focused ? 'ios-receipt' : 'ios-receipt-outline';
            }
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'salmon', //focused
        inactiveTintColor: 'gray', //not focused
      }}>
      <TabStack.Screen
        name="ManageStack"
        children={()=><ManageStackScreen Chk={Chk} slctChk={slctChk}/>}
        options={{title: '냉장고 관리'}}
      />
      <TabStack.Screen
        name="RecipeStack"
        children={()=><RecipeStackScreen Chk={Chk}/>}
        options={{title: '레시피 추천'}}
      />
    </TabStack.Navigator>
  );
}
