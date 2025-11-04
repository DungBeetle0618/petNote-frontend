import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import Magazine from "./Magazine";

const Slider = ({ flag }) => {
  const { width } = Dimensions.get("window");

  const data = [1, 2, 3]; // 카드 개수 예시
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

  const renderCard = ({ item }) => {
    switch (flag) {
      case "magazine":
        return <Magazine item={item} />;
    }
  };
  */}
 
  const renderCard = ({ item }) => {
    switch (flag) {
      case "magazine":
        return <Magazine />;
    }
  };
  
  return (
    <FlatList
      data={data}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.toString()}
      renderItem={() => (
        <View style={{ width: width * 0.85, marginRight: 16, marginTop: 12,marginBottom: 12}}>
          {renderCard({ })}
        </View>
      )}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    />
  );
}
export default Slider;