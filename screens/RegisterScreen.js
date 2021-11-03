import React, {useState, createRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import style from '../global/style';
import Loader from '../components/Loader';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

export default function RegisterScreen({navigation}) {
  const [userName, setUserName] = useState(''); //이름
  const [userNick, setUserNick] = useState(''); //닉네임
  const [userId, setUserId] = useState(''); // 아이디
  const [userPassword, setUserPassword] = useState(''); //패스워드
  const [userPasswordchk, setUserPasswordchk] = useState(''); // 패스워드 확인
  const [userEmail, setUserEmail] = useState(''); // 이메일
  const [loading, setLoading] = useState(false); // Database loding
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false); // 회원가입 성공 여부
  const [useridCheck, setUseridCheck] = useState(''); //아이디 중복체크 결과값 저장 변수
  const [ischecked, setIschecked] = useState(false); //중복 체크 버튼을 눌렀는지, 안 눌렀는지 + 중복 체크

  const DataSet = require('../global/DataSet');

  const idInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordchkInputRef = createRef();
  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const nickInputRef = createRef();

  //-------------------------정규표현식-------------------------------------------------

  var id_rule = /^([a-z0-9_]){5,25}$/; // id 5~25자
  var password_rule = /^(?=.*[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  var email_rule =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  var name_rule = /^[ㄱ-힣a-zA-Z]/gi;
  var nick_rule = /^[ㄱ-힣a-zA-Z0-9]/gi;

  //-------------------------아이디 중복 체크 함수 --------------------------------------

  const IdOverlabCheck = async () => {
    // 빈 문자열이면 바로 리턴
    if (userId === '') {
      return;
    }
    // 중복체크 버튼을 눌렸는 지 확인
    setIschecked(true);
    // DB 연결 전 loading 시작
    setLoading(true);
    //아이디 중복 체크 쿼리
    let ID_overlab_check = {
      qry: 'SELECT * FROM member where user_id="' + userId + '"',
    };
    let result = await DataSet.overlabCheck(ID_overlab_check);
    if (Number(result)) {
      //중복된 아이디가 있을 때
      setUseridCheck(true);
    } else {
      //중복된 아이디가 없을 때
      setUseridCheck(false);
    }
    // DB 연결 후 loading 해제
    setLoading(false);
  };

  //-------------------------회원가입 함수----------------------------------------------

  const handleSubmitButton = () => {
    // 사용자 입력 값 및 중복 확인 체크
    if (!userId) {
      alert('아이디를 입력해주세요');
      return;
    }
    if (!id_rule.test(userId)) {
      alert('아이디를 형식에 맞게 입력해주세요.');
      return false;
    }
    if (!ischecked) {
      alert('아이디 중복 확인을 해주세요.');
      return;
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

    // DB 연결 전 loading 시작
    setLoading(true);

    console.log(userId);
    console.log(userId);
    console.log(userId);
    console.log(userId);
    console.log(userId);

    // DB에 보낼 Dataset
    let userData = {
      qry:
        'INSERT INTO member (user_id, user_pw, user_name, user_nickname, user_email, user_bookmark) VALUES ("' +
        userId +
        '", "' +
        userPassword +
        '", "' +
        userName +
        '", "' +
        userNick +
        '", "' +
        userEmail +
        '", NULL)',
    };

    let newRef = {
      qry:
        'CREATE TABLE ' +
        userId +
        '(no int AUTO_INCREMENT,ingredient_name varchar(100),ingredient_vol int,ingredient_buyDate varchar(100),ingredient_expiryDate varchar(100),ingredient_type varchar(100),ingredient_imgPath varchar(500),ingredient_delChecked tinyint(1),primary key (no))',
    };

    DataSet.setData(userData);
    //멤버 DB insert
    DataSet.setData(newRef);
    //냉장고 생성

    // DB 연결 후 loading 해제
    setLoading(false);

    // 회원가입 성공
    setIsRegistraionSuccess(true);
  };

  //---------------------------UI 부분-------------------------------------------------

  // 회원가입 후
  if (isRegistraionSuccess) {
    return (
      <ScrollView style={style.container_RegisterScreen}>
        <View style={style.successImgView_RegisterScreen}>
          <Image
            source={{uri: 'http://54.180.126.3/img/checked.png'}}
            style={style.successImg_RegisterScreen}
          />
        </View>
        <View style={style.successTextView_RegisterScreen}>
          <Text style={style.Text_RegisterScreen}>
            회원가입이 완료되었습니다.
          </Text>
        </View>
        <View style={style.btnArea_RegisterScreen}>
          <TouchableOpacity
            style={[style.btn_RegisterScreen, {width: '40%'}]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={[style.Text_RegisterScreen, {color: 'white'}]}>
              로그인 화면으로
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  // 회원가입 전
  else {
    return (
      <ScrollView style={style.container_RegisterScreen}>
        <Loader loading={loading} />
        <View style={style.titleArea_RegisterScreen}>
          <Image
            source={{uri: 'http://54.180.126.3/img/register.jpg'}}
            style={style.img_RegisterScreen}
          />
        </View>
        <Text style={style.Text_RegisterScreen}>냉장고 관리, 레시피 추천</Text>
        <Text style={style.Text_RegisterScreen}>냉부해를 사용해보세요 🥕</Text>

        <View style={[style.formArea_RegisterScreen, {paddingBottom: hp(1)}]}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={style.textFormAlone_RegisterScreen}
              placeholder={'아이디(5자 이상, 영문, 숫자)'}
              onChangeText={userId => setUserId(userId)}
              ref={idInputRef}
              returnKeyType="done"
            />
            <View style={style.idCheck_RegisterScreen}>
              <TouchableOpacity onPress={IdOverlabCheck}>
                <Text style={{color: 'white', fontSize: wp('3.5%')}}>
                  중복 체크
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          {ischecked ? (
            useridCheck ? (
              <Text style={style.TextValidation_RegisterScreen}>
                중복된 아이디입니다.
              </Text>
            ) : (
              <Text style={style.TextValidation_RegisterScreen}>
                사용 가능한 아이디입니다.
              </Text>
            )
          ) : null}
        </View>

        <View style={[style.formArea_RegisterScreen, , {paddingBottom: hp(1)}]}>
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
          />
          <TextInput
            style={style.textFormBottom_RegisterScreen}
            secureTextEntry={true}
            placeholder={'비밀번호 확인'}
            onChangeText={userPasswordchk =>
              setUserPasswordchk(userPasswordchk)
            }
            ref={passwordchkInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              nameInputRef.current && nameInputRef.current.focus()
            }
          />
        </View>
        <View style={{justifyContent: 'center'}}>
          {userPassword !== userPasswordchk ? (
            <Text style={style.TextValidation_RegisterScreen}>
              비밀번호가 일치하지 않습니다.
            </Text>
          ) : null}
        </View>

        <View style={[style.formArea_RegisterScreen, , {paddingBottom: hp(5)}]}>
          <TextInput
            style={style.textFormTop_RegisterScreen}
            placeholder={'이름'}
            onChangeText={userName => setUserName(userName)}
            ref={nameInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              nickInputRef.current && nickInputRef.current.focus()
            }
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
          />
          <TextInput
            style={style.textFormBottom_RegisterScreen}
            placeholder={'이메일'}
            keyboardType="email-address"
            returnKeyType="send"
            onChangeText={userEmail => setUserEmail(userEmail)}
            ref={emailInputRef}
          />
        </View>

        <View style={style.btnArea_RegisterScreen}>
          <TouchableOpacity
            style={[style.btn_RegisterScreen, {width: '100%'}]}
            onPress={handleSubmitButton}>
            <Text style={[style.Text_RegisterScreen, {color: 'white'}]}>
              회원가입
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  //-----------------------------------------------------------------------------------
}
