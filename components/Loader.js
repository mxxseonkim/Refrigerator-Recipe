import React from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';
import style from '../global/style';

export default function Loader(props) {
  const {loading, ...attributes} = props;

  //---------------------------- UI 부분 ----------------------------------------
  // props로 loding 을 받아와서 visible={loading} -> true/false
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={style.modalBackground_Loader}>
        <View style={style.activityIndicatorWrapper_Loader}>
          {/* ActivityIndicator 항상 true */}
          <ActivityIndicator
            animating={true}
            color="#000000"
            size="large"
            style={style.activityIndicator_Loader}
          />
        </View>
      </View>
    </Modal>
  );
}
