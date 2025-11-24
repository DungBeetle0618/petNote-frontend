/**
 * 위치기반 추천 화면
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import KakaoMapView from '../components/nearby/KakaoMapView';

import EBoldText from '../components/font/EBoldText';
import gs from '../assets/styles/globalStyles';

const NearbyScreen = () => {
  return (
    <View style={styles.container}>
      <KakaoMapView style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }
});

export default NearbyScreen;