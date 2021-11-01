import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import style from '../global/style';

Icon.loadFont();

export default function Bookmark({recipeId, mark, setMark}) {
  // props로 recipeId, mark, setMark를 전달 받음
  const myBookmarkData = '1/5/17'.split('/'); // 회원 DB의 bookmark 데이터 가져오기(임의)
  const [myBookmarks, setMyBookmarks] = useState(myBookmarkData); // 회원 DB의 bookmark 데이터로 초기화
  // 배열에 받아온 recipeId를 포함하고 있는지 확인 있으면 mark를 true 없으면 false로 변경
  // 실질적으로 실행되는 곳은 TabStackRouter[RecipeStack]의 setMark()
  setMark(myBookmarks.includes(recipeId) ? true : false);

  // ------------------------- 북마크 체크 함수 ------------------------------------

  const clickBookmark = () => {
    // 기존에 선택이 안되어 있다면 bookmark 데이터에 recipeId 추가
    if (!mark) {
      myBookmarks.push(recipeId);
    } // 기존에 선택이 되어 있다면 bookmark 데이터에서 recipeId를 삭제
    else {
      myBookmarks.splice(myBookmarks.indexOf(recipeId), 1);
    }
    // mark의 boolean 변경
    // 실질적으로 실행되는 곳은 TabStackRouter[RecipeStack]의 setMark()
    setMark(!mark);

    // 회원 DB의 bookmark 데이터 업데이트
  };

  // ------------------------------ UI 부분 ---------------------------------------

  return (
    // 버튼 클릭시 clickBookmark() 실행
    <TouchableOpacity onPress={clickBookmark}>
      <Icon
        name={Platform.OS === 'ios' ? 'ios-bookmark' : 'md-bookmark'}
        style={[style.Icon_BookMark, {color: mark ? 'tomato' : 'gray'}]}
      />
    </TouchableOpacity>
  );
}
