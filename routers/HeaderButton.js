import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import {
  Platform,
  Pressable,
  TextInput,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import style from '../style';

Icon.loadFont();

export default function HeaderButton({onSlctChk, Chk}) {
  var [modalVisible, setModalVisible] = useState(false);
  var [text, setText] = useState(null);
  var [number, setNumber] = useState(null);
  var [startDate, setStartDate] = useState('2021-01-01');
  var [endDate, setEndDate] = useState('2021-01-01');
  var [type, setType] = useState('1');
  var [type_value, setTypeValue] = useState(null);

  const onSetText = _text => {
    setText(_text);
    //console.log(text);
  };

  const onSetNumber = _number => {
    setNumber(_number);
    //console.log(number);
  };

  const onSetStartDate = _date => {
    setStartDate(_date);
    //console.log(startDate);
  };

  const onSetEndDate = _date => {
    setEndDate(_date);
    //console.log(EndDate);
  };

  const onInsert = () => {
    setData();
    onSlctChk(!Chk);
  };

  const setData = async () => {
    let dataObj = {
      qry:
        'INSERT INTO test (f_name, f_vol, f_ref, f_last, f_type) VALUES ("' +
        text +
        '", "' +
        number +
        '", "' +
        startDate +
        '", "' +
        endDate +
        '", "' +
        type +
        '")',
    };
    console.log(dataObj.qry);
    return fetch(`http://3.35.18.154/phpdir/ref_set.php`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataObj),
    }).catch(error => {
      console.error(error);
    });
  };

  const onSetType = _type => {
    var _value = null;
    if (_type === '1') {
      _value = 'cold';
    } else if (_type === '2') {
      _value = 'frozen';
    } else if (_type === '3') {
      _value = 'condi';
    } else if (_type === '4') {
      _value = 'room';
    }
    setType(_type);
    setTypeValue(_value);
    //console.log(type);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}>
      <Icon
        name={
          Platform.OS === 'ios' ? 'ios-add-circle-sharp' : 'md-add-circle-sharp'
        }
        style={style.headerIcon_HeaderButton}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={style.testContatiner_HeaderButton}></View>
        <View style={style.container_HeaderButton}>
          <View style={style.modalView_List1}>
            <View style={{flex: 5}}>
              <View style={{flexDirection: 'column'}}>
                <Text>식재료명 : </Text>
                <TextInput
                  style={style.input_List1}
                  onChangeText={onSetText}
                  value={text}
                  placeholder="입력해주세요"
                />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text>용량 : </Text>
                <TextInput
                  style={style.input_List1}
                  onChangeText={onSetNumber}
                  value={number}
                  placeholder="입력해주세요"
                />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text>구매일자 : </Text>
                <DatePicker
                  style={style.datePickerStyle_List}
                  date={startDate} // Initial date from state
                  mode="date" // The enum of date, datetime and time
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="1990-01-01"
                  maxDate="2100-12-31"
                  onDateChange={onSetStartDate}
                />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text>유통기한 : </Text>
                <DatePicker
                  style={style.datePickerStyle_List}
                  date={endDate} // Initial date from state
                  mode="date" // The enum of date, datetime and time
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="1990-01-01"
                  maxDate="2100-12-31"
                  onDateChange={onSetEndDate}
                />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text>분류 선택 : </Text>
                <RNPickerSelect
                  style={{inputAndroid: {color: 'black'}}}
                  onValueChange={value => {
                    if (value === 'cold') {
                      onSetType('1'); // 비동기 처리 됨..
                    } else if (value === 'frozen') {
                      onSetType('2');
                    } else if (value === 'condi') {
                      onSetType('3');
                    } else if (value === 'room') {
                      onSetType('4');
                    }
                  }}
                  placeholder={{}}
                  value={type_value}
                  items={[
                    {label: '냉장', value: 'cold', inputLabel: '냉장'},
                    {label: '냉동', value: 'frozen', inputLabel: '냉동'},
                    {label: '조미료', value: 'condi', inputLabel: '조미료'},
                    {label: '실온', value: 'room', inputLabel: '실온'},
                  ]}></RNPickerSelect>
              </View>
            </View>
            <View style={style.PressView_List1}>
              <Pressable
                style={style.button_List1}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  console.log(text);
                  console.log(number);
                  console.log(startDate);
                  console.log(endDate);
                  console.log(type);
                  onInsert();
                }}>
                <Text style={style.textStyle_List1}>추가</Text>
              </Pressable>
              <Pressable
                style={style.button_List1}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={style.textStyle_List1}>취소</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={style.testContatiner}></View>
      </Modal>
    </TouchableOpacity>
  );
}
