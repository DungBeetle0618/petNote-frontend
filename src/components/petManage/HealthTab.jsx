import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WeightComponent from './WeightComponent';
import HospitalComponent from './HospitalComponent';

const HealthTab = () => {
  
  return (
    <View style={{marginBottom: 30}}>
        <WeightComponent />
        <View style={{marginBlock: 20}} />
        <HospitalComponent />
    </View>
  );
};
const styles = StyleSheet.create({
  
});
export default HealthTab;