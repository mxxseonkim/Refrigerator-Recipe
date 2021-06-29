import React from 'react';
import {SearchBar} from 'react-native-elements';

export default class Searchbar extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({search});
  };

  render() {
    const {search} = this.state;

    return (
      <SearchBar
        inputContainerStyle={{backgroundColor: '#fff'}}
        leftIconContainerStyle={{backgroundColor: '#fff'}}
        inputStyle={{backgroundColor: '#fff'}}
        containerStyle={{
          backgroundColor: '#eee',
          justifyContent: 'space-around',
          borderTopWidth:0,
          borderBottomWidth:0,
          marginLeft:10,
          marginRight:10,
        }}
        placeholder="궁금한 레시피를 검색하세요"
        round="true"
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}
