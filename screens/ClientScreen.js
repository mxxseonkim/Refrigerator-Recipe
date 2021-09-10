import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import style from '../style';

export default function ClientScreen() {

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
    else if(key == 1) { /*회원 탈퇴 메뉴 눌렀을 때*/ }
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
          <Text style={style.nickname_ClientScreen}>백종원</Text>
          <Text style={style.text_ClientScreen}>
            안녕하셈요^^~ 즐겨보자구요 {'\n'}
            푸하학 굿{'\n'}
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
