import React, {useEffect, useState, useRef} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/Ionicons';
import Searchbar from '../components/Searchbar.js';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Slider} from '@miblanchard/react-native-slider';

import {
  ActivityIndicator,
  Pressable,
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import style from '../global/style';
import {it} from 'jest-circus';

export default function RefrigeratorScreen({
  propsType,
  Chk,
  Chk1,
  onDeltChk,
  onSlctChk,
}) {
  // 부모의 props propsType, Chk, Chk1, onDeltChk, onSlctChk 전달 받음
  const [data, onSetData] = useState([]); // Database에서 받은 Data
  const [isLodaing, setIsLoding] = useState(true); // Database loding
  const [text, setText] = useState(null); // 이름
  const [number, setNumber] = useState(null); // 용량
  const [numberUnit, setNumberUnit] = useState(null); // 용량_단위
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('2021-01-01'); // 유통기한
  const [saveType, setSaveType] = useState(null); // 보관선택
  const [no, setNO] = useState(null); // 고유번호
  const [search, setSearch] = useState(''); // 검색 키워드
  const [filteredData, setFilteredData] = useState(); // 검색 키워드에 필터링된 데이터
  const [divImg, setDivImg] = useState('');
  const refRBSheet = useRef(); // BottomSheet

  //-------------------Data Select/Update/Delete ----------------------------------------

  const DataSet = require('../global/DataSet');
  const memberID = require('../global/Global');

  //onSelect
  useEffect(async () => {
    // DB 연결 전 loading 시작
    setIsLoding(true);
    let dataObj = {
      qry:
        'SELECT * FROM ' +
        memberID.userID +
        " WHERE ingredient_type = '" +
        propsType +
        "'",
    };
    let json = await DataSet.getData(dataObj);
    // json을 받아서 값이 false(값이 없음)이면 Data의 값을 빈배열을 배정
    // false가 아니면 받아온 json을 배정
    if (json !== false) {
      onSetData(json);
      setFilteredData(json);
    } else {
      onSetData([]);
      setFilteredData([]);
    }
    // DB 연결 전 loading 해제
    setIsLoding(false);
    // Chk 값이 변경되면 onSelect(useEffect) 재실행
  }, [Chk]);

  const onUpdate = () => {
    let dataObj = {
      qry:
        'UPDATE ' +
        memberID.userID +
        ' SET ingredient_expiryDate = "' +
        date +
        '", ingredient_vol = "' +
        number +
        '", ingredient_type = "' +
        saveType +
        '" WHERE no =' +
        no,
    };
    // Update 쿼리문 전송
    DataSet.setData(dataObj);
    // Update 이후 onSelect(useEffect)를 실행하기 위해 onSlctChk(!Chk) => State 끌어올리기
    // 실질적으로 실행되는 곳은 TabStackRouter[ManageStack]의 onSlctChk함수
    onSlctChk(!Chk);
  };

  const onDelete = () => {
    //앞부분 쿼리문 생성
    let dataObj = {
      qry: 'DELETE FROM ' + memberID.userID + ' WHERE no IN ("',
    };
    //배열 만들을 만든 후 체크된 데이터들의 no 배열에 추가
    var checkArr = [];
    for (var i = 0, j = 0; i < data.length; i++) {
      if (data[i].ingredient_delChecked === '1') {
        checkArr[j] = data[i].no;
        j++;
      }
    }
    // 배열에 있는 항목들을 쿼리문 += 연산자로 문자열 뒷편에 이어 붙이기
    for (var i = 0; i < checkArr.length; i++) {
      dataObj.qry += checkArr[i];
      if (i === checkArr.length - 1) {
        // 마지막 항목일 때 문자열 닫아주기("))
        dataObj.qry += '")';
      } else {
        // 마지막 항목이 아니면 문자열 (",")로 이어주기
        dataObj.qry += '", "';
      }
    }
    console.log(checkArr);
    console.log(dataObj.qry);
    // 체크된 데이터들을 모은 배열이 비어있지 않다면 DB 연결하여 데이터 처리
    if (checkArr !== []) {
      DataSet.setData(dataObj);
    }
    // Delete 이후 onSelect(useEffect)를 실행하기 위해 onSlctChk(!Chk) => State 끌어올리기
    // 실질적으로 실행되는 곳은 TabStackRouter[ManageStack]의 onSlctChk함수
    onSlctChk(!Chk);
  };

  //------------------ 검색 키워드로 필터링 하는 함수 --------------------------

  const filterData = text => {
    // 텍스트를 받아서
    if (text) {
      // 텍스트가 빈 문자열이 아니면
      // 전체 데이터에서 filter 함수를 사용하여 검색어에 따른 데이터를 선별
      const newData = data.filter(function (item) {
        // 일단 데이터의 item.name과 text(검색어)를 모두 대문자화 함
        const itemData = item.ingredient_name
          ? item.ingredient_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        //  itemData와 textData를 비교해서 -1보다 높으면 filter() 함수에 의해 선별(return) 됨 (-1이 나오면 일치하지 X)
        return itemData.indexOf(textData) > -1;
      });
      // 검색어로 필터링 된 데이터를 검색 필터링 State에 담음
      // 그리고 text를 Searchbar의 props로 보냄
      console.log(newData);
      setFilteredData(newData);
      setSearch(text);
    } else {
      // 텍스트가 빈 문자열이면 전체 데이터를 검색 필터링 State에 담음
      // 그리고 text를 Searchbar의 props로 보냄
      setFilteredData(data);
      setSearch(text);
    }
  };

  //---------------------- UI 값 변경 함수 -------------------------------------

  const onSetNo = _no => {
    setNO(_no);
  };

  const onSetNumber = _number => {
    setNumber(_number);
  };

  const onSetNumberUnit = _numberUnit => {
    setNumberUnit(_numberUnit);
  };

  const onSetDate = _date => {
    setDate(_date);
  };

  const checkThisBox = _no => {
    var _data = data.map(element => {
      var _element = element;
      if (_element.no === _no) {
        if (_element.ingredient_delChecked === '1') {
          _element.ingredient_delChecked = '0';
        } else {
          _element.ingredient_delChecked = '1';
        }
      }
      return _element;
    });
    onSetData(_data);
  };

  //---------------------- UI 부분 --------------------------------------------

  const renderItem = ({item}) => {
    let today_tmp = new Date();
    let today = new Date(
      today_tmp.getFullYear(),
      today_tmp.getMonth(),
      today_tmp.getDate(),
    );
    let expiry_tmp = item.ingredient_expiryDate;
    let expiry = new Date(
      expiry_tmp.split('-')[0],
      expiry_tmp.split('-')[1] - 1,
      expiry_tmp.split('-')[2],
    );
    const elapsedMSec1 = expiry.getTime() - today.getTime();
    const elapsedDay1 = elapsedMSec1 / 1000 / 60 / 60 / 24;
    const divPath = item.ingredient_divtype;
    let leftValue1 = 0;
    let leftValue2 = 0;
    let dotColor = '#AA9E9C';
    if (elapsedDay1 <= 0) {
      leftValue1 = -3;
      leftValue2 = -3;
      dotColor = '#AA9E9C';
    } else if (elapsedDay1 == 1) {
      leftValue1 = 28;
      leftValue2 = 31;
      dotColor = '#C29F9B';
    } else if (elapsedDay1 == 2) {
      leftValue1 = 60;
      leftValue2 = 68;
      dotColor = '#D0A6A2';
    } else if (elapsedDay1 == 3) {
      leftValue1 = 90;
      leftValue2 = 106;
      dotColor = '#D4A29D';
    } else if (elapsedDay1 == 4) {
      leftValue1 = 125;
      leftValue2 = 142;
      dotColor = '#DE9C95';
    } else if (elapsedDay1 == 5) {
      leftValue1 = 158;
      leftValue2 = 178;
      dotColor = '#E7968D';
    } else if (elapsedDay1 == 6) {
      leftValue1 = 190;
      leftValue2 = 214;
      dotColor = '#E98479';
    } else if (elapsedDay1 >= 7) {
      leftValue1 = 223;
      leftValue2 = 250;
      dotColor = '#FA8072';
    }

    //    console.log(divPath);

    return (
      <View>
        {/* Chk1이 true인지 false 인지에 따라 UI 상이 */}
        {Chk1 ? (
          <View style={style.itemView_RefrigeratorScreen}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  justifyContent: 'center',
                  //backgroundColor: 'blue',
                }}>
                <CheckBox
                  style={style.checkBox_RefrigeratorScreen}
                  onClick={() => checkThisBox(item.no)}
                  isChecked={item.ingredient_delChecked === '0' ? false : true}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '20%',
                  //backgroundColor: 'red',
                }}>
                <Image
                  style={style.itemImg_RefrigeratorScreen}
                  source={{
                    uri: 'http://54.180.126.3/img/' + divPath + '.png',
                  }}></Image>
              </View>
              <View style={style.itemTextView_RefrigeratorScreen}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={style.itemName_RefrigeratorScreen}>
                    {item.ingredient_name}
                  </Text>
                  <Text style={style.itemMsg_RefrigeratorScreen}>
                    {item.ingredient_vol}
                    {''}
                    {item.ingredient_vol_unit}
                  </Text>
                  <Text style={[style.itemDate_RefrigeratorScreen]}>
                    {item.ingredient_expiryDate}
                  </Text>
                </View>
                <View
                  style={{
                    marginRight: 65,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                  }}>
                  <Slider
                    value={elapsedDay1}
                    disabled={true}
                    minimumValue={0}
                    maximumValue={7}
                    step={1}
                    minimumTrackTintColor="#fa8072"
                    maximumTrackTintColor="#808080"
                    thumbTintColor="#fa8072"
                    thumbStyle={{width: 7, height: 7}}
                    trackStyle={{width: 0, height: 7}}
                  />
                  <View
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 15,
                      position: 'absolute',
                      backgroundColor: dotColor,
                      borderColor: dotColor,
                      borderWidth: 3,
                      zIndex: 2,
                      left: leftValue1,
                      top: 7,
                      justifyContent: 'center',
                    }}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                      {elapsedDay1}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={style.itemView_RefrigeratorScreen}
            onPress={() => {
              refRBSheet.current.open();
              setText(item.ingredient_name);
              onSetNumber(item.ingredient_vol);
              onSetDate(item.ingredient_expiryDate);
              setSaveType(item.ingredient_type);
              onSetNo(item.no);
              setDivImg(item.ingredient_divtype);
              //console.log(divImg);
              onSetNumberUnit(item.ingredient_vol_unit);
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: '25%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={style.itemImg_RefrigeratorScreen}
                    source={{
                      uri: 'http://54.180.126.3/img/' + divPath + '.png',
                    }}></Image>
                </View>
              </View>
              <View style={style.itemTextView_RefrigeratorScreen}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={style.itemName_RefrigeratorScreen}>
                    {item.ingredient_name}
                  </Text>
                  <Text style={style.itemMsg_RefrigeratorScreen}>
                    {item.ingredient_vol}
                    {''}
                    {item.ingredient_vol_unit}
                  </Text>
                  <Text style={[style.itemDate_RefrigeratorScreen]}>
                    {item.ingredient_expiryDate}
                  </Text>
                </View>
                <View
                  style={{
                    marginRight: 20,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                  }}>
                  <Slider
                    value={elapsedDay1}
                    disabled={true}
                    minimumValue={0}
                    maximumValue={7}
                    step={1}
                    minimumTrackTintColor="#fa8072"
                    maximumTrackTintColor="#808080"
                    thumbTintColor="#fa8072"
                    thumbStyle={{width: 7, height: 7}}
                    trackStyle={{width: 0, height: 7}}
                  />
                  <View
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 15,
                      position: 'absolute',
                      backgroundColor: dotColor,
                      borderColor: dotColor,
                      borderWidth: 3,
                      zIndex: 2,
                      left: leftValue2,
                      top: 7,
                      justifyContent: 'center',
                    }}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                      {elapsedDay1}
                    </Text>
                  </View>
                </View>
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
                    <View style={{width: '70%'}}>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={[
                            style.textView_RefrigeratorScreen,
                            {width: '30%'},
                          ]}>
                          <Text style={style.text_RefrigeratorScreen}>
                            식재료명
                          </Text>
                        </View>
                        <View style={style.textView2_RefrigeratorScreen}>
                          <Text style={style.text_RefrigeratorScreen}>
                            {text}
                          </Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={[
                            style.textView_RefrigeratorScreen,
                            {width: '30%'},
                          ]}>
                          <Text style={style.text_RefrigeratorScreen}>
                            용량 {'(' + numberUnit + ')'}
                          </Text>
                        </View>
                        <View style={{width: '70%'}}>
                          <TextInput
                            style={[
                              style.text_RefrigeratorScreen,
                              style.input_RefrigeratorScreen,
                            ]}
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
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={[style.itemImg2_RefrigeratorScreen]}
                        source={{
                          uri: 'http://54.180.126.3/img/' + divImg + '.png',
                        }}></Image>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={[
                        style.textView_RefrigeratorScreen,
                        {width: '20%'},
                      ]}>
                      <Text style={style.text_RefrigeratorScreen}>
                        유통기한
                      </Text>
                    </View>
                    <View style={{width: '80%', flexDirection: 'row'}}>
                      <View
                        style={[
                          {width: '55%'},
                          style.textView3_RefrigeratorScreen,
                        ]}>
                        <Text style={[style.text_RefrigeratorScreen]}>
                          {date}
                        </Text>
                      </View>
                      <View style={{width: '45%'}}>
                        <TouchableOpacity
                          onPress={() => {
                            setDatePickerVisibility(true);
                          }}>
                          <Icon
                            name={
                              Platform.OS === 'ios'
                                ? 'ios-calendar-outline'
                                : 'md-calendar-outline'
                            }
                            style={style.calendarIcon_AddButton}
                          />
                        </TouchableOpacity>
                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={date => {
                            setDate(date.toISOString().split('T')[0]);
                            setDatePickerVisibility(false);
                          }}
                          onCancel={() => {
                            setDatePickerVisibility(false);
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={[
                        style.textView_RefrigeratorScreen,
                        {width: '20%'},
                      ]}>
                      <Text style={style.text_RefrigeratorScreen}>
                        보관선택
                      </Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <RNPickerSelect
                        style={{inputAndroid: {color: 'black'}}}
                        onValueChange={value => {
                          setSaveType(value);
                        }}
                        placeholder={{}}
                        value={saveType}
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
                      style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#ffa07a' : 'salmon',
                        },
                        style.button_RefrigeratorScreen,
                      ]}
                      onPress={() => {
                        refRBSheet.current.close();
                        // 변경 버튼 누르면 onUpdate() 실행
                        onUpdate();
                      }}>
                      <Text style={style.textStyle_RefrigeratorScreen}>
                        변경
                      </Text>
                    </Pressable>
                    <Pressable
                      style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#e9967a' : 'salmon',
                        },
                        style.button_RefrigeratorScreen,
                      ]}
                      onPress={() => refRBSheet.current.close()}>
                      <Text style={style.textStyle_RefrigeratorScreen}>
                        취소
                      </Text>
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* SearchBar에 props 전달 */}
      <Searchbar
        search={search}
        setSearch={setSearch}
        filterData={filterData}
        ph="궁금한 재료를 검색해보셈"
      />
      {/* isLoding이 true이면 ActivityIndicator화면을 띄움 */}
      {isLodaing ? (
        <View style={style.ActivityIndicatorView_RefrigeratorScreen}>
          <ActivityIndicator size="large" color="salmon" />
        </View>
      ) : (
        <View style={style.flatlist_RefrigeratorScreen}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={filteredData}
            keyExtractor={item => item.no}
            renderItem={renderItem}
          />
          {/* Chk1 true이면 아래에 제거 버튼을 띄움 */}
          {Chk1 && (
            <TouchableOpacity
              style={style.button2_RefrigeratorScreen}
              onPress={() => {
                // 제거 버튼을 터치시 onDelete() 실행
                onDelete();
                // onDeltChk(!Chk1)을 실행하여 props인 Chk1의 값을 !Chk1으로 변경 ; -> State 끌어올리기
                // 실질적으로 실행되는 곳은 TabStackRouter[ManageStack]의 onDeltChk(!Chk1)
                onDeltChk(!Chk1);
              }}>
              <Text style={style.textStyle_RefrigeratorScreen}>제거</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

//--------------------------------------------------------------------------
