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


        <Pressable onPress={()=>{navigation.navigate('Reminder')}}>
          <Text>리마인더</Text>
        </Pressable>
        <Pressable onPress={()=>{navigation.navigate('Challenge')}}>
          <Text>챌린지</Text>
        </Pressable>
        <Pressable onPress={()=>{navigation.navigate('Product')}}>
          <Text>상품</Text>
        </Pressable>

      </ScrollView>
  );
};

export default MypageScreen;