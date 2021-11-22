import React, {useState, useEffect, useRef, createRef} from 'react';
import {View, TextInput, Text, Image, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//import Icon from 'react-native-vector-icons/Ionicons';
export default function CameraRender({
  item,
  onSetStartDate,
  onSetEndDate,
  onSetSaveType,
  onSetDivType,
  onSetText,
  onSetNumber,
  onDelete,
  MasterData,
}) {
  const [no, setNo] = useState(item.no);
  const [text, setText] = useState(item.name);
  const [number, setNumber] = useState(item.number);
  const [saveType, setSaveType] = useState(item.saveType);
  const [divType, setDivType] = useState(item.divType);
  const [startDate, setStartDate] = useState(item.startDate);
  const [endDate, setEndDate] = useState(item.endDate);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

  const ingredient_find = text => {
    if (text) {
      for (let i = 0; i < MasterData.length; i++) {
        if (text === MasterData[i].d_ingredientName) {
          return MasterData[i].d_ingredientUnit;
        }
      }
    }
    return '';
  };

  return (
    <View style={{flexDirection: 'column', margin: 10}}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            zIndex: 2,
            //left: 255,
            left: 273,
            top: -13,
          }}>
          <TouchableOpacity
            onPress={() => {
              onDelete(no);
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
              padding: 0,
              paddingLeft: 5,
            }}
            onChangeText={text => {
              setText(text);
            }}
            onEndEditing={() => {
              onSetText(text, no);
            }}
            value={text}
            placeholder="식재료"
          />
        </View>
        <View
          style={{
            width: '21%',
            borderWidth: 2,
            borderLeftWidth: 0,
            borderRightWidth: 0,
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
            }}
            value={number}
            keyboardType="number-pad"
            placeholder="용량"
          />
        </View>
        <View
          style={{
            width: '12%',
            borderWidth: 2,
            borderLeftWidth: 0,
            borderColor: 'silver',
            padding: 2,
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', color: 'gray'}}>
            {ingredient_find(text) === ''
              ? null
              : '(' + ingredient_find(text) + ')'}
          </Text>
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
}
