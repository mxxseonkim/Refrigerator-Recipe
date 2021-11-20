import React, { useEffect, useState } from 'react';
import { TextInput, Modal, StyleSheet, Pressable, View, ScrollView, Text, FlatList, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import style from '../global/style';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ClientScreen({ navigation }) {
  //DB에서 데이터가져오기 - 닉네임, 자기소개
  const [uri, seturi] = useState('http://54.180.126.3/img/user.png');
  const [memPw, setMemPw] = useState('');
  //회원 비밀번호 (DB에 있는 회원 비밀번호 받아오기)
  const [memRecentPw, setMemRecentPw] = useState('');
  //현재 비밀번호 (회원 비밀번호와 일치하는지 확인용)
  const [memNewPw, setMemNewPw] = useState('');
  //새 비밀번호
  const [memNewPwchk, setMemNewPwchk] = useState('');
  //새 비밀번호 확인 
  const [memEmail, setMemEmail] = useState('');
  //회원 이메일
  const [memName, setMemName] = useState('');
  //회원 이름
  const [memNickname, setMemNickname] = useState('');
  //회원 닉네임
  const [data, onSetData] = useState({});
  //DB에서 가져온 json을 객체로 변환
  const [modalMoVisible, setModalMoVisible] = useState(false);
  //프로필 수정 modal
  const [modalChaVisible, setModalChaVisible] = useState(false);
  //비밀번호 변경 modal

  const DataSet = require('../global/DataSet');
  const memberID = require('../global/Global');

  var nick_rule = /^[ㄱ-힣a-zA-Z0-9]/gi;
  var email_rule =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  var password_rule = /^(?=.*[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  // Select

  useEffect(async () => {
    let memData = {
      qry: "SELECT * FROM member WHERE user_id ='" + memberID.userID + "'",
    };
    console.log(memData.qry);
    let json = await DataSet.getData(memData);
    onSetData(json[0]);
    // console.log(json);
    // if (json !== false) {
    //   console.log('여기나옴 2');
    //   onSetData(json[0]);
    // } else {
    //   onSetData([]);
    // }
  }, []);

  useEffect(() => {
    console.log(data);
    console.log('여기 나옴?');
    setMemPw(data.user_pw);
    console.log(data.user_pw)
    setMemEmail(data.user_email);
    setMemName(data.user_name);
    setMemNickname(data.user_nickname);
  }, [data])

  // -------------------- 갤러리에서 사진 선택해서 설정 --------------------------
  const pickImage = () => {
    ImagePicker.openPicker({ width: 120, height: 120, cropping: true }).then(
      image => {
        //갤러리에서 받은 이미지 경로로 설정
        seturi(image.path);
      },
    );
  };

  // -------------------- 회원 menu - flatlist에 들어가는 부분 -------------------

  const menu = [
    { key: 0, menu: '프로필 수정' },
    { key: 1, menu: '비밀번호 변경' },
    { key: 2, menu: '회원 탈퇴' },
    { key: 3, menu: '로그아웃' }
  ];

  const clickMenu = key => {
    if (key == 0) {
      setModalMoVisible(true);
    } else if (key == 1) {
      setModalChaVisible(true);
    } else if (key == 2) {
      /*회원 탈퇴 메뉴 눌렀을 때*/
      Alert.alert(
        '정말 탈퇴하시겠습니까?',
        '탈퇴 시, ' + memberID.userID + '님의 정보는 복구되지 않습니다.',
        [
          {
            text: '네',
            onPress: async () => {
              let memDrop = {
                qry: 'DROP TABLE ' + memberID.userID,
              }; //냉장고 테이블 삭제
              let memDelete = {
                qry:
                  "DELETE FROM `member` WHERE user_id='" +
                  memberID.userID +
                  "'",
              }; //냉장고 테이블 삭제
              DataSet.setData(memDrop);
              DataSet.setData(memDelete);
              Alert.alert('안내', '탈퇴 완료.');
              try {
                await AsyncStorage.removeItem('user_id');
              } catch (e) {
                console.log(e);
              }
              navigation.navigate('Auth', {
                screen: 'Login',
              });
            },
          },
          {
            text: '아니요',
            onPress: () =>
              Alert.alert(
                '안내',
                '그래요, 우리 좀  더 함께해요. 제가 더  잘할게요.',
              ),
          },
        ],
      );
    } else if (key == 3) {
      Alert.alert(
        '로그아웃',
        '정말 로그아웃 하시겠습니까?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
          },
          {
            text: 'OK',
            onPress: async () => {
              // 로그아웃이기 때문에 로컬에 user_id를 삭제하고
              // Login 스크린으로 돌아감
              try {
                await AsyncStorage.removeItem('user_id');
              } catch (e) {
                console.log(e);
              }
              navigation.navigate('Auth', {
                screen: 'Login',
              });
            },
          },
        ],
        { cancelable: false },
      )
    }
  };

  const modifyNoButton = () => {
    setModalMoVisible(false);
    setMemNickname(data.user_nickname);
    setMemEmail(data.user_email);
  }

  const modifyYesButton = () => {
    if (!memNickname) {
      alert('변경할 닉네임을 입력해주세요');
      return;
    }
    if (!nick_rule.test(memNickname)) {
      alert('변경할 닉네임을 형식에 맞게 입력해주세요.');
      return false;
    }
    if (!memEmail) {
      alert('변경할 이메일을 입력해주세요');
      return;
    }
    if (!email_rule.test(memEmail)) {
      alert('변경할 이메일을 형식에 맞게 입력해주세요.');
      return false;
    }

    let ChangeInfo = {
      qry:
        'UPDATE member SET user_nickname = "' + memNickname + '", user_email = "' + memEmail + '" where user_id = "' + memberID.userID + '"',
    };

    DataSet.setData(ChangeInfo);

    setModalMoVisible(false);
  }

  const ChangeNoButton = () => {
    setModalChaVisible(false);
    setMemPw(data.user_pw);
  }

  const ChangeYesButton = () => {
    if (memPw != memRecentPw) {
      alert('입력하신 비밀번호가 맞지 않습니다.');
      return;
    }
    if (!memNewPw) {
      alert('변경할 비밀번호를 입력해주세요');
      return;
    }
    if (!password_rule.test(memNewPw)) {
      alert('변경할 비밀번호를 형식에 맞게 입력해주세요.');
      return false;
    }
    if (memNewPw != memNewPwchk) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }


    let ChangePw = {
      qry:
        'UPDATE member SET user_pw = "' + memNewPw + '" where user_id = "' + memberID.userID + '"',
    };

    DataSet.setData(ChangePw);

    setModalChaVisible(false);

  }



  // ------------------------------ UI 부분 ------------------------------------

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={style.menuItem_ClientScreen}
        onPress={() => clickMenu(item.key)}>
        <Icon
          name={
            Platform.OS === 'ios' ? 'ios-settings-sharp' : 'md-settings-sharp'
          }
          style={style.menuItemIcon_ClientScreen}
        />
        <Text style={style.menuItemText_ClientScreen}>{item.menu}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={style.profile_ClientScreen}>
        <Image style={style.img_ClientScreen} source={{ uri: uri }} />
        <View>
          <Text style={style.name_ClientScreen}>{memName}</Text>
          <Text style={style.text_ClientScreen}>{memNickname}</Text>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalMoVisible}
          onRequestClose={() => {
            setModalMoVisible(!modalMoVisible);
          }}>
          <ScrollView style={styles.container_ClientScreen}>
            <View style={styles.topView_ClientScreen}>
              <Text style={styles.topText_ClientScreen}>
                개인정보 수정
              </Text>
            </View>
            <View style={styles.pickImage_ClientScreen}>
              <Pressable onPress={pickImage}>
                <Image style={style.pic_ClientScreen} source={{ uri: uri }} />
              </Pressable>
            </View>
            <View style={styles.info_ClientScreen}>
              <Text style={styles.Text_ClientScreen}>
                이름
              </Text>
              <TextInput
                style={styles.textForm_ClientScreen}
                placeholder={memName}
                //autoCorrect={false}
                backgroundColor='#E5E4E2'
                editable={false}
                placeholderTextColor='black'
                //onChangeText={memName => setMemNickname(memName)}
                returnKeyType="done"
              />
            </View>
            <View style={styles.info_ClientScreen}>
              <Text style={styles.Text_ClientScreen}>
                아이디
              </Text>
              <TextInput
                style={styles.textForm_ClientScreen}
                placeholder={memberID.userID}
                //autoCorrect={false}
                editable={false}
                backgroundColor='#E5E4E2'
                placeholderTextColor='black'
                onChangeText={memNickname => setMemNickname(memNickname)}
                returnKeyType="done"
              />
            </View>
            <View style={styles.info_ClientScreen}>
              <Text style={styles.Text_ClientScreen}>
                이메일
              </Text>
              <TextInput
                style={styles.textForm_ClientScreen}
                //placeholder={memEmail}
                //autoCorrect={false}
                backgroundColor='white'
                placeholderTextColor='black'
                defaultValue={memEmail}
                onChangeText={memEmail => setMemEmail(memEmail)}
                returnKeyType="done"
              />
            </View>
            <View style={styles.info_ClientScreen}>
              <Text style={styles.Text_ClientScreen}>
                닉네임
              </Text>
              <TextInput
                style={styles.textForm_ClientScreen}
                //placeholder={memNickname}
                //autoCorrect={false}
                backgroundColor='white'
                defaultValue={memNickname}
                onChangeText={memNickname => setMemNickname(memNickname)}
                returnKeyType="done"
                placeholderTextColor='black'
              />
            </View>
            <View style={styles.btnArea_ClientScreen}>
              <Pressable
                style={styles.btn1_ClientScreen}
                onPress={modifyNoButton}
              >
                <Text style={(styles.Text_ClientScreen, { color: 'white', fontSize: wp('4.5%') })}>
                  취소
                </Text>
              </Pressable>
              <Pressable
                style={styles.btn2_ClientScreen}
                onPress={modifyYesButton}
              >
                <Text style={(styles.Text_ClientScreen, { color: 'white', fontSize: wp('4.5%') })}>
                  수정
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </Modal>
        {/* --------------------------------------------- 여기부터 비밀번호 변경 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalChaVisible}
          onRequestClose={() => {
            setModalChaVisible(!modalChaVisible);
          }}>
          <ScrollView style={styles.container_ClientScreen}>
            <View style={styles.Change_ClientScreen}>
              <Text style={styles.Title_ClientScreen}>
                비밀번호 변경
              </Text>
            </View>
            <View style={styles.info_ClientScreen}>
              <Text style={styles.Text_ClientScreen}>
                현재 비밀번호
              </Text>
              <TextInput
                style={styles.textForm2_ClientScreen}
                //placeholder={"현재 비밀번호"}
                //autoCorrect={false}
                backgroundColor='white'
                editable={true}
                placeholderTextColor='#D1D0CE'
                onChangeText={memRecentPw => setMemRecentPw(memRecentPw)}
                returnKeyType="done"
              />
            </View>
            <View style={styles.info_ClientScreen}>
              <Text style={styles.Text_ClientScreen}>
                새 비밀번호
              </Text>
              <TextInput
                style={styles.textForm2_ClientScreen}
                placeholder={'비밀번호(4자 이상,영문,숫자 포함)'}
                //autoCorrect={false}
                editable={true}
                backgroundColor='white'
                placeholderTextColor='#D1D0CE'
                onChangeText={memNewPw => setMemNewPw(memNewPw)}
                returnKeyType="done"
              />
            </View>
            <View style={styles.info_ClientScreen}>
              <Text style={styles.Text_ClientScreen}>
                새 비밀번호 확인
              </Text>
              <TextInput
                style={styles.textForm2_ClientScreen}
                //placeholder={memEmail}
                //autoCorrect={false}
                backgroundColor='white'
                placeholderTextColor='#D1D0CE'
                //defaultValue={memEmail}
                onChangeText={memNewPwchk => setMemNewPwchk(memNewPwchk)}
                returnKeyType="done"
              />
            </View>
            <View style={styles.btnArea_ClientScreen}>
              <Pressable
                style={styles.btn1_ClientScreen}
                onPress={ChangeNoButton}
              >
                <Text style={(styles.Text_ClientScreen, { color: 'white', fontSize: wp('4.5%') })}>
                  취소
                </Text>
              </Pressable>
              <Pressable
                style={styles.btn2_ClientScreen}
                onPress={ChangeYesButton}
              >
                <Text style={(styles.Text_ClientScreen, { color: 'white', fontSize: wp('4.5%') })}>
                  변경
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </Modal>
      </View>


      <View style={style.menuList_ClientScreen}>
        <FlatList
          data={menu}
          renderItem={renderItem}
          keyExtract={item => item.key}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container_ClientScreen: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },

  pickImage_ClientScreen: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },

  Text_ClientScreen: {
    fontSize: wp('4%'),
    marginTop: 5,
  },

  info_ClientScreen: {
    flexDirection: 'column',
  },

  textForm_ClientScreen: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#D1D0CE',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 13,
    paddingRight: 10,
    marginTop: 7,
    marginBottom: 10,
    fontSize: 18,
  },

  btnArea_ClientScreen: {
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1.5),
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
  },
  btn1_ClientScreen: {
    flex: 1,
    width: '20%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA8072',
    marginRight: 15,
    marginLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  btn2_ClientScreen: {
    flex: 1,
    width: '20%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA8072',
    marginRight: 30,
    marginLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },

  Change_ClientScreen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
    marginBottom: 30,
  },

  Title_ClientScreen: {
    color: 'black',
    fontSize: wp('8%'),
  },

  topView_ClientScreen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  topText_ClientScreen: {
    color: 'black',
    fontSize: wp('6%'),
  },

  textForm2_ClientScreen: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#D1D0CE',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 13,
    paddingRight: 10,
    marginTop: 7,
    marginBottom: 30,
    fontSize: 18,
  },
});
