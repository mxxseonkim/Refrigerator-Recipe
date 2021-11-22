import React, {useState, useEffect, useRef, createRef} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import style from '../global/style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useNavigation} from '@react-navigation/core';
import Autocomplete from 'react-native-autocomplete-input';

//import Icon from 'react-native-vector-icons/Ionicons';
export default function CameraResultScreen({route}) {
  const detectionResult = route.params.detectionArr;
  const [data, setData] = useState([]);
  const tmpData = [];
  const [adjustZIndex, setAdjustZIndex] = useState();
  const [maxAryNum, setMaxAryNum] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [MasterData, setMasterData] = useState([]);
  const navigation = useNavigation();

  // 영수증으로 인식된 텍스트로 data 초기화
  useState(async () => {
    for (let i = 0; i < detectionResult.length; i++) {
      tmpData.push({
        no: i,
        name: detectionResult[i],
        number: '',
        startDate: '-',
        endDate: '-',
        saveType: 'empty',
        divType: 'empty',
      });
    }
    setData(tmpData);
  });

  // maxAryNum 초기화
  useEffect(() => {
    setMaxAryNum(data.length);
  }, []);

  //식재료 데이터 불러오기
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

  function isEmptyObj(obj) {
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  }

  const onSetStartDate = (_date, no) => {
    setData(
      data.map(item => (item.no === no ? {...item, startDate: _date} : item)),
    );
  };

  const onSetEndDate = (_date, no) => {
    setData(
      data.map(item => (item.no === no ? {...item, endDate: _date} : item)),
    );
  };

  const onSetSaveType = (_type, no) => {
    setData(
      data.map(item => (item.no === no ? {...item, saveType: _type} : item)),
    );
  };

  const onSetDivType = (_type, no) => {
    setData(
      data.map(item => (item.no === no ? {...item, divType: _type} : item)),
    );
  };
  const onSetNumber = (_number, no) => {
    setData(
      data.map(item => (item.no === no ? {...item, number: _number} : item)),
    );
  };

  // AddBox 삭제
  const onDelete = no => {
    setData(data.filter(element => element.no !== no));
  };

  const onInsert = () => {
    // // for (let i = 0; i < data.length; i++) {
    // //   if (!text) {
    // //     alert('식재료명을 입력해주세요');
    // //     onCancle();
    // //     return;
    // //   }
    // //   if (ingredient_find(text) === null) {
    // //     alert('리스트에 등록된 식재료만 등록 가능합니다.');
    // //     onCancle();
    // //     return;
    // //   }
    // //   if (!number) {
    // //     alert('용량을 입력해주세요');
    // //     onCancle();
    // //     return;
    // //   }
    // //   if (!number_rule.test(number)) {
    // //     alert('용량을 형식에 맞게 입력해주세요');
    // //     onCancle();
    // //     return;
    // //   }
    // //   if (startDate === '-') {
    // //     alert('구매일자를 입력해주세요');
    // //     onCancle();
    // //     return;
    // //   }
    // //   if (endDate === '-') {
    // //     alert('유통기한을 입력해주세요');
    // //     onCancle();
    // //     return;
    // //   }
    // //   if (
    // //     endDate.replace('-', '').replace('-', '') <
    // //     startDate.replace('-', '').replace('-', '')
    // //   ) {
    // //     alert('유통기한이 구매일자보다 빠릅니다.');
    // //     onCancle();
    // //     return;
    // //   }
    // //   if (saveType === 'empty') {
    // //     alert('보관방법을 선택해주세요');
    // //     onCancle();
    // //     return;
    // //   }
    // //   if (divType === 'empty') {
    // //     alert('분류방법을 선택해주세요');
    // //     onCancle();
    // //     return;
    // //   }
    // //   let dataObj = {
    // //     qry:
    // //       'INSERT INTO ' +
    // //       memberID.userID +
    // //       ' (ingredient_name, ingredient_vol, ingredient_vol_unit,  ingredient_buyDate, ingredient_expiryDate, ingredient_type, ingredient_divtype, ingredient_delChecked) VALUES ("' +
    // //       text +
    // //       '", "' +
    // //       number +
    // //       '", "' +
    // //       selectedItem.d_ingredientUnit +
    // //       '", "' +
    // //       startDate +
    // //       '", "' +
    // //       endDate +
    // //       '", "' +
    // //       saveType +
    // //       '", "' +
    // //       divType +
    // //       '", "0")',
    // //   };
    // //   // DB 전송
    // //   DataSet.setData(dataObj);
    // //   // 변수 값 초기화
    // //   onSlctChk(!Chk);
    // }
  };

  const RenderItem = ({item}) => {
    const [no, setNo] = useState(item.no);
    const [text, setText] = useState(item.name);
    const [number, setNumber] = useState(item.number);
    const [saveType, setSaveType] = useState(item.saveType);
    const [divType, setDivType] = useState(item.divType);
    const [startDate, setStartDate] = useState(item.startDate);
    const [endDate, setEndDate] = useState(item.endDate);
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

    return (
      <View style={{flexDirection: 'column', margin: 10}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 50,
              height: 50,
              position: 'absolute',
              zIndex: 2,
              left: 255,
              top: -13,
            }}>
            <TouchableOpacity
              onPress={() => {
                onDelete(no);
                //console.log(data);
                //console.log(maxAryNum);
              }}>
              <Image
                style={{
                  marginRight: 10,
                  marginTop: 4,
                  width: 20,
                  height: 20,
                }}
                source={{
                  uri: 'http://54.180.126.3/img/cancel.png',
                }}></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '34%',
              borderWidth: 2,
              borderColor: 'silver',
              borderTopLeftRadius: 10,
            }}>
            <View
              style={{
                width: '100%',
                height: 30,
              }}>
              <Autocomplete
                style={{
                  fontSize: 5,
                  fontWeight: 'bold',
                }}
                autoCapitalize="none"
                autoCorrect={false}
                data={filteredData}
                containerStyle={{
                  backgroundColor: 'red',
                  flex: 1,
                  position: 'absolute',
                  height: 30,
                  width: '100%',
                  zIndex: adjustZIndex,
                }}
                autoCorrect={false}
                inputContainerStyle={{
                  backgroundColor: 'blue',
                  borderColor: 'white',
                  width: '100%',
                }}
                listContainerStyle={{
                  height: 93,
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
                placeholder="식재료"
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
          <View
            style={{
              width: '33%',
              borderWidth: 2,
              borderLeftWidth: 0,
              borderColor: 'silver',
              padding: 2,
            }}>
            <TextInput
              style={{
                padding: 0,
                paddingLeft: 5,
              }}
              onChangeText={number => {
                setNumber(number);
              }}
              onEndEditing={() => {
                onSetNumber(number, no);
                console.log(data);
              }}
              value={number}
              keyboardType="number-pad"
              placeholder="용량"
            />
          </View>
          <View
            style={{
              width: '33%',
              borderWidth: 2,
              borderColor: 'silver',
              borderLeftWidth: 0,
              borderTopRightRadius: 10,
              padding: 2,
            }}>
            <RNPickerSelect
              style={{
                inputAndroid:
                  saveType === 'empty' ? {color: 'gray'} : {color: 'black'},
                inputIOS: {
                  height: 30,
                  padding: 2,
                },
                inputAndroid: {
                  height: 30,
                  padding: 2,
                },
              }}
              useNativeAndroidPickerStyle={false}
              onValueChange={value => {
                setSaveType(value);
                onSetSaveType(value, no);
                //console.log(data);
              }}
              placeholder={{}}
              value={saveType}
              items={[
                {
                  label: '보관방법',
                  value: 'empty',
                  inputLabel: '보관방법',
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
            style={{
              width: '30%',
              borderWidth: 2,
              borderColor: 'silver',
              borderRightWidth: 0,
              borderTopWidth: 0,
              borderBottomLeftRadius: 10,
              padding: 2,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setDatePickerVisibility1(true);
              }}>
              <Text style={{textAlign: 'center'}}>{startDate.substr(2)}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible1}
              mode="date"
              onConfirm={date => {
                setStartDate(date.toISOString().split('T')[0]);
                onSetStartDate(date.toISOString().split('T')[0], no);
                console.log(data);
                setDatePickerVisibility1(false);
              }}
              onCancel={() => {
                setDatePickerVisibility1(false);
              }}
            />
          </View>
          <View
            style={{
              width: '7%',
              borderWidth: 0,
              borderColor: 'silver',
              borderBottomWidth: 2,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', fontSize: 15}}> ~ </Text>
          </View>
          <View
            style={{
              width: '30%',
              borderWidth: 2,
              borderColor: 'silver',
              borderTopWidth: 0,
              borderLeftWidth: 0,
              padding: 2,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setDatePickerVisibility2(true);
              }}>
              <Text style={{textAlign: 'center'}}>{endDate.substr(2)}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible2}
              mode="date"
              onConfirm={date => {
                setEndDate(date.toISOString().split('T')[0]);
                onSetEndDate(date.toISOString().split('T')[0], no);
                console.log(data);
                setDatePickerVisibility2(false);
              }}
              onCancel={() => {
                setDatePickerVisibility2(false);
              }}
            />
          </View>
          <View
            style={{
              width: '33%',
              borderWidth: 2,
              borderColor: 'silver',
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderBottomRightRadius: 10,
              padding: 2,
            }}>
            <RNPickerSelect
              style={{
                inputAndroid:
                  divType === 'empty' ? {color: 'gray'} : {color: 'black'},
                inputIOS: {
                  height: 30,
                  padding: 2,
                },
                inputAndroid: {
                  height: 30,
                  padding: 2,
                },
              }}
              onValueChange={value => {
                setDivType(value);
                onSetDivType(value, no);
                //onsole.log(data);
              }}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              value={divType}
              items={[
                {
                  label: '분류방법',
                  value: 'empty',
                  inputLabel: '분류방법',
                },
                {label: '곡류', value: 'cereals', inputLabel: '곡류'},
                {label: '어육류', value: 'meat', inputLabel: '어육류'},
                {
                  label: '채소류',
                  value: 'vegetables',
                  inputLabel: '채소류',
                },
                {
                  label: '유지 및 당류',
                  value: 'oilfat',
                  inputLabel: '유지 및 당류',
                },
                {
                  label: '유제품류',
                  value: 'milk',
                  inputLabel: '유제품류',
                },
                {label: '과일류', value: 'fruit', inputLabel: '과일류'},
              ]}></RNPickerSelect>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          margin: 30,
          marginBottom: 0,
          borderColor: 'salmon',
          borderRadius: 20,
          borderWidth: 3,
          borderBottomWidth: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}>
        <ScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{height: 430}}>
          {data.map(item => (
            <RenderItem key={item.no} item={item} />
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            console.log(maxAryNum);
            setData([
              ...data,
              {
                no: maxAryNum,
                name: '',
                number: '',
                startDate: '-',
                endDate: '-',
                saveType: 'empty',
                divType: 'empty',
              },
            ]);
            console.log(maxAryNum);
            let tmp_max = maxAryNum + 1;
            setMaxAryNum(tmp_max);
            console.log(maxAryNum);
          }}
          style={{justifyContent: 'center', height: 50}}>
          <Text style={{color: 'gray', textAlign: 'center', fontSize: 15}}>
            + 직접 추가하기
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#ffa07a' : 'salmon',
              },
              {
                padding: 10,
                margin: 3,
                marginHorizontal: 5,
                width: '30%',
                borderRadius: 10,
              },
            ]}
            onPress={() => {
              navigation.navigate('ManageTab');
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              취소
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('ManageTab');
              console.log('추가 시작');
              onInsert();
            }}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#ffa07a' : 'salmon',
              },
              {
                padding: 10,
                margin: 3,
                marginHorizontal: 5,
                width: '30%',
                borderRadius: 10,
              },
            ]}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              추가
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
