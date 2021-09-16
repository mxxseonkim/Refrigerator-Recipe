import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Platform, Text} from 'react-native';

Icon.loadFont();

export default function Bookmark({recipeId, mark, setMark}){

  const myBookmarkData = '1/5/17'.split('/'); // 회원 DB의 bookmark 데이터 가져오기
  const [myBookmarks, setMyBookmarks] = useState(myBookmarkData);
  setMark(myBookmarks.includes(recipeId) ? true : false);

  const clickBookmark = () => {
    if(!mark) { myBookmarks.push(recipeId); }
    else { myBookmarks.splice(myBookmarks.indexOf(recipeId), 1); }
    setMark(!mark);
    // 회원 DB의 bookmark 데이터 업데이트
  }

  return (
    <TouchableOpacity onPress={clickBookmark}>
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
