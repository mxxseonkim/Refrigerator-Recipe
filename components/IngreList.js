import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import {database} from './Firebase.js';
import style from '../style';

export default class IngreList extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    var ingredients;
  }

  componentDidMount() {
    const ref = database.ref('0/' + '/ingredient');

    ref.on('value', snapshot => {
      this.setState({data: snapshot.val()});
      this.ingredients = snapshot.val();
    });
  }

  render() {
    return (
      <View style={style.root_IngreList}>
        <FlatList
          data={this.ingredients}
          renderItem={({item}) => (
            <View style={style.item_IngreList}>
              <Text style={style.font_IngreList}>{item}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}
