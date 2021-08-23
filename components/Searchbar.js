import React from 'react';
import {SearchBar} from 'react-native-elements';
import style from '../style';

export default class Searchbar extends React.Component {
  render() {
    return (
      <SearchBar
        inputContainerStyle={{backgroundColor: '#fff'}}
        leftIconContainerStyle={{backgroundColor: '#fff'}}
        inputStyle={{backgroundColor: '#fff'}}
        containerStyle={{
          backgroundColor: '(0, 0, 0, 1.0)',
          justifyContent: 'space-around',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          marginLeft: 10,
          marginRight: 10,
        }}
        placeholder="궁금한 레시피를 검색하세요"
        round="true"
        onChangeText={this.props.setSearch}
        value={this.props.search}
      />
    );
  }
}
