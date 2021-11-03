import React, {useState, createRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  Keyboard,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import style from '../global/style';

export default function Search_pw({navigation}) {
  const [userId, setUserId] = useState('');
  const [auth, setAuth] = useState('');
  const [isCheckIdSuccess, setIsCheckIdSuccess] = useState(false);

  const DataSet = require('../global/DataSet');

  const authSubmitButton = async () => {
    if (!userId) {
      Alert.alert('경고', '아이디를 입력해주세요.');
      return;
    }

    let dataCheck = {
      qry: "SELECT * FROM `member` WHERE user_id ='" + userId + "'",
    };
    let dataResult = await DataSet.overlabCheck(dataCheck);
    if (dataResult == 0) {
      Alert.alert('경고', '존재하지 않는 아이디입니다.');
      return;
    }
    setIsCheckIdSuccess(true);
  };

  if (isCheckIdSuccess) {
    navigation.navigate('Search_pw2', {userId: userId});
  }

  return (
    <ScrollView style={style.container_RegisterScreen}>
      <View style={style.topArea_RegisterScreen}>
        <View style={style.titleArea_RegisterScreen}>
          <Image
            source={{uri: 'http://54.180.126.3/img/find_pw.jpg'}}
            style={{width: wp(57), height: hp(10), resizeMode: 'contain'}}
          />
        </View>
        <View style={style.TextArea_Search_pw}>
          <Text style={style.Text_Search_pw}> 아이디를 입력해주세요.</Text>
        </View>
      </View>

      <View style={style.form_Search_pw}>
        <View style={style.formArea_Search_pw}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.Text_Search_pw2}>아이디 </Text>
            <TextInput
              style={style.textFormAlone_Search_pw}
              onChangeText={userId => setUserId(userId)}
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
        </View>
      </View>
      <View style={style.EmailCheck_Search_pw}>
        <TouchableOpacity
          style={style.btn_LoginScreen}
          onPress={authSubmitButton}>
          <Text
            style={
              (style.Text_LoginScreen, {color: 'white', fontSize: wp('4.5%')})
            }>
            확인
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
