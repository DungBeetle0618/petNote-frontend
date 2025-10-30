/**
 * 커뮤니티 화면
 */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import EBoldText from '../components/EBoldText';
import gs from '../assets/styles/globalStyles';

const CommunityScreen = () => {
  return (
    <ScrollView contentContainerStyle={gs.screen}>

        <EBoldText style={gs.title}>커뮤니티 화면입니다.</EBoldText>

      </ScrollView>
  );
};

export default CommunityScreen;