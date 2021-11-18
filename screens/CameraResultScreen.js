import React, {useState, useEffect, useRef, createRef} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import style from '../global/style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useNavigation} from '@react-navigation/core';

//import Icon from 'react-native-vector-icons/Ionicons';
export default function CameraResultScreen({route, cameraNavigation}) {
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

  const [data, setData] = useState([]);
  useState(async () => {
    let detectionArr = route.params.detectionArr;
    for (let i = 0; i < detectionArr.length; i++) {
      setData([
        ...data,
        {
          no: 0,
          name: detectionArr[i].ingredient,
          number: null,
          startDate: '-',
          endDate: '-',
          saveType: 'empty',
          divType: 'empty',
        },
      ]);
    }
  });
  let maxAryNum;
  const navigation = useNavigation();

  useEffect(() => {
    maxAryNum = data.length;
  }, []);

  const setDate = (_date, no) => {};
  const setType = (_type, no) => {};
  const setNumber = (_number, no) => {};
  const setAdd = () => {};
  const onDelete = no => {
    setData(data.filter(element => element.no !== no));
  };

  const onInsert = () => {};

  const RenderItem = ({item}) => {
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
                onDelete(item.no);
                console.log(data);
                console.log(maxAryNum);
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
              padding: 2,
            }}>
            <TextInput
              style={{
                height: 30,
                padding: 0,
                paddingLeft: 5,
              }}
              onChangeText={() => {
                console.log('text 변경');
              }}
              value={item.name}
              keyboardType="default"
              placeholder="식재료"
            />
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
              onChangeText={() => {
                console.log('text 변경');
              }}
              value={item.number}
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
                  item.saveType === 'empty'
                    ? {color: 'gray'}
                    : {color: 'black'},
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
              onValueChange={() => {
                console.log('보관선택');
              }}
              placeholder={{}}
              value={item.saveType}
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
              <Text style={{textAlign: 'center'}}>{item.startDate}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible1}
              mode="date"
              onConfirm={date => {
                date.toISOString().split('T')[0];
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
                setDatePickerVisibility1(true);
              }}>
              <Text style={{textAlign: 'center'}}>{item.endDate}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible2}
              mode="date"
              onConfirm={date => {
                date.toISOString().split('T')[0];
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
                  item.divType === 'empty' ? {color: 'gray'} : {color: 'black'},
                inputIOS: {
                  height: 30,
                  padding: 2,
                },
                inputAndroid: {
                  height: 30,
                  padding: 2,
                },
              }}
              onValueChange={() => {
                console.log('분류선택');
              }}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              value={item.divType}
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
                name: null,
                number: null,
                startDate: '-',
                endDate: '-',
                saveType: 'empty',
                divType: 'empty',
              },
            ]);
            console.log(data);
            maxAryNum = maxAryNum + 1;
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
