/**
 * 마이페이지
 */
import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

import EBoldText from '../components/font/EBoldText';
import gs from '../assets/styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

const MypageScreen = () => {
  const navigation = useNavigation();
  
  return (
    <ScrollView contentContainerStyle={gs.screen}>

        <EBoldText style={gs.title}>마이페이지입니다.</EBoldText>


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

export default MypageScreen;