import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import RBSheet from 'react-native-raw-bottom-sheet';
//import ImagePicker from 'react-native-image-crop-picker';

import {
  Platform,
  Pressable,
  TextInput,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import style from '../style';

Icon.loadFont();

export default function HeaderButton({onSlctChk, Chk}) {
  var [text, setText] = useState(null);
  var [number, setNumber] = useState(null);
  var [startDate, setStartDate] = useState('2021-01-01');
  var [endDate, setEndDate] = useState('2021-01-01');
  var [type, setType] = useState('1');
  var [type_value, setTypeValue] = useState(null);
  const DataSet = require('./DataSet');
  const refRBSheet = useRef();

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
    DataSet.setData(dataObj);
    onSetText(null);
    onSetNumber(null);
    onSetStartDate('2021-01-01');
    onSetEndDate('2021-01-01');
    onSetType('1');
    onSlctChk(!Chk);
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
        refRBSheet.current.open();
      }}>
      <Icon
        name={
          Platform.OS === 'ios' ? 'ios-add-circle-sharp' : 'md-add-circle-sharp'
        }
        style={style.headerIcon_HeaderButton}
      />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={360}
        keyboardAvoidingViewEnabled={false}
        dragFromTopOnly={true}
        animationType={'slide'}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          container: {
            justifyContent: 'space-around',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <ScrollView>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <View style={style.textView_List1}>
                <Text style={style.text_List1}>식재료명</Text>
              </View>
              <View style={{width: '80%'}}>
                <TextInput
                  style={[style.text_List1, style.input_List1]}
                  onChangeText={onSetText}
                  value={text}
                  placeholder="입력해주세요"
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={style.textView_List1}>
                <Text style={style.text_List1}>용량(g)</Text>
              </View>
              <View style={{width: '80%'}}>
                <TextInput
                  style={[style.text_List1, style.input_List1]}
                  onChangeText={onSetNumber}
                  value={number}
                  placeholder="입력해주세요"
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={style.textView_List1}>
                <Text style={style.text_List1}>구매일자</Text>
              </View>
              <View style={{width: '80%'}}>
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
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={style.textView_List1}>
                <Text style={style.text_List1}>유통기한</Text>
              </View>
              <View style={{width: '80%'}}>
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
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={style.textView_List1}>
                <Text style={style.text_List1}>분류선택</Text>
              </View>
              <View style={{width: '60%'}}>
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
                    {
                      label: '냉동',
                      value: 'frozen',
                      inputLabel: '냉동',
                    },
                    {
                      label: '조미료',
                      value: 'condi',
                      inputLabel: '조미료',
                    },
                    {label: '실온', value: 'room', inputLabel: '실온'},
                  ]}></RNPickerSelect>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Pressable
                style={style.button_List1}
                onPress={() => {
                  refRBSheet.current.close();
                  onInsert();
                }}>
                <Text style={style.textStyle_List1}>추가</Text>
              </Pressable>
              <Pressable
                style={style.button_List1}
                onPress={() => refRBSheet.current.close()}>
                <Text style={style.textStyle_List1}>취소</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </RBSheet>
    </TouchableOpacity>
  );
}
