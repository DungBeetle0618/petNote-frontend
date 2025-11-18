import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Platform,
  Easing,
} from 'react-native';

const TabMenu = ({ onPressHandler, menuList, activeTab, color }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  // 부모의 실제 너비 기준으로 각 탭 폭 계산
  const tabWidth = containerWidth > 0 ? containerWidth / menuList.length : 0;

  // ✅ 탭 이동 애니메이션
  useEffect(() => {
    if (tabWidth === 0) return;
    const index = menuList.indexOf(activeTab);
    Animated.timing(slideAnim, {
      toValue: index * tabWidth,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [activeTab, tabWidth]);

  return (
    <View
      style={styles.wrapper}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <View style={[styles.container, color ? { backgroundColor: color } : { backgroundColor: '#f3e8ff' }]}>
        {/* 흰색 활성 배경 */}
        {tabWidth > 0 && (
          <Animated.View
            style={[
              styles.activeBackground,
              {
                width: tabWidth - 8, // 양쪽 여백 고려
                transform: [{ translateX: Animated.add(slideAnim, new Animated.Value(4)) }], // 왼쪽 offset 보정
              },
            ]}
          />
        )}

        {menuList.map((name) => {
          const isActive = activeTab === name;
          return (
            <Pressable
              key={name}
              onPress={() => onPressHandler(name)}
              style={[styles.tab, { width: tabWidth }]}
            >
              <Text
                style={[styles.tabText, isActive && styles.activeTabText]}
              >
                {name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    // marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    position: 'relative',
    height: 33,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#444',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '700',
  },
  activeBackground: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    borderRadius: 12,
    backgroundColor: '#fff',
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default TabMenu;
