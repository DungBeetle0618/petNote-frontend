/**
 * 마이페이지
 */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import EBoldText from '../components/font/EBoldText';
import gs from '../assets/styles/globalStyles';

const MypageScreen = () => {
  return (
    <ScrollView contentContainerStyle={gs.screen}>

        <EBoldText style={gs.title}>마이페이지입니다.</EBoldText>

      </ScrollView>
  );
};

export default MypageScreen;