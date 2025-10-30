/**
 * 반려동물 관리 화면 
 */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import EBoldText from '../components/EBoldText';
import gs from '../assets/styles/globalStyles';

const PetManageScreen = () => {
  return (
    <ScrollView contentContainerStyle={gs.screen}>

        <EBoldText style={gs.title}>반려동물 관리(건강) 화면입니다.</EBoldText>

      </ScrollView>
  );
};

export default PetManageScreen;