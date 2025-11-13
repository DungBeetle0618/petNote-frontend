/**
 * 홈(메인) 화면
 */
import React, { useState } from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryScatter, VictoryGroup } from "victory-native";

import PetSelectBox from '../components/PetSelectBox';
import Slider from "../components/Slider";
import { useEffect } from 'react';
import EBoldText from '../components/font/EBoldText';
import BoldText from '../components/font/BoldText';
import RegularText from '../components/font/RegularText';
import LightText from '../components/font/LightText';

import gs, { COLORS } from '../assets/styles/globalStyles';

const styles = StyleSheet.create({
  
  TopBg: { 
    position: "absolute",
    top: 0, 
    left: 0, 
    right: 0, 
    height: "22%",
    backgroundColor: COLORS.sub,
  },
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
  return (
      
      <ScrollView contentContainerStyle={gs.screen}>
        <View style={styles.TopBg} />
        <Slider flag="petcard"/>
        

        {/* 다가오는 일정 */}
        <View style={styles.cardContainer1}>
          <View style={styles.header}>
            <RegularText style={gs.text}>다가오는 일정</RegularText>
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
          <RegularText style={gs.text}>진행중인 챌린지
          </RegularText>
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
           <Slider flag="magazine"/>
        </View>

        
        

      </ScrollView>
  );
};

export default HomeScreen;