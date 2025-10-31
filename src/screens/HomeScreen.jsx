/**
 * 홈(메인) 화면
 */
import React, { useState } from 'react'
import { View, Text, ScrollView, Button, TouchableWithoutFeedback, Picker,  StyleSheet } from 'react-native';

import { scale } from 'react-native-size-matters';
import PetSelectBox from '../components/PetSelectBox';
import { useEffect } from 'react';
import EBoldText from '../components/font/EBoldText';
import BoldText from '../components/font/BoldText';
import RegularText from '../components/font/RegularText';
import LightText from '../components/font/LightText';

import gs from '../assets/styles/globalStyles';

const styles = StyleSheet.create({
   cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  cardChange: {
    fontSize: 12,
    marginTop: 4,
    color: "green",
  },
});

const HomeScreen = () => {
  const [selected, setSelected] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const options = [
    { no: 1, name: '레오나르도', breed: '골든리트리버', weight: 12.3, weightChangeThisWeek: 0.2, stepsToday: 5500, healthStatus: "Excellent", profile: require('../assets/images/golden_retriever_sample.png') },
    { no: 2, name: '아치', breed: '코리안 숏헤어', profile: '', weight: 4.7, weightChangeThisWeek: 0, stepsToday: 0, healthStatus: "bad" },
    { no: 3, name: '마루', breed: '푸들', profile: '',weight: 6.7, weightChangeThisWeek: 0.0, stepsToday: 1231, healthStatus: "Excellent" }
  ];

  
  // 주간 데이터 예시
  const activityData = [
    { day: "Mon", steps: 2300 },
    { day: "Tue", steps: 4500 },
    { day: "Wed", steps: 5200 },
    { day: "Thu", steps: 7000 },
    { day: "Fri", steps: 8000 },
    { day: "Sat", steps: 6500 },
    { day: "Sun", steps: 3000 },
  ];

    useEffect(()=>{
        //대표동물 기본 선택
        setSelected(options[0]);
    }, [])

  return (
      <ScrollView contentContainerStyle={gs.screen}>
        
        <EBoldText style={gs.title}>오늘의 {selected?.name}</EBoldText>
        <BoldText style={gs.subtitle}>10월 29일 수요일</BoldText>

        <View style={{paddingTop: scale(20)}}>
                <PetSelectBox 
                    visible={dropdownVisible}
                    onOpen={() => setDropdownVisible(true)}
                    onClose={() => setDropdownVisible(false)}
                    onSelect={(pet) => {
                        setSelected(pet);
                        setDropdownVisible(false);
                    }}
                    options={options}
                    selectedValue={selected}
                />
        </View>

        {/* Weight Card */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weight</Text>
            <Text style={styles.cardValue}>{selected?.weight} kg</Text>
            <Text style={styles.cardChange}>
              +{selected?.weightChangeThisWeek} kg this week
            </Text>
          </View>

          {/* Health Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Health</Text>
            <Text style={styles.cardValue}>{selected?.healthStatus}</Text>
            <Text style={styles.cardChange}>Status</Text>
          </View>

          {/* Meals */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Meals Today</Text>
            <Text style={styles.cardValue}>2/3 fed</Text>
            <Text style={styles.cardChange}>Dinner pending</Text>
          </View>

          {/* Walks */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Steps</Text>
            <Text style={styles.cardValue}>{selected?.stepsToday}</Text>
            <Text style={styles.cardChange}>Today's Steps</Text>
          </View>
        </View>
        
        
        {/* Activity Chart */}
        <View style={{ marginTop: 20 }}>
          <RegularText style={gs.text}>Weekly Activity</RegularText>
           
        </View>

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