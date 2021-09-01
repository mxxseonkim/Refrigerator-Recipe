import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Platform} from 'react-native';

Icon.loadFont();

export default function Bookmark() {
  const [mark, setMark] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setMark(!mark);
      }}>
      <Icon
        name={Platform.OS === 'ios' ? 'ios-bookmark' : 'md-bookmark'}
        style={{
          fontSize: 30,
          marginRight: 15,
          marginTop: 5,
          color: mark ? 'tomato' : 'gray',
        }}
      />
    </TouchableOpacity>
  );
}
