import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Platform} from 'react-native';
import style from '../style';

let global = require('../Global');

Icon.loadFont();

export default function CheckButton({Chk1, onDeltChk}) {
  return (
    <TouchableOpacity
      onPress={() => {
        onDeltChk(!Chk1);
      }}>
      <Icon
        name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
        style={style.CheckIcon_CheckButton}
      />
    </TouchableOpacity>
  );
}
