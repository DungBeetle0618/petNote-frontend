import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../assets/styles/globalStyles';

export default function AppCalendar({ selected, setSelected }) {

    return (
        <Calendar onDayPress={day => {
            setSelected(day.dateString);
        }}
            markedDates={{
                [selected]: { selected: true }
            }}
            // markingType={'multi-dot'}
            renderArrow={(direction) => (
                <FontAwesome
                    name={direction === 'left' ? 'caret-left' : 'caret-right'}
                    size={24}
                    color={'#777'}
                />
            )}
            monthFormat={'yyyy년 MM월'}
            theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: COLORS.primary,
                selectedDayTextColor: '#ffffff',
                todayTextColor: COLORS.primary,
            }}
        />
    );
}
