/**
 * 홈(메인) 화면
 */
import React, { useState } from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { scale } from 'react-native-size-matters';
import PetSelectBox from '../components/PetSelectBox';
import MagazineSlider from "../components/Slider";
import { useEffect } from 'react';
import EBoldText from '../components/font/EBoldText';
import BoldText from '../components/font/BoldText';
import RegularText from '../components/font/RegularText';
import LightText from '../components/font/LightText';

import gs, { COLORS } from '../assets/styles/globalStyles';

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
  cardContainer1: {
    padding: 16,
    marginTop: 20,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FCD9A3",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    alignItems: "center",
  },
  title: {
    color: "#1A1A1A",
    fontSize: 16,
    fontWeight: "600",
  },
  calendarIcon: {
    fontSize: 20,
    color: "#EA580C",
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    color: "#1A1A1A",
    fontSize: 14,
    fontWeight: "500",
  },
  itemSub: {
    color: "#666",
    fontSize: 12,
    marginTop: 4,
  },
  badgeOrange: {
    backgroundColor: "#EA580C",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeOrangeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  badgeAmberBorder: {
    borderWidth: 1,
    borderColor: "#FCD34D",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeAmberBorderText: {
    color: "#B45309",
    fontSize: 10,
    fontWeight: "600",
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
    { day: "Sun", steps: 20000 },
  ];

  const screenWidth = Dimensions.get("window").width;

    useEffect(()=>{
        //대표동물 기본 선택
        setSelected(options[0]);
    }, [])

  return (
      <ScrollView contentContainerStyle={gs.screen}>
        {/* 상단 주황색 영역 */}
        <View >
           <EBoldText style={gs.title}>오늘의 {selected?.name}</EBoldText>
           <BoldText style={gs.subtitle}>10월 29일 수요일</BoldText>

          <View>
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
        </View>
        
        
        {/* Activity Chart */}
        <View style={{ marginTop: 20 }}>
          <RegularText style={gs.text}>Weekly Activity</RegularText>
          <LineChart
            data={{
              labels: activityData.map(d => d.day),
              datasets: [{ data: activityData.map(d => d.steps) }]
            }}
            width={screenWidth - 40}
            height={200}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 102, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(74, 40, 0, ${opacity})`,
              propsForDots: {
                r: "2",
                strokeWidth: "2",
                stroke: "#FF6600"
              }
            }}
          />
        </View>

        {/* Upcoming Reminders */}
        <View style={styles.cardContainer1}>
          <View style={styles.header}>
            <RegularText style={gs.text}>Upcoming Reminders</RegularText>
            <Text style={styles.calendarIcon}>📅</Text>
          </View>

          <View style={[styles.item, { backgroundColor: "#FFF7ED" }]}>
            <View style={[styles.iconCircle, { backgroundColor: "#F97316" }]}>
              <Text style={styles.emoji}>💉</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.itemTitle}>Next Vaccination</Text>
              <Text style={styles.itemSub}>Oct 30, 2025 • Happy Animal Hospital</Text>
            </View>
            <View style={styles.badgeOrange}>
              <Text style={styles.badgeOrangeText}>Tomorrow</Text>
            </View>
          </View>
          
          {/* Item 2 */}
          <View style={[styles.item, { backgroundColor: "#FEF3C7" }]}>
            <View style={[styles.iconCircle, { backgroundColor: "#D97706" }]}>
              <Text style={styles.emoji}>✂️</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.itemTitle}>Grooming Appointment</Text>
              <Text style={styles.itemSub}>Nov 1, 2025 • Pet Paradise Salon</Text>
            </View>
            <View style={styles.badgeAmberBorder}>
              <Text style={styles.badgeAmberBorderText}>4 days</Text>
            </View>
          </View>
        </View>

        {/* Challenge */}
        <View style={{ marginTop: 20 }}>
          <RegularText style={gs.text}>Challenge</RegularText>
          <View style={gs.card}>
            <EBoldText>Extra Bold 폰트사이즈</EBoldText>
            <LightText style={gs.text}>Light 폰트사이즈</LightText>
          </View>
          <View style={gs.card}>
            <EBoldText>Extra Bold 폰트사이즈</EBoldText>
            <LightText style={gs.text}>Light 폰트사이즈</LightText>
          </View>
        </View>

        {/* 매거진 */}
        <View style={{ marginTop: 20 }}>
          <RegularText style={gs.text}>매거진</RegularText>
           <MagazineSlider flag="magazine"/>
        </View>

        
        

      </ScrollView>
  );
};

export default HomeScreen;