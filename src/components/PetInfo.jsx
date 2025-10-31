/**
 * 동물정보 카드
 */
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import RegularText from './font/RegularText';
import BoldText from './font/BoldText';

const PetInfo = ({data}) => {
    return (
        <View style={[gs.card, style.pteInfo]}>

        </View>
    );
};

const style = StyleSheet.create({
    pteInfo: {
        width: '100%',
        height: scale(300),
        marginTop: 25,
        backgroundColor: '#faf5ff',
        borderRadius: scale(15)
    }
});

export default PetInfo;