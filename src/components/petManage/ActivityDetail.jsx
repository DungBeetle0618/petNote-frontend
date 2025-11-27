import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import gs, { COLORS, PX_SIZE } from '../../assets/styles/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FullModal from '../common/FullModal';
import AppCalendar from '../common/AppCalendar';
import dayjs from 'dayjs';

const ActivityDetail = ({visible, onClose, title}) => {
    const [open, setOpen] = useState(false);
    const [daySelected, setDaySelected] = useState(dayjs().format('YYYY-MM-DD'));

    const kor = useMemo(() => dayjs(daySelected).format('YYYY년 MM월 DD일'), [daySelected]);


    const daySelectHandle = (day) => {
        setDaySelected(day);
    }

    /**
     * 상태 초기화
     */
    const resetStates = () => {
        setDaySelected(dayjs().format('YYYY-MM-DD'));
    }
    const handleClosed = () => {
        resetStates();
        onClose();
    }

    return (
        <FullModal visible={visible} onClose={handleClosed} title={title}>
            <View style={styles.container}>
                <AppCalendar selected={daySelected} setSelected={(day) => daySelectHandle(day)} />
            </View>
        </FullModal>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        paddingHorizontal: PX_SIZE.lg, 
        paddingVertical: 30,
    },
    calTitle: {
        fontSize: 16,
        fontWeight: 600,
    },
});

export default ActivityDetail;
