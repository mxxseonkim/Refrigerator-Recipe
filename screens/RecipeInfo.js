import React, {useRef, useState, useEffect} from 'react';
import {Text, View, Animated} from 'react-native';
import Youtube from 'react-native-youtube-iframe';
import style from '../global/style';

export default function RecipeInfo({data}) {

  // props로 data와 mark를 전달 받음
  const videoId = data.recipe_youtube.split('v=')[1].split('&')[0];
  // data.url에서 'V='와 &사이의 문자열을 잘라서 저장
  const ingredient = data.recipe_ingredient.replace(/\$/gi, '\n').replace(/@/gi, ' ');
  // data.ingredient에서 /\$/gi 는 '\n'으로 바꾸고 /@/gi 는 ' '로 바꿈

  // ------------------------------ UI 부분 ---------------------------------------

  return (
    <View style={style.root_RecipeInfo}>
      <Animated.ScrollView style={{flex: 1}}>
        <Youtube height={210} videoId={videoId} />
        <Text style={style.subheading_RecipeInfo}>●　재료</Text>
        <Text style={style.content_RecipeInfo}>{ingredient}</Text>
        <Text style={style.subheading_RecipeInfo}>●　레시피</Text>
        <Text style={style.content_RecipeInfo}>{data.recipe_cookStep}</Text>
      </Animated.ScrollView>
    </View>
  );
}