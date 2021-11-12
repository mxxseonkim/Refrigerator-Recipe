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

  const [displayTimer, setDisplaTimer] = useState('');
  const [checkState, setCheckState] = useState('');
  const [timerOver, setTimerOver] = useState(false);
  const [tmpPW, setTmpPW] = useState('');
  const [number, setNumber] = useState('');

  const DataSet = require('../global/DataSet');

  var timer;
  var isRunning = false;

  // 인증번호 확인 제한시간 타이머
  const sendAuthNum = () => {
    var leftSec = 180; //남은시간
    //display = document.querySelector('#timer');
    //이미 타미머가 작동중이라면 중지.
    if (isRunning){
      clearInterval(timer);
    }
    startTimer(leftSec);
  };


  // 타이머 함수
const startTimer = (count) => {
    var minutes, seconds;
    timer = setInterval(function () {
    minutes = parseInt(count / 60, 10);
    seconds = parseInt(count % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    setDisplaTimer(minutes + ":" + seconds);
    //display.textContent = minutes + ":" + seconds;
    // 타이머 끝
    if (--count < 0) {
      clearInterval(timer);
      //display.textContent = "";
      setDisplaTimer("00:00");
      isRunning = false;
      setTimerOver(true);
    }
    }, 1000);
    }

  const authSubmitButton = async () => {
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
    setCheckState('인증번호를 입력해주세요.');
    sendAuthNum();
    console.log(userEmail);
    let sendEmail = {
        email : userEmail,
    };
    let result = await DataSet.sendUserEmail(sendEmail);
    setNumber(result.toString());
    console.log(number);
  };

  const checkSubmitButton = async () => {
    if(auth==number&&timerOver==false){
      var newPassword;
      var randomValue = "abcdefghijklmnopqrstuvwxyz0123456789";
      for(i=1; i<=8; i++){
        randomPoint = Math.round(Math.random()*34+1);
        Pwdchar = randomValue.charAt(randomPoint);
        if(i == 1){
          newPassword = Pwdchar;
        }else{
          newPassword += Pwdchar;
        }
       }
      var num = '';
      for (let i=0;i<4;i++){
        num += Math.floor(Math.random()*10)
      }
      newPassword = newPassword + num;
      let updatePW = {
        qry: "UPDATE `member` SET `user_pw` = '"+newPassword+"' WHERE `member`.`user_id` = '"+route.params.userId+"'",
      };
      DataSet.setData(updatePW);
      setTmpPW(newPassword);
      setIsPwSuccess(true);
    }
    else if(auth==number&&timerOver == true){
      setCheckState('시간이 초과했습니다. 다시 시도해주세요.');
    }
    else{
      setCheckState('인증번호가 틀렸습니다. 다시 입력해주세요.');
    }
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
              {tmpPW}
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
            <Text style={style.Text_Search_pw}> 이름     </Text>
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
            <Text style={style.Text_Search_pw}> 이메일 </Text>
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
        <View style={{justifyContent: 'center'}, {flexDirection: 'row'}}>
          <Text style={style.TextValidation_Search_id}>
            {checkState}
          </Text>
          <Text style={style.Timer_Search_id}>
            {displayTimer}
          </Text>
        </View>
        <View style={style.formArea_Search_pw}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.Text_Search_pw}> </Text>
            <TextInput
              style={style.textFormAlone2_Search_pw}
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
            <View style={{justifyContent: 'center'}}>
              <Text>
                {displayTimer}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
