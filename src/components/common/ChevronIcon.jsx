import React, { useState, useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


/**
 * 화살표 아이콘 애니메이션 
 */
const ChevronIcon = ({ visible, size }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(rotateAnim, {
            toValue: visible ? 1 : 0,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <Animated.View style={{ transform: [{ rotate }], marginLeft: 'auto' }}>
            <Ionicons name='chevron-down-outline' style={{ fontSize: size }} />
        </Animated.View>
    );
};

export default ChevronIcon;