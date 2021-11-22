import React, {useRef, useState, useEffect} from 'react';
import {Text, View, Animated, FlatList} from 'react-native';
import Youtube from 'react-native-youtube-iframe';
import style from '../global/style';

export default function RecipeInfo({data}) {

  // props로 data와 mark를 전달 받음
  const videoId = data.recipe_youtube.split('v=')[1].split('&')[0];
  // data.url에서 'V='와 &사이의 문자열을 잘라서 저장
  const ingre_list = data.recipe_ingredient.split(/\$/gi).map(e => e.split(/@/gi)).filter(e=>e);
  // data.ingredient에서 /\$/gi 는 '\n'으로 바꾸고 /@/gi 는 ' '로 바꿈
  
  // ------------------------------ UI 부분 ---------------------------------------

  return (
    <View style={style.root_RecipeInfo}>
      <Animated.ScrollView style={{flex: 1}}>
        <Youtube height={210} videoId={videoId} />
        <Text style={style.subheading_RecipeInfo}>⦁   재료</Text>
        {ingre_list.map((item, index) => (
          <View style = {{ flexDirection: 'row', marginTop: 3 }} key={index}>
            {data.need_ingre_list.includes(item[0]) ? (
              <Text style={style.ingre_RecipeInfo_yes}>{item[0]}</Text>) : (
              <Text style={style.ingre_RecipeInfo_yes}>{item[0]}</Text>) }
            <Text style={style.vol_RecipeInfo}>{item[1]}</Text>  
          </View>
        ))}
        <Text style={style.subheading_RecipeInfo}>⦁   레시피</Text>
        <Text style={style.recipe_RecipeInfo}>{data.recipe_cookStep}</Text>
      </Animated.ScrollView>
    </View>
  );
}