import React from 'react';
import {SearchBar} from 'react-native-elements';
import style from '../global/style';

export default function Searchbar(props) {
  //---------------------------- UI 부분 ----------------------------------------
  return (
    <SearchBar
      inputContainerStyle={{backgroundColor: '#f5f5f5'}}
      leftIconContainerStyle={{backgroundColor: '#f5f5f5'}}
      inputStyle={{backgroundColor: '#f5f5f5'}}
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
