import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import style from '../global/style';

Icon.loadFont();

export default function Bookmark({recipeId, mark, setMark}) {
  const DataSet = require('../global/DataSet');
  const memberID = require('../global/Global');

  const [myBookmarkText, setMyBookmarkText] = useState('');
  const [myBookmarkList, setMyBookmarkList] = useState([]);

  useEffect(async () => {
    let get_data = {
      qry:
        "SELECT user_bookmark FROM member WHERE user_id='" +
        memberID.userID +
        "'",
    };
    let bookmark_json = await DataSet.getData(get_data);
    setMyBookmarkText(
      bookmark_json[0].user_bookmark ? bookmark_json[0].user_bookmark : '',
    );
  }, []);

  useEffect(() => {
    setMyBookmarkList(myBookmarkText.split('/').filter(e => e));
  }, [myBookmarkText]);

  useEffect(() => {
    setMark(myBookmarkList.includes(recipeId) ? true : false);
  }, [myBookmarkList]);

  const updateBookmark = async newBookmarkText => {
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
    mark
      ? // 기존에 선택이 되어 있다면 bookmark 데이터에서 recipeId를 삭제
        myBookmarkList.splice(myBookmarkList.indexOf(recipeId), 1)
      : // 기존에 선택이 안되어 있다면 bookmark 데이터에 recipeId 추가
        myBookmarkList.push(recipeId);
    console.log(myBookmarkList);
    // 회원 DB의 bookmark 데이터 업데이트
    updateBookmark(myBookmarkList.join('/'));
    // mark의 boolean 변경
    // 실질적으로 실행되는 곳은 TabStackRouter[RecipeStack]의 setMark()
    setMark(!mark);
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
