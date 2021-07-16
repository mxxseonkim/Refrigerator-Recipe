import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Demensions,
  FlatList,
} from 'react-native';
import {database} from '../components/Firebase';
import IngreList from '../components/IngreList';
import StepList from '../components/StepList';
import {Dimensions} from 'react-native';
import style from '../style';

const charHeight = Dimensions.get('screen').height;
const charWidth = Dimensions.get('screen').width;

export default class Receipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    var img;
    var name;
  }
  componentDidMount() {
    const ref = database.ref('0/');
    ref.on('value', snapshot => {
      this.setState({data: snapshot.val()});
      this.img = snapshot.val().image;
      this.name = snapshot.val().name;
      this.steps = snapshot.val().steps;
    });
  }
  render() {
    return (
      <ScrollView style={style.container_Receipt}>
        <View style={[style.view_Receipt, {width: charWidth}]}>
          <Image source={{uri: this.img}} style={style.img_Receipt}></Image>
        </View>
        <View style={style.view1_Receipt}>
          <Text style={style.itemName_Receipt}>{this.name}</Text>
          <Text style={style.itemDiv_Receipt}>● 재료 </Text>
          <IngreList />
          <Text style={style.itemDiv_Receipt}>● 레시피 </Text>
          <StepList />
        </View>
      </ScrollView>
    );
  }
}
