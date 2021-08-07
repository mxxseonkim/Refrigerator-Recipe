import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import TabStackRouter from "./TabStackRouter"
import ClientScreen from "../screens/ClientScreen"
import MenuButton from './MenuButton';

const Drawer = createDrawerNavigator();

const ClientStack = createStackNavigator();

const ClientStackScreen = () =>{
    return(
        <ClientStack.Navigator>
            <ClientStack.Screen 
                name="Client" 
                component={ClientScreen} 
                options={{
                    title : "회원 관리", 
                    headerLeft: () => <MenuButton />
                }}/>
        </ClientStack.Navigator>
    )
}

const CustomDrawer = ({navigation}) => {
    
    const goToScreen = (screenName, params) => {
        navigation.navigate(screenName, params);
    };

    return(
        <DrawerContentScrollView>
            <DrawerItem
                label="냉장고 관리"
                onPress={() => goToScreen('TabStack', {
                    screen : 'ManegeStack',
                    params : {
                        screen : 'Manegetab'
                    },
                }) }
            />
            <DrawerItem
                label="레시피 추천"
                onPress={() => goToScreen('TabStack',{
                    screen : 'RecipeStack',
                    params : {
                        screen : 'RecipeList'
                    },
                }) }
            />
            <DrawerItem
                label="회원 관리"
                onPress={() => goToScreen('ClientStack') }
            />
        </DrawerContentScrollView>
    )
};

export default function DrawerTabRouter() {
    return (
      <Drawer.Navigator 
          drawerContent = {({navigation}) =>(
            <CustomDrawer navigation={navigation}/>
      )}>
        <Drawer.Screen name="TabStack" component={TabStackRouter} />
        <Drawer.Screen name="ClientStack" component={ClientStackScreen} />
      </Drawer.Navigator>
    );
};