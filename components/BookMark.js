import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import style from '../global/style';

Icon.loadFont();

export default function Bookmark({recipeId, mark, setMark}) {
  const [myBookmarkText, setMyBookmarkText] = useState('');
  const DataSet = require('../global/DataSet');
  const memberID = require('../global/Global');

  useEffect(async () => {
    let get_data = {
      qry:
        "SELECT user_bookmark FROM member WHERE user_id='" +
        memberID.userID +
        "'",
    };
    let bookmark_Json = await DataSet.getData(get_data);
    setMyBookmarkText(
      bookmark_Json[0].user_bookmark ? bookmark_Json[0].user_bookmark : '',
    );
  }, []);

  const myBookmarkData = myBookmarkText.split('/');
  const [myBookmarks, setMyBookmarks] = useState(myBookmarkData);
  setMark(myBookmarks.includes(recipeId) ? true : false);

  const addBookmark = async newBookmark => {
    console.log(newBookmark);
    let update_data = {
      qry:
        "UPDATE member SET user_bookmark = '" +
        newBookmark +
        "' WHERE user_id = '" +
        memberID.userID +
        "'",
    };
    await DataSet.setData(update_data);
  };

  // ------------------------- 북마크 체크 함수 ------------------------------------

  const clickBookmark = () => {
    if (!mark) {
      // 기존에 선택이 안되어 있다면 bookmark 데이터에 recipeId 추가
      myBookmarks.push(recipeId);
      //addBookmark(myBookmarkText+'/'+recipeId)
    } else {
      // 기존에 선택이 되어 있다면 bookmark 데이터에서 recipeId를 삭제
      myBookmarks.splice(myBookmarks.indexOf(recipeId), 1);
    }
    // mark의 boolean 변경
    // 실질적으로 실행되는 곳은 TabStackRouter[RecipeStack]의 setMark()
    addBookmark(myBookmarkText + '/' + recipeId);
    setMark(!mark);
    // 회원 DB의 bookmark 데이터 업데이트
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
