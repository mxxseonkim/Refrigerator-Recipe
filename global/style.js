import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  //CheckButton----------------------------------
  CheckIcon_CheckButton: {
    fontSize: 30,
    marginRight: 15,
    marginTop: 5,
    color: 'tomato',
  },
  //AddButton------------------------------------
  headerIcon_AddButton: {
    fontSize: 30,
    marginRight: 15,
    marginTop: 5,
    color: 'tomato',
  },
  calendarIcon_AddButton: {
    color: 'tomato',
    fontSize: 33,
    marginTop: 10,
  },
  //MenuButton-----------------------------------
  menuIcon_MenuButton: {
    fontSize: 30,
    marginLeft: 15,
    marginTop: 5,
    color: 'tomato',
  },
  // RefrigeratorScreen--------------------------
  checkBox_RefrigeratorScreen: {
    flex: 0.05,
    paddingRight: 15,
    margin: 10,
    justifyContent: 'center',
  },
  button_RefrigeratorScreen: {
    padding: 10,
    margin: 5,
    width: '45%',
    borderRadius: 10,
    backgroundColor: 'tomato',
  },
  button2_RefrigeratorScreen: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'tomato',
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
    borderWidth: 0,
    borderRadius: 0,
    padding: 1,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderRadius: 0,
    borderColor: '#ccc',
  },
  imgView_RefrigeratorScreen: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImg_RefrigeratorScreen: {
    width: 70,
    height: 70,
    padding: 20,
    margin: 10,
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
  itemImg2_RefrigeratorScreen: {
    width: 85,
    height: 85,
    padding: 20,
    margin: 10,
    borderWidth: 1,
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
    color: 'tomato',
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
    backgroundColor: 'lightgrey',
    padding: 30,
    paddingTop: 40,
  },
  pic_ClientScreen: {
    height: 140,
    width: 140,
    marginRight: 20,
    borderRadius: 100,
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
    height: 30,
    width: 30,
    marginRight: 15,
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
    borderColor: 'black',
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
    backgroundColor: 'black',
  },
  TextAddFuncView_LoginScreen: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  TextAddFunc_LoginScreen: {
    fontSize: wp('4%'),
    color: 'grey',
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
    backgroundColor: 'black',
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
    borderColor: 'black',
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
    borderColor: 'black',
    backgroundColor: 'black',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    width: '23%',
    height: hp(6),
  },
  textFormTop_RegisterScreen: {
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
  textFormMiddle_RegisterScreen: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormBottom_RegisterScreen: {
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
    fontSize: 30,
    marginRight: 15,
    marginTop: 5,
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
});

export default style;
