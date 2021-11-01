import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import style from '../global/style';

Icon.loadFont();

export default function MenuButton() {
  // ----------------------- Drawer Open 함수 -----------------------------------
  // useNavigation으로 navigate 객체에 대한 액세스를 허용 / props 컴포넌트 직접 전달할 수 없을 때 사용
  const navigation = useNavigation();
  const openMenu = () => {
    navigation.openDrawer();
  };

  //---------------------------- UI 부분 ----------------------------------------
  return (
    <TouchableOpacity onPress={openMenu}>
      <Icon
        name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        style={style.menuIcon_MenuButton}
      />
    </TouchableOpacity>
  );
}
