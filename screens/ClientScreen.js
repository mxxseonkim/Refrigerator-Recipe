import React from 'react';
import {
  View,
  Button,
  TextInput,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import style from '../style';

export default function ClientScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>회원관리</Text>
    </View>
  );
}
