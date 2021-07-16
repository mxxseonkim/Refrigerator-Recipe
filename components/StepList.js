import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import {database} from './Firebase.js';
import style from '../style';

export default class StepList extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    var steps;
  }

  componentDidMount() {
    const ref = database.ref('0/' + '/step');

    ref.on('value', snapshot => {
      this.setState({data: snapshot.val()});
      this.steps = snapshot.val();
    });
  }

  render() {
    return (
      <View style={style.root_StepList}>
        <FlatList
          data={this.steps}
          renderItem={({item, index}) => (
            <View style={style.item_StepList}>
              <Text style={style.font_StepList}>
                {index + 1}. {item}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}
