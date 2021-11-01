import React, {useState, createRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import 'react-native-gesture-handler';
import Loader from './Loader';
/// import RNPickerSelect from 'react-native-picker-select';

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

import style from '../style';

function RegisterScreen({navigation}) {
  const [userName, setUserName] = useState('');
  const [userNick, setUserNick] = useState('');
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordchk, setUserPasswordchk] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const [useridCheck, setUseridCheck] = useState('');
  const [ischecked, setIschecked] = useState(false);
  //아이디 중복체크 결과값 저장 변수

  const [isUniqueID, setIsUniqueID] = useState(false);
  //중복 체크 버튼을 눌렀는지, 안 눌렀는지
  const idInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordchkInputRef = createRef();
  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const nickInputRef = createRef();

  var id_rule = /^([a-z0-9_]){5,25}$/; // id 5~25자
  var password_rule = /^(?=.*[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  var email_rule =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  var name_rule = /^[ㄱ-힣a-zA-Z]/gi;
  var nick_rule = /^[ㄱ-힣a-zA-Z0-9]/gi;

  const DataSet = require('../routers/DataSet');

  const IdOverlabCheck = async () => {
    setIsUniqueID(true);

    if (userId === '') {
      return;
    }
    setIschecked(true);
    let ID_overlab_check = {
      qry: 'SELECT * FROM member where user_id="' + userId + '"',
      //아이디 중복 체크 쿼리
    };
    let result = await DataSet.overlabCheck(ID_overlab_check);
    //console.log(Number(result));
    if (Number(result)) {
      //중복된 아이디가 있을 때
      setUseridCheck(true);
    } else {
      //중복된 아이디가 없을 때
      setUseridCheck(false);
    }
  };

  const handleSubmitButton = () => {
    if(!isUniqueID){
      alert('아이디 중복 확인을 해주세요.');
      return;
    }
    if (!userId) {
      alert('아이디를 입력해주세요');
      return;
    }
    if (!id_rule.test(userId)) {
      alert('아이디를 형식에 맞게 입력해주세요.');
      return false;
    }
    if (!userPassword) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    if (!password_rule.test(userPassword)) {
      alert('비밀번호를 형식에 맞게 입력해주세요.');
      return false;
    }
    if (userPasswordchk != userPassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }
    if (!userName) {
      alert('이름을 입력해주세요');
      return;
    }
    if (!name_rule.test(userName)) {
      alert('이름을 형식에 맞게 입력해주세요.');
      return false;
    }
    if (!userNick) {
      alert('닉네임을 입력해주세요');
      return;
    }
    if (!nick_rule.test(userNick)) {
      alert('닉네임을 형식에 맞게 입력해주세요.');
      return false;
    }
    if (!userEmail) {
      alert('이메일을 입력해주세요');
      return;
    }
    if (!email_rule.test(userEmail)) {
      alert('이메일을 형식에 맞게 입력해주세요.');
      return false;
    }

    console.log(useridCheck);

    if (Boolean(useridCheck)) {
      Alert.alert(
        '경고',
        '중복된 아이디가 존재합니다. 아이디를 다시 입력해주세요.',
      );
      return;
    }

    setLoading(true);


    let userData = {
      qry: 'INSERT INTO `member` (`user_id`, `user_pw`, `user_name`, `user_nickname`, `user_email`, `user_bookmark`) VALUES ('
      +userId+', '
      +userPassword+', '
      +userName+', '
      +userNick+', '
      +userEmail+', NULL)',
    };

    let newRef = {
      qry: 'CREATE TABLE '+userId+'(no int AUTO_INCREMENT,ingredient_name varchar(100),ingredient_vol int,ingredient_buyDate varchar(100),ingredient_expiryDate varchar(100),ingredient_type varchar(100),ingredient_imgPath(500),ingredient_delChecked tinyint(1),primary key (`no`))',
    }
    
    DataSet.setData(userData);
    //멤버 DB insert
    DataSet.setData(newRef);
    //냉장고 생성

    console.log('성공');

    setLoading(false);

    setIsRegistraionSuccess(true);
  };

  if (isRegistraionSuccess) {
    return (
      <ScrollView style={style.container_RegisterScreen}>
        <View style={{flex: 1}}>
          <View
            style={{
              paddingTop: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
              paddingRight: wp(1.5),
            }}>
            <Image
              source={{uri: 'http://54.180.126.3/img/checked.png'}}
              style={{
                width: wp(30),
                height: hp(30),
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </View>
          <View
            style={{
              height: hp(3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: wp('4%')}}>
              회원가입이 완료되었습니다.
            </Text>
          </View>
          <View style={{flex: 0.75, paddingTop: hp(5)}}>
            <View style={style.btnArea_RegisterScreen}>
              <TouchableOpacity
                style={style.btn2_RegisterScreen}
                onPress={() => navigation.navigate('Login')}>
                <Text style={{color: 'white', fontSize: wp('4%')}}>
                  로그인 화면으로
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={style.container_RegisterScreen}>
      <Loader loading={loading} />
      <View style={style.topArea_RegisterScreen}>
        <View style={style.titleArea_RegisterScreen}>
          <Image
            source={{uri: 'http://54.180.126.3/img/register.jpg'}}
            style={{width: wp(50), height: hp(10), resizeMode: 'contain'}}
          />
        </View>
        <View style={style.TextArea_RegisterScreen}>
          <Text style={style.Text_RegisterScreen}>냉장고 관리, 레시피 추천</Text>
          <Text style={style.Text_RegisterScreen}>냉부해를 사용해보세요 📘</Text>
        </View>
      </View>

      <View style={style.formArea_RegisterScreen}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={style.textFormAlone_RegisterScreen}
            placeholder={'아이디(5자 이상, 영문, 숫자)'}
            onChangeText={userId => setUserId(userId)}
            ref={idInputRef}
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <View style={style.idCheck_RegisterScreen}>
            <TouchableOpacity onPress={IdOverlabCheck}>
              <Text style={{color: 'white'}}>중복 체크</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{justifyContent: 'center'}}>
        {ischecked ? (
          useridCheck ? (
            <Text style={style.TextValidation_RegisterScreen}>중복된 아이디입니다.</Text>
          ) : (
            <Text style={style.TextValidation_RegisterScreen}>사용 가능한 아이디입니다.</Text>
          )
        ) : null}
      </View>
      <View style={style.formArea_RegisterScreen}>
        <TextInput
          style={style.textFormTop_RegisterScreen}
          secureTextEntry={true}
          placeholder={'비밀번호(8자 이상)'}
          onChangeText={userPassword => setUserPassword(userPassword)}
          ref={passwordInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordchkInputRef.current && passwordchkInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <TextInput
          style={style.textFormBottom_RegisterScreen}
          secureTextEntry={true}
          placeholder={'비밀번호 확인'}
          onChangeText={userPasswordchk => setUserPasswordchk(userPasswordchk)}
          ref={passwordchkInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            nameInputRef.current && nameInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
      </View>

      <View style={{justifyContent: 'center'}}>
        {userPassword !== userPasswordchk ? (
          <Text style={style.TextValidation_RegisterScreen}>
            비밀번호가 일치하지 않습니다.
          </Text>
        ) : null}
      </View>

      <View style={style.formArea2_RegisterScreen}>
        <TextInput
          style={style.textFormTop_RegisterScreen}
          placeholder={'이름'}
          onChangeText={userName => setUserName(userName)}
          ref={nameInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            nickInputRef.current && nickInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <TextInput
          style={style.textFormMiddle_RegisterScreen}
          placeholder={'닉네임'}
          onChangeText={userNick => setUserNick(userNick)}
          ref={nickInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            emailInputRef.current && emailInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <TextInput
          style={style.textFormBottom_RegisterScreen}
          placeholder={'이메일'}
          keyboardType="email-address"
          returnKeyType="send"
          onChangeText={userEmail => setUserEmail(userEmail)}
          ref={emailInputRef}
          //blurOnSubmit={false}
        />
      </View>

      <View style={{flex: 0.75}}>
        <View style={style.btnArea_RegisterScreen}>
          <TouchableOpacity style={style.btn_RegisterScreen} onPress={handleSubmitButton}>
            <Text style={{color: 'white', fontSize: wp('4%')}}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 3}} />
    </ScrollView>
  );
}

export default RegisterScreen;