import React from 'react';
import {Pressable, TextInput, View, Text, Button, Modal, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image, ScrollView, Alert, Confirm} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';

class List1 extends React.Component{
    constructor(props){
        super(props);
        this.state={
          modalVisible : false,
          text : null,
          number : null,
          date : '2021-01-01',
          datas1: [
                {name:"두부", message1:"25g", message2: "2021-06-05", img: require('C:/Users/ehgus/Refrigerator/imageSrc/1.jpg')},
                {name:"오이", message1:"10g", message2: "2021-06-10",img: require('C:/Users/ehgus/Refrigerator/imageSrc/2.jpg')},
                {name:"당근1", message1:"20g", message2: "2021-06-03",img: require('C:/Users/ehgus/Refrigerator/imageSrc/3.jpg')},
                {name:"당근2", message1:"20g", message2: "2021-06-03",img: require('C:/Users/ehgus/Refrigerator/imageSrc/3.jpg')},
                {name:"당근3", message1:"20g", message2: "2021-06-03",img: require('C:/Users/ehgus/Refrigerator/imageSrc/3.jpg')},
                {name:"당근4", message1:"20g", message2: "2021-06-03",img: require('C:/Users/ehgus/Refrigerator/imageSrc/3.jpg')},
          ],
          datas2: [
                {name:"생선", message1:"25g", message2: "2021-06-05", img: require('C:/Users/ehgus/Refrigerator/imageSrc/1.jpg')},
                {name:"감자", message1:"10g", message2: "2021-06-10",img: require('C:/Users/ehgus/Refrigerator/imageSrc/2.jpg')},
                {name:"쌀", message1:"20g", message2: "2021-06-03",img: require('C:/Users/ehgus/Refrigerator/imageSrc/3.jpg')},
                {name:"고구마", message1:"20g", message2: "2021-06-03",img: require('C:/Users/ehgus/Refrigerator/imageSrc/3.jpg')},
          ],
        };
    }

    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    onChangeName = (_text) =>{
      this.setState({text : _text})
    }

    onChangeWeight = (_number) =>{
      this.setState({number : _number})
    }
    onSetDate = (_date) => {
      this.setState({date : _date})
    }
    render(){
        return(  
          <>
            <View style={style.flatlist1}>
                <FlatList 
                    data={this.state.datas1}
                    renderItem={this.renderItem}
                    keyExtractor={ item=> item.name }>
                </FlatList>
             </View>
             <View style={style.flatlist2}>  
                <View style={{flexDirection:'row', borderBottomWidth: 1, borderRadius: 0, borderColor: "#ccc",}}>
                  <Icon name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'} style={style.menuIcon}/>
                  <Text style={style.addtext}>add</Text>
                </View>
                <FlatList 
                    data={this.state.datas2}
                    renderItem={this.renderItem}
                    keyExtractor={ item=> item.name }>
                </FlatList>
            </View>
          </>
        );
    }
    renderItem=({item})=>{
        return(
            <TouchableOpacity style={style.itemView} onPress={() => {
                  this.setModalVisible(true);
                  this.onChangeName(item.name);
                  this.onChangeWeight(item.message1);
                  this.onSetDate(item.message2)
                }}>
                <Image source={item.img} style={style.itemImg}></Image>
                <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={style.itemName}>{item.name}</Text>
                      <Text style={style.itemMsg}>{item.message1}</Text>
                    </View>
                      <Text style={style.itemMsg}>{item.message2}</Text>
                </View>

                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                   this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <View style={style.testContatiner}></View>
                  <View style={style.container}>
                    <View style={style.modalView}>
                      <View style={{flex : 5,}}>
                        <View style={{flexDirection : "column"}}>
                          <Text>식재료명 : </Text>
                          <TextInput
                            style={style.input}
                            onChangeText={this.onChangeName}
                            value={this.state.text}
                            placeholder = "입력해주세요"
                          />
                        </View>
                        <View style={{flexDirection : "column"}}>
                          <Text>용량 : </Text>
                          <TextInput 
                            style={style.input}
                            onChangeText={this.onChangeWeight}
                            value={this.state.number}
                            placeholder="입력해주세요"
                          />
                        </View>
                        <View style={{flexDirection : "column"}}>
                          <Text>유통기한 : </Text>
                          <DatePicker
                              style={style.datePickerStyle}
                              date={this.state.date} // Initial date from state
                              mode="date" // The enum of date, datetime and time
                              placeholder="select date"
                              format="YYYY-MM-DD"
                              minDate="1990-01-01"
                              maxDate="2100-12-31"
                              onDateChange={this.onSetDate} />
                        </View>
                      </View>
                      <View style={style.PressView}>
                        <Pressable
                          style={style.button}
                          onPress={() => {
                            this.setModalVisible(!this.state.modalVisible)  
                          }}
                        >
                          <Text style={style.textStyle}>추가</Text>
                        </Pressable>
                        <Pressable
                          style={style.button}
                          onPress={() =>  this.setModalVisible(!this.state.modalVisible)}
                        >
                          <Text style={style.textStyle}>취소</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                  <View style={style.testContatiner}></View>
                </Modal>
            </TouchableOpacity>
        );
    }
}

const style= StyleSheet.create({
    //plus
    texttitle : {
      fontWeight:'bold',
    },
    testContatiner : {
      flex : 0.2,
    },
    container : {
      flex : 0.6,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: "#eee",
      borderRadius: 10,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#222",
      elevation: 3,
    },
    PressView: {
      flexDirection:'row',
      flex : 1,
    },
    button: {
        padding: 10,
        margin : 10,
        borderRadius: 10,
        backgroundColor: "tomato",
    },
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        width : 200,
    },
    // list1
    flatlist1:{
      flex:6, 
      padding:0,
    },
    addtext : {
      padding : 7,
      fontSize:20,
      fontWeight:'bold',
      //color: 'toato',
    },
    flatlist2:{
      flex:4, 
      padding:0,
    },
    itemView:{
        flexDirection:'row',
        borderWidth:0,
        borderRadius:0,
        padding:1,
        marginBottom:1,
        borderBottomWidth: 1,
        borderRadius: 0,
        borderColor: "#ccc",
    },
    itemImg:{
        width:70,
        height:70,
        padding :20,
        margin:10,
        resizeMode:'cover',
        //marginRight:20, 
    },
    itemName:{
      paddingRight : 10,
        fontSize:18,
        fontWeight:'bold',
    },
    itemMsg:{
      height:30,
        fontSize:14,
    },
    menuIcon: {
     fontSize: 30,
      marginLeft: 15,
      marginTop: 5,
      color : 'tomato'
   },
    datePickerStyle: {
        width: 150,
        marginTop: 20,
        marginBottom: 25,
    },
});

export default List1;