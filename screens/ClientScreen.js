import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, FlatList, Image, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import style from '../global/style';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ClientScreen({navigation}) {
  //DB에서 데이터가져오기 - 닉네임, 자기소개
  const [uri, seturi] = useState('http://54.180.126.3/img/user.png');
  const [memNickname, setMemNickname] = useState('');
  //회원 닉네임
  const [memProfileContent, setMemProfileContent] = useState('');
  //회원 자기소개
  const [data, onSetData] = useState([]);
  //DB에서 가져온 json을 객체로 변환

  const DataSet = require('../global/DataSet');
  const memberID = require('../global/Global');

  // Select

  useEffect(async () => {
    let memData = {
      qry: "SELECT * FROM member WHERE user_id ='" + memberID.userID + "'",
    };
    console.log(memData.qry);
    let json = await DataSet.getData(memData);
    console.log(json);
    if (json !== false) {
      onSetData(json);
      console.log(data);
      console.log(data[0].user_nickname);
      setMemNickname(data[0].user_nickname);
      console.log(memNickname);
    } else {
      onSetData([]);
    }
  }, []);

  // -------------------- 갤러리에서 사진 선택해서 설정 --------------------------
  const pickImage = () => {
    ImagePicker.openPicker({width: 120, height: 120, cropping: true}).then(
      image => {
        //갤러리에서 받은 이미지 경로로 설정
        seturi(image.path);
      },
    );
  };

  // -------------------- 회원 menu - flatlist에 들어가는 부분 -------------------

  const menu = [
    {key: 0, menu: '프로필 수정'},
    {key: 1, menu: '회원 탈퇴'},
  ];

  const clickMenu = key => {
    if (key == 0) {
      /*프로필 수정 메뉴 눌렀을 때 */
    } else if (key == 1) {
      /*회원 탈퇴 메뉴 눌렀을 때*/
      Alert.alert(
        '정말 탈퇴하시겠습니까?',
        '탈퇴 시, ' + memberID.userID + '님의 정보는 복구되지 않습니다.',
        [
          {
            text: '네',
            onPress: async () => {
              let memDrop = {
                qry: 'DROP TABLE ' + memberID.userID,
              }; //냉장고 테이블 삭제
              let memDelete = {
                qry:
                  "DELETE FROM `member` WHERE user_id='" +
                  memberID.userID +
                  "'",
              }; //냉장고 테이블 삭제
              DataSet.setData(memDrop);
              DataSet.setData(memDelete);
              Alert.alert('안내', '탈퇴 완료.');
              try {
                await AsyncStorage.removeItem('user_id');
              } catch (e) {
                console.log(e);
              }
              navigation.navigate('Auth', {
                screen: 'Login',
              });
            },
          },
          {
            text: '아니요',
            onPress: () =>
              Alert.alert(
                '안내',
                '그래요, 우리 좀  더 함께해요. 제가 더  잘할게요.',
              ),
          },
        ],
      );
    }
  };

  // ------------------------------ UI 부분 ------------------------------------

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={style.menuItem_ClientScreen}
        onPress={() => clickMenu(item.key)}>
        <Icon
          name={
            Platform.OS === 'ios' ? 'ios-settings-sharp' : 'md-settings-sharp'
          }
          style={style.menuItemIcon_ClientScreen}
        />
        <Text style={style.menuItemText_ClientScreen}>{item.menu}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={style.profile_ClientScreen}>
        {/* 터치시 pickImage() 실행 */}
        <TouchableOpacity onPress={pickImage}>
          <Image style={style.pic_ClientScreen} source={{uri: uri}} />
        </TouchableOpacity>
        <View>
          <Text style={style.nickname_ClientScreen}>{memNickname}</Text>
          <Text style={style.text_ClientScreen}>{memProfileContent}</Text>
        </View>
      </View>

      <View style={style.menuList_ClientScreen}>
        <FlatList
          data={menu}
          renderItem={renderItem}
          keyExtract={item => item.key}
        />
      </View>
    </View>
  );
}
