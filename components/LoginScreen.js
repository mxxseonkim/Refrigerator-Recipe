import React, {useState, createRef, useEffect} from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native';

function LoginScreen({navigation}) {
  const [userId, setUserId] = useState('');
const [userPassword, setUserPassword] = useState('');
const [loading, setLoading] = useState(false);
const [errortext, setErrortext] = useState('');
const passwordInputRef = createRef();

const handleSubmitButton = () => {
  if (!userId) {
    alert('아이디를 입력해주세요');
    return;
  } 
  if (!userPassword) {
    alert('비밀번호를 입력해주세요');
    return;
  }
}
    return (
        <ScrollView style={styles.container}>
            <View style={styles.topArea}>
                <View style={styles.titleArea}>
                    <Image
                        source={require('C:/Users/Administrator/react-native/Refrigerator-recipe/Refrigerator-Recipe/imageSrc/login.jpg')}
                        style={{ width: wp(35), resizeMode: 'contain'}}
                    />
                </View>
                <View style={styles.TextArea}>
                    <Text style={[styles.Text, {paddingLeft: wp(1)}]}>앱을 이용하기 위해</Text>
                    <Text style={[styles.Text, {paddingLeft: wp(1)}]}>로그인이 필요해요</Text>
                </View>
            </View>
            <View style={styles.formArea}>
                <TextInput style={styles.textFormTop} 
                placeholder={'아이디'}
                onChangeText={(userId) => setUserId(userId)}
                autoCapitalize="none"
                ref={passwordInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()}
                underlineColorAndroid="#f000"
                blurOnSubmit={false}/>
                <TextInput style={styles.textFormBottom} placeholder={'비밀번호'}
                onChangeText={(userPassword) => setUserPassword(userPassword)}
                autoCapitalize="none"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                />
                <Text style={styles.TextValidation}>유효하지 않은 아이디입니다.</Text>
            </View>
            <View style={{flex: 0.75}}>
                <View style={styles.btnArea}>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmitButton}>
                        <Text style={(styles.Text, {color: 'white'})}>로그인</Text>
                    </TouchableOpacity>
                </View>
                <Text
                  style={styles.TextRegister}
                  onPress={() => navigation.navigate('Register')}>
                  처음이시라면, 회원가입이 필요해요
                  </Text>
            </View>
            <View style={{flex: 3}}/>
        </ScrollView>
    )
    
};

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      flexDirection: 'column',
      backgroundColor: 'white',
      paddingLeft: wp(7),
      paddingRight: wp(7),
    },
    topArea: {
      flex: 1.0,
      paddingTop: wp(2),
    },
    titleArea: {
      flex: 0.7,
      justifyContent: 'center',
      //paddingTop: wp(7),
    },
    TextArea: {
      flex: 0.3,
      justifyContent: 'center',
      backgroundColor: 'white',
      paddingBottom: hp(3),
    },
    Text: {
      fontSize: wp('4%'),
    },
    TextValidation: {
      fontSize: wp('4%'),
      color: 'red',
      paddingTop: wp(2),
      paddingBottom: hp(1),
    },
  
    formArea: {
      justifyContent: 'center',
      flex: 1.5,
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
    TextRegister: {
      fontSize: wp('4%'),
      color: 'grey',
      textDecorationLine: 'underline',
      paddingTop: wp(2),
    },
  });
  export default LoginScreen;