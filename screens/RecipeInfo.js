import React, {useRef, useState, useEffect} from 'react';
import {Text, View, Animated, FlatList} from 'react-native';
import Youtube from 'react-native-youtube-iframe';
import style from '../global/style';

export default function RecipeInfo({data}) {

  // props로 data와 mark를 전달 받음
  const videoId = data.recipe_youtube.split('v=')[1].split('&')[0];
  // data.url에서 'V='와 &사이의 문자열을 잘라서 저장
  const ingredient = data.recipe_ingredient.replace(/\$/gi, '\n').replace(/@/gi, ' ');
  const ingre_list = data.recipe_ingredient.split(/\$/gi).map(e => e.split(/@/gi)).filter(e=>e);
  console.log(ingre_list);
  // data.ingredient에서 /\$/gi 는 '\n'으로 바꾸고 /@/gi 는 ' '로 바꿈

  // ------------------------------ UI 부분 ---------------------------------------

  const renderIngreItem = ({item}) => {
    return (
      <View style = {{ 
        flexDirection: 'row',
        marginTop: 3,
        }}>
        <Text style={style.ingre_RecipeInfo}>{item[0]}</Text>
        <Text style={style.vol_RecipeInfo}>{item[1]}</Text>
      </View>
    );
  };

  return (
    <View style={style.root_RecipeInfo}>
      <Animated.ScrollView style={{flex: 1}}>
        <Youtube height={210} videoId={videoId} />
        <Text style={style.subheading_RecipeInfo}>⦁   재료</Text>
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={ingre_list}
            keyExtractor={idx => idx}
            renderItem={renderIngreItem}
        />
        <Text style={style.subheading_RecipeInfo}>⦁   레시피</Text>
        <Text style={style.recipe_RecipeInfo}>{data.recipe_cookStep}</Text>
      </Animated.ScrollView>
    </View>
  );
}