import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomModal } from '../components/common';
import AppCalendar from '../components/common/AppCalendar';
import dayjs from 'dayjs';

const WeightDetailScreen = () => {
    const [open, setOpen] = useState(false);
    const [daySelected, setDaySelected] = useState(dayjs().format('YYYY-MM-DD'));

    const kor = useMemo(() => dayjs(daySelected).format('YYYY년 MM월 DD일'), [daySelected]);


    const daySelectHandle = (day) => {
        setDaySelected(day);
    }

    
    return (
        <View style={gs.screen}>
            <AppCalendar selected={daySelected} setSelected={(day) => daySelectHandle(day)} />

        </View>

    );
};

const styles = StyleSheet.create({

});

export default WeightDetailScreen;
