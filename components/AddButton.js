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
// import RNFS from 'react-native-fs';

Icon.loadFont();

export default function AddButton({onSlctChk, Chk}) {
  const DataSet = require('../global/DataSet');
  const memberID = require('../global/Global');
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState(null); // ?���?
  const [number, setNumber] = useState(null); // ?��?��
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [startDate, setStartDate] = useState('-'); // 구매?��?��
  const [endDate, setEndDate] = useState('-'); // ?��?��기한
  const [divType, setDivType] = useState('empty'); // 분류방법 ?��?��
  const [saveType, setSaveType] = useState('empty'); // 보�??방법 ?��?��
  const [MasterData, setMasterData] = useState([]); // ?���? ?���? ?��?��?��
  const [filteredData, setFilteredData] = useState([]); // ?��료�???�� ?��?��?��?�� ?��?��링된 ?��?��?��
  const [selectedItem, setSelectedItem] = useState({});
  const [adjustZIndex, setAdjustZIndex] = useState();
  const navigation = useNavigation();

  const refRBSheet = useRef(); // BottomSheet

  const numberInputRef = createRef();

  var number_rule = /^([0-9]){1,6}$/; // id 5~25?��

  var onlyKor= /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
  //?���?�? ?��기는 ?��규식
  const [imgTobase64, setImgTobase64] = useState(''); // imagePath -> base64 ?��?��?���? ?��코딩 ?��?�� ?�� 결과�? ????�� �??��
  const [imagePath, setImagePath] = useState('../imgpath/receipt3.jpeg');
  const [ingredientData, setIngredientData] = useState(); // 개발?�� ?���? ?��?��?��

  useState(async () => {
    let dataObj = {
      qry: 'SELECT * FROM `developer_ingredient`',
    };
    // 쿼리 ?��?��?�� json?���? ?��?�� 받음
    let json = await DataSet.getData(dataObj);
    setIngredientData(json);
  }, []);

  // ?��?��?�� ?��?�� ?��?��
  const filterArr = async () => {
    let tmp_detectionArr = await DataSet.textDetection(imgTobase64);
    let detectionArr = tmp_detectionArr.map((ingredient) => ingredient.replace(onlyKor, ''));
    let resultArr = [];
    let set = [];
    // ?��?��?�� ?��?�� 결과값을 배열�? ????��?��?�� �??��
    for(let i = 0; i<ingredientData.length; i++){
      const found = detectionArr.find(function (element) {
        return element == ingredientData[i].d_ingredientName
      });
      if (found != undefined) {
        resultArr.push(found);
        set = new Set(resultArr);
      }
    }
    return Array.from(set);
  }

  // ?���? ?��?�� ?��?��
  const labalArr = async () => {
    let tmp_detectionArr = await DataSet.labelDetection(imgTobase64);
    let tmp2_detectionArr = [];
    for(let i = 0 ; i<tmp_detectionArr.length;i++){
      tmp2_detectionArr.push({ingredient: tmp_detectionArr[i].description, prob: tmp_detectionArr[i].score});
    }

    let detectionArr = await DataSet.textTranslation(tmp2_detectionArr);

    let resultArr = [];
    let set = [];
    for(let i = 0; i<ingredientData.length; i++){
      const found = detectionArr.find(function (element) {
        return element.ingredient == ingredientData[i].d_ingredientName
      });
      if (found != undefined) {
        resultArr.push(found);
        set = new Set(resultArr);
      }
    }
    return Array.from(set);
  }

  // -------------------- 카메?��, 갤러리에?�� ?���? ?��?��?��?�� ?��?�� --------------------------

  const cameraImage = async () => {
    ImagePicker.openCamera({width: 85, height: 85, cropping: true})
      .then(image => {
        console.log(image.path);
      })
      .catch(e => {
        console.log(e);
      });
      return result;
  };

  // -------------------- ?��미�?? 경로 -> base64 format?���? ?��코딩 --------------------------
  // RNFS.readFile(imagePath, 'base64')
  // .then(res =>{
  //   setImgTobase64(res);
  // });

  // --------------------- ?��?���? ?��?��?��?�� 배열 �??�� -----------------------------------

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
    // DB ?���? ?�� loading ?��?��
    let dataObj = {
      qry: 'SELECT * FROM developer_ingredient',
    };
    let json = await DataSet.getData(dataObj);
    // json?�� 받아?�� 값이 false(값이 ?��?��)?���? Data?�� 값을 빈배?��?�� 배정
    // false�? ?��?���? 받아?�� json?�� 배정
    if (json !== false) {
      setMasterData(json);
    } else {
      setMasterData([]);
    }
    // DB ?���? ?�� loading ?��?��
  }, []);

  const onInsert = () => {
    // alert�? ?��?�� ?��?��
    if (!text) {
      alert('?��?��료명?�� ?��?��?��주세?��');
      onCancle();
      return;
    }
    if (ingredient_find(text) === null) {
      alert('리스?��?�� ?��록된 ?��?��료만 ?���? �??��?��?��?��.');
      onCancle();
      return;
    }
    if (!number) {
      alert('?��?��?�� ?��?��?��주세?��');
      onCancle();
      return;
    }
    if (!number_rule.test(number)) {
      alert('?��?��?�� ?��?��?�� 맞게 ?��?��?��주세?��');
      onCancle();
      return;
    }
    if (startDate === '-') {
      alert('구매?��?���? ?��?��?��주세?��');
      onCancle();
      return;
    }
    if (endDate === '-') {
      alert('?��?��기한?�� ?��?��?��주세?��');
      onCancle();
      return;
    }
    if (
      endDate.replace('-', '').replace('-', '') <
      startDate.replace('-', '').replace('-', '')
    ) {
      alert('?��?��기한?�� 구매?��?��보다 빠릅?��?��.');
      onCancle();
      return;
    }
    if (saveType === 'empty') {
      alert('보�??방법?�� ?��?��?��주세?��');
      onCancle();
      return;
    }
    if (divType === 'empty') {
      alert('분류방법?�� ?��?��?��주세?��');
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

    // DB ?��?��
    DataSet.setData(dataObj);
    // �??�� �? 초기?��
    onCancle();
    // insert ?��?�� RefrigeratorScreen?�� onSelect(useEffect)�? ?��?��?���? ?��?�� onSlctChk(!Chk) => State ?��?��?��리기
    // ?��질적?���? ?��?��?��?�� 곳�?? TabStackRouter[ManageStack]?�� onSlctChk?��?��
    onSlctChk(!Chk);
  };

  const onCancle = () => {
    // �??�� 값들 초기?�� ?��?��
    onSetText(null);
    onSetNumber(null);
    onSetStartDate('-');
    onSetEndDate('-');
    setSaveType('empty');
    setDivType('empty');
    filterData('');
    setSelectedItem({});
  };

  //---------------------- UI �? �?�? ?��?�� -------------------------------------

  // ?���? �??�� �?�?
  const onSetText = _text => {
    setText(_text);
  };

  // ?��?�� �??�� �?�?
  const onSetNumber = _number => {
    setNumber(_number);
  };

  // 구매?��?�� �??�� �?�?
  const onSetStartDate = _date => {
    setStartDate(_date);
  };

  // ?��?��기한 �??�� �?�?
  const onSetEndDate = _date => {
    setEndDate(_date);
  };

  //------------------ ?��?���? �??�� ?��?��?���? ?��?���? ?��?�� ?��?�� ----------------------------

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

  //---------------------- UI �?�? ---------------------------------------------

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
                //cameraImage();
                let result = await filterArr();
                navigation.navigate('CameraResult', {detectionArr:result});
              }}>
              <Text
                style={{
                  color: 'salmon',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 15,
                }}>
                ?��?���? ?��?��
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
              onPress={async () => {
                setModalVisible(!modalVisible);
                //cameraImage();
                let tmpResult = await labalArr();
                let result = [];
                for(let i=0;i<tmpResult.length;i++){
                  if(tmpResult[i].prob>=0.3) result.push(tmpResult[i].ingredient);
                }
                console.log(result);
                navigation.navigate('CameraResult', {detectionArr:result});
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 15,
                }}>
                ?��미�?? ?��?��
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
                ?��?��?�� 추�??
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
                  <Text style={style.text_RefrigeratorScreen}>?��?��료명</Text>
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
                    placeholder="?��?��?��주세?��"
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
                    ?��?��{' '}
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
                      placeholder="?��?��?��주세?��"
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
              <Text style={style.text_RefrigeratorScreen}>구매?��?��</Text>
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
              <Text style={style.text_RefrigeratorScreen}>?��?��기한</Text>
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
              <Text style={style.text_RefrigeratorScreen}>보�??방법</Text>
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
                    label: '보�??방법 ?��?��',
                    value: 'empty',
                    inputLabel: '보�??방법 ?��?��',
                  },
                  {label: '?��?��', value: 'cold', inputLabel: '?��?��'},
                  {label: '?��?��', value: 'frozen', inputLabel: '?��?��'},
                  {label: '조�?�료', value: 'condi', inputLabel: '조�?�료'},
                  {label: '?��?��', value: 'room', inputLabel: '?��?��'},
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
                    label: '분류방법 ?��?��',
                    value: 'empty',
                    inputLabel: '분류방법 ?��?��',
                  },
                  {label: '곡류', value: 'cereals', inputLabel: '곡류'},
                  {label: '?��?���?', value: 'meat', inputLabel: '?��?���?'},
                  {label: '채소�?', value: 'vegetables', inputLabel: '채소�?'},
                  {
                    label: '?���? �? ?���?',
                    value: 'oilfat',
                    inputLabel: '?���? �? ?���?',
                  },
                  {label: '?��?��?���?', value: 'milk', inputLabel: '?��?��?���?'},
                  {label: '과일�?', value: 'fruit', inputLabel: '과일�?'},
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
                // 추�?? 버튼?�� ?��?��?�� onInsert() ?��?�� ?��?��
                onInsert();
              }}>
              <Text style={style.textStyle_RefrigeratorScreen}>추�??</Text>
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
