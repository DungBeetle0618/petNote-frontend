import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const viewWidth = width;



const Comment = ({onPressAnswer}) => {

  return (
        <View style={{flexDirection:'row', paddingVertical:5, marginBottom:7}}>
            <View style={{width:35,height:35,backgroundColor:'#7ecc89ff', borderRadius:50, alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:21}}>🐶</Text></View>
            <View style={{paddingLeft:7}}>
                <View><Text style={{fontWeight:800, fontSize:12}}>유건의</Text></View>
                <View><Text style={{fontWeight:600, fontSize:12, flexWrap: 'wrap', width:viewWidth-110}}>벌써 크리스마스가 다가오네요.. 크리스마스가 다가오네요.. 크리스마스가 다가오네요..</Text></View>
                <Pressable onPress={onPressAnswer}><Text style={{fontWeight:500, fontSize:12, fontColor:'#111'}}>답글달기</Text></Pressable>
                <View style={{flexDirection:'row', marginBottom:20, position:'relative', top:10, right: 7,}}>
                    <View style={{width:35,height:35,backgroundColor:'#d4ba26ff', borderRadius:50, alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:21}}>😍</Text></View>
                    <View style={{paddingLeft:7}}>
                        <View><Text style={{fontWeight:600, fontSize:12}}>김승우</Text></View>
                        <View>
                            <Text style={{fontWeight:600, fontSize:12, flexWrap: 'wrap', width:viewWidth-135,}} numberOfLines={0}>저랑 크리스마스 같이 보내욤!!! 저랑 크리스마스 같이 보내욤!!! 저랑 크리스마스 같이 보내욤!!!</Text>
                        </View>
                    </View>
                </View>

                <View style={{flexDirection:'row', marginBottom:20, position:'relative', top:10, right: 7,}}>
                    <View style={{width:35,height:35,backgroundColor:'#d4ba26ff', borderRadius:50, alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:21}}>😍</Text></View>
                    <View style={{paddingLeft:7}}>
                        <View><Text style={{fontWeight:600, fontSize:12}}>김홍기</Text></View>
                        <View>
                            <Text style={{fontWeight:600, fontSize:12, flexWrap: 'wrap', width:viewWidth-135,}} numberOfLines={0}>저희 안어색해요.</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
  )
}

export default Comment