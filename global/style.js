import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  //CheckButton----------------------------------
  CheckIcon_CheckButton: {
    fontSize: 27,
    marginRight: 5,
    marginTop: 4,
    color: '#FA8072',
  },
  //AddButton------------------------------------
  headerIcon_AddButton: {
    fontSize: 27,
    marginRight: 12,
    marginTop: 4,
    color: '#FA8072',
  },
  calendarIcon_AddButton: {
    color: '#FA8072',
    fontSize: 33,
    marginTop: 10,
  },
  input_AddButton: {
    height: 40,
    margin: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  //MenuButton-----------------------------------
  menuIcon_MenuButton: {
    fontSize: 30,
    marginLeft: 15,
    marginTop: 5,
    color: '#FA8072',
  },
  // RefrigeratorScreen--------------------------
  checkBox_RefrigeratorScreen: {
    margin: 10,
    marginLeft: 15,
    marginRight: 5,
    //padingLeft: 15,
    //backgroundColor: 'red',
  },
  button_RefrigeratorScreen: {
    padding: 10,
    margin: 5,
    width: '45%',
    borderRadius: 10,
  },
  button2_RefrigeratorScreen: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#FA8072',
  },
  textStyle_RefrigeratorScreen: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textView_RefrigeratorScreen: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 5,
    textAlign: 'center',
    margin: 10,
  },
  textView2_RefrigeratorScreen: {
    width: '70%',
    padding: 5,
    margin: 10,
  },
  textView3_RefrigeratorScreen: {
    padding: 5,
    margin: 10,
  },
  input_RefrigeratorScreen: {
    height: 40,
    margin: 7,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '80%',
  },
  text_RefrigeratorScreen: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  text1_RefrigeratorScreen: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'red',
  },
  flatlist_RefrigeratorScreen: {
    flex: 6,
    padding: 0,
  },
  itemView_RefrigeratorScreen: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  itemImg_RefrigeratorScreen: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  itemImg2_RefrigeratorScreen: {
    width: 65,
    height: 65,

    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'salmon',
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
  itemImg3_RefrigeratorScreen: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
  itemName_RefrigeratorScreen: {
    paddingRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemMsg_RefrigeratorScreen: {
    height: 30,
    fontSize: 14,
  },
  datePickerStyle_RefrigeratorScreen: {
    width: '60%',
    marginTop: 10,
    marginBottom: 10,
    margin: 20,
    fontSize: 17,
    fontWeight: 'bold',
  },
  ActivityIndicatorView_RefrigeratorScreen: {
    flex: 1,
    justifyContent: 'center',
    justifyContent: 'space-around',
  },
  //RecipeList-----------------------------------
  root_RecipeList: {
    flex: 1,
    padding: 5,
  },
  itemView_RecipeList: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
  },
  itemName_RecipeList: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  itemSimilarity_RecipeList: {
    textAlign: 'right',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FA8072',
  },
  //RecipeInfo-----------------------------------
  root_RecipeInfo: {
    flex: 1,
    padding: 20,
  },
  subheading_RecipeInfo: {
    flex: 1,
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content_RecipeInfo: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
    lineHeight: 30,
  },
  //ClientScreen---------------------------------
  profile_ClientScreen: {
    height: 210,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    padding: 30,
    paddingTop: 40,
  },
  pic_ClientScreen: {
    height: 140,
    width: 140,
    marginRight: 20,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  nickname_ClientScreen: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text_ClientScreen: {
    fontSize: 14,
  },
  menuItem_ClientScreen: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  menuItemIcon_ClientScreen: {
    fontSize: 30,
    marginRight: 15,
    marginTop: 5,
    color: 'gray',
  },
  menuItemText_ClientScreen: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  menuList_ClientScreen: {
    flex: 1,
    // backgroundColor: 'skyblue',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  //LoginScreen----------------------------------
  container_LoginScreen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  titleArea_LoginScreen: {
    justifyContent: 'center',
    paddingTop: wp(4),
  },
  TextArea_LoginScreen: {
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingBottom: hp(2),
  },
  Text_LoginScreen: {
    fontSize: wp('4%'),
    paddingLeft: wp(1),
  },
  formArea_LoginScreen: {
    justifyContent: 'center',
    paddingBottom: hp(3),
  },
  textForm_LoginScreen: {
    borderWidth: 2,
    borderColor: '#FA8072',
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnArea_LoginScreen: {
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1.5),
  },
  btn_LoginScreen: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA8072',
  },
  TextAddFuncView_LoginScreen: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  TextAddFunc_LoginScreen: {
    fontSize: wp('4%'),
    color: 'gray',
    textDecorationLine: 'underline',
    paddingTop: wp(2),
  },
  img_LoginScreen: {
    width: wp(35),
    height: hp(13),
    resizeMode: 'contain',
  },
  //RegisterScreen-------------------------------
  container_RegisterScreen: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  successImgView_RegisterScreen: {
    paddingTop: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: wp(1.5),
  },
  successImg_RegisterScreen: {
    width: wp(30),
    height: hp(30),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  successTextView_RegisterScreen: {
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(3),
  },
  titleArea_RegisterScreen: {
    paddingTop: wp(5),
    justifyContent: 'center',
    paddingBottom: wp(1),
  },
  img_RegisterScreen: {
    width: wp(50),
    height: hp(10),
    resizeMode: 'contain',
  },
  Text_RegisterScreen: {
    fontSize: wp('4%'),
  },
  btnArea_RegisterScreen: {
    height: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1.5),
  },
  btn_RegisterScreen: {
    flex: 1,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA8072',
  },
  TextValidation_RegisterScreen: {
    fontSize: wp('3.6%'),
    paddingLeft: wp(1),
    color: 'red',
    marginBottom: hp(-3),
    paddingTop: hp(1),
    paddingBottom: hp(1),
  },
  formArea_RegisterScreen: {
    justifyContent: 'center',
    paddingTop: wp(5),
    marginBottom: hp(-1),
  },
  textFormAlone_RegisterScreen: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FA8072',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    width: '77%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  idCheck_RegisterScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FA8072',
    backgroundColor: '#FA8072',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    width: '23%',
    height: hp(6),
  },
  textFormTop_RegisterScreen: {
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: '#FA8072',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormMiddle_RegisterScreen: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#FA8072',
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormBottom_RegisterScreen: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: '#FA8072',
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  //Loader---------------------------------------
  modalBackground_Loader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper_Loader: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator_Loader: {
    alignItems: 'center',
    height: 80,
  },
  //SplashScreen---------------------------------
  img_SplashScreen: {
    width: wp(55),
    height: hp(40),
    resizeMode: 'contain',
    margin: 30,
  },
  container_SplashScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator_SplashScreen: {
    alignItems: 'center',
    height: 80,
  },
  //BookMark-------------------------------------
  Icon_BookMark: {
    fontSize: 27,
    marginRight: 10,
    marginTop: 4,
  },
  //Searchbar------------------------------------
  searchbar_Searchbar: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    justifyContent: 'space-around',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  //Search_id
  textFormAlone_Search_id: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FA8072',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '50%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 15,
    marginLeft: 10,
  },

  textFormAlone2_Search_id: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FA8072',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '50%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 15,
    marginLeft: 66,
  },

  Text_Search_id: {
    fontSize: wp('4.5%'),
    paddingTop: wp(1.5),
  },

  TextArea_Search_id: {
    // flex: 0.5,
    justifyContent: 'center',
    //paddingTop: hp(),
  },

  formArea_Search_id: {
    justifyContent: 'center',
    paddingTop: wp(5),
    paddingBottom: wp(1),
    // backgroundColor: 'red',
  },

  btnArea_Search_id: {
    height: hp(8),
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingBottom: hp(1.5),
    paddingTop: hp(1.5),
  },

  btn_Search_id: {
    flex: 1,
    width: '40%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  form_Search_id: {
    paddingBottom: hp(2),
  },

  TextArea_Search_id: {
    // flex: 0.5,
    justifyContent: 'center',
    paddingBottom: hp(3),
  },

  EmailCheck_Search_id: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FA8072',
    backgroundColor: '#FA8072',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '25%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },

  TextValidation_Search_id: {
    fontSize: wp('4%'),
    color: 'red',
    marginLeft: 74,
    marginBottom: hp(-2),
    paddingTop: hp(1),
    paddingBottom: hp(1),
  },
  Timer_Search_id: {
    fontSize: wp('4%'),
    color: 'black',
    marginLeft: 17,
    marginBottom: hp(-2),
    paddingTop: hp(1),
    paddingBottom: hp(1),
  },
  btn2_Search_id: {
    width: '75%',
    height: hp(6),
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA8072',
    marginRight: 10,
    marginLeft: 45,
  },
  btn3_Search_id: {
    width: '85%',
    height: hp(6),
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA8072',
    marginRight: 10,
    marginLeft: 45,
  },
  //Search_pw
  textFormAlone_Search_pw: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FA8072',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '50%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 15,
    marginLeft: 10,
  },

  textFormAlone2_Search_pw: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FA8072',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '50%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 15,
    marginLeft: 66,
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
    backgroundColor: '#FA8072',
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
    borderColor: '#FA8072',
    backgroundColor: '#FA8072',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '73%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 37,
    marginTop: 20,
  },

  TextValidation_Search_pw: {
    fontSize: wp('4%'),
    color: 'red',
    marginLeft: 74,
    marginBottom: hp(-2),
    paddingTop: hp(1),
    paddingBottom: hp(1),
  },
  //Search_pw2
  EmailCheck_Search_pw2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FA8072',
    backgroundColor: '#FA8072',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '25%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
    // marginLeft: ,
    // marginTop: 20,
  },
});

export default style;
