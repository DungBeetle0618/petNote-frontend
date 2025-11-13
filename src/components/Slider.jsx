import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import Magazine from "./Magazine";
import Petcard from "./Petcard";

const Slider = ({ flag }) => {
  const { width } = Dimensions.get("window");
  const [data, setData] = useState([]);

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
  const renderCard = ({ item }) => {
    switch (flag) {
      case "magazine":
        return <Magazine item={item} />;
      case "petcard":
        return <Petcard item={item}/>;
      default:
        return null;
    }
  };

  
  return (
    <FlatList
      data={data}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
      renderItem={({item}) => (
        <View style={{ width: width * 0.9, marginRight: 3, marginTop: 12,marginBottom: 12}}>
          {renderCard({ item })}
        </View>
      )}

    />
  );
};

export default Slider;