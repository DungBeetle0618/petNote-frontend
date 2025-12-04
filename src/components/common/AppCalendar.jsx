import React, { useMemo } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../assets/styles/globalStyles';
import { generateMarkedDates } from '../../utils/calendarUtils';

export default function AppCalendar({
    selected,
    setSelected,
    data = [],
    valueKey,
}) {
    LocaleConfig.locales.kr = {
    monthNames: [
        '01월', '02월', '03월', '04월', '05월', '06월', 
        '07월', '08월', '09월', '10월', '11월', '12월'
    ],
    monthNamesShort: [
        '01월', '02월', '03월', '04월', '05월', '06월',
        '07월', '08월', '09월', '10월', '11월', '12월'
    ],
    dayNames: [
        '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'
    ],
    dayNamesShort: [
        '일', '월', '화', '수', '목', '금', '토'
    ]
    }
    LocaleConfig.defaultLocale='kr';


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
