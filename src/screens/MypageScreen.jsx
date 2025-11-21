/**
 * 마이페이지
 */
import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';

import EBoldText from '../components/font/EBoldText';
import gs from '../assets/styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

const MypageScreen = () => {
  const navigation = useNavigation();
  
  return (
    <ScrollView contentContainerStyle={gs.screen}>
      <View style={style.header}>
        <View style={style.profileInfo}>
          <View>
            <Text>사진</Text>
          </View>
          <View>
            <Text>bugreport1</Text>
            <Text>bugreport1@naver.com</Text>
          </View>
        </View>
        <View>
          
        </View>
      </View>


      <Pressable style={{marginBlock: 20}} onPress={()=>{navigation.navigate('Reminder')}}>
        <Text>리마인더 페이지 가기</Text>
      </Pressable>
      <Pressable style={{marginBlock: 20}} onPress={()=>{navigation.navigate('Challenge')}}>
        <Text>챌린지 페이지 가기</Text>
      </Pressable>
      <Pressable style={{marginBlock: 20}} onPress={()=>{navigation.navigate('Product')}}>
        <Text>상품 페이지 가기</Text>
      </Pressable>

    </ScrollView>
  );
};

const style = StyleSheet.create({
  header: {
    backgroundColor: "#FF6600",
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom:24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },

  profileInfo: {
    flexDirection
  }

})

export default MypageScreen;