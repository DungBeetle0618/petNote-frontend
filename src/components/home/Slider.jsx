import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import Magazine from "./Magazine";
import Petcard from "./Petcard";


import gs, { COLORS } from '../../assets/styles/globalStyles';

const Slider = ({ flag, onAddPetPress  }) => {
  const { width } = Dimensions.get("window");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [heights, setHeights] = useState({}); // 카드별 높이 저장
  const [sliderHeight, setSliderHeight] = useState(0); // 현재 카드 높이
  
  const onScroll = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / width);
    setPage(currentIndex);

    // 현재 페이지 높이로 슬라이더 높이 업데이트
    if (heights[currentIndex]) {
      setSliderHeight(heights[currentIndex]);
    }
  };

  const finalData = flag === "petcard" && data.length === 0
  ? [{ id: "add", type: "add" }]
  : data;


  useEffect(() => {
    if (flag == "magazine") {
      setData([{ id: 1 }, { id: 2 }]); // 매거진 더미 데이터
    } else if (flag == "petcard") {
      // ✅ 예시용 펫 데이터
      setData([
        {
          id: 1,
          name: "토리",
          birth: "2021/07/18",
          species: "말티푸",
          weight: 4.2,
          weightChangeThisWeek: 0.3,
          healthStatus: "Good",
          stepsToday: 4200,
          activityData: [
            { day: "Mon", steps: 3500 },
            { day: "Tue", steps: 4200 },
            { day: "Wed", steps: 4600 },
            { day: "Thu", steps: 3900 },
            { day: "Fri", steps: 4800 },
            { day: "Sat", steps: 5200 },
            { day: "Sun", steps: 4700 },
          ],
        },
        {
          id: 2,
          name: "아치",
          birth: "2021/07/18",
          species: "코리안숏헤어",
          weight: 4.6,
          weightChangeThisWeek: -0.1,
          healthStatus: "Normal",
          stepsToday: 3800,
          activityData: [
            { day: "Mon", steps: 3000 },
            { day: "Tue", steps: 3400 },
            { day: "Wed", steps: 4100 },
            { day: "Thu", steps: 4200 },
            { day: "Fri", steps: 4400 },
            { day: "Sat", steps: 4600 },
            { day: "Sun", steps: 4900 },
          ],
        },
      ]);
    }
  }, [flag]);

 {/**
   const API_URL = {
    magazine: "https://your-api-url.com/magazines",
    today: "https://your-api-url.com/today-recommendations",
    // 필요하면 더 확장 가능
  };

  useEffect(() => {
    fetch(API_URL[flag])
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.log(err));
  }, [flag]);
*/}

  const AddPetCard = ({ onPress }) => (
     <TouchableOpacity 
        activeOpacity={0.9}
        style={[styles.addCard, { zIndex: 999 }]} 
        onPress={onPress}
    >
        <Text style={styles.addIcon}>＋</Text>
        <Text style={styles.addText}>반려동물 추가</Text>
    </TouchableOpacity>
  );
  
  const renderCard = ({ item, index }) => {
    const onCardLayout = (e) => {
      const h = e.nativeEvent.layout.height;
      setHeights((prev) => ({ ...prev, [index]: h }));

      // 현재 페이지라면 바로 높이 적용
      if (page === index) setSliderHeight(h);
    };

    if (flag === "petcard") {
      if (item.type === "add"){
        return <AddPetCard onLayout={onCardLayout} onPress={onAddPetPress} />
      }
      return (
        <View onLayout={onCardLayout}>
          <Petcard item={item} />
        </View>
      );
    }

    if (flag === "magazine") return <Magazine item={item} />;
    return null;
  };

  
  return (
    <View style={{ height: sliderHeight || undefined }}>
      <FlatList
        data={finalData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={renderCard}
        contentContainerStyle={{ paddingBottom: 0 }}
      />

      

      {/* Magazine일 때만 페이지 표시 */}
      {flag == "magazine" && (
        <View style={styles.dotContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                page === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    position: "absolute",
    bottom: -10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  inactiveDot: {
    backgroundColor: "rgba(148, 148, 148, 1)",
  },

   addCard: {
    width: Dimensions.get("window").width * 0.9,
    height: 200,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3ff",
  },
  addIcon: {
    fontSize: 30,
    color: "#979797ff",
    marginBottom: 4,
  },
  addText: {
    fontSize: 16,
    color: "#8b8b8bff",
    fontWeight: "400",
  },
});

export default Slider;