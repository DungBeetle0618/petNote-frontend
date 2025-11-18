import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActivityComponent from './ActivityComponent';

const ActivityTab = () => {
  
  return (
    <View style={{marginBottom: 120}}>
        <ActivityComponent />
        {/* <View style={{marginBlock: 20}} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  
});
export default ActivityTab;