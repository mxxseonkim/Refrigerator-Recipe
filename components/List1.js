import React, {Component} from 'react';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import {
  ActivityIndicator,
  Pressable,
  TextInput,
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Alert,
  Confirm,
} from 'react-native';
import style from '../style';

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      modalVisible: false,
      text: null,
      number: null,
      date: '2021-01-01',
      type: null,
      type_value: null,
    };
  }

  componentDidMount() {
    return fetch('http://192.168.0.70/recipe_db/recipe_db.php') //본인의 IP로 변경
      .then(response => response.json())
      .then(Json => {
        this.setState({
          data: Json,
        });
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  onChangeName = _text => {
    this.setState({text: _text});
  };

  onChangeWeight = _number => {
    this.setState({number: _number});
  };
  onSetDate = _date => {
    this.setState({date: _date});
  };

  onSetType = _type => {
    var _value = null;
    if (_type === '1') {
      _value = 'cold';
    } else if (_type === '2') {
      _value = 'frozen';
    } else if (_type === '3') {
      _value = 'room';
    } else if (_type === '4') {
      _value = 'condi';
    }
    this.setState({type: _type});
    this.setState({type_value: _value});
  };

  render() {
    const {data, isLoading} = this.state;

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={style.flatlist_List1}>
        <FlatList
          data={data}
          keyExtractor={({id}, index) => id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={style.itemView_List1}
        onPress={() => {
          this.setModalVisible(true);
          this.onChangeName(item.f_name);
          this.onChangeWeight(item.f_vol);
          this.onSetDate(item.f_ref);
          this.onSetType(item.f_type);
        }}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.itemName_List1}>{item.f_name}</Text>
            <Text style={style.itemMsg_List1}>{item.f_vol}g</Text>
          </View>
          <Text style={style.itemMsg_List1}>{item.f_last}</Text>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={style.testContatiner_List1}></View>
          <View style={style.container_List1}>
            <View style={style.modalView_List1}>
              <View style={{flex: 5}}>
                <View style={{flexDirection: 'column'}}>
                  <Text>식재료명 : </Text>
                  <TextInput
                    style={style.input_List1}
                    onChangeText={this.onChangeName}
                    value={this.state.text}
                    placeholder="입력해주세요"
                  />
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text>용량 : </Text>
                  <TextInput
                    style={style.input_List1}
                    onChangeText={this.onChangeWeight}
                    value={this.state.number}
                    placeholder="입력해주세요"
                  />
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text>유통기한 : </Text>
                  <DatePicker
                    style={style.datePickerStyle_List}
                    date={this.state.date} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1990-01-01"
                    maxDate="2100-12-31"
                    onDateChange={this.onSetDate}
                  />
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text>분류 선택 : </Text>
                  <RNPickerSelect
                    style={{inputAndroid: {color: 'black'}}}
                    onValueChange={value => {
                      if (value === 'cold') {
                        this.onSetType('1'); // 비동기 처리 됨..
                      } else if (value === 'frozen') {
                        this.onSetType('2');
                      } else if (value === 'room') {
                        this.onSetType('3');
                      } else if (value === 'condi') {
                        this.onSetType('4');
                      }
                    }}
                    placeholder={{}}
                    value={this.state.type_value}
                    items={[
                      {label: '냉장', value: 'cold', inputLabel: '냉장'},
                      {label: '냉동', value: 'frozen', inputLabel: '냉동'},
                      {label: '실온', value: 'room', inputLabel: '실온'},
                      {label: '조미료', value: 'condi', inputLabel: '조미료'},
                    ]}></RNPickerSelect>
                </View>
              </View>
              <View style={style.PressView_List1}>
                <Pressable
                  style={style.button_List1}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={style.textStyle_List1}>추가</Text>
                </Pressable>
                <Pressable
                  style={style.button_List1}
                  onPress={() =>
                    this.setModalVisible(!this.state.modalVisible)
                  }>
                  <Text style={style.textStyle_List1}>취소</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={style.testContatiner}></View>
        </Modal>
      </TouchableOpacity>
    );
  };
}
