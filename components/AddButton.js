import React, {useState, useEffect, useRef, createRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import Autocomplete from 'react-native-autocomplete-input';
import {useNavigation} from '@react-navigation/core';

import {
  Platform,
  Pressable,
  TextInput,
  View,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import style from '../global/style';
import RNFS from 'react-native-fs';

Icon.loadFont();

export default function AddButton({onSlctChk, Chk}) {
  const DataSet = require('../global/DataSet');
  const memberID = require('../global/Global');
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState(null); // 이름
  const [number, setNumber] = useState(null); // 용량
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [startDate, setStartDate] = useState('-'); // 구매일자
  const [endDate, setEndDate] = useState('-'); // 유통기한
  const [divType, setDivType] = useState('empty'); // 분류방법 선택
  const [saveType, setSaveType] = useState('empty'); // 보관방법 선택
  const [MasterData, setMasterData] = useState([]); // 전체 재료 데이터
  const [filteredData, setFilteredData] = useState([]); // 재료검색 키워드에 필터링된 데이터
  const [selectedItem, setSelectedItem] = useState({});
  const [adjustZIndex, setAdjustZIndex] = useState();
  const navigation = useNavigation();

  const refRBSheet = useRef(); // BottomSheet

  const numberInputRef = createRef();

  var number_rule = /^([0-9]){1,6}$/; // id 5~25자

  var onlyKor = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
  //한글만 남기는 정규식
  const [imgTobase64, setImgTobase64] = useState(''); // imagePath -> base64 유형으로 인코딩 했을 때 결과값 저장 변수
  const [imagePath, setImagePath] = useState('../imgpath/img.jpg');
  const [ingredientData, setIngredientData] = useState(); // 개발자 재료 데이터
  const [detectionArr, setDetectionArr] = useState([]);

  useState(async () => {
    let dataObj = {
      qry: 'SELECT * FROM `developer_ingredient`',
    };
    // 쿼리 전송후 json으로 전달 받음
    let json = await DataSet.getData(dataObj);
    setIngredientData(json);
  }, []);

  // 텍스트 인식 함수
  const filterArr = async () => {
    let tmp_detectionArr = await DataSet.textDetection(imgTobase64);
    let detectionArr = tmp_detectionArr.map(ingredient =>
      ingredient.replace(onlyKor, ''),
    );
    console.log(detectionArr);
    let resultArr = [];
    let set = [];
    // 텍스트 인식 결과값을 배열로 저장하는 변수
    for (let i = 0; i < ingredientData.length; i++) {
      const found = detectionArr.find(function (element) {
        return element == ingredientData[i].d_ingredientName;
      });
      if (found != undefined) {
        resultArr.push(found);
        set = new Set(resultArr);
      }
      //console.log(found);
    }
    console.log(Array.from(set));
    console.log('여기나옴 2');
    setDetectionArr(Array.from(set));
  };

  // 라벨 인식 함수
  const labalArr = async () => {
    let tmp_detectionArr = await DataSet.labelDetection(imgTobase64);
    let tmp2_detectionArr = [];
    //console.log(tmp_detectionArr);
    for (let i = 0; i < tmp_detectionArr.length; i++) {
      tmp2_detectionArr.push({
        ingredient: tmp_detectionArr[i].description,
        prob: tmp_detectionArr[i].score,
      });
    }

    let detectionArr = await DataSet.textTranslation(tmp2_detectionArr);
    console.log(detectionArr);

    let resultArr = [];
    let set = [];
    for (let i = 0; i < ingredientData.length; i++) {
      const found = detectionArr.find(function (element) {
        return element.ingredient == ingredientData[i].d_ingredientName;
      });
      if (found != undefined) {
        resultArr.push(found);
        set = new Set(resultArr);
      }
      //console.log(found);
    }
    console.log(Array.from(set));
    setDetectionArr(Array.from(set));
  };

  // -------------------- 카메라, 갤러리에서 사진 선택해서 설정 --------------------------

  const cameraImage = () => {
    ImagePicker.openCamera({width: 85, height: 85, cropping: true})
      .then(image => {
        console.log(image.path);
        console.log('여기나옴?');
        setImagePath(image.path);
        return image.path;
      })
      .catch(e => {
        console.log(e);
      });
  };

  // -------------------- 이미지 경로 -> base64 format으로 인코딩 --------------------------
  RNFS.readFile(imagePath, 'base64').then(res => {
    setImgTobase64(res);
  });

  // --------------------- 식재료 자동완성 배열 검색 -----------------------------------

  const ingredient_find = text => {
    if (text) {
      for (let i = 0; i < MasterData.length; i++) {
        if (text === MasterData[i].d_ingredientName) {
          return MasterData[i];
        }
      }
    }
    return null;
  };

  //-------------------------- Data Insert -------------------------------------

  //onSelect
  useEffect(async () => {
    // DB 연결 전 loading 시작
    let dataObj = {
      qry: 'SELECT * FROM developer_ingredient',
    };
    let json = await DataSet.getData(dataObj);
    // json을 받아서 값이 false(값이 없음)이면 Data의 값을 빈배열을 배정
    // false가 아니면 받아온 json을 배정
    if (json !== false) {
      setMasterData(json);
    } else {
      setMasterData([]);
    }
    // DB 연결 전 loading 해제
  }, []);

  const onInsert = () => {
    // alert로 입력 제한
    if (!text) {
      alert('식재료명을 입력해주세요');
      onCancle();
      return;
    }
    if (ingredient_find(text) === null) {
      alert('리스트에 등록된 식재료만 등록 가능합니다.');
      onCancle();
      return;
    }
    if (!number) {
      alert('용량을 입력해주세요');
      onCancle();
      return;
    }
    if (!number_rule.test(number)) {
      alert('용량을 형식에 맞게 입력해주세요');
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
    if (saveType === 'empty') {
      alert('보관방법을 선택해주세요');
      onCancle();
      return;
    }
    if (divType === 'empty') {
      alert('분류방법을 선택해주세요');
      onCancle();
      return;
    }

    let dataObj = {
      qry:
        'INSERT INTO ' +
        memberID.userID +
        ' (ingredient_name, ingredient_vol, ingredient_vol_unit,  ingredient_buyDate, ingredient_expiryDate, ingredient_type, ingredient_divtype, ingredient_delChecked) VALUES ("' +
        text +
        '", "' +
        number +
        '", "' +
        selectedItem.d_ingredientUnit +
        '", "' +
        startDate +
        '", "' +
        endDate +
        '", "' +
        saveType +
        '", "' +
        divType +
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
    setSaveType('empty');
    setDivType('empty');
    filterData('');
    setSelectedItem({});
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

  //------------------ 식재료 검색 키워드로 필터링 하는 함수 ----------------------------

  const filterData = text => {
    if (text) {
      //Making the Search as Case Insensitive.
      const regex = new RegExp(`${text.trim()}`, 'i');
      const newData = MasterData.filter(function (data) {
        return data.d_ingredientName.search(regex) >= 0;
      });
      if (Array.isArray(newData) && newData.length === 0) {
        setAdjustZIndex(0);
      } else {
        setAdjustZIndex(1);
      }
      setFilteredData(newData);
      setText(text);
    } else {
      setAdjustZIndex(0);
      setFilteredData([]);
      setText(text);
    }
  };

  function isEmptyObj(obj) {
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  }

  //---------------------- UI 부분 ---------------------------------------------

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}>
      <Icon
        name={
          Platform.OS === 'ios' ? 'ios-add-circle-sharp' : 'md-add-circle-sharp'
        }
        style={style.headerIcon_AddButton}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              margin: 50,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 10,
              justifyContent: 'center',
              shadowColor: '#000',
              height: 220,
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#f5f5f5' : 'white',
                },
                {
                  margin: 5,
                  borderRadius: 20,
                  padding: 10,
                  marginHorizontal: 20,
                  borderWidth: 3,
                  height: 50,
                  justifyContent: 'center',
                  borderColor: 'salmon',
                },
              ]}
              onPress={async () => {
                setModalVisible(!modalVisible);
                cameraImage();
                filterArr();
                navigation.navigate('CameraResult', {
                  detectionArr: detectionArr,
                });
              }}>
              <Text
                style={{
                  color: 'salmon',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 15,
                }}>
                영수증 인식
              </Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#ffa07a' : 'salmon',
                },
                {
                  margin: 5,
                  borderRadius: 20,
                  marginHorizontal: 20,
                  padding: 10,
                  height: 50,
                  justifyContent: 'center',
                },
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
                cameraImage();
                labalArr();
                navigation.navigate('CameraResult', {
                  detectionArr: detectionArr,
                });
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 15,
                }}>
                이미지 인식
              </Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#f5f5f5' : 'white',
                },
                {
                  margin: 5,
                  borderRadius: 20,
                  padding: 10,
                  marginHorizontal: 20,
                  borderWidth: 3,
                  height: 50,
                  justifyContent: 'center',
                  borderColor: 'salmon',
                },
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
                refRBSheet.current.open();
                setStartDate(new Date().toISOString().split('T')[0]);
              }}>
              <Text
                style={{
                  color: 'salmon',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 15,
                }}>
                사용자 추가
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', width: '70%'}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={[
                    style.textView_RefrigeratorScreen,
                    {flexDirection: 'row', width: '30%'},
                  ]}>
                  <Text style={style.text_RefrigeratorScreen}>식재료명</Text>
                </View>
                <View
                  style={{
                    width: '68%',
                  }}>
                  <Autocomplete
                    style={{
                      fontSize: 17,
                      fontWeight: 'bold',
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    data={filteredData}
                    containerStyle={{
                      backgroundColor: 'white',
                      flex: 1,
                      paddingLeft: 8,
                      position: 'absolute',
                      width: '100%',
                      zIndex: adjustZIndex,
                    }}
                    autoCorrect={false}
                    inputContainerStyle={{
                      backgroundColor: 'white',
                      borderColor: 'white',
                      borderBottomWidth: 1,
                      borderBottomColor: '#eee',
                      width: '100%',
                    }}
                    listContainerStyle={{
                      height: 93,
                      padding: 1,
                      width: '100%',
                      opacity: 1,
                      flex: 1,
                      backgroundColor: 'white',
                    }}
                    defaultValue={
                      JSON.stringify(selectedItem) === '{}'
                        ? ''
                        : selectedItem.d_ingredientName
                    }
                    onChangeText={query => {
                      filterData(query);
                      var tmp = ingredient_find(query);
                      if (tmp !== null) {
                        setSelectedItem(tmp);
                      }
                    }}
                    placeholder="입력해주세요"
                    hideResults={ingredient_find(text) !== null ? true : false}
                    flatListProps={{
                      keyExtractor: (item, index) => index.toString(),
                      renderItem: ({item}) => (
                        <TouchableOpacity
                          style={{
                            backgroundColor: 'white',
                            width: '100%',
                            height: 30,
                            justifyContent: 'center',
                            borderBottomColor: '#eee',
                            borderBottomWidth: 1,
                          }}
                          onPress={() => {
                            setSelectedItem(item);
                            setText(item.d_ingredientName);
                            setFilteredData([]);
                            setAdjustZIndex(0);
                          }}>
                          <Text style={style.text_RefrigeratorScreen}>
                            {item.d_ingredientName}
                          </Text>
                        </TouchableOpacity>
                      ),
                    }}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={[
                    style.textView_RefrigeratorScreen,
                    {flexDirection: 'row', width: '30%'},
                  ]}>
                  <Text style={style.text_RefrigeratorScreen}>
                    용량{' '}
                    {!isEmptyObj(selectedItem) &&
                      '(' + selectedItem.d_ingredientUnit + ')'}
                  </Text>
                </View>
                <View
                  style={{
                    width: '66%',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '100%',
                    }}>
                    <TextInput
                      style={[
                        style.text_RefrigeratorScreen,
                        style.input_AddButton,
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
            </View>
          </View>
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
                <Text style={[style.text_RefrigeratorScreen]}>{startDate}</Text>
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
                    saveType === 'empty' ? {color: 'gray'} : {color: 'black'},
                }}
                onValueChange={value => {
                  setSaveType(value);
                }}
                placeholder={{}}
                value={saveType}
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
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                style.textView_RefrigeratorScreen,
                {flexDirection: 'row', width: '20%'},
              ]}>
              <Text style={style.text_RefrigeratorScreen}>분류방법</Text>
            </View>
            <View style={{width: '60%'}}>
              <RNPickerSelect
                style={{
                  inputAndroid:
                    divType === 'empty' ? {color: 'gray'} : {color: 'black'},
                }}
                onValueChange={value => {
                  setDivType(value);
                }}
                placeholder={{}}
                value={divType}
                items={[
                  {
                    label: '분류방법 선택',
                    value: 'empty',
                    inputLabel: '분류방법 선택',
                  },
                  {label: '곡류', value: 'cereals', inputLabel: '곡류'},
                  {label: '어육류', value: 'meat', inputLabel: '어육류'},
                  {label: '채소류', value: 'vegetables', inputLabel: '채소류'},
                  {
                    label: '유지 및 당류',
                    value: 'oilfat',
                    inputLabel: '유지 및 당류',
                  },
                  {label: '유제품류', value: 'milk', inputLabel: '유제품류'},
                  {label: '과일류', value: 'fruit', inputLabel: '과일류'},
                ]}></RNPickerSelect>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#ffa07a' : 'salmon',
                },
                style.button_RefrigeratorScreen,
              ]}
              onPress={() => {
                refRBSheet.current.close();
                // 추가 버튼을 눌려서 onInsert() 함수 실행
                onInsert();
              }}>
              <Text style={style.textStyle_RefrigeratorScreen}>추가</Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#ffa07a' : 'salmon',
                },
                style.button_RefrigeratorScreen,
              ]}
              onPress={() => {
                refRBSheet.current.close();
                onCancle();
              }}>
              <Text style={style.textStyle_RefrigeratorScreen}>취소</Text>
            </Pressable>
          </View>
        </View>
      </RBSheet>
    </TouchableOpacity>
  );

  //----------------------------------------------------------------------------
}
