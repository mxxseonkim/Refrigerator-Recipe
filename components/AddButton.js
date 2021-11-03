import React, {useState, useRef, createRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import Autocomplete from 'react-native-autocomplete-input';

import {
  Platform,
  Pressable,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import style from '../global/style';

Icon.loadFont();

export default function AddButton({onSlctChk, Chk}) {
  const DataSet = require('../global/DataSet');
  const memberID = require('../global/Global');
  const [text, setText] = useState(null); // 이름
  const [number, setNumber] = useState(null); // 용량
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [startDate, setStartDate] = useState('-'); // 구매일자
  const [endDate, setEndDate] = useState('-'); // 유통기한
  const [saveType, setSaveType] = useState('0'); // 보관방법 선택
  const [saveType_value, setSaveTypeValue] = useState(null); //보관방법 선택_문자
  const [imgButton, setImgButton] = useState(false);
  const [imgPath, setImgPath] = useState(
    'http://54.180.126.3/img/add-image.png',
  );
  const [MasterData, setMasterData] = useState([
    {id: '1', name: 'Paris', country: 'FR', continent: 'Europe'},
    {id: '2', name: 'Pattanduru', country: 'PA', continent: 'South America'},
    {id: '3', name: 'Para', country: 'PA', continent: 'South America'},
    {id: '4', name: 'London', country: 'UK', continent: 'Europe'},
    {id: '5', name: 'New York', country: 'US', continent: 'North America'},
    {id: '6', name: 'Berlin', country: 'DE', continent: 'Europe'},
  ]); // 전체 재료 데이터
  const [filteredData, setFilteredData] = useState(); // 재료검색 키워드에 필터링된 데이터
  const [selectedItem, setselectedItem] = useState({});

  const refRBSheet = useRef(); // BottomSheet

  const textInputRef = createRef();
  const numberInputRef = createRef();

  var text_rule = /^([ㄱ-힣a-zA-Z]){1,10}$/; // text 1~10자
  var number_rule = /^([0-9]){1,6}$/; // id 5~25자

  // -------------------- 카메라, 갤러리에서 사진 선택해서 설정 --------------------------

  const pickImage = () => {
    ImagePicker.openPicker({width: 85, height: 85, cropping: true}).then(
      image => {
        setImgPath(image.path);
      },
    );
  };

  const cameraImage = () => {
    ImagePicker.openCamera({width: 85, height: 85, cropping: true}).then(
      image => {
        setImgPath(image.path);
      },
    );
  };

  //-------------------------- Data Insert -------------------------------------

  const onInsert = () => {
    // alert로 입력 제한
    if (!text) {
      alert('식재료명을 입력해주세요');
      onCancle();
      return;
    }
    if (!text_rule.test(text)) {
      alert('식재료명을 형식에 맞게 입력해주세요');
      onCancle();
      return;
    }
    if (!number) {
      alert('용량(g)을 입력해주세요');
      onCancle();
      return;
    }
    if (!number_rule.test(number)) {
      alert('용량(g)을 형식에 맞게 입력해주세요');
      onCancle();
      return;
    }
    if (startDate === '-') {
      alert('구매일자를 입력해주세요');
      onCancle();
      return;
    }
    if (endDate === '-') {
      alert('유통기한을 입력해주세요');
      onCancle();
      return;
    }
    if (
      endDate.replace('-', '').replace('-', '') <
      startDate.replace('-', '').replace('-', '')
    ) {
      alert('유통기한이 구매일자보다 빠릅니다.');
      onCancle();
      return;
    }
    if (saveType === '0') {
      alert('보관방법을 선택해주세요');
      onCancle();
      return;
    }

    let dataObj = {
      qry:
        'INSERT INTO ' +
        memberID.userID +
        ' (ingredient_name, ingredient_vol, ingredient_buyDate, ingredient_expiryDate, ingredient_type, ingredient_imgPath, ingredient_delChecked) VALUES ("' +
        text +
        '", "' +
        number +
        '", "' +
        startDate +
        '", "' +
        endDate +
        '", "' +
        saveType +
        '", "' +
        imgPath +
        '", "0")',
    };

    // DB 전송
    DataSet.setData(dataObj);
    // 변수 값 초기화
    onCancle();
    // insert 이후 RefrigeratorScreen의 onSelect(useEffect)를 실행하기 위해 onSlctChk(!Chk) => State 끌어올리기
    // 실질적으로 실행되는 곳은 TabStackRouter[ManageStack]의 onSlctChk함수
    onSlctChk(!Chk);
  };

  const onCancle = () => {
    // 변수 값들 초기화 함수
    onSetText(null);
    onSetNumber(null);
    onSetStartDate('-');
    onSetEndDate('-');
    onSetSaveType('0');
    setImgPath('http://54.180.126.3/img/add-image.png');
  };

  //---------------------- UI 값 변경 함수 -------------------------------------

  // 이름 변수 변경
  const onSetText = _text => {
    setText(_text);
  };

  // 용량 변수 변경
  const onSetNumber = _number => {
    setNumber(_number);
  };

  // 구매일자 변수 변경
  const onSetStartDate = _date => {
    setStartDate(_date);
  };

  // 유통기한 변수 변경
  const onSetEndDate = _date => {
    setEndDate(_date);
  };

  // 보관방법 선택 + 문자열 변수 변경
  const onSetSaveType = _saveType => {
    var _value = null;
    if (_saveType === '0') {
      _value = 'empty';
    } else if (_saveType === '1') {
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

  //------------------ 식재료 검색 키워드로 필터링 하는 함수 ----------------------------

  const filterData = text => {
    if (text) {
      //Making the Search as Case Insensitive.
      const regex = new RegExp(`${text.trim()}`, 'i');
      const newData = MasterData.filter(function (data) {
        return data.name.search(regex) >= 0;
      });
      console.log(MasterData);
      console.log(newData);

      //setFilteredData(newData);
      //console.log(filteredData);
      setText(text);
    } else {
      setFilteredData([]);
      setText(text);
    }
  };

  //---------------------- UI 부분 ---------------------------------------------

  return (
    <TouchableOpacity
      onPress={() => {
        refRBSheet.current.open();
        setImgButton(false);
      }}>
      <Icon
        name={
          Platform.OS === 'ios' ? 'ios-add-circle-sharp' : 'md-add-circle-sharp'
        }
        style={style.headerIcon_AddButton}
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
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '70%'}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={[
                      style.textView_RefrigeratorScreen,
                      {flexDirection: 'row', width: '30%'},
                    ]}>
                    <Text style={style.text_RefrigeratorScreen}>식재료명</Text>
                  </View>
                  <View style={{width: '70%'}}>
                    <TextInput
                      style={[
                        style.text_RefrigeratorScreen,
                        style.input_RefrigeratorScreen,
                      ]}
                      onChangeText={onSetText}
                      value={text}
                      ref={textInputRef}
                      onSubmitEditing={() =>
                        numberInputRef.current && numberInputRef.current.focus()
                      }
                      placeholder="입력해주세요"
                    />
                    {/* <Autocomplete
                      autoCapitalize="none"
                      autoCorrect={false}
                      data={filteredData}
                      keyExtractor={({item}) => item.id.toString()}
                      containerStyle={{
                        flex: 1,
                        left: 0,
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        zIndex: 1,
                        borderWidth: 0,
                      }}
                      onChangeText={query => filterData(query)}
                      defaultValue={text}
                      placeholder="입력해주세요"
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={() => {
                            setselectedItem(item);
                            setFilteredData([]);
                          }}>
                          <Text style={style.text_RefrigeratorScreen}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      )}
                    /> */}
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={[
                      style.textView_RefrigeratorScreen,
                      {flexDirection: 'row', width: '30%'},
                    ]}>
                    <Text style={style.text_RefrigeratorScreen}>용량(g)</Text>
                  </View>
                  <View style={{width: '70%'}}>
                    <TextInput
                      style={[
                        style.text_RefrigeratorScreen,
                        style.input_RefrigeratorScreen,
                      ]}
                      onChangeText={onSetNumber}
                      value={number}
                      keyboardType="number-pad"
                      ref={numberInputRef}
                      placeholder="입력해주세요"
                    />
                  </View>
                </View>
              </View>
              <View style={{width: '30%'}}>
                <TouchableOpacity onPress={() => setImgButton(!imgButton)}>
                  <Image
                    style={
                      imgPath === 'http://54.180.126.3/img/add-image.png'
                        ? style.itemImg2_RefrigeratorScreen
                        : [
                            style.itemImg2_RefrigeratorScreen,
                            {borderColor: 'black'},
                          ]
                    }
                    source={{
                      uri: imgPath,
                    }}></Image>
                </TouchableOpacity>
              </View>
            </View>
            {imgButton && (
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Pressable
                  style={[
                    style.button_RefrigeratorScreen,
                    {backgroundColor: 'salmon'},
                  ]}
                  onPress={() => {
                    cameraImage();
                    setImgButton(!imgButton);
                  }}>
                  <Text style={style.textStyle_RefrigeratorScreen}>카메라</Text>
                </Pressable>
                <Pressable
                  style={[
                    style.button_RefrigeratorScreen,
                    {backgroundColor: 'salmon'},
                  ]}
                  onPress={() => {
                    pickImage();
                    setImgButton(!imgButton);
                  }}>
                  <Text style={style.textStyle_RefrigeratorScreen}>갤러리</Text>
                </Pressable>
              </View>
            )}
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  style.textView_RefrigeratorScreen,
                  {flexDirection: 'row', width: '20%'},
                ]}>
                <Text style={style.text_RefrigeratorScreen}>구매일자</Text>
              </View>
              <View style={{width: '80%', flexDirection: 'row'}}>
                <View
                  style={[{width: '55%'}, style.textView3_RefrigeratorScreen]}>
                  <Text style={[style.text_RefrigeratorScreen]}>
                    {startDate}
                  </Text>
                </View>
                <View style={{width: '45%'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setDatePickerVisibility1(true);
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
                    isVisible={isDatePickerVisible1}
                    mode="date"
                    onConfirm={date => {
                      setStartDate(date.toISOString().split('T')[0]);
                      setDatePickerVisibility1(false);
                    }}
                    onCancel={() => {
                      setDatePickerVisibility1(false);
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={[style.textView_RefrigeratorScreen, {width: '20%'}]}>
                <Text style={style.text_RefrigeratorScreen}>유통기한</Text>
              </View>
              <View style={{width: '80%', flexDirection: 'row'}}>
                <View
                  style={[{width: '55%'}, style.textView3_RefrigeratorScreen]}>
                  <Text style={[style.text_RefrigeratorScreen]}>{endDate}</Text>
                </View>
                <View style={{width: '45%'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setDatePickerVisibility2(true);
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
                    isVisible={isDatePickerVisible2}
                    mode="date"
                    onConfirm={date => {
                      setEndDate(date.toISOString().split('T')[0]);
                      setDatePickerVisibility2(false);
                    }}
                    onCancel={() => {
                      setDatePickerVisibility2(false);
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  style.textView_RefrigeratorScreen,
                  {flexDirection: 'row', width: '20%'},
                ]}>
                <Text style={style.text_RefrigeratorScreen}>보관방법</Text>
              </View>
              <View style={{width: '60%'}}>
                <RNPickerSelect
                  style={{
                    inputAndroid:
                      saveType === '0' ? {color: 'gray'} : {color: 'black'},
                  }}
                  onValueChange={value => {
                    if (value === 'empty') {
                      onSetSaveType('0');
                    } else if (value === 'cold') {
                      onSetSaveType('1');
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
                    {
                      label: '보관방법 선택',
                      value: 'empty',
                      inputLabel: '보관방법 선택',
                    },
                    {label: '냉장', value: 'cold', inputLabel: '냉장'},
                    {label: '냉동', value: 'frozen', inputLabel: '냉동'},
                    {label: '조미료', value: 'condi', inputLabel: '조미료'},
                    {label: '실온', value: 'room', inputLabel: '실온'},
                  ]}></RNPickerSelect>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Pressable
                style={style.button_RefrigeratorScreen}
                onPress={() => {
                  refRBSheet.current.close();
                  // 추가 버튼을 눌려서 onInsert() 함수 실행
                  onInsert();
                }}>
                <Text style={style.textStyle_RefrigeratorScreen}>추가</Text>
              </Pressable>
              <Pressable
                style={style.button_RefrigeratorScreen}
                onPress={() => {
                  refRBSheet.current.close();
                  onCancle();
                }}>
                <Text style={style.textStyle_RefrigeratorScreen}>취소</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </RBSheet>
    </TouchableOpacity>
  );

  //----------------------------------------------------------------------------
}
