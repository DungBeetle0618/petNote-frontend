import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomModal } from '../components/common';
import AppCalendar from '../components/common/AppCalendar';


const today = new Date();
const todayString = today.toISOString().split('T')[0];

const ActivityDetailScreen = () => {
    const [open, setOpen] = useState(false);
    const [daySelected, setDaySelected] = useState(todayString);
    const [kor, setKor] = useState('');

    useEffect(() => {
        const day = daySelected.split('-');
        setKor(day[0] + '년 ' + day[1] + '월 ' + day[2] + '일');
    }, [daySelected])


    const daySelectHandle = (day) => {
        setDaySelected(day);
    }

    
    return (
        <ScrollView style={gs.screen}>
            <AppCalendar selected={daySelected} setSelected={(day) => daySelectHandle(day)} />

        </ScrollView>

    );
};

const styles = StyleSheet.create({

});

export default ActivityDetailScreen;
