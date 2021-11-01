import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import style from '../style';

export default function ClientScreen({navigation}) {



  //DB에서 데이터가져오기 - 닉네임, 자기소개

  const [memNickname, setMemNickname] = useState('');
  //회원 닉네임
  const [memProfileContent, setMemProfileContent] = useState('');
  //회원 자기소개
  const [data, onSetData] = useState([]);
  //DB에서 가져온 json을 객체로 변환

  const DataSet = require('../routers/DataSet');
  const memberID = require('../Global');

  // Select

  useEffect(async () => {
    let memData = {
      qry: "SELECT * FROM `member` WHERE user_id ='"+memberID.userID+"'",
    };
    let json = await DataSet.getData(memData);
    if(json !== false){
      onSetData(json);
      var _data = data.map(element => {
        var _element = element;
        setMemNickname(_element.user_nickname);
        return _element;
      });
    }
    else{
      onSetData([]);
    }
  })


  const [uri, setUri] = useState('https://image.flaticon.com/icons/png/512/149/149071.png');
  const pickImage = () => {
    ImagePicker.openPicker({ width: 120, height: 120, cropping: true      
    }).then(image => { setUri(image.path);})
  };

  const menu = [
    {key:0, menu:'프로필 수정'},
    {key:1, menu:'회원 탈퇴'}
  ];
  
  const clickMenu = key => {
    if(key == 0) { /*프로필 수정 메뉴 눌렀을 때 */ }
    else if(key == 1) { 
      /*회원 탈퇴 메뉴 눌렀을 때*/ 
      Alert.alert(
        "정말 탈퇴하시겠습니까?",
        "탈퇴 시, "+memberID.userID+"님의 정보는 복구되지 않습니다.",
        [
          {
            text: "네",
            onPress: async () => {
              let memDrop = {
                qry: "DROP TABLE "+memberID.userID,
              }; //냉장고 테이블 삭제
              let memDelete = {
                qry: "DELETE FROM `member` WHERE user_id='"+memberID.userID+"'",
              }; //냉장고 테이블 삭제
              DataSet.setData(memDrop);
              DataSet.setData(memDelete);
              Alert.alert("안내","탈퇴 완료.")
              try{
                await AsyncStorage.removeItem('user_id')
              } catch(e) {
                console.log(e);
              }
              navigation.navigate('Auth', {
                screen: 'Login',
              });
            },
          },
          {
            text: "아니요",
            onPress: () => Alert.alert("안내","그래요, 우리 좀  더 함께해요. 제가 더  잘할게요.")
          }
        ]
      )
    }
  }


  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={style.menuItem_ClientScreen}
        onPress={() => clickMenu(item.key)}
        >
        <Image
          style={style.menuItemIcon_ClientScreen}        
          source={{uri:'https://image.flaticon.com/icons/png/512/3524/3524659.png'}}
        />
        <Text style={style.menuItemText_ClientScreen}>
          {item.menu}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={style.profile_ClientScreen}>        
        <TouchableOpacity onPress={pickImage}>
          <Image
            style={style.pic_ClientScreen}
            source={{uri: uri}}
          />
        </TouchableOpacity>
        <View>
          <Text style={style.nickname_ClientScreen}>{memNickname}</Text>
          <Text style={style.text_ClientScreen}>
            {memProfileContent}
          </Text>     
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