import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealsComponent from './MealsComponent';
import ToiletComponent from './ToiletComponent';

const ConditionsComponent = () => {
  
  return (
    <>
        <MealsComponent />
        <View style={{marginBlock: 20}} />
        <ToiletComponent />
    </>
  );
};
const styles = StyleSheet.create({
  
});
export default ConditionsComponent;