import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import {database} from './Firebase.js';


export default class IngreList extends Component {

  constructor(props) {
    super(props);
    this.state = {data:[]};
    var ingredients;
  }

  componentDidMount() {    
    const ref = database.ref('0/'+'/ingredient');
    
    ref.on("value", snapshot => {
      this.setState({data: snapshot.val()});
      this.ingredients = snapshot.val();
    });
  }

  render() {
    return (
      <View style={styles.root}>
        <FlatList
          data = {this.ingredients}
          renderItem={({item})=>
            <View style={styles.item}>
              <Text style={styles.font}>{item}</Text>
            </View>
          }
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  root:{
    flex:1,
    padding: 16,
  },
  item:{
    flex:1,
    padding:5,
  },
  font:{
    fontSize:16,
    paddingBottom:3,
  },
});