import React, { useMemo } from 'react';
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../assets/styles/globalStyles';
import { generateMarkedDates } from '../../utils/calendarUtils';

export default function AppCalendar({
    selected,
    setSelected,
    data = [],
    valueKey,
}) {
    const markedDates = useMemo(
        () => generateMarkedDates({ data, selected, valueKey }),
        [data, selected, valueKey]
    );

    return (
        <Calendar
            onDayPress={(day) => setSelected(day.dateString)}
            markedDates={markedDates}
            renderArrow={(direction) => (
                <FontAwesome
                    name={direction === 'left' ? 'caret-left' : 'caret-right'}
                    size={24}
                    color="#777"
                />
            )}
            monthFormat="yyyy년 MM월"
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
