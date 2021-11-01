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


function Search_pw({ navigation }) {

    const [userId, setUserId] = useState('');
    const [auth, setAuth] = useState('');
    const [isCheckIdSuccess,setIsCheckIdSuccess] = useState(false);

    const authSubmitButton = async () => {
        if (!userId) {
            Alert.alert('경고', '아이디를 입력해주세요.');
            return;
        }

        let dataCheck = { 
            qry:
              "SELECT * FROM `member` WHERE user_id ='" +userId+"'",
          };
          let dataResult = await DataSet.overlabCheck(dataCheck);
          if(dataResult==0){
            Alert.alert('경고', '존재하지 않는 아이디입니다.');
            return;
          }
          setIsCheckIdSuccess(true);
    };


    if(isCheckIdSuccess){
        navigation.navigate('Search_pw2')
    }

    return (

        <ScrollView style={style.container_RegisterScreen}>
            <View style={style.topArea_RegisterScreen}>
                <View style={style.titleArea_RegisterScreen}>
                    <Image
                        //ource={require('C:/Users/Administrator/react-native/Refrigerator-recipe/Refrigerator-Recipe/imageSrc/pw.jpg')}
                        style={{ width: wp(57), height: hp(10), resizeMode: 'contain' }}
                    />
                </View>
                <View style={styles.TextArea_Search_pw}>
                    <Text style={styles.Text_Search_pw}> 아이디를 입력해주세요.</Text>
                </View>
            </View>

            <View style={styles.form_Search_pw}>
                <View style={styles.formArea_Search_pw}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Text_Search_pw2}>아이디   </Text>
                        <TextInput
                            style={styles.textFormAlone_Search_pw}
                            onChangeText={userId => setUserId(userId)}
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />

                    </View>
                </View>
            </View>
            <View style={styles.EmailCheck_Search_pw}>
                            <TouchableOpacity onPress={authSubmitButton}>
                                <Text style={{ color: 'white', fontSize: wp('4%') }}>확인</Text>
                            </TouchableOpacity>
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
        paddingLeft: wp(1),
    },

    Text_Search_pw2: {
        fontSize: wp('4.5%'),
        paddingTop: wp(1.5),
        paddingLeft: wp(9),
        paddingRight: wp(3),
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
        width: '73%',
        height: hp(6),
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 37,
        marginTop: 30,
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

export default Search_pw;