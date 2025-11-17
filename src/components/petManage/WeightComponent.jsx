import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import gs, { COLORS } from '../../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import WeightAddModal from './WeightAddModal';
import { AppSelect, AnimateLineChart } from '../common';
import dayjs from 'dayjs';

const WeightComponent = () => {
  const navigation = useNavigation();
  
  const [open, setOpen] = useState(false);

  /**
   * 몸무게 등록
   */
  const handleSubmit = () => {
    console.log('몸무게 :', data);
    setOpen(false);
  };

  const weightData = [
    { date: "2024-12-27", weight: 10.8 },
    { date: "2025-01-10", weight: 10.9 },
    { date: "2025-01-25", weight: 11.0 },
    { date: "2025-02-08", weight: 11.1 },
    { date: "2025-02-23", weight: 11.0 },
    { date: "2025-03-05", weight: 11.2 },
    { date: "2025-03-22", weight: 11.3 },
    { date: "2025-04-04", weight: 11.4 },
    { date: "2025-04-21", weight: 11.5 },
    { date: "2025-05-03", weight: 11.6 },
    { date: "2025-05-18", weight: 11.5 },
    { date: "2025-06-02", weight: 11.7 },
    { date: "2025-06-15", weight: 11.8 },
    { date: "2025-07-01", weight: 11.9 },
    { date: "2025-07-20", weight: 12.0 },
    { date: "2025-08-05", weight: 12.1 },
    { date: "2025-08-18", weight: 12.0 },
    { date: "2025-09-03", weight: 12.2 },
    { date: "2025-09-15", weight: 12.3 },
    { date: "2025-09-30", weight: 12.4 },
    { date: "2025-10-10", weight: 12.5 },
    { date: "2025-10-20", weight: 12.4 },
    { date: "2025-10-31", weight: 12.6 },
    { date: "2025-11-06", weight: 12.7 },
  ];
  const [range, setRange] = useState('1M');
  const rangeOptions = [{ code: '1W', title: '1주일' }, { code: '1M', title: '1개월' }, { code: '3M', title: '3개월' }, { code: '6M', title: '6개월' }, { code: '12M', title: '12개월' },];

  const rangeMap = {
    "1W": { unit: "week", value: 1 },
    "1M": { unit: "month", value: 1 },
    "3M": { unit: "month", value: 3 },
    "6M": { unit: "month", value: 6 },
    "12M": { unit: "month", value: 12 },
  };

  /**
   * 기간에 따른 데이터 필터링
   */
  const filteredData = useMemo(() => {
    const { unit, value } = rangeMap[range];
    const cutoff = dayjs().subtract(value, unit);

    return weightData.filter((d) => {
      const date = dayjs(d.date, "YYYY-MM-DD");
      return date.isAfter(cutoff);
    });
  }, [range]);

  const allWeights = weightData.map(d => d.weight);


  const latest = filteredData[filteredData.length - 1];
  const prev = filteredData[0];
  const diff = latest && prev ? (latest.weight - prev.weight).toFixed(1) : 0;

  return (
    <>

      <View style={styles.container}>
        <View style={styles.titleView}>
          <View style={[gs.flexRow, { alignItems: 'center' }]}>
            <FontAwesome5 name='weight' style={styles.titleIcon} />
            <View>
              <Text style={styles.title}>몸무게 기록</Text>
              <Text style={styles.subTitle}>지난 30일</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('weightDetail', { headerTitle: '몸무게 기록' })} style={styles.calendar}>
            <FontAwesome name='calendar' style={{ fontSize: 20, color: '#381600ff' }} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 35 }}>
          {latest && (
            <>
              <Text style={styles.curWeight}>{latest.weight} kg</Text>
              <Text style={styles.desc}>{diff > 0
                ? `지난 기간보다 +${diff}kg 증가`
                : diff < 0
                  ? `지난 기간보다 ${diff}kg 감소`
                  : `변화 없음`}
              </Text>
            </>

          )}
        </View>
        <View style={{ marginTop: 20 }}>

          <AppSelect options={rangeOptions} selected={range} onSelect={(v) => { setRange(v) }} />

          {/* 차트 */}
          <AnimateLineChart
            key={range}
            data={filteredData.map(d => ({ x: dayjs(d.date).format("MM/DD"), y: d.weight }))}
            fallbackValues={allWeights}
            unit="kg"
          />

        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={() => { setOpen(true) }}>
            <Text style={styles.addBtnText}>몸무게 기록</Text>
          </TouchableOpacity>
        </View>
      </View>

      <WeightAddModal visible={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.sub,
    borderRadius: 20,
    padding: 20,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleIcon: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    color: '#fff',
    marginRight: 10,
    width: 45,
    height: 45,
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  title: {
    fontSize: 16,
    fontWeight: 600
  },
  subTitle: {
    fontSize: 12,
  },
  curWeight: {
    fontSize: 22,
    fontWeight: 600
  },
  desc: {
    fontSize: 12,
    color: '#00a63db6',
    marginTop: 6
  },
  addBtn: {
    width: '100%',
    paddingBlock: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 20
  },
  addBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 700
  },
});
export default WeightComponent;