import React, { useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../auth/AuthProvider';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import PetManageScreen from '../screens/PetManageScreen';
import NearbyScreen from '../screens/NearbyScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProductScreen from '../screens/ProductScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import ReminderScreen from '../screens/ReminderScreen';
import MypageScreen from '../screens/MypageScreen';
import MealsDetailScreen from '../screens/MealsDetailScreen';
import ActivityDetailScreen from '../screens/ActivityDetailScreen';
import WeightDetailScreen from '../screens/WeightDetailScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

const MenuStack = createNativeStackNavigator();
const PetManageStack = createNativeStackNavigator();

function Navigator({ onRouteChange }) {
  const { state } = useAuth(); // 'loading' | 'authenticated' | 'unauthenticated'
  const navigationRef = useRef(null);

  /**
   * 펫관리 헤더 옵션
   * @param {*} param0 
   * @returns 
   */
  const headerOptions = ({ navigation, route }) => ({
    headerShown: true,
    headerTopInsetEnabled: false,
    headerTitle: route?.params && (route.params.headerTitle || route.params.title),
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
    headerTitleStyle: { fontSize: 18 },
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    statusBarStyle: 'dark',
    headerTransparent: false,
    statusBarTranslucent: false,
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 12 }}>
        <Ionicons name="chevron-back" size={22} color="#1A1A1A" />
      </TouchableOpacity>
    ),
  });


  /**
   * 펫 관리 스택
   */
  const PetManageNavigator = ({ route }) => (
    <PetManageStack.Navigator initialRouteName="PetManageScreen" screenOptions={() => ({ headerShown: false })}>
      <PetManageStack.Screen name="PetManageScreen" component={PetManageScreen} />
      <PetManageStack.Screen name="weightDetail" component={WeightDetailScreen} options={headerOptions} />
      <PetManageStack.Screen name="mealsDetail" component={MealsDetailScreen} options={headerOptions} />
      <PetManageStack.Screen name="activityDetail" component={ActivityDetailScreen} options={headerOptions} />
    </PetManageStack.Navigator>
  )

  /**
   * 마이페이지 스택 (리마인더, 챌린지, 상품)
   */
  const MenuNavigator = ({ router }) => (
    <MenuStack.Navigator initialRouteName="MenuScreen" screenOptions={() => ({ headerShown: false })}>
      <MenuStack.Screen name="MenuScreen" component={MypageScreen} />
      <MenuStack.Screen name="Reminder" component={ReminderScreen} />
      <MenuStack.Screen name="Challenge" component={ChallengeScreen} />
      <MenuStack.Screen name="Product" component={ProductScreen} />
    </MenuStack.Navigator>
  )


  /**
   * 하단 탭 커스텀
   * @returns 
   */
  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? '';
        const isHiddenTab =
          routeName === 'weightDetail' ||
          routeName === 'mealsDetail' ||
          routeName === 'activityDetail';

        // 현재 MenuNavigator 내부 route
        const currentMenuRoute =
          route.name === 'Menu'
            ? getFocusedRouteNameFromRoute(route) ?? 'MenuScreen'
            : '';

        const isMenuActive =
          route.name === 'Menu' ? currentMenuRoute === 'MenuScreen' : true;

        return {
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'PetManage') iconName = 'paw-outline';
            else if (route.name === 'Community') iconName = 'people-outline';
            else if (route.name === 'Nearby') iconName = 'location-outline';
            else if (route.name === 'Menu') iconName = 'menu-outline';

            const iconColor =
              route.name === 'Menu' && !isMenuActive ? 'gray' : color;

            return <Ionicons name={iconName} size={size} color={iconColor} />;
          },

          // 👇 라벨 색상 제어 부분 추가
          tabBarLabel: ({ focused, color }) => {
            const labelColor =
              route.name === 'Menu' && !isMenuActive ? 'gray' : color;

            const labelText =
              route.name === 'Home'
                ? '메인 홈'
                : route.name === 'PetManage'
                  ? '펫'
                  : route.name === 'Community'
                    ? '커뮤니티'
                    : route.name === 'Nearby'
                      ? '주변'
                      : '메뉴';

            return (
              <Text style={{ fontSize: 10, color: labelColor }}>{labelText}</Text>
            );
          },

          tabBarActiveTintColor: '#FF6600',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: isHiddenTab ? { display: 'none' } : {},
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="PetManage" component={PetManageNavigator} />
      <Tab.Screen name="Nearby" component={NearbyScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Menu" component={MenuNavigator} listeners={({ navigation, route }) => ({
        tabPress: (e) => {
          const state = route.state;
          // route.state가 존재하고, 현재 스택 최상단이 MenuScreen이 아닐 때만 초기화
          if (state && state.index > 0) {
            e.preventDefault(); // 기본 탭 동작 막기
            navigation.reset({ // 리셋
              index: 0,
              routes: [{ name: 'Menu', state: { routes: [{ name: 'MenuScreen' }] } }],
            });
          }
        },
      })} />
    </Tab.Navigator>
  );


  // 상태별 화면 분기

  // 1. 로딩 중 → 스플래시 화면
  if (state === 'loading') {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  // 2. 비로그인 → 인증 네비게이터 렌더링
  if (state !== 'authenticated') {
    return (
      <NavigationContainer>
        <AuthStack.Navigator initialRouteName="login" screenOptions={{headerShown: false}}>
          <AuthStack.Screen name="login" component={LoginScreen} />
          <AuthStack.Screen name="signUp" component={SignUpScreen} />
        </AuthStack.Navigator>
      </NavigationContainer>
    )
  }

  // 3. 로그인 완료 → 전체 네비게이터 렌더링
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <NavigationContainer
        ref={navigationRef}
        onReady={() => onRouteChange?.(navigationRef.current?.getCurrentRoute()?.name)}
        onStateChange={() => onRouteChange?.(navigationRef.current?.getCurrentRoute()?.name)}
      >
        <TabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
export default Navigator;