/**
 * 홈(메인) 화면
 */
import { View, Text, ScrollView } from 'react-native';

import EBoldText from '../components/EBoldText';
import BoldText from '../components/BoldText';
import RegularText from '../components/RegularText';
import LightText from '../components/LightText';

import gs from '../assets/styles/globalStyles';

//예시 데이터
let pet = {
  name: '레오나르도',
  
}

const HomeScreen = () => {
  return (
      <ScrollView contentContainerStyle={gs.screen}>

        <EBoldText style={gs.title}>오늘의 {pet.name}</EBoldText>
        <BoldText style={gs.subtitle}>10월 29일 수요일</BoldText>


        <View style={gs.card}>
          <BoldText>Bold 폰트사이즈</BoldText>
          <RegularText style={gs.text}>Regular 폰트사이즈</RegularText>
        </View>

        <View style={gs.card}>
          <EBoldText>Extra Bold 폰트사이즈</EBoldText>
          <LightText style={gs.text}>Light 폰트사이즈</LightText>
        </View>

      </ScrollView>
  );
};

export default HomeScreen;