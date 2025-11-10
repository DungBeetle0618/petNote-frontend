import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';
import { VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryScatter, VictoryGroup } from "victory-native";
import { COLORS } from '../../assets/styles/globalStyles';

const AnimateLineChart = ({
  data = [],
  height = 220,
  color = COLORS.primary,
  unit = 'kg',
  minDiff = 1.0,
  marginRatio = 0.1,
  fallbackValues = []
}) => {
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = Math.max(screenWidth - scale(110), data.length * 60);

  const values = data.map(d => d.y);
  let yMin = 0;
  let yMax = 0;
  if (values.length > 0) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const diff = max - min;
    if (diff < minDiff) {
      const center = (max + min) / 2;
      yMin = center - minDiff / 2;
      yMax = center + minDiff / 2;
    } else {
      const margin = diff * marginRatio;
      yMin = min - margin;
      yMax = max + margin;
    }
  } else if (fallbackValues.length > 0) {
    const min = Math.min(...fallbackValues);
    const max = Math.max(...fallbackValues);
    yMin = min - 0.2;
    yMax = max + 0.2;
  } else {
    yMin = 0;
    yMax = 1;
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
      <VictoryChart
        width={40}
        height={height}
        padding={{ top: 40, bottom: 40, left: 40, right: 10 }}
        domain={{ y: [yMin, yMax] }}
      >
        <VictoryAxis
          dependentAxis
          tickFormat={(t) => `${t}${unit}`}
          style={{
            axis: { stroke: "transparent" },
            tickLabels: { fill: "#4A2800", fontSize: 11, padding: 5 },
            grid: { stroke: "transparent" },
          }}
        />
      </VictoryChart>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VictoryChart
          width={chartWidth}
          height={height}
          padding={{ top: 40, bottom: 40, left: 20, right: 20 }}
          domain={{ y: [yMin, yMax] }}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiBlacklist={["scatter"]}
              labels={({ datum }) => `${datum.y} kg`}
              labelComponent={
                <VictoryTooltip
                  flyoutStyle={{
                    stroke: color,
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
              tickLabels: { display: "none" },
              grid: { stroke: "#F2F2F2" },
            }}
          />
          <VictoryAxis
            style={{
              axis: { stroke: "#E5E5E5" },
              tickLabels: { fill: "#4A2800", fontSize: 11, padding: 5 },
              grid: { stroke: "transparent" }
            }}
          />
          <VictoryGroup data={data}>
            <VictoryLine
              interpolation="catmullRom"
              style={{ data: { stroke: color, strokeWidth: 3 } }}
              animate={{
                onLoad: { duration: 100, easing: "linear" }
              }}
            />

            <VictoryScatter
              name="scatter"
              size={5}
              style={{
                data: {
                  fill: color,
                  strokeWidth: 2
                }
              }}
            />
          </VictoryGroup>
        </VictoryChart>
      </ScrollView>
    </View>
  );
};

export default AnimateLineChart;
