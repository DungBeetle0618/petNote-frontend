/**
 * 리마인더 화면
 */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { ExpandableCalendar, CalendarProvider } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import EBoldText from '../components/font/EBoldText';
import dayjs from 'dayjs';
import { getPetList } from '../api/pet';

const CalendarBox = React.memo(({ markedDates, theme }) => (
  <ExpandableCalendar
    initialPosition="open"
    disableWeekScroll={false}
    markingType="multi-dot"   // dot 여러 개 표시
    markedDates={markedDates} // dot 전달
    theme={theme}
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
    monthFormat="yyyy년 MM월"
  />
));


const ReminderScreen = () => {

  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [petList, setPetList] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState('all'); // 선택한 동물

  const selectedPetLabel = useMemo(() => {
    if (selectedAnimal === 'all') return '전체';
    const found = petList.find(p => String(p.petNo) === String(selectedAnimal));
    return found?.petName ?? '선택';
  }, [selectedAnimal, petList]);

  //나의 펫 리스트 조회
  const getMyPetList = async () => {
    try {
      const { data } = await getPetList();
      if (data.result === "SUCCESS") {
        setPetList(data.list);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getMyPetList();
  }, [])

  const calendarTheme = useMemo(() => ({
    selectedDayBackgroundColor: COLORS.primary,
    selectedDayTextColor: '#fff',
    todayTextColor: COLORS.primary,
    // todayBackgroundColor: '#fff5e6',
    monthTextColor: '#333',
    textSectionTitleColor: '#999'
  }), []);

  // -------------------------
  //  예시 일정 데이터
  // -------------------------
  const reminderList = useMemo(() => ([
    {
      id: '1',
      date: '2025-12-14',
      time: '10:00',
      petNo: 1,
      petName: '인절미',
      type: '04',
      typeName: '병원',
      title: '사료 주문',
    },
    {
      id: '2',
      date: '2025-12-14',
      time: '15:00',
      petNo: 1,
      petName: '인절미',
      type: '01',
      typeName: '병원',
      title: '병원 검사',
    },
    {
      id: '3',
      date: '2025-12-14',
      time: '12:00',
      petNo: 3,
      petName: '주디',
      type: '03',
      typeName: '미용',
      title: '미용',
    },
    {
      id: '4',
      date: '2025-12-15',
      time: '09:00',
      petNo: 1,
      petName: '인절미',
      type: '02',
      typeName: '산책',
      title: '산책',
    },
  ]), []);

  const reminderData = useMemo(() => {
    return reminderList.reduce((acc, cur) => {
      if (!acc[cur.date]) acc[cur.date] = [];
      acc[cur.date].push(cur);
      return acc;
    }, {});
  }, [reminderList]);


  // 카테고리별 색상
  const typeColors = {
    '01': '#ff5c5c',
    '02': '#ff9f1c',
    '03': '#4bc0c8',
    '04': '#6a5acd',
  };

  // -------------------------
  //  캘린더 markedDates 계산
  // -------------------------
  const markedDates = useMemo(() => {
    const dates = {};

    Object.entries(reminderData).forEach(([date, events]) => {
      // 펫 필터
      const filtered =
        selectedAnimal === 'all'
          ? events
          : events.filter(e => String(e.petNo) === String(selectedAnimal));

      if (filtered.length === 0) return;

      const categories = {};
      filtered.forEach(ev => {
        categories[ev.type] = {
          color: typeColors[ev.type],
          selectedDotColor: typeColors[ev.type],
        };
      });

      dates[date] = {
        dots: Object.values(categories),
      };
    });

    // 선택 날짜 강조
    dates[selectedDate] = {
      ...(dates[selectedDate] ?? {}),
      selected: true,
      selectedColor: COLORS.primary,
    };

    return dates;
  }, [reminderData, selectedDate, selectedAnimal]);




  // -------------------------
  //  선택된 날짜의 일정 필터링
  // -------------------------
  const filteredList = useMemo(() => {
    let list = reminderData[selectedDate] ?? [];

    // 펫 필터
    if (selectedAnimal !== 'all') {
      list = list.filter(
        e => String(e.petNo) === String(selectedAnimal)
      );
    }

    // 시간순 정렬 (HH:mm)
    return [...list].sort((a, b) =>
      a.time.localeCompare(b.time)
    );
  }, [reminderData, selectedDate, selectedAnimal]);


  // -------------------------
  //  리스트 렌더링
  // -------------------------
  const renderItem = useCallback(({ item }) => (
    <View style={styles.item}>
      <View style={[styles.colorDot, { backgroundColor: typeColors[item.type] }]} />
      <View>
        <Text style={styles.itemTime}>{item.time}</Text>
        <Text style={styles.itemPetName}>{item.petName}</Text>
      </View>
      <Text style={styles.itemTitle}>{item.title}</Text>
    </View>
  ), []);



  return (
    <CalendarProvider date={selectedDate} onDateChanged={date => setSelectedDate(date)}>
      <View style={styles.container}>
        <View style={styles.header}>
          <EBoldText style={gs.title}>리마인더</EBoldText>

          <View style={styles.dropdownBox}>
            <View pointerEvents="none" style={styles.dropdownLabel}>
              <Text style={{ fontSize: 13, color: '#666' }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >{selectedPetLabel}</Text>
            </View>
            <FontAwesome name='sort-down' style={styles.dropdownBtn} />
            <Picker
              selectedValue={selectedAnimal}
              onValueChange={value => setSelectedAnimal(value)}
              style={styles.dropdownPicker}
            >
              <Picker.Item label="전체" value="all" />
              {petList.map((item) => (
                <Picker.Item key={`pet-${item.petNo}`} label={item.petName} value={item.petNo} />
              ))}
            </Picker>
          </View>
        </View>


        {/* -------------------------
            캘린더
        -------------------------- */}
        <CalendarBox markedDates={markedDates} theme={calendarTheme} />


        <View style={styles.listWrapper}>
          {/* -------------------------
            일정 리스트
        -------------------------- */}
          <View style={styles.dateTitleBox}>
            <Text style={styles.dateTitle}>{dayjs(selectedDate).format('YYYY년 MM월 DD일')} 일정</Text>
          </View>

          <FlatList
            data={filteredList}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
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
    </CalendarProvider>
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
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    height: 40,
    width: 120,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 8
  },
  dropdownPicker: {
    width: '100%',
    height: '100%',
    opacity: 0
  },
  dropdownLabel: {
    position: 'absolute',
    left: 10,
    top: 8,
    width: 60,
    overflow: 'hidden'
  },
  dropdownBtn: {
    position: 'absolute',
    right: 10,
    top: 5,
    fontSize: 18,
    color: '#333'
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
  itemPetName: { fontSize: 12, color: '#333', fontWeight: 700, marginRight: 16 },
  itemTitle: { flex: 1, color: '#333' },
  empty: { textAlign: 'center', color: '#777', marginTop: 20 },

  listWrapper: {
    flex: 1,
    marginTop: 12,
    paddingHorizontal: 16,
  }
});

export default ReminderScreen;