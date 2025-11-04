import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';

import ColumnsCard from '../components/ColumnsCard';

const ColumnsScreen = () => {

    return (
        <View style={{paddingHorizontal:1, paddingVertical:5}}>
            <ColumnsCard />
            <ColumnsCard />
            <ColumnsCard />
        </View>
    );
};




export default ColumnsScreen;
