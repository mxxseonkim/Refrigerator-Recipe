import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
  } from 'react-native';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


export default function App() {
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(30);
  const [result, setResult] = useState('');

  const timerCheck = require('../components/TimerCheck');


    useEffect(() => {
      const countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            clearInterval(countdown);
            timerCheck.check = true;
            console.log(timerCheck.check);
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }, [minutes, seconds]);
  

    

  return (
    <View style={{justifyContent: 'center'}}>
          <Text style={styles.TextValidation_Search_id}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
      </View>
  );
}

const styles = StyleSheet.create({
      TextValidation_Search_id: {
        fontSize: wp('4%'),
        color: 'red',
        marginLeft: 65,
        marginBottom: hp(-2),
        paddingTop: hp(1),
        paddingBottom: hp(1),
      },
})
