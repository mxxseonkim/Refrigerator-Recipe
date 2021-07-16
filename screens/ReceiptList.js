import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import {database} from '../components/Firebase';
import style from '../style';

export default class ReceiptList extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    const ref = database.ref();

    ref.on('value', snapshot => {
      this.setState({data: snapshot.val()});
    });
  }

  render() {
    return (
      <View style={style.root_ReceiptList}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtract={item => item.id}
        />
      </View>
    );
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={style.itemView_ReceiptList}
        onPress={() => {
          this.props.navigation.navigate('recipet');
        }}>
        <Image
          source={{uri: item.image}}
          style={style.itemImg_ReceiptList}></Image>
        <View style={{flexDirection: 'column'}}>
          <Text style={style.itemName_ReceiptList}>{item.name}</Text>
          <Text style={style.itemMsg_ReceiptList}>★ 3.5</Text>
        </View>
        <View style={style.itemLike_ReceiptList}>
          <Text>찜</Text>
        </View>
      </TouchableOpacity>
    );
  };
}
