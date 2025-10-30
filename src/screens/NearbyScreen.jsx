/**
 * 위치기반 추천 화면
 */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import EBoldText from '../components/EBoldText';
import gs from '../assets/styles/globalStyles';

const NearbyScreen = () => {
  return (
    <ScrollView contentContainerStyle={gs.screen}>

        <EBoldText style={gs.title}>위치기반 추천 화면입니다.</EBoldText>

      </ScrollView>
  );
};

export default NearbyScreen;