import React, {useEffect, useState, useRef} from 'react';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from 'react-native-check-box';
import Searchbar from '../components/Searchbar.js';
import RBSheet from 'react-native-raw-bottom-sheet';
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
  ScrollView,
  Alert,
} from 'react-native';
import style from '../style';

export default function List1({count, Chk, Chk1, onDeltChk, onSlctChk}) {
  const [data, onSetData] = useState([]);
  const [isLodaing, setIsLoding] = useState(true);
  const [text, setText] = useState(null);
  const [number, setNumber] = useState(null);
  const [date, setDate] = useState('2021-01-01');
  const [type, setType] = useState(null);
  const [type_value, setTypeValue] = useState(null);
  const [no, setNO] = useState(null);
  const [search, setSearch] = useState(''); // 검색 키워드
  const [filteredData, setFilteredData] = useState(); // 검색 키워드에 필터링된 데이터
  const refRBSheet = useRef();

  //-------------------Data C/R/U/D ----------------------------------------

  const DataSet = require('../routers/DataSet');
  const memberID = require('../Global');

  //onSelect
  useEffect(async () => {
    setIsLoding(true);
    let dataObj = {
      qry:
        'SELECT * FROM ' + memberID.userID + " WHERE f_type = '" + count + "'",
    };
    let json = await DataSet.getData(dataObj);
    if (json !== false) {
      onSetData(json);
      setFilteredData(json);
    } else {
      onSetData([]);
      setFilteredData([]);
    }
    //console.log(data);
    setIsLoding(false);
  }, [Chk]);

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
    DataSet.setData(dataObj);
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
      DataSet.setData(dataObj);
    }
    onSlctChk(!Chk);
  };

  //--------------------------------------------------------------------------

  //------------------ 검색 키워드로 필터링 하는 함수 --------------------------
  const filterData = text => {
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.f_name
          ? item.f_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(data);
      setSearch(text);
    }
  };

  //--------------------------------------------------------------------------

  //---------------------- UI 값 변경 함수 -------------------------------------

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

  //--------------------------------------------------------------------------

  //---------------------- UI 부분 --------------------------------------------

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
              <Image
                style={style.itemImg_List1}
                source={{uri: 'http://3.35.18.154/img/eggfry.jpg'}}></Image>
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
              refRBSheet.current.open();
              setText(item.f_name);
              onSetNumber(item.f_vol);
              onSetDate(item.f_ref);
              onSetType(item.f_type);
              onSetNo(item.no);
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={style.itemImg_List1}
                source={{uri: 'http://3.35.18.154/img/eggfry.jpg'}}></Image>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={style.itemName_List1}>{item.f_name}</Text>
                  <Text style={style.itemMsg_List1}>{item.f_vol}g</Text>
                </View>
                <Text style={style.itemMsg_List1}>{item.f_last}</Text>
              </View>
            </View>

            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              height={300}
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
                    <View style={style.textView2_List1}>
                      <Text style={style.text_List1}>{text}</Text>
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
                      <Text style={style.text_List1}>유통기한</Text>
                    </View>
                    <View style={{width: '80%'}}>
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
                        onUpdate();
                      }}>
                      <Text style={style.textStyle_List1}>변경</Text>
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
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Searchbar
        search={search}
        setSearch={setSearch}
        filterData={filterData}
        ph="궁금한 재료를 검색해보셈"
      />
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
            data={filteredData}
            keyExtractor={item => item.no}
            renderItem={renderItem}
          />
          {Chk1 && (
            <TouchableOpacity
              style={style.button2_List1}
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

//--------------------------------------------------------------------------
