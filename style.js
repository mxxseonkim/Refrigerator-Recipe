import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  //HeaderButton
  CheckIcon_CheckButton: {
    fontSize: 30,
    marginRight: 15,
    marginTop: 5,
    color: 'tomato',
  },
  testContatiner_HeaderButton: {
    flex: 0.13,
  },
  container_HeaderButton: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon_HeaderButton: {
    fontSize: 30,
    marginRight: 15,
    marginTop: 5,
    color: 'tomato',
  },
  //MenuButton
  menuIcon_MenuButton: {
    fontSize: 30,
    marginLeft: 15,
    marginTop: 5,
    color: 'tomato',
  },
  // list1
  checkBox_List1: {
    flex: 0.05,
    paddingRight: 15,
    margin: 10,
    justifyContent: 'center',
  },
  button_List1: {
    padding: 10,
    margin: 5,
    width: '45%',
    borderRadius: 10,
    backgroundColor: 'tomato',
  },
  button2_List1: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'tomato',
  },
  textStyle_List1: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textView_List1: {
    width: '20%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 5,
    textAlign: 'center',
    margin: 10,
  },
  textView2_List1: {
    width: '80%',
    padding: 5,
    margin: 10,
  },
  input_List1: {
    height: 40,
    margin: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '80%',
  },
  text_List1: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  flatlist_List1: {
    flex: 6,
    padding: 0,
  },
  itemView_List1: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 0,
    padding: 1,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderRadius: 0,
    borderColor: '#ccc',
  },
  itemImg_List1: {
    width: 70,
    height: 70,
    padding: 20,
    margin: 10,
    resizeMode: 'cover',
    backgroundColor: 'white',
    //marginRight:20,
  },
  itemName_List1: {
    paddingRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemMsg_List1: {
    height: 30,
    fontSize: 14,
  },
  datePickerStyle_List: {
    width: '60%',
    marginTop: 10,
    marginBottom: 10,
    margin: 20,
    fontSize: 17,
    fontWeight: 'bold',
  },
  //RecipeList
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

  //RecipeInfo
  root_RecipeInfo: {
    flex: 1,
    padding: 20,
  },
  video_RecipeInfo: {
    width: '100%',
    height: 210,
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
  itemName_Recipe: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  itemDiv_Recipe: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  view1_Recipe: {
    flexDirection: 'column',
    padding: 20,
  },
});

export default style;
