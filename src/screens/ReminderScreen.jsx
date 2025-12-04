/**
 * 리마인더 화면
 */
import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { ExpandableCalendar, CalendarProvider } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import EBoldText from '../components/font/EBoldText';
import dayjs from 'dayjs';

const CalendarBox = React.memo(({ selectedDate, onDateChanged, markedDates, calendarPosition, setCalendarPosition }) => {
  return (
    <CalendarProvider date={selectedDate} onDateChanged={onDateChanged} >
      <ExpandableCalendar
        position={calendarPosition}
        initialPosition={'open'}
        disableWeekScroll={false}
        markingType="multi-dot"   // ✔ dot 여러 개 표시 가능
        markedDates={markedDates} // ✔ dot 전달
        hideKnob={false}
        disablePan={false}
        allowShadow={false}
        renderArrow={(direction) => (
          <FontAwesome
            name={direction === 'left' ? 'caret-left' : 'caret-right'}
            size={24}
            color="#777"
          />
        )}
        onCalendarToggled={(isExpanded) => {
          setCalendarPosition(isExpanded ? 'open' : 'closed');
        }}
        monthFormat="yyyy년 MM월"
      />
    </CalendarProvider>
  );
});





const ReminderScreen = () => {

  // const today = useMemo(() => dayjs().format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedAnimal, setSelectedAnimal] = useState('all'); // 선택한 동물

  const [calendarPosition, setCalendarPosition] = useState("open");

  // -------------------------
  //  예시 일정 데이터
  // -------------------------
  const reminderData = useMemo(
    () => ({
      dog: {
        '2025-12-14': [
          { id: '1', time: '10:00', title: '사료 주문', type: 'hospital', typeName: '병원' },
          { id: '2', time: '15:00', title: '병원 검사', type: 'hospital', typeName: '병원' },
        ],
        '2025-12-15': [
          { id: '3', time: '09:00', title: '산책', type: 'walk', typeName: '산책' }
        ],
      },
      cat: {
        '2025-12-14': [
          { id: '4', time: '12:00', title: '미용', type: 'beauty', typeName: '미용' }
        ],
      },

    }),
    []
  );

  // 카테고리별 색상
  const typeColors = {
    hospital: '#ff5c5c',
    beauty: '#ff9f1c',
    walk: '#4bc0c8',
    etc: '#6a5acd',
  };

  // -------------------------
  //  캘린더 markedDates 계산
  // -------------------------
  const markedDates = useMemo(() => {
    const dates = {};

    const animalsToRender = selectedAnimal === 'all'
      ? Object.keys(reminderData)
      : [selectedAnimal];

    animalsToRender.forEach(animal => {
      const eventsByDate = reminderData[animal];

      Object.keys(eventsByDate).forEach(date => {
        if (!dates[date]) dates[date] = { dots: [] };

        // 날짜 안에 여러 일정이 들어있어도 카테고리별 dot 1개씩만 추가
        const categories = {};

        eventsByDate[date].forEach(ev => {
          categories[ev.type] = {
            color: typeColors[ev.type],
            selectedDotColor: typeColors[ev.type]
          };
        });

        dates[date].dots.push(...Object.values(categories));
      });
    });

    // 선택 날짜 강조
    if (dates[selectedDate]) {
      dates[selectedDate] = {
        ...dates[selectedDate],
        selected: true,
        selectedColor: COLORS.primary
      };
    } else {
      dates[selectedDate] = {
        selected: true,
        selectedColor: COLORS.primary
      };
    }

    return dates;
  }, [selectedDate, selectedAnimal]);


  // -------------------------
  //  선택된 날짜의 일정 필터링
  // -------------------------
  const filteredList = useMemo(() => {
    if (selectedAnimal === 'all') {
      const allEvents = [];

      Object.keys(reminderData).forEach(animal => {
        const events = reminderData[animal][selectedDate] ?? [];
        events.forEach(e => allEvents.push({ ...e, animal }));
      });

      return allEvents;
    }

    return (reminderData[selectedAnimal][selectedDate] ?? []).map(e => ({
      ...e,
      animal: selectedAnimal
    }));
  }, [selectedDate, selectedAnimal]);

  // -------------------------
  //  리스트 렌더링
  // -------------------------
  const renderItem = useCallback(({ item }) => (
    <View style={styles.item}>
      <View style={[styles.colorDot, { backgroundColor: typeColors[item.type] }]} />
      <Text style={styles.itemTime}>{item.time}</Text>
      <Text style={styles.itemTitle}>{item.title}</Text>
    </View>
  ), []);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <EBoldText style={gs.title}>리마인더</EBoldText>

        <View style={styles.dropdownBox}>
          <Picker
            selectedValue={selectedAnimal}
            onValueChange={value => setSelectedAnimal(value)}
            style={{ flex: 1 }}
          >
            <Picker.Item label="전체" value="all" />
            <Picker.Item label="강아지" value="dog" />
            <Picker.Item label="고양이" value="cat" />
          </Picker>
        </View>
      </View>


      {/* -------------------------
          캘린더
      -------------------------- */}
      <CalendarBox
        selectedDate={selectedDate}
        onDateChanged={date => setSelectedDate(date)}
        markedDates={markedDates}
        calendarPosition={calendarPosition}
        setCalendarPosition={setCalendarPosition}
      />


      <View style={[styles.listWrapper, { top: calendarPosition === 'open' ? 420 : 220 }]}>
        {/* -------------------------
          일정 리스트
      -------------------------- */}
        <View style={styles.dateTitleBox}>
          <Text style={styles.dateTitle}>{selectedDate} 일정</Text>
        </View>

        <FlatList
          data={filteredList}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <Text style={styles.empty}>일정이 없습니다.</Text>
          }
        />
      </View>
      {/* 추가 버튼 */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.addBtn}
      // onPress={() => { setPetModalVisible(true); }}
      >
        <FontAwesome6 name='plus' style={styles.whiteFont} />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBlock: 20
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  addBtn: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    zIndex: 99,

    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
      android: {
        elevation: 4,
      }
    })
  },
  whiteFont: {
    color: 'white',
    fontSize: 14
  },

  dropdownBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    height: 30,
    width: 100
  },
  dateTitleBox: { paddingHorizontal: 16, marginTop: 10 },
  dateTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10
  },
  itemTime: { width: 60, color: '#ff7a00', fontWeight: '700' },
  itemTitle: { flex: 1, color: '#333' },
  empty: { textAlign: 'center', color: '#777', marginTop: 20 },

  listWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  }
});

export default ReminderScreen;