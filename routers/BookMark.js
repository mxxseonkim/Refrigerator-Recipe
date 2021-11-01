import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Platform, Text} from 'react-native';

Icon.loadFont();

export default function Bookmark({recipeId, mark, setMark}){

  const [myBookmarkText, setMyBookmarkText] = useState('')
  const DataSet = require('../routers/DataSet');
  const memberID = require('../Global');

  useEffect(async() => {
    let get_data = {
      qry: "SELECT user_bookmark FROM member WHERE user_id='" + memberID.userID + "'",
    }
    let bookmark_Json = await DataSet.getData(get_data);
    setMyBookmarkText(bookmark_Json[0].user_bookmark ? bookmark_Json[0].user_bookmark : '');
  })

  const myBookmarkData = myBookmarkText.split('/');
  const [myBookmarks, setMyBookmarks] = useState(myBookmarkData);
  setMark(myBookmarks.includes(recipeId) ? true : false);

  const addBookmark = async(newBookmark) => {
    console.log(newBookmark);
    let update_data = {
      qry: "UPDATE member SET user_bookmark = '" + newBookmark + "' WHERE user_id = '" + memberID.userID + "'",
    }
    await DataSet.setData(update_data)
  }

  const clickBookmark = () => {
    
    if(!mark) { // 북마크 추가
      myBookmarks.push(recipeId);
      //addBookmark(myBookmarkText+'/'+recipeId)
    }
    else { // 북마크 제거
      myBookmarks.splice(myBookmarks.indexOf(recipeId), 1);
    }
    addBookmark(myBookmarkText+'/'+recipeId)
    setMark(!mark);
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