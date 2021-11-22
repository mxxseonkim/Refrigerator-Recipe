import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import style from '../global/style';

Icon.loadFont();

export default function BookmarkInfo({mark, setMark}) {
  return (
    <TouchableOpacity onPress={setMark}>
      <Icon
        name={Platform.OS === 'ios' ? 'ios-bookmark' : 'md-bookmark'}
        style={[style.Icon_BookMark, {color: mark ? 'salmon' : 'gray'}]}
      />
    </TouchableOpacity>
  );
}
