import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../global/style';

export default function SplashScreen({navigation}) {
  const [animating, setAnimating] = useState(true);
  const memberID = require('../global/Global');

  //-------------- Î°úÏª¨?óê user_idÍ∞? ????û• ?êò?ñ¥ ?ûà?äîÏß? ?ôï?ù∏?ïò?äî ?ï®?àò -----------------------

  useEffect(() => {
    setTimeout(async () => {
      setAnimating(false);
      const value = await AsyncStorage.getItem('user_id');
      // user_idÍ∞? ?ûà?úºÎ©? (null?ù¥ ?ïÑ?ãàÎ©?)
      if (value !== null) {
        // memberID.userID?óê Í∞? ?ÇΩ?ûÖ -> ?Öå?ù¥Î∏? Î™?
        memberID.userID = value;
      }
      // user_id - ?óÜ?úºÎ©? (null) Auth ?ù¥?èô / ?ûà?úºÎ©? DrawerTab ?ù¥?èô
      navigation.replace(value === null ? 'Auth' : 'DrawerTab');
    }, 3000);
  }, []);

  //---------------------------UI Î∂?Î∂?-------------------------------------------------

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
