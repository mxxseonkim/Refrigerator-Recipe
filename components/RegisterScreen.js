import React, {useState, createRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import 'react-native-gesture-handler';
/// import RNPickerSelect from 'react-native-picker-select';
// import Loader from './Components/Loader';

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
  Pressable,
  Alert,
} from 'react-native';

function RegisterScreen({navigation}) {
  const [userName, setUserName] = useState('');
  const [userNick, setUserNick] = useState('');
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordchk, setUserPasswordchk] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [errortext2, setErrortext2] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(true);

  const [useridCheck, setUseridCheck] = useState('');
  const [ischecked, setIschecked] = useState(false);
  //아이디 중복체크 결과값 저장 변수

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
    setIschecked(true);
    let ID_overlab_check = {
      qry: 'SELECT * FROM member where mem_userid="' + userId + '"',
      //아이디 중복 체크 쿼리
    };
    let result = await DataSet.overlabCheck(ID_overlab_check);
    console.log(Number(result));
    if (Number(result)) {
      //중복된 아이디가 있을 때
      setUseridCheck(false);
    } else {
      //중복된 아이디가 없을 때
      setUseridCheck(true);
    }
  };

  const handleSubmitButton = () => {
    setErrortext('');

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
    if (Boolean(useridCheck)) {
      Alert.alert(
        '경고',
        '중복된 아이디가 존재합니다. 아이디를 다시 입력해주세요.',
      );
      return;
    }

    //Show Loader
    setLoading(true);

    var data = {
      user_id: userId,
      user_email: userEmail,
      user_password: userPassword,
      user_realname: userName,
      user_nickname: userNick,
      user_profilcontent: 'NULL',
      user_icon: 'NULL',
      user_photo: 'NULL',
    };

    //data 변수에 더 추가해야할 것 -> 자기소개, 아이콘

    DataSet.memberCreate(data);
    //멤버 DB insert & 냉장고 테이블 생성
    console.log('성공');

    setIsRegistraionSuccess(true);
    // var formBody = [];
    // for (var key in dataToSend) {
    //   var encodedKey = encodeURIComponent(key);
    //   var encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');

    // fetch('http://localhost:3001/api/user/register', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //Hide Loader
    //     setLoading(false);
    //     setErrortext2('');
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status === 'success') {
    //       setIsRegistraionSuccess(true);
    //       console.log('Registration Successful. Please Login to proceed');
    //     } else if (responseJson.status === 'duplicate') {
    //       setErrortext2('이미 존재하는 아이디입니다.');
    //     }
    //   })
    //   .catch((error) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
  };

  if (isRegistraionSuccess) {
    return (
      <ScrollView style={styles.container}>
        <View style={{flex: 1}}>
          <View
            style={{
              paddingTop: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
              paddingRight: wp(1.5),
            }}>
            <Image
              source={{uri: 'http://3.35.18.154/img/checked.png'}}
              style={{
                width: wp(30),
                height: hp(30),
                resizeMode: 'contain',
                alignSelf: 'center',
                //backgroundColor: 'red',
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
            <View style={styles.btnArea}>
              <TouchableOpacity
                style={styles.btn2}
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
    <ScrollView style={styles.container}>
      {/* <Loader loading={loading} /> */}
      <View style={styles.topArea}>
        <View style={styles.titleArea}>
          <Image
            source={{uri: 'http://3.35.18.154/img/register.jpg'}}
            style={{width: wp(50), height: hp(10), resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.TextArea}>
          <Text style={styles.Text}>냉장고 관리, 레시피 추천</Text>
          <Text style={styles.Text}>냉부해를 사용해보세요 📘</Text>
        </View>
      </View>

      <View style={styles.formArea}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.textFormAlone}
            placeholder={'아이디(5자 이상, 영문, 숫자)'}
            onChangeText={userId => setUserId(userId)}
            ref={idInputRef}
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <View style={styles.idCheck}>
            <TouchableOpacity>
              <Text style={{color: 'white'}}>중복 체크</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{justifyContent: 'center'}}>
        {ischecked ? (
          useridCheck ? (
            <Text style={styles.TextValidation}>사용 가능한 아이디입니다.</Text>
          ) : (
            <Text style={styles.TextValidation}>중복된 아이디입니다.</Text>
          )
        ) : null}
      </View>
      <View style={styles.formArea}>
        <TextInput
          style={styles.textFormTop}
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
          style={styles.textFormBottom}
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
          <Text style={styles.TextValidation}>
            비밀번호가 일치하지 않습니다.
          </Text>
        ) : null}
      </View>

      <View style={styles.formArea2}>
        <TextInput
          style={styles.textFormTop}
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
          style={styles.textFormMiddle}
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
          style={styles.textFormBottom}
          placeholder={'이메일'}
          keyboardType="email-address"
          returnKeyType="send"
          onChangeText={userEmail => setUserEmail(userEmail)}
          ref={emailInputRef}
          //blurOnSubmit={false}
        />
      </View>

      <View style={{flex: 0.7, justifyContent: 'center'}}>
        {errortext2 !== '' ? (
          <Text style={styles.TextValidation}>{errortext2}</Text>
        ) : null}
      </View>

      <View style={{flex: 0.75}}>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={handleSubmitButton}>
            <Text style={{color: 'white', fontSize: wp('4%')}}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 3}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    //flex: 0.5,
    paddingTop: wp(1),
  },
  titleArea: {
    //flex: 0.1,
    justifyContent: 'center',
    paddingBottom: wp(3),
  },
  TextArea: {
    // flex: 0.5,
    justifyContent: 'center',
    //paddingTop: hp(),
  },

  Text: {
    fontSize: wp('5%'),
    //paddingTop: wp(),
  },
  TextValidation: {
    fontSize: wp('4%'),
    color: 'red',
    marginBottom: hp(-3),
    paddingTop: hp(1),
    paddingBottom: hp(1),
  },

  formArea: {
    justifyContent: 'center',
    paddingTop: wp(5),
    paddingBottom: wp(1),
    // backgroundColor: 'red',
    marginBottom: hp(-1),
  },

  formArea2: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingTop: wp(5),
    paddingBottom: hp(5),
    marginBottom: hp(-1),
    // alignSelf: 'stretch',
  },

  textFormAlone: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'black',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 7,
    width: '77%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },

  idCheck: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'black',
    backgroundColor: 'black',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 0,
    width: '23%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },

  textFormTop: {
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: 'black',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormMiddle: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormBottom: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: 'black',
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnArea: {
    height: hp(8),
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1.5),
  },
  btn: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  btn2: {
    flex: 1,
    width: '40%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inputIOS: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: 'black',
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default RegisterScreen;
