import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({

  //MenuButton
  menuIcon_MenuButton: {
    fontSize: 30,
    marginLeft: 15,
    marginTop: 5,
    color: 'tomato',
  },

  // list1
  testContatiner_List1: {
    flex: 0.2,
  },
  container_List1: {
    flex: 0.66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView_List1: {
    margin: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#222',
    elevation: 3,
  },
  PressView_List1: {
    flexDirection: 'row',
    flex: 0.7,
  },
  button_List1: {
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
  input_List1: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: 200,
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
    width: 150,
    marginTop: 20,
    marginBottom: 25,
  },

  //RecipeList
  root_RecipeList: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemView_RecipeList: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  itemImg_RecipeList: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    marginRight: 20,
  },
  itemName_RecipeList: {
    width: 220,
    height: 30,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemMsg_RecipeList: {
    width: 220,
    height: 60,
    fontSize: 14,
  },
  itemLike_RecipeList: {
    textAlign: 'center',
    width: 30,
    height: 90,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //Recipe
  container_Recipe: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view_Recipe: {
    //width: charWidth,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img_Recipe: {
    width: 370,
    height: 200,
    resizeMode: 'cover',
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
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

  // //IngreList
  // root_IngreList: {
  //   flex: 1,
  //   padding: 16,
  // },
  // item_IngreList: {
  //   flex: 1,
  //   padding: 5,
  // },
  // font_IngreList: {
  //   fontSize: 16,
  //   paddingBottom: 3,
  // },

  // //StepList
  // root_StepList: {
  //   flex: 1,
  //   padding: 16,
  // },
  // item_StepList: {
  //   flex: 1,
  //   padding: 5,
  // },
  // font_StepList: {
  //   fontSize: 16,
  //   paddingBottom: 5,
  // },
});

export default style;
