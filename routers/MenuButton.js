import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Platform} from 'react-native';
import style from '../style';

Icon.loadFont();

export default function MenuButton() {
  const navigation = useNavigation();
  const openMenu = () => {
    navigation.openDrawer();
  };
  
  return (
    <TouchableOpacity onPress={openMenu}>
      <Icon
        name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        style={style.menuIcon_MenuButton}
      />
    </TouchableOpacity>
  );
};