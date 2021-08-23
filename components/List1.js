import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from 'react-native-check-box';
import {
  ActivityIndicator,
  Pressable,
  TextInput,
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import style from '../style';

export default function List1({count, Chk, Chk1, onDeltChk, onSlctChk}) {
  var [data, onSetData] = useState([]);
  var [isLodaing, setIsLoding] = useState(true);
  var [modalVisible, setModalVisible] = useState(false);
  var [text, setText] = useState(null);
  var [number, setNumber] = useState(null);
  var [date, setDate] = useState('2021-01-01');
  var [type, setType] = useState(null);
  var [type_value, setTypeValue] = useState(null);
  var [no, setNO] = useState(null);

  useEffect(() => {
    getData();
  }, [Chk, Chk1]);
  //

  const onUpdate = () => {
    let dataObj = {
      qry:
        'UPDATE test SET f_ref = "' +
        date +
        '", f_vol ="' +
        number +
        '", f_type =' +
        type +
        ' WHERE no =' +
        no,
    };
    setData(dataObj);
    onSlctChk(!Chk);
  };

  const onDelete = () => {
    let dataObj = {
      qry: 'DELETE FROM test WHERE no IN ("',
    };
    var checkArr = [];
    for (var i = 0, j = 0; i < data.length; i++) {
      if (data[i].f_checked === '1') {
        checkArr[j] = data[i].no;
        j++;
      }
    }
    for (var i = 0; i < checkArr.length; i++) {
      dataObj.qry += checkArr[i];
      if (i === checkArr.length - 1) {
        dataObj.qry += '")';
      } else {
        dataObj.qry += '", "';
      }
    }
    console.log(checkArr);
    console.log(dataObj.qry);
    if (checkArr !== []) {
      setData(dataObj);
    }
  };

  const setData = async dataObj => {
    console.log(dataObj.qry);
    return fetch(`http://3.35.18.154/phpdir/ref_set.php`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataObj),
    }).catch(error => {
      console.error(error);
    });
  };

  const getData = async () => {
    let dataObj = {
      qry: "SELECT * FROM test WHERE f_type = '" + count + "'",
    };
    console.log(dataObj.qry);
    return fetch('http://3.35.18.154/phpdir/ref_get.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataObj),
    })
      .then(response => response.json())
      .then(Json => {
        if (Json !== 'false') {
          onSetData(Json);
        } else {
          onSetData([]);
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  const onSetNo = _no => {
    setNO(_no);
  };

  const onSetNumber = _number => {
    setNumber(_number);
  };

  const onSetDate = _date => {
    setDate(_date);
  };

  const checkThisBox = _no => {
    var _data = data.map(element => {
      var _element = element;
      if (_element.no === _no) {
        if (_element.f_checked === '1') {
          _element.f_checked = '0';
        } else {
          _element.f_checked = '1';
        }
      }
      return _element;
    });
    onSetData(_data);
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
  };

  const renderItem = ({item}) => {
    return (
      <View>
        {Chk1 ? (
          <View style={style.itemView_List1}>
            <CheckBox
              style={style.checkBox_List1}
              onClick={() => checkThisBox(item.no)}
              isChecked={item.f_checked === '0' ? false : true}
            />
            <View style={{flexDirection: 'row'}}>
              <Image style={style.itemImg_List1}></Image>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={style.itemName_List1}>{item.f_name}</Text>
                  <Text style={style.itemMsg_List1}>{item.f_vol}g</Text>
                </View>
                <Text style={style.itemMsg_List1}>{item.f_last}</Text>
              </View>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={style.itemView_List1}
            onPress={() => {
              setModalVisible(true);
              setText(item.f_name);
              onSetNumber(item.f_vol);
              onSetDate(item.f_ref);
              onSetType(item.f_type);
              onSetNo(item.no);
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image style={style.itemImg_List1}></Image>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={style.itemName_List1}>{item.f_name}</Text>
                  <Text style={style.itemMsg_List1}>{item.f_vol}g</Text>
                </View>
                <Text style={style.itemMsg_List1}>{item.f_last}</Text>
              </View>
            </View>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={style.testContatiner_List1}></View>
              <View style={style.container_List1}>
                <View style={style.modalView_List1}>
                  <View style={{flex: 5}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text>식재료명 : </Text>
                      <Text style={style.text_List1}>{text}</Text>
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
                      <Text>유통기한 : </Text>
                      <DatePicker
                        style={style.datePickerStyle_List}
                        date={date} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="1990-01-01"
                        maxDate="2100-12-31"
                        onDateChange={onSetDate}
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
                          {
                            label: '조미료',
                            value: 'condi',
                            inputLabel: '조미료',
                          },
                          {label: '실온', value: 'room', inputLabel: '실온'},
                        ]}></RNPickerSelect>
                    </View>
                  </View>
                  <View style={style.PressView_List1}>
                    <Pressable
                      style={style.button_List1}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        //console.log(text);
                        //console.log(number);
                        //console.log(date);
                        //console.log(type);
                        //console.log(no);
                        onUpdate();
                      }}>
                      <Text style={style.textStyle_List1}>변경</Text>
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
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {isLodaing ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            justifyContent: 'space-around',
          }}>
          <ActivityIndicator size="large" color="tomato" />
        </View>
      ) : (
        <View style={style.flatlist_List1}>
          <FlatList
            data={data}
            keyExtractor={item => item.no}
            renderItem={renderItem}
          />
          {Chk1 && (
            <TouchableOpacity
              style={style.button_List1}
              onPress={() => {
                onDelete();
                onDeltChk(!Chk1);
              }}>
              <Text style={style.textStyle_List1}>제거</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
