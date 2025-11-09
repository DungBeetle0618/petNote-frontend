import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import { VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryScatter, VictoryGroup } from "victory-native";
import { useNavigation } from '@react-navigation/native';
import WeightAddModal from './WeightAddModal';
import { AppSelect } from './common';
import dayjs from 'dayjs';

const WeightComponent = () => {
  const [open, setOpen] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const navigation = useNavigation();

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

  const weights = filteredData.map(d => d.weight);
  let yMin = 0;
  let yMax = 0;

  if (weights.length > 0) {
    const min = Math.min(...weights);
    const max = Math.max(...weights);
    const diff = max - min;
    const margin = diff * 0.1 || 0.2; // 변화폭이 너무 작으면 최소 0.2 여유

    yMin = min - margin;
    yMax = max + margin;

    // 데이터가 너무 적으면 강제로 보기 좋게 확대
    if (weights.length <= 2) {
      yMin = min - 1;
      yMax = max + 1;
    }
  } else {
    // 데이터가 아예 없을 때 대비
    const allWeights = weightData.map(d => d.weight);
    const min = Math.min(...allWeights);
    const max = Math.max(...allWeights);
    yMin = min - 0.2;
    yMax = max + 0.2;
  }

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
        <View style={{ marginTop: scale(25) }}>
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
        <View style={{ marginTop: 12 }}>

          <AppSelect options={rangeOptions} selected={range} onSelect={(v) => { setRange(v) }} />

          <View style={{flexDirection: 'row', alignItems: "stretch"}}>
            {/* y축 고정 */}
            <VictoryChart
              width={40}
              height={220}
              padding={{ top: 40, bottom: 40, left: 40, right: 0 }}
              domain={{y: [yMin, yMax]}}
            >
              <VictoryAxis
                dependentAxis
                style={{
                  axis: { stroke: "transparent" },
                  tickLabels: { fill: "#4A2800", fontSize: 11, padding: 5 },
                  grid: { stroke: "transparent" },
                }}
              />
            </VictoryChart>

            {/* 가로 스크롤 */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <VictoryChart
                width={Math.max(screenWidth, filteredData.length * 40)}
                height={220}
                padding={{ top: 40, bottom: 40, left: 20, right: 20 }}
                domain={{y: [yMin, yMax]}}
                containerComponent={
                  <VictoryVoronoiContainer
                    voronoiBlacklist={["scatter"]}
                    labels={({ datum }) => `${datum.y} kg`}
                    labelComponent={
                      <VictoryTooltip
                        flyoutStyle={{
                          stroke: COLORS.primary,
                          fill: "#fff"
                        }}
                        style={{ fontSize: 12, fill: "#4A2800" }}
                        cornerRadius={6}
                        pointerLength={6}
                        constrainToVisibleArea={false}
                      />
                    }
                  />
                }
              >
                <VictoryAxis
                  dependentAxis
                  style={{
                    axis: { stroke: "transparent" },
                    tickLabels: { display: "none" }, // 눈금 텍스트 숨김
                    grid: { stroke: "#F2F2F2" }, // 가로선 표시
                  }}
                />
                <VictoryAxis
                  style={{
                    axis: { stroke: "#E5E5E5" },
                    tickLabels: { fill: "#4A2800", fontSize: 11, padding: 5 },
                    grid: { stroke: "transparent" }
                  }}
                />
                <VictoryGroup data={filteredData.map(d => ({
                  x: dayjs(d.date).format("MM/DD"),
                  y: d.weight
                }))}
                >
                  <VictoryLine
                    interpolation="catmullRom"
                    style={{ data: { stroke: COLORS.primary, strokeWidth: 3 } }}
                    animate={{
                      onLoad: { duration: 100, easing: "bounce" }
                    }}
                  />
                  <VictoryScatter
                    name="scatter"
                    size={5}
                    style={{
                      data: {
                        fill: COLORS.primary,
                        strokeWidth: 2
                      }
                    }}
                  />
                </VictoryGroup>
              </VictoryChart>
            </ScrollView>

          </View>

        </View>
        <View style={{ marginTop: scale(20) }}>
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
    borderRadius: scale(20),
    padding: scale(20),
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleIcon: {
    backgroundColor: COLORS.primary,
    padding: scale(10),
    borderRadius: scale(10),
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
    paddingBlock: scale(8),
    backgroundColor: COLORS.primary,
    borderRadius: scale(20)
  },
  addBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 800
  },
});
export default WeightComponent;