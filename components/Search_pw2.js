import React, { useState, createRef } from 'react';
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
import style from '../style';


function Search_pw2({ navigation }) {
    var email_rule =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [auth, setAuth] = useState('');
    const [isPwSuccess, setIsPwSuccess] = useState(false);
    const nameInputRef = createRef();
    const emailInputRef = createRef();

    const authSubmitButton = () => {
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
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            paddingTop: hp(5),
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingRight: wp(1.5),
                        }}>
                        <Image
                            source={{ uri: 'http://54.180.126.3/img/find_pw.jpg' }}
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
                            marginBottom: hp(3),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: 'black', fontSize: wp('4%') }}>
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
                        <Text style={{ color: 'black', fontSize: wp('4%'), marginRight: wp(1.5) }}>
                            회원님의 임시 비밀번호는
                        </Text>
                        <Text style={{ color: 'gray', fontSize: wp('4%'), marginRight: wp(1.5) }}>
                            password{/* 여기에 고객 임시 비밀번호 넣기 */}
                        </Text>
                        <Text style={{ color: 'black', fontSize: wp('4%') }}>
                            입니다.
                        </Text>
                    </View>
                    <View style={{ flex: 0.75, paddingTop: hp(5) }}>
                        <View style={style.btnArea_RegisterScreen}>
                            <TouchableOpacity
                                style={style.btn2_RegisterScreen}
                                onPress={() => navigation.navigate('Login')}>
                                <Text style={{ color: 'white', fontSize: wp('4%') }}>
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
                        //source={require('C:/Users/Administrator/react-native/Refrigerator-recipe/Refrigerator-Recipe/imageSrc/pw.jpg')}
                        style={{ width: wp(57), height: hp(10), resizeMode: 'contain' }}
                    />
                </View>
                <View style={styles.TextArea_Search_pw}>
                    <Text style={styles.Text_Search_pw}> 이름과 이메일을 입력해주세요.</Text>
                </View>
            </View>

            <View style={styles.form_Search_pw}>

                <View style={styles.formArea_Search_pw}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Text_Search_pw}>  이름     </Text>
                        <TextInput
                            style={styles.textFormAlone_Search_pw}
                            onChangeText={userName => setUserName(userName)}
                            onSubmitEditing={() =>
                                emailInputRef.current && emailInputRef.current.focus()
                              }
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />

                    </View>
                </View>

                <View style={styles.formArea_Search_pw}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Text_Search_pw}>이메일   </Text>
                        <TextInput
                            style={styles.textFormAlone_Search_pw}
                            onChangeText={userEmail => setUserEmail(userEmail)}
                            returnKeyType="next"
                            keyboardType="email-address"
                            blurOnSubmit={false}
                        />
                        <View style={styles.EmailCheck_Search_pw}>
                            <TouchableOpacity onPress={authSubmitButton}>
                                <Text style={{ color: 'white' }}>번호 받기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.TextValidation_Search_pw}>
                        인증번호를 입력해주세요.
                    </Text>
                </View>
                <View style={styles.formArea_Search_pw}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Text_Search_pw}>              </Text>
                        <TextInput
                            style={styles.textFormAlone_Search_pw}
                            placeholder={'인증번호 6자리 입력'}
                            onChangeText={auth => setAuth(auth)}
                            keyboardType="number-pad"
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                        <View style={styles.EmailCheck_Search_pw}>
                            <TouchableOpacity onPress={checkSubmitButton}>
                                <Text style={{ color: 'white' }}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({

    textFormAlone_Search_pw: {
        borderWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'black',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        width: '50%',
        height: hp(6),
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 15,
    },

    Text_Search_pw: {
        fontSize: wp('4.5%'),
        paddingTop: wp(1.5),
    },

    TextArea_Search_pw: {
        // flex: 0.5,
        justifyContent: 'center',
        //paddingTop: hp(),
    },

    formArea_Search_pw: {
        justifyContent: 'center',
        paddingTop: wp(5),
        paddingBottom: wp(1),
        // backgroundColor: 'red',
    },

    btnArea_Search_pw: {
        height: hp(8),
        // backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        //paddingBottom: hp(1.5),
        paddingTop: hp(1.5),
    },

    btn_Search_pw: {
        flex: 1,
        width: '40%',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },

    form_Search_pw: {
        paddingBottom: hp(2),
    },

    TextArea_Search_pw: {
        // flex: 0.5,
        justifyContent: 'center',
        paddingBottom: hp(3),
    },

    EmailCheck_Search_pw: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'black',
        backgroundColor: 'black',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        width: '25%',
        height: hp(6),
        paddingLeft: 10,
        paddingRight: 10,
    },

    TextValidation_Search_pw: {
        fontSize: wp('4%'),
        color: 'red',
        marginLeft: 65,
        marginBottom: hp(-2),
        paddingTop: hp(1),
        paddingBottom: hp(1),
    },
})

export default Search_pw2;