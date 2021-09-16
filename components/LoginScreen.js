import React, {useState, useEffect, createRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import Loader from './Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import style from '../style';

function LoginScreen({navigation}) {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const idInputRef = createRef();
  const [loading, setLoading] = useState(false);
  const passwordInputRef = createRef();

  const DataSet = require('../routers/DataSet');
  const memberID = require('../Global');

  const handleSubmitButton = async () => {
    if (!userId) {
      alert('아이디를 입력해주세요');
      return;
    }
    if (!userPassword) {
      alert('비밀번호를 입력해주세요');
      return;
    }

    setLoading(true);

    let login_check = {
      qry:
        "SELECT * FROM `member` WHERE mem_userid = '" +
        userId +
        "' and mem_password = '" +
        userPassword +
        "'",
    };
    let result = await DataSet.overlabCheck(login_check);

    setLoading(false);

    if (Number(result)) {
      //로그인 성공
      memberID.userID = userId;
      await AsyncStorage.setItem('user_id', userId);
      navigation.navigate('DrawerTab');
    } else {
      //로그인 실패
      Alert.alert('경고', '아이디 및 비밀번호를 다시 확인해주세요.');
    }
  };

  return (
    <ScrollView style={style.container_LoginScreen}>
      <Loader loading={loading} />
      <View style={style.topArea_LoginScreen}>
        <View style={style.titleArea_LoginScreen}>
          <Image
            source={{uri: 'http://3.35.18.154/img/login.png'}}
            style={{width: wp(35), height: hp(13), resizeMode: 'contain'}}
          />
        </View>
        <View style={style.TextArea_LoginScreen}>
          <Text style={[style.Text_LoginScreen, {paddingLeft: wp(1)}]}>
            앱을 이용하기 위해
          </Text>
          <Text style={[style.Text_LoginScreen, {paddingLeft: wp(1)}]}>
            로그인이 필요해요
          </Text>
        </View>
      </View>
      <View style={style.formArea_LoginScreen}>
        <TextInput
          style={style.textFormTop_LoginScreen}
          placeholder={'아이디'}
          onChangeText={userId => setUserId(userId)}
          autoCapitalize="none"
          returnKeyType="next"
          ref={idInputRef}
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
        <TextInput
          style={style.textFormBottom_LoginScreen}
          placeholder={'비밀번호'}
          ref={passwordInputRef}
          secureTextEntry={true}
          onChangeText={userPassword => setUserPassword(userPassword)}
          autoCapitalize="none"
          returnKeyType="next"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
      </View>
      <View style={{flex: 0.75}}>
        <View style={style.btnArea_LoginScreen}>
          <TouchableOpacity style={style.btn_LoginScreen} onPress={handleSubmitButton}>
            <Text style={(style.Text_LoginScreen, {color: 'white'})}>로그인</Text>
          </TouchableOpacity>
        </View>
        <View style = { {flexDirection: 'row'}}>
        <Text
          style={style.TextRegister_LoginScreen}
          onPress={() => navigation.navigate('Register')}>
          아이디찾기
        </Text>
        <Text
          style={style.TextRegister_LoginScreen}
          onPress={() => navigation.navigate('Register')}>
          비밀번호찾기
        </Text>
        <Text
          style={style.TextRegister_LoginScreen}
          onPress={() => navigation.navigate('Register')}>
          회원가입
        </Text>
        </View>
      </View>
      <View style={{flex: 3}} />
    </ScrollView>
  );
}

export default LoginScreen;