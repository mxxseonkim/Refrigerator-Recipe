import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Demensions,
  FlatList
} from 'react-native';
import {database} from '../components/Firebase';
import IngreList from '../components/IngreList';
import StepList from '../components/StepList';
import { Dimensions } from 'react-native';

const charHeight = Dimensions.get('screen').height;
const charWidth = Dimensions.get('screen').width;

export default class Receipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
    var img;
    var name;
  }
  componentDidMount() {
    const ref = database.ref('0/');
    ref.on("value", snapshot => {
      this.setState({data: snapshot.val()});
      this.img = snapshot.val().image;
      this.name = snapshot.val().name;
      this.steps = snapshot.val().steps;
    });
  }
  render() {
    return (
      <ScrollView style={styles.container} >
        <View style={styles.view}>
          <Image source={{uri: this.img}} style={styles.img}></Image>
        </View>
        <View style={styles.view1}>
          <Text style={styles.itemName}>{this.name}</Text>
          <Text style={styles.itemDiv}>●  재료 </Text>
          <IngreList />
          <Text style={styles.itemDiv}>●  레시피 </Text>
          <StepList />
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    width: charWidth,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img:{
    width:370,
    height:200,
    resizeMode:'cover',
    marginRight:20,
    justifyContent:'center',
    alignItems:'center',
  },
  itemName:{
      fontSize:40,
      fontWeight:'bold',
      marginBottom: 25,
  },
  itemDiv: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemIngre:{
    fontSize:18,
  },
  view1:{
    flexDirection:'column',
    padding:20,
  }
});