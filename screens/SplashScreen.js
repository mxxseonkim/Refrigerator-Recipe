import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../global/style';

export default function SplashScreen({navigation}) {
  const [animating, setAnimating] = useState(true);
  const memberID = require('../global/Global');

  //-------------- 로컬에 user_id가 저장 되어 있는지 확인하는 함수 -----------------------

  useEffect(() => {
    setTimeout(async () => {
      setAnimating(false);
      const value = await AsyncStorage.getItem('user_id');
      // user_id가 있으면 (null이 아니면)
      if (value !== null) {
        // memberID.userID에 값 삽입 -> 테이블 명
        memberID.userID = value;
      }
      // user_id - 없으면 (null) Auth 이동 / 있으면 DrawerTab 이동
      navigation.replace(value === null ? 'Auth' : 'DrawerTab');
    }, 3000);
  }, []);

  //---------------------------UI 부분-------------------------------------------------

  return (
    <View style={style.container_SplashScreen}>
      <Image
        source={require('../imgpath/logo.gif')}
        style={style.img_SplashScreen}
      />
      <ActivityIndicator
        animating={animating}
        color="#FA8072"
        size="large"
        style={style.activityIndicator_SplashScreen}
      />
    </View>
  );

  //-----------------------------------------------------------------------------------
}
