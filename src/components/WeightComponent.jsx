import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import { VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryScatter, VictoryGroup } from "victory-native";
import { useNavigation } from '@react-navigation/native';

const WeightComponent = () => {
  const [open, setOpen] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const navigation = useNavigation();

  const weightData = [
    { day: "9/31", weight: 11.5 },
    { day: "10/5", weight: 11 },
    { day: "10/15", weight: 11.3 },
    { day: "10/17", weight: 11.5 },
    { day: "10/20", weight: 11.7 },
    { day: "10/21", weight: 11.6 },
    { day: "10/31", weight: 12.3 },
  ];
  // const [range, setRange] = useState('1M');
  // const rangeOptions = ['1W', '1M', '3M', 'All'];
  // const sliceCount = useMemo(() => ({
  //   '1W': 3,
  //   '1M': 5,
  //   '3M': 7,
  //   'All': weightData.length,
  // }), [weightData.length]);

  // const filteredData = useMemo(
  //   () => weightData.slice(-sliceCount[range]),
  //   [weightData, sliceCount, range]
  // );
  const filteredData = weightData;


  return (
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
        <Text style={styles.curWeight}>12.3 kg</Text>
        <Text style={styles.desc}>지난달보다 몸무게가 0.5kg 증가했어요</Text>
      </View>
      <View style={{ marginTop: 12 }}>
        {/* <View style={styles.rangeRow}>
          {rangeOptions.map((opt) => (
            <TouchableOpacity
              key={opt}
              activeOpacity={0.8}
              onPress={() => setRange(opt)}
              style={[styles.rangeChip, range === opt && styles.rangeChipActive]}
            >
              <Text style={[styles.rangeChipText, range === opt && styles.rangeChipTextActive]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View> */}
        <VictoryChart
          width={screenWidth - scale(80)}
          height={200}
          padding={{ top: 40, bottom: 40, left: 40, right: 20 }}
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
            style={{
              axis: { stroke: "#E5E5E5" },
              tickLabels: { fill: "#4A2800", fontSize: 11, padding: 5 },
              grid: { stroke: "transparent" }
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "transparent" },
              tickLabels: { fill: "#4A2800", fontSize: 11, padding: 5 },
              grid: { stroke: "#F2F2F2" }
            }}
          />
          <VictoryGroup data={filteredData.map(d => ({ x: d.day, y: d.weight }))}>
            <VictoryLine
              interpolation="monotoneX"
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
      </View>
      <View style={{ marginTop: scale(20) }}>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={() => { alert('작성') }}>
          <Text style={styles.addBtnText}>몸무게 기록</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  rangeRow: {
    flexDirection: 'row',
    marginBottom: scale(8),
  },
  rangeChip: {
    paddingVertical: scale(4),
    paddingHorizontal: scale(10),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: COLORS.sub,
    marginRight: scale(8),
    backgroundColor: '#fff',
  },
  rangeChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  rangeChipText: {
    fontSize: 12,
    color: '#4A2800',
  },
  rangeChipTextActive: {
    color: '#fff',
    fontWeight: 700,
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