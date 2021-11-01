// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const memberID = require('../Global');

  useEffect(() => {
    setTimeout(async () => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      const value = await AsyncStorage.getItem('user_id');
      if (value !== null) {
        memberID.userID = value;
      }
      navigation.replace(value === null ? 'Auth' : 'DrawerTab');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'http://54.180.126.3/img/logout.jpg'}}
        style={{
          width: wp(55),
          height: hp(40),
          resizeMode: 'contain',
          margin: 30,
        }}
      />
      <ActivityIndicator
        animating={animating}
        color="#6990F7"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
