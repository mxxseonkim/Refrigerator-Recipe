import React, {useRef, useEffect} from 'react';
import { Text, ScrollView, View, Animated } from 'react-native';
import Youtube from 'react-native-youtube-iframe';
import Toast, {Duration} from 'react-native-whc-toast';
import style from '../style';

export default function RecipeInfo({data, mark}) {
  
  const videoId = data.url.split('v=')[1].split('&')[0];
  const ingredient = data.ingredient.replace(/\$/gi, '\n').replace(/@/gi, ' ');
  
  
  const mounted = useRef(false);
  const msg = useRef(null);
  useEffect(() => {
    if(!mounted.current) { mounted.current = true; }
    else { msg.current.show(mark ? '북마크 추가' : '북마크 취소', Duration.short); }
  }, [mark]);

  return (
    <View style={style.root_RecipeInfo}>
      <Animated.ScrollView style={{flex:1}}>
        <Youtube height={210} videoId={videoId} />
        <Text style={style.subheading_RecipeInfo}>●　재료</Text>
        <Text style={style.content_RecipeInfo}>{ingredient}</Text>
        <Text style={style.subheading_RecipeInfo}>●　레시피</Text>
        <Text style={style.content_RecipeInfo}>{data.step}</Text>
      </Animated.ScrollView>
      <Toast ref={msg}/>
    </View>
  );
}