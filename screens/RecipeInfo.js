import React, {useRef, useEffect} from 'react';
import {Text, View, Animated} from 'react-native';
import Youtube from 'react-native-youtube-iframe';
import Toast, {Duration} from 'react-native-whc-toast';
import style from '../global/style';

export default function RecipeInfo({data, mark}) {
  // props로 data와 mark를 전달 받음
  const videoId = data.url.split('v=')[1].split('&')[0];
  // data.url에서 'V='와 &사이의 문자열을 잘라서 저장
  const ingredient = data.ingredient.replace(/\$/gi, '\n').replace(/@/gi, ' ');
  // data.ingredient에서 /\$/gi 는 '\n'으로 바꾸고 /@/gi 는 ' '로 바꿈

  //(??) 잘 모르겠음
  const mounted = useRef(false);
  const msg = useRef(null);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      msg.current.show(mark ? '북마크 추가' : '북마크 취소', Duration.short);
    }
  }, [mark]);
  //mark의 값이 변경 될때 마다 useEffect()가 실행 됨

  // ------------------------------ UI 부분 ---------------------------------------

  return (
    <View style={style.root_RecipeInfo}>
      <Animated.ScrollView style={{flex: 1}}>
        <Youtube height={210} videoId={videoId} />
        <Text style={style.subheading_RecipeInfo}>●　재료</Text>
        <Text style={style.content_RecipeInfo}>{ingredient}</Text>
        <Text style={style.subheading_RecipeInfo}>●　레시피</Text>
        <Text style={style.content_RecipeInfo}>{data.step}</Text>
      </Animated.ScrollView>
      <Toast ref={msg} />
    </View>
  );
}
