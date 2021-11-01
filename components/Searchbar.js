import React from 'react';
import {SearchBar} from 'react-native-elements';
import style from '../global/style';

export default function Searchbar(props) {
  //---------------------------- UI 부분 ----------------------------------------
  return (
    <SearchBar
      inputContainerStyle={{backgroundColor: '#fff'}}
      leftIconContainerStyle={{backgroundColor: '#fff'}}
      inputStyle={{backgroundColor: '#fff'}}
      containerStyle={style.searchbar_Searchbar}
      // 부모에게서 ph, filterData(), search props로 부여받음
      placeholder={props.ph}
      round="true"
      //입력된 text 부모 컴포넌트에서 filterData() 실행
      onChangeText={text => props.filterData(text)}
      value={props.search}
    />
  );
}
