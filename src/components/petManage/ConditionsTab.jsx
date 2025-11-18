import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealsComponent from './MealsComponent';
import ToiletComponent from './ToiletComponent';

const ConditionsTab = () => {
  
  return (
    <View style={{marginBottom: 120}}>
        <MealsComponent />
        <View style={{marginBlock: 20}} />
        <ToiletComponent />
    </View>
  );
};
const styles = StyleSheet.create({
  
});
export default ConditionsTab;