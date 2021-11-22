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
import CameraRender from '../components/CameraRender';
import style from '../global/style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useNavigation} from '@react-navigation/core';
import Autocomplete from 'react-native-autocomplete-input';

//import Icon from 'react-native-vector-icons/Ionicons';
export default function CameraResultScreen({detectionArr, Chk, onSlctChk}) {
  const detectionResult = detectionArr;
  const [data, setData] = useState([]);
  const DataSet = require('../global/DataSet');
  const memberID = require('../global/Global');
  const tmpData = [];
  const [maxAryNum, setMaxAryNum] = useState(0);
  const [MasterData, setMasterData] = useState([]);
  const navigation = useNavigation();
  var number_rule = /^([0-9]){1,6}$/; // id 5~25자

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

  useEffect(() => {
    console.log(data);
  }, [data]);

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

  // 식재료 해당재료 값 변경

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

  const onSetText = (text, no) => {
    setData(data.map(item => (item.no === no ? {...item, name: text} : item)));
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

  const onInsert = async () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].name == '') {
        alert('빈칸 항목을 확인해주세요');
        return;
      }
      if (ingredient_find(data[i].name) === '') {
        alert('리스트에 등록된 식재료만 등록 가능합니다.');
        return;
      }
      if (data[i].number == '') {
        alert('빈칸 항목을 확인해주세요.');
        return;
      }
      if (!number_rule.test(data[i].number)) {
        alert('용량에는 숫자만 입력 가능합니다.');
        return;
      }
      if (data[i].startDate === '-') {
        alert('빈칸 항목을 확인해주세요');
        return;
      }
      if (data[i].endDate === '-') {
        alert('빈칸 항목을 확인해주세요');
        return;
      }
      if (
        data[i].endDate.replace('-', '').replace('-', '') <
        data[i].startDate.replace('-', '').replace('-', '')
      ) {
        alert('유통기한가 구매일자보다 빠른 항목이 있는지 확인해주세요.');
        return;
      }
      if (data[i].saveType === 'empty') {
        alert('빈칸 항목을 확인해주세요');
        return;
      }
      if (data[i].divType === 'empty') {
        alert('빈칸 항목을 확인해주세요');
        return;
      }
    }

    for (let i = 0; i < data.length; i++) {
      let Unit = ingredient_find(data[i].name);
      let dataObj = {
        qry:
          'INSERT INTO ' +
          memberID.userID +
          ' (ingredient_name, ingredient_vol, ingredient_vol_unit,  ingredient_buyDate, ingredient_expiryDate, ingredient_type, ingredient_divtype, ingredient_delChecked) VALUES ("' +
          data[i].name +
          '", "' +
          data[i].number +
          '", "' +
          Unit +
          '", "' +
          data[i].startDate +
          '", "' +
          data[i].endDate +
          '", "' +
          data[i].saveType +
          '", "' +
          data[i].divType +
          '", "0")',
      };
      // DB 전송
      await DataSet.setData(dataObj);
    }

    onSlctChk(!Chk);
    navigation.navigate('ManageTab');
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          margin: 30,
          marginTop: 60,
          marginBottom: 0,
          borderColor: 'salmon',
          borderRadius: 20,
          borderWidth: 3,
          borderBottomWidth: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}>
        <ScrollView
          nestedScrollEnabled={true}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{height: 470}}>
          {data.map(item => (
            <CameraRender
              key={item.no}
              item={item}
              onSetStartDate={onSetStartDate}
              onSetEndDate={onSetEndDate}
              onSetSaveType={onSetSaveType}
              onSetDivType={onSetDivType}
              onSetText={onSetText}
              onSetNumber={onSetNumber}
              onDelete={onDelete}
              MasterData={MasterData}
            />
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
    </ScrollView>
  );
}
