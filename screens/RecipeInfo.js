import React, {useState, useEffect, Component} from 'react';
import { Text, ScrollView } from 'react-native';
import Youtube from 'react-native-youtube-iframe';
import style from '../style';

export default function RecipeInfo({props, route}) {
  const {data} = route.params;
  const videoId = data.url.split('v=')[1].split('&')[0];
  const ingredient = data.ingredient.replace(/\$/gi, '\n').replace(/@/gi, ' ');

  return (
    <ScrollView style={style.root_RecipeInfo}>
      <Youtube height={210} videoId={videoId} />
      <Text style={style.subheading_RecipeInfo}>●　재료</Text>
      <Text style={style.content_RecipeInfo}>{ingredient}</Text>
      <Text style={style.subheading_RecipeInfo}>●　레시피</Text>
      <Text style={style.content_RecipeInfo}>{data.step}</Text>
    </ScrollView>
  );
}