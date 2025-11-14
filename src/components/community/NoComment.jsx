import React from 'react'
import { View, Text, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const modalHeight = height-90;

const NoComment = () => {
  return (
        <View style={{position:'absolute', top:'50%', left:'50%', transform:[ { translateX: '-50%' },   { translateY: '-50%' },]}}>
          <Text style={{fontSize:17, fontWeight:700, textAlign:'center'}}>아직 댓글이</Text>
          <Text style={{fontSize:17, fontWeight:700, textAlign:'center'}}>없습니다.</Text>
          <Text style={{fontSize:13, fontWeight:500, color:'777', marginTop:5}}>대화를 시작하세요.</Text>
        </View>
  )
}

export default NoComment;