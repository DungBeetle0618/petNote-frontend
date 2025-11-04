import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import FeedCard from '../components/FeedCard';

const FeedScreen = () => {

    return (
        <View style={{paddingHorizontal:1, paddingVertical:5}}>
            <FeedCard />
            <FeedCard />
            <FeedCard />
        </View>
    );

};





export default FeedScreen;
