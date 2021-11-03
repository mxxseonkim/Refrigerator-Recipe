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

export default function Search_pw2({route, navigation}) {
  var email_rule =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [auth, setAuth] = useState('');
  const [isPwSuccess, setIsPwSuccess] = useState(false);
  const nameInputRef = createRef();
  const emailInputRef = createRef();

  const authSubmitButton = () => {
    console.log(route.params.userId);
    if (!userName) {
      alert('이름을 입력해주세요');
      return;
    }
    if (!userEmail) {
      alert('이메일을 입력해주세요');
      return;
    }
    if (!email_rule.test(userEmail)) {
      alert('이메일을 형식에 맞게 입력해주세요.');
      return false;
    }
    // 여기에 인증번호 전송하는 함수 넣기
  };

  const checkSubmitButton = () => {
    setIsPwSuccess(ture);

    //여기에 임시 비밀번호 넘겨주기
  };

  if (isPwSuccess) {
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
              source={{uri: 'http://54.180.126.3/img/find_pw.jpg'}}
              style={{
                width: wp(50),
                height: hp(20),
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </View>
          <View
            style={{
              height: hp(3),
              marginBottom: hp(3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: wp('4%')}}>
              본인 인증이 완료되었습니다.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: hp(3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: wp('4%'),
                marginRight: wp(1.5),
              }}>
              회원님의 임시 비밀번호는
            </Text>
            <Text
              style={{color: 'gray', fontSize: wp('4%'), marginRight: wp(1.5)}}>
              password{/* 여기에 고객 임시 비밀번호 넣기 */}
            </Text>
            <Text style={{color: 'black', fontSize: wp('4%')}}>입니다.</Text>
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
      <View style={style.topArea_RegisterScreen}>
        <View style={style.titleArea_RegisterScreen}>
          <Image
            source={{uri: 'http://54.180.126.3/img/find_pw.jpg'}}
            style={{width: wp(57), height: hp(10), resizeMode: 'contain'}}
          />
        </View>
        <View style={style.TextArea_Search_pw}>
          <Text style={style.Text_Search_pw}>
            {' '}
            이름과 이메일을 입력해주세요.
          </Text>
        </View>
      </View>

      <View style={style.form_Search_pw}>
        <View style={style.formArea_Search_pw}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.Text_Search_pw}> 이름 </Text>
            <TextInput
              style={style.textFormAlone_Search_pw}
              onChangeText={userName => setUserName(userName)}
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
        </View>

        <View style={style.formArea_Search_pw}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.Text_Search_pw}>이메일 </Text>
            <TextInput
              style={style.textFormAlone_Search_pw}
              onChangeText={userEmail => setUserEmail(userEmail)}
              returnKeyType="next"
              keyboardType="email-address"
              blurOnSubmit={false}
            />
            <View style={style.EmailCheck_Search_pw2}>
              <TouchableOpacity onPress={authSubmitButton}>
                <Text style={{color: 'white'}}>번호 받기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={style.TextValidation_Search_pw}>
            인증번호를 입력해주세요.
          </Text>
        </View>
        <View style={style.formArea_Search_pw}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.Text_Search_pw}> </Text>
            <TextInput
              style={style.textFormAlone_Search_pw}
              placeholder={'인증번호 6자리 입력'}
              onChangeText={auth => setAuth(auth)}
              keyboardType="number-pad"
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <View style={style.EmailCheck_Search_pw2}>
              <TouchableOpacity onPress={checkSubmitButton}>
                <Text style={{color: 'white'}}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
