import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Platform} from 'react-native';

Icon.loadFont();

const MenuButton = () => {
  const navigation = useNavigation();
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <TouchableOpacity onPress={openMenu}>
      <Icon
        name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        style={styles.menuIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    fontSize: 30,
    marginLeft: 15,
    marginTop: 5,
    color : 'tomato'
  },
});

export default MenuButton;