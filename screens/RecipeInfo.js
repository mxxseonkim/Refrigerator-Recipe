import React, {useState, useEffect, Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import YouTube from 'react-native-youtube';
import style from '../style';

export default function RecipeInfo({props, route}) {
  const {data} = route.params;
  const videoId = data.url.split('v=')[1].split('&')[0];
  const ingredient = data.ingredient.replace(/\$/gi, '\n').replace(/@/gi, ' ');

  return (
    <ScrollView style={style.root_RecipeInfo}>
      <Video videoId={videoId} />
      <Text style={style.subheading_RecipeInfo}>●　재료</Text>
      <Text style={style.content_RecipeInfo}>{ingredient}</Text>
      <Text style={style.subheading_RecipeInfo}>●　레시피</Text>
      <Text style={style.content_RecipeInfo}>{data.step}</Text>
    </ScrollView>
  );
}

const Video = props => {
  return (
    <YouTube
      style={style.video_RecipeInfo}
      videoId={props.videoId}
      apiKey="AIzaSyAj1NnPodY7a71p-lO9NPEADMjIN87N3l0"
      play={false}
      fullscreen={false}
      loop={false}
      onReady={e => console.log('onReady')}
      onChangeState={e => console.log('onChangeState:', e.state)}
      onChangeQuality={e => console.log('onChangeQuality: ', e.quality)}
      onError={e => console.log('onError: ', e.error)}
    />
  );
};
