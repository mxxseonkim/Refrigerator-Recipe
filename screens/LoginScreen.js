import React, {useState, createRef} from 'react';
import 'react-native-gesture-handler';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import style from '../global/style';
import {userID} from '../global/Global';

export default function LoginScreen({navigation}) {
  const [userId, setUserId] = useState(''); // 아이디
  const [userPassword, setUserPassword] = useState(''); //비밀번호
  const [loading, setLoading] = useState(false); // Database loding

  const DataSet = require('../global/DataSet');
  const memberID = require('../global/Global');

  const idInputRef = createRef();
  const passwordInputRef = createRef();

  //---------------------------로그인 함수--------------------------------------

  const handleSubmitButton = async () => {
    // 사용자 입력 값 체크
    if (!userId) {
      alert('아이디를 입력해주세요');
      return;
    }
    if (!userPassword) {
      alert('비밀번호를 입력해주세요');
      return;
    }

    // DB 연결 전 loading 시작
    setLoading(true);

    //로그인 체크 쿼리
    let login_check = {
      qry:
        "SELECT * FROM `member` WHERE mem_userid = '" +
        userId +
        "' and mem_password = '" +
        userPassword +
        "'",
    };
    let result = await DataSet.overlabCheck(login_check);

    // DB 연결 후 loading 해제
    setLoading(false);

    if (Number(result)) {
      // 로그인 성공
      //global 모듈에 id 등록 -> 냉장고 테이블
      memberID.userID = userId;
      //로컬에 아이디 저장 -> 자동로그인
      await AsyncStorage.setItem('user_id', userId);
      //성공 후 DrawerTab 이동
      navigation.navigate('DrawerTab');
    } else {
      //로그인 실패
      Alert.alert('경고', '아이디 및 비밀번호를 다시 확인해주세요.');
    }
    //변수 값 초기화
    setUserId('');
    setUserPassword('');
  };

  //---------------------------UI 부분--------------------------------------

  return (
    <ScrollView style={style.container_LoginScreen}>
      <Loader loading={loading} />
      <View style={style.titleArea_LoginScreen}>
        <Image
          source={{uri: 'http://54.180.126.3/img/login.png'}}
          style={style.img_LoginScreen}
        />
      </View>
      <View style={style.TextArea_LoginScreen}>
        <Text style={style.Text_LoginScreen}>앱을 이용하기 위해</Text>
        <Text style={style.Text_LoginScreen}>로그인이 필요해요</Text>
      </View>
      <View style={style.formArea_LoginScreen}>
        <TextInput
          style={[
            style.textForm_LoginScreen,
            {
              borderTopLeftRadius: 7,
              borderTopRightRadius: 7,
              borderBottomWidth: 1,
            },
          ]}
          placeholder={'아이디'}
          onChangeText={userId => setUserId(userId)}
          autoCapitalize="none"
          value={userId}
          returnKeyType="next"
          ref={idInputRef}
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
        <TextInput
          style={[
            style.textForm_LoginScreen,
            {
              borderBottomRightRadius: 7,
              borderBottomLeftRadius: 7,
              borderTopWidth: 1,
            },
          ]}
          placeholder={'비밀번호'}
          ref={passwordInputRef}
          secureTextEntry={true}
          onChangeText={userPassword => setUserPassword(userPassword)}
          autoCapitalize="none"
          value={userPassword}
          returnKeyType="next"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
      </View>
      <View>
        <View style={style.btnArea_LoginScreen}>
          <TouchableOpacity
            style={style.btn_LoginScreen}
            onPress={handleSubmitButton}>
            <Text style={(style.Text_LoginScreen, {color: 'white'})}>
              로그인
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.TextAddFuncView_LoginScreen}>
          <Text
            style={style.TextAddFunc_LoginScreen}
            onPress={() => navigation.navigate('Register')}>
            아이디찾기
          </Text>
          <Text
            style={style.TextAddFunc_LoginScreen}
            onPress={() => navigation.navigate('Register')}>
            비밀번호찾기
          </Text>
          <Text
            style={style.TextAddFunc_LoginScreen}
            onPress={() => navigation.navigate('Register')}>
            회원가입
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
