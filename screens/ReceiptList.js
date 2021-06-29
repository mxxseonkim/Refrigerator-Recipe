import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import {database} from '../components/Firebase';

export default class ReceiptList extends Component {

  constructor(props) {
    super(props);
    this.state = {data:[]};
  }

  componentDidMount() {
    const ref = database.ref();
    
    ref.on("value", snapshot => {
      this.setState({data: snapshot.val()});
    });
  }

  render() {
    return (
      <View style={styles.root}>
        <FlatList
          data = {this.state.data}
          renderItem={this.renderItem}
          keyExtract={item=>item.id}
        />
      </View>
    );
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.itemView} onPress={()=> {this.props.navigation.navigate('recipet')}}>
        <Image source={{uri: item.image}} style={styles.itemImg}></Image>
        <View style={{flexDirection:'column'}}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemMsg}>★ 3.5</Text>
        </View>
        <View style={styles.itemLike}>
          <Text>찜</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    padding:16,
    alignItems : 'center',
    justifyContent : 'center'
  },
  titleText:{
    fontSize:24,
    fontWeight:'bold',
    paddingBottom:16,
  },
  itemView:{
    flexDirection:'row',
    borderWidth:0,
    borderRadius:4,
    padding:8,
    marginBottom:12,
  },
  itemImg:{
    width:90,
    height:90,
    resizeMode:'cover',
    marginRight:20,
  },
  itemName:{
    width:220,
    height:30,
    fontSize:16,
    fontWeight:'bold',
  },
  itemMsg:{
    width:220,
    height:60,
    fontSize:14,
  },
  itemLike:{
    textAlign:'center',
    width:30,
    height:90,
    fontSize:14,
    justifyContent:'center',
    alignItems:'center',
  }
});