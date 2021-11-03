import React, {useState, useEffect, createRef} from 'react';
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
import TimerFunction from '../components/TimerFunction';
import {set} from 'react-native-reanimated';

export default function Search_id({navigation}) {
  var email_rule =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const DataSet = require('../global/DataSet');

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [auth, setAuth] = useState('');
  const [isIdSuccess, setIsIdSuccess] = useState(false);
  const emailInputRef = createRef();
  const [number, setNumber] = useState('');

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState('');
  const [checkState, setCheckState] = useState('');
  const [userID, setUserID] = useState('');

  const timerCheck = require('../components/TimerCheck');
  //console.log(timerCheck.check);
  //timerCheck.check 가 true 일 때 == 인증번호 비활성화. 옳은 인증번호를 입력해도 본인인증이 되지 않는 상태.
  //timerCheck.check 가 false 일 때 == 인증번호 활성화. 옳은 인증번호를 입력하면 본인인증 완료됨.

  const authSubmitButton = async () => {
    let dataCheck = {
      //입력한 이름과 이메일이 DB에 있는지 확인
      qry:
        "SELECT * FROM `member` WHERE user_name = '" +
        userName +
        "' and user_email = '" +
        userEmail +
        "'",
    };
    let dataResult = await DataSet.overlabCheck(dataCheck);
    if (dataResult == 0) {
      Alert.alert(
        '경고',
        '이름 및 이메일을 잘못입력하셨습니다. 다시 입력해주세요.',
      );
      return;
    }
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
    setCheckState('인증번호를 입력해주세요.');
    timerCheck.check = false;
    console.log(userEmail);
    let sendEmail = {
      email: userEmail,
    };
    let result = await DataSet.sendUserEmail(sendEmail);
    setNumber(result.toString());
    console.log(number);
  };

  const checkSubmitButton = async () => {
    if (auth == number && timerCheck.check == false) {
      timerCheck.check = true;
      let getID = {
        qry:
          "SELECT user_id FROM `member` WHERE user_name = '" +
          userName +
          "' and user_email = '" +
          userEmail +
          "'",
      };
      let id_Json = await DataSet.getData(getID);
      console.log(id_Json);
      setUserID(id_Json[0].user_id);
      setIsIdSuccess(true);
    } else if (auth == number && timerCheck.check == true) {
      setCheckState('시간이 초과했습니다. 다시 시도해주세요.');
    } else {
      setCheckState('인증번호가 틀렸습니다. 다시 입력해주세요.');
    }
  };

  if (isIdSuccess) {
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
              source={{uri: 'http://54.180.126.3/img/find_id.jpg'}}
              style={{
                width: wp(40),
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
              회원님의 아이디는
            </Text>
            <Text
              style={{color: 'gray', fontSize: wp('4%'), marginRight: wp(1.5)}}>
              id{/* 여기에 고객 실제 아이디 넣기 */}
            </Text>
            <Text style={{color: 'black', fontSize: wp('4%')}}>입니다.</Text>
          </View>
          <View style={{paddingTop: hp(5), flexDirection: 'row'}}>
            <View style={style.btnArea_Search_id}>
              <TouchableOpacity
                style={style.btn2_Search_id}
                onPress={() => navigation.navigate('Login')}>
                <Text style={{color: 'white', fontSize: wp('4%')}}>
                  로그인 화면으로
                </Text>
              </TouchableOpacity>
            </View>
            <View style={style.btnArea_Search_id}>
              <TouchableOpacity
                style={style.btn3_Search_id}
                onPress={() => navigation.navigate('Search_pw')}>
                <Text style={{color: 'white', fontSize: wp('4%')}}>
                  비밀번호 찾기
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
            source={{uri: 'http://54.180.126.3/img/find_id.jpg'}}
            style={{width: wp(50), height: hp(10), resizeMode: 'contain'}}
          />
        </View>
        <View style={style.TextArea_Search_id}>
          <Text style={style.Text_Search_id}>
            {' '}
            이름과 이메일을 입력해주세요.
          </Text>
        </View>
      </View>

      <View style={style.form_Search_id}>
        <View style={style.formArea_Search_id}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.Text_Search_id}> 이름 </Text>
            <TextInput
              style={style.textFormAlone_Search_id}
              onChangeText={userName => setUserName(userName)}
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
        </View>

        <View style={style.formArea_Search_id}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.Text_Search_id}>이메일 </Text>
            <TextInput
              style={style.textFormAlone_Search_id}
              onChangeText={userEmail => setUserEmail(userEmail)}
              returnKeyType="next"
              keyboardType="email-address"
              blurOnSubmit={false}
            />
            <View style={style.EmailCheck_Search_id}>
              <TouchableOpacity onPress={authSubmitButton}>
                <Text style={{color: 'white'}}>번호 받기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={style.TextValidation_Search_id}>
            인증번호를 입력해주세요.
          </Text>
        </View>
        <View style={style.formArea_Search_id}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.Text_Search_id}> </Text>
            <TextInput
              style={style.textFormAlone_Search_id}
              placeholder={'인증번호 6자리 입력'}
              onChangeText={auth => setAuth(auth)}
              keyboardType="number-pad"
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <View style={style.EmailCheck_Search_id}>
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
