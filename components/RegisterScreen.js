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
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  
    const idInputRef = createRef();
    const passwordInputRef = createRef();
    const passwordchkInputRef = createRef();
    const nameInputRef = createRef();
    const emailInputRef = createRef();
    const nickInputRef = createRef();
  
    const handleSubmitButton = () => {
      setErrortext('');

      if (!userId) {
        alert('id를 입력해주세요');
        return;
      } 
      if (!userPassword) {
        alert('비밀번호를 입력해주세요');
        return;
      }
      if (userPasswordchk != userPassword) {
        alert('비밀번호가 일치하지 않습니다');
        return;
      }
      if (!userName) {
        alert('이름을 입력해주세요');
        return;
      }
      if (!userNick) {
        alert('닉네임을 입력해주세요');
        return;
      }
      if (!userEmail) {
        alert('이메일을 입력해주세요');
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
      };

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
        <View style={styles.container}>
          <View style={{flex: 1}} />
          <View style={{flex: 2}}>
            <View
              style={{
                height: hp(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('C:/Users/Administrator/react-native/Refrigerator-recipe/Refrigerator-Recipe/imageSrc/register.jpg')}
                style={{
                  height: wp(20),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </View>
            <View
              style={{
                height: hp(7),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontSize: wp('4%')}}>
                회원가입이 완료되었습니다.
              </Text>
            </View>
            <View style={{flex: 0.75, paddingTop: hp(4)}}>
          <View style={styles.btnArea}>
            <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('Login')}>
              <Text style={{color: 'white', fontSize: wp('4%')}}>로그인 화면으로</Text>
            </TouchableOpacity>
          </View>
        </View>
  
            {/* <View style={{height: hp(20), justifyContent: 'center'}}>
              <View style={styles.btnArea}>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.5}
                  onPress={() => props.navigation.navigate('Login')}>
                  <Text style={{color: 'white', fontSize: wp('4%')}}>
                    로그인하기
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {/* <Loader loading={loading} /> */}
        <View style={styles.topArea}>
          <View style={styles.titleArea}>
            <Image
              source={require('C:/Users/Administrator/react-native/Refrigerator-recipe/Refrigerator-Recipe/imageSrc/register.jpg')}
              style={{width: wp(40), resizeMode: 'contain'}}
            />
          </View>
          <View style={styles.TextArea}>
            <Text style={styles.Text}>회원가입하여 냉장고 관리, 레시피 추천</Text>
            <Text style={styles.Text}>냉부해를 사용해보세요 ‍📘</Text>
          </View>
        </View>
  
        <View style={styles.formArea}>
          <TextInput
            style={styles.textFormTop}
            placeholder={'아이디(5자 이상, 영문, 숫자)'}
            onChangeText={(userId) => setUserId(userId)}
            ref={idInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
            {/* <TouchableOpacity style={styles.btn2}>
              <Text style={{color: 'white', fontSize: wp('4%')}}>중복확인</Text>
            </TouchableOpacity> */}
          <TextInput
            style={styles.textFormMiddle}
            secureTextEntry={true}
            placeholder={'비밀번호(8자 이상)'}
            onChangeText={(userPassword) => setUserPassword(userPassword)}
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
            onChangeText={(userPasswordchk) =>
              setUserPasswordchk(userPasswordchk)
            }
            ref={passwordchkInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              nameInputRef.current && nameInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
        </View>
  
        <View style={{flex: 0.5, justifyContent: 'center'}}>
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
            onChangeText={(userName) => setUserName(userName)}
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
            onChangeText={(userNick) => setUserNick(userNick)}
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
            onChangeText={(userEmail) => setUserEmail(userEmail)}
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
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1, //전체의 공간을 차지한다는 의미
      flexDirection: 'column',
      backgroundColor: 'white',
      paddingLeft: wp(7),
      paddingRight: wp(7),
    },
    topArea: {
      flex: 1.3,
      paddingTop: wp(10),
    },
    titleArea: {
      flex: 0.3,
      justifyContent: 'center',
      paddingTop: wp(2),
    },
    TextArea: {
      flex: 0.7,
      justifyContent: 'center',
      paddingTop: wp(3),
    },
    
    Text: {
      fontSize: wp('5%'),
      //paddingTop: wp(),
    },
    TextValidation: {
      fontSize: wp('4%'),
      color: 'red',
      paddingTop: wp(2),
      marginBottom: hp(-4),
    },
  
    formArea: {
      flex: 4,
      justifyContent: 'center',
      paddingTop: wp(5),
      // backgroundColor: 'red',
      marginBottom: hp(-5),
    },
  
    formArea2: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'red',
      marginBottom: hp(-2),
      // alignSelf: 'stretch',
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