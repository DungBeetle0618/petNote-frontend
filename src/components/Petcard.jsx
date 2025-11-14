import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryScatter, VictoryGroup } from "victory-native";

import gs, { COLORS } from '../assets/styles/globalStyles';
const Petcard = ({ item }) => {
    
    const screenWidth = Dimensions.get("window").width;
    const [selected, setSelected] = useState(item);

    // ✅ activityData가 없으면 빈 배열로 기본값 설정
    const activityData = selected?.activityData ?? [];

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.item}>
                    <View style={styles.imgCircle}></View>
                    <View style={styles.content}>
                        <Text style={styles.itemTitle}>{selected.name}</Text>
                        <Text style={styles.itemSub}>{selected.birth} • {selected.species}</Text>
                    </View>
                </View>

                {/* Weight/Health/Meals/Steps 카드 */}
                <View style={styles.cardContainer}>
                    {/* Weight */}
                    <View style={styles.card}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.emoji}>⚖️</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>몸무게</Text>
                            <Text style={styles.cardValue}>{selected.weight} kg</Text>
                            <Text style={styles.cardChange}>+{selected.weightChangeThisWeek} kg</Text>
                        </View>
                    </View>

                    {/* Health */}
                    <View style={styles.card}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.emoji}>🏋️</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>건강지수</Text>
                            <Text style={styles.cardValue}>{selected.healthStatus}</Text>
                            <Text style={styles.cardChange}>Status</Text>
                        </View>
                    </View>

                    {/* Meals */}
                    <View style={styles.card}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.emoji}>🥣</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>식사량</Text>
                            <Text style={styles.cardValue}> g</Text>
                            <Text style={styles.cardChange}>오늘의 식사량</Text>
                        </View>
                    </View>

                    {/* Steps */}
                    <View style={styles.card}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.emoji}>👣</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>걸음수</Text>
                            <Text style={styles.cardValue}>{selected.stepsToday}</Text>
                            <Text style={styles.cardChange}>오늘의 걸음수</Text>
                        </View>
                    </View>
            </View>
        </View>


            

            {/* 활동 카드 3개 */}
            <View style={styles.cardContainer3}>
                {/* 산책하기 */}
                <View style={[styles.card3, { backgroundColor: "#47e471ff" }]}>
                <Text style={styles.cardSub3}>스트레스 해소!</Text>
                <Text style={styles.cardTitle3}>산책하기</Text>
                <Text style={styles.cardValue3}>0분</Text>
                {/* <Image
                    source={require("../assets/images/heart.png")} // ❤️ 하트 이미지 추가
                    style={styles.iconImage3}
                /> */}
                </View>

                {/* 식사하기 */}
                <View style={[styles.card3, { backgroundColor: "#7e70acff" }]}>
                <Text style={styles.cardSub3}>맛있게 냠냠!</Text>
                <Text style={styles.cardTitle3}>식사하기</Text>
                <Text style={styles.cardValue3}>1번</Text>



                {/* <Image
                    source={require("../assets/images/food.png")} // 🍖 밥그릇 이미지
                    style={styles.iconImage3}
                /> */}
                </View>

                {/* 배변활동 */}
                <View style={[styles.card3, { backgroundColor: "#cc9159ff" }]}>
                <Text style={styles.cardSub3}>간단 건강체크!</Text>
                <Text style={styles.cardTitle3}>배변활동</Text>
                <Text style={styles.cardValue3}>0번</Text>
                {/* <Image
                    source={require("../assets/images/poop.png")} // 💩 이미지
                    style={styles.iconImage3}
                /> */}
                </View>
            </View>



        {/* Activity Chart */}
        <View style={{ marginTop: 20 }}>
            <Text style={styles.chartTitle}>주간 활동량</Text>

            <VictoryChart
            width={screenWidth - 40}
            height={200}
            padding={{ top:10, bottom: 30, left: 40, right: 40 }}
            containerComponent={
                <VictoryVoronoiContainer
                labels={({ datum }) => `${datum.y} steps`}
                labelComponent={
                    <VictoryTooltip
                    flyoutStyle={{ stroke: COLORS.primary, fill: "#fff" }}
                    style={{ fontSize: 12, fill: "#4A2800" }}
                    cornerRadius={6}
                    pointerLength={6}
                    />
                }
                />
            }
            >
            <VictoryAxis
                style={{
                axis: { stroke: "#E5E5E5" },
                tickLabels: { fill: "#4A2800", fontSize: 11, padding: 5 },
                }}
            />
            <VictoryAxis
                dependentAxis
                style={{
                axis: { stroke: "transparent" },
                tickLabels: { fill: "#4A2800", fontSize: 11, padding: 5 },
                grid: { stroke: "#F2F2F2" },
                }}
            />
            <VictoryGroup data={activityData.map((d) => ({ x: d.day, y: d.steps }))}>
                <VictoryLine
                interpolation="monotoneX"
                style={{ data: { stroke: COLORS.primary, strokeWidth: 2 } }}
                />
                <VictoryScatter
                size={4}
                style={{
                    data: { fill: COLORS.primary, stroke: "#fff", strokeWidth: 1 },
                }}
                />
            </VictoryGroup>
            </VictoryChart>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    width: Dimensions.get("window").width * 0.9,
    marginRight: 2
  },
  title: { fontSize: 18, fontWeight: "700", color: "#4A2800" },
  subtitle: { fontSize: 14, color: "#A86E3B", marginBottom: 12 },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    position: "relative",
    width: "48%",
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 13, fontWeight: "600" },
  cardValue: { fontSize: 18, fontWeight: "700", marginTop: 6 },
  cardChange: { fontSize: 12, color: COLORS.primary, marginTop: 4 },
  chartTitle: { fontSize: 15, fontWeight: "600", marginBottom: 6 },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
  },
  imgCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#D5D5D5",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    marginLeft: 20,
  },
  itemTitle: {
    color: "#1A1A1A",
    fontSize: 16,
    fontWeight: "500",
  },
  itemSub: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
  },
  cardContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingRight: 30, // 아이콘이 겹치지 않게 여백 추가
    },
  iconCircle: {
    top: 10,
    right: 10,
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor : "#FFF",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 18,
  },
  
  cardContainer3: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card3: {
    width: "31%",
    borderRadius: 16,
    padding: 12,
    position: "relative",
    overflow: "hidden",
  },
  cardSub3: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 4,
  },
  cardTitle3: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
  cardValue3: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginTop: 6,
  },
  iconImage3: {
    width: 45,
    height: 45,
    position: "absolute",
    bottom: 8,
    right: 8,
    resizeMode: "contain",
  },
});

export default Petcard;