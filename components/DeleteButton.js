import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import style from '../global/style';

Icon.loadFont();

export default function DeleteButton({Chk1, onDeltChk}) {
  //--------------------------- UI 부분 ---------------------------------------
  return (
    <TouchableOpacity
      onPress={() => {
        // Chk1, onDeltChk() props로 받아와서 버튼 터치 하여 onDeltChk(!Chk1); -> State 끌어올리기
        // 실질적으로 실행되는 곳은 TabStackRouter[ManageStack]의 onDeltChk(!Chk1);
        onDeltChk(!Chk1);
      }}>
      <Icon
        name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
        style={style.CheckIcon_CheckButton}
      />
    </TouchableOpacity>
  );
}
