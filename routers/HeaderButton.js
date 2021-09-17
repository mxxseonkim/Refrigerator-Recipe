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
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import style from '../style';

Icon.loadFont();

export default function HeaderButton({onSlctChk, Chk}) {
  const [text, setText] = useState(null);
  const [number, setNumber] = useState(null);
  const [startDate, setStartDate] = useState('2021-01-01');
  const [endDate, setEndDate] = useState('2021-01-01');
  const [saveType, setSaveType] = useState('1');
  const [saveType_value, setSaveTypeValue] = useState(null);
  const [divType, setDivType] = useState('1');
  const [divType_value, setDivTypeValue] = useState(null);
  const DataSet = require('./DataSet');
  const refRBSheet = useRef();

  const memberID = require('../Global');

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
        'INSERT INTO ' +
        memberID.userID +
        ' (f_name, f_vol, f_ref, f_last, f_type, f_checked) VALUES ("' +
        text +
        '", "' +
        number +
        '", "' +
        startDate +
        '", "' +
        endDate +
        '", "' +
        saveType +
        '", "0")',
    };
    DataSet.setData(dataObj);
    onSetText(null);
    onSetNumber(null);
    onSetStartDate('2021-01-01');
    onSetEndDate('2021-01-01');
    onSetSaveType('1');
    onSetDivType('1');
    onSlctChk(!Chk);
  };

  const onSetSaveType = _saveType => {
    var _value = null;
    if (_saveType === '1') {
      _value = 'cold';
    } else if (_saveType === '2') {
      _value = 'frozen';
    } else if (_saveType === '3') {
      _value = 'condi';
    } else if (_saveType === '4') {
      _value = 'room';
    }
    setSaveType(_saveType);
    setSaveTypeValue(_value);
  };

  const onSetDivType = _divType => {
    var _value = null;
    if (_divType === '1') {
      _value = 'grain';
    } else if (_divType === '2') {
      _value = 'meat';
    } else if (_divType === '3') {
      _value = 'vegetable';
    } else if (_divType === '4') {
      _value = 'fat';
    } else if (_divType === '5') {
      _value = 'milk';
    } else if (_divType === '6') {
      _value = 'fruit';
    }
    setDivType(_divType);
    setDivTypeValue(_value);
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
        height={420}
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
              <View style={{width: '70%'}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={[style.textView3_List1, {flexDirection: 'row'}]}>
                    <Text style={style.text_List1}>식재료명</Text>
                    <Text style={style.text1_List1}> *</Text>
                  </View>
                  <View style={{width: '70%'}}>
                    <TextInput
                      style={[style.text_List1, style.input_List1]}
                      onChangeText={onSetText}
                      value={text}
                      placeholder="입력해주세요"
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={[style.textView3_List1, {flexDirection: 'row'}]}>
                    <Text style={style.text_List1}>용량(g)</Text>
                    <Text style={style.text1_List1}> *</Text>
                  </View>
                  <View style={{width: '70%'}}>
                    <TextInput
                      style={[style.text_List1, style.input_List1]}
                      onChangeText={onSetNumber}
                      value={number}
                      placeholder="입력해주세요"
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '30%',
                  //backgroundColor: 'red'
                }}>
                <Image
                  style={style.itemImg3_List1}
                  source={{
                    uri: 'http://3.35.18.154/img/add-image.png',
                  }}></Image>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={[style.textView_List1, {flexDirection: 'row'}]}>
                <Text style={style.text_List1}>구매일자</Text>
                <Text style={style.text1_List1}> *</Text>
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
              <View style={[style.textView_List1, {flexDirection: 'row'}]}>
                <Text style={style.text_List1}>보관선택</Text>
                <Text style={style.text1_List1}> *</Text>
              </View>
              <View style={{width: '60%'}}>
                <RNPickerSelect
                  style={{inputAndroid: {color: 'black'}}}
                  onValueChange={value => {
                    if (value === 'cold') {
                      onSetSaveType('1'); // 비동기 처리 됨..
                    } else if (value === 'frozen') {
                      onSetSaveType('2');
                    } else if (value === 'condi') {
                      onSetSaveType('3');
                    } else if (value === 'room') {
                      onSetSaveType('4');
                    }
                  }}
                  placeholder={{}}
                  value={saveType_value}
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
            <View style={{flexDirection: 'row'}}>
              <View style={[style.textView_List1, {flexDirection: 'row'}]}>
                <Text style={style.text_List1}>분류선택</Text>
                <Text style={style.text1_List1}> *</Text>
              </View>
              <View style={{width: '60%'}}>
                <RNPickerSelect
                  style={{inputAndroid: {color: 'black'}}}
                  onValueChange={value => {
                    if (value === 'grain') {
                      onSetDivType('1'); // 비동기 처리 됨..
                    } else if (value === 'meat') {
                      onSetDivType('2');
                    } else if (value === 'vegetable') {
                      onSetDivType('3');
                    } else if (value === 'fat') {
                      onSetDivType('4');
                    } else if (value === 'milk') {
                      onSetDivType('4');
                    } else if (value === 'fruit') {
                      onSetDivType('4');
                    }
                  }}
                  placeholder={{}}
                  value={divType_value}
                  items={[
                    {label: '곡류', value: 'grain', inputLabel: '곡류'},
                    {label: '어육류', value: 'meat', inputLabel: '어육류'},
                    {label: '채소류', value: 'vegetable', inputLabel: '채소류'},
                    {label: '지방류', value: 'fat', inputLabel: '지방류'},
                    {label: '유제품류', value: 'milk', inputLabel: '유제품류'},
                    {label: '과일류', value: 'fruit', inputLabel: '과일류'},
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
