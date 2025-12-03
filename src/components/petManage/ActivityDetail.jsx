import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import gs, { COLORS, PX_SIZE } from '../../assets/styles/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FullModal from '../common/FullModal';
import AppCalendar from '../common/AppCalendar';
import dayjs from 'dayjs';
import { WeekCalendar, CalendarProvider } from 'react-native-calendars';

const ActivityDetail = ({ visible, onClose, title }) => {
    const [open, setOpen] = useState(false);
    const [daySelected, setDaySelected] = useState(dayjs().format('YYYY-MM-DD'));

    const kor = useMemo(() => dayjs(daySelected).format('YYYY년 MM월 DD일'), [daySelected]);


    const daySelectHandle = (day) => {
        setDaySelected(day);
    }

    const goPrevWeek = () => {
        setDaySelected(prev =>
            dayjs(prev).subtract(7, 'day').format('YYYY-MM-DD')
        );
    };

    const goNextWeek = () => {
        setDaySelected(prev =>
            dayjs(prev).add(7, 'day').format('YYYY-MM-DD')
        );
    };

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
            <CalendarProvider
                date={daySelected}
                onDateChanged={setDaySelected}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity onPress={goPrevWeek}>
                        <Text style={{ color: '#777', fontSize: 20 }}>{"<"}</Text>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 18, color: '#333', fontWeight: '600' }}>
                        {dayjs(daySelected).format('YYYY년 MM월')}
                    </Text>

                    <TouchableOpacity onPress={goNextWeek}>
                        <Text style={{ color: '#777', fontSize: 20 }}>{">"}</Text>
                    </TouchableOpacity>
                </View>

                <WeekCalendar
                    firstDay={1} // 월요일 시작
                    current={daySelected}
                    onDayPress={(day) => {
                        setDaySelected(day.dateString);
                    }}
                    theme={{
                        calendarBackground: '#fff',
                        textSectionTitleColor: '#b6c1cd',
                        dayTextColor: '#333',
                        todayTextColor: COLORS.primary,
                        selectedDayBackgroundColor: COLORS.primary,
                        selectedDayTextColor: '#fff',
                    }}
                    style={{
                        backgroundColor: '#fff',
                        paddingBottom: 10
                    }}
                    markedDates={{
                        [daySelected]: {
                            selected: true,
                            selectedColor: COLORS.primary,
                        }
                    }}
                />
            </CalendarProvider>

            <View style={styles.container} >
                
            </View>

        </FullModal>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        paddingHorizontal: PX_SIZE.lg,
        paddingVertical: 20,
    },
    calTitle: {
        fontSize: 16,
        fontWeight: 600,
    },
});

export default ActivityDetail;
