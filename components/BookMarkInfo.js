import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import style from '../global/style';

Icon.loadFont();

export default function BookmarkInfo({recipeId, mark, setMark, bookmarkList, setBookmarkList}) {
  const DataSet = require('../global/DataSet');
  const memberID = require('../global/Global');
  
  useEffect(() => {
    setMark(bookmarkList.includes(recipeId));
  }, [bookmarkList]);

  // ------------------------- 북마크 DB 업데이트 함수 ------------------------------------

  const updateBookmark = async (newBookmarkText) => {
    let update_data = {
      qry:
        "UPDATE member SET user_bookmark = '" +
        newBookmarkText +
        "' WHERE user_id = '" +
        memberID.userID +
        "'",
    };
    await DataSet.setData(update_data);
  };

  // ------------------------- 북마크 체크 함수 ------------------------------------

  const clickBookmark = () => {
    var b = [...bookmarkList];
    mark ?
    // 기존에 선택이 되어 있다면 bookmark 데이터에서 recipeId를 삭제
    b.splice(b.indexOf(recipeId), 1) :
    // 기존에 선택이 안되어 있다면 bookmark 데이터에 recipeId 추가
    b.push(recipeId);

    // 회원 DB의 bookmark 데이터 업데이트
    updateBookmark(b.join('/'));
    setBookmarkList(b);
    setMark(b.includes(recipeId));
  };

  // ------------------------------ UI 부분 ---------------------------------------

  return (
    // 버튼 클릭시 clickBookmark() 실행
    <TouchableOpacity onPress={clickBookmark}>
      <Icon
        name={Platform.OS === 'ios' ? 'ios-bookmark' : 'md-bookmark'}
        style={[style.Icon_BookMark, {color: mark ? 'salmon' : 'gray'}]}
      />
    </TouchableOpacity>
  );
}
