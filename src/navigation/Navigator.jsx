import React, { useRef, useCallback } from 'react';
import { View, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
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
const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

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
   * @returns 
   */
  const PetManageNavigator = ({route}) => (
    <PetManageStack.Navigator initialRouteName="PetManageScreen" screenOptions={() => ({ headerShown: false })}>
      <PetManageStack.Screen name="PetManageScreen" component={PetManageScreen} />
      <PetManageStack.Screen name="weightDetail" component={WeightDetailScreen} options={headerOptions} />
      <PetManageStack.Screen name="mealsDetail" component={MealsDetailScreen} options={headerOptions} />
      <PetManageStack.Screen name="activityDetail" component={ActivityDetailScreen} options={headerOptions} />
    </PetManageStack.Navigator>
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

        return {
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'PetManage') iconName = 'paw-outline';
            else if (route.name === 'Community') iconName = 'people-outline';
            else if (route.name === 'Nearby') iconName = 'location-outline';
            else if (route.name === 'Menu') iconName = 'menu-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF6600',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: isHiddenTab ? { display: 'none' } : {},
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="PetManage" component={PetManageNavigator} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Nearby" component={NearbyScreen} />
      <Tab.Screen name="Menu" component={MypageScreen} />
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
        <AuthStack.Navigator initialRouteName="login">
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
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Tabs" component={TabNavigator} />
          <RootStack.Screen name="Reminder" component={ReminderScreen} />
          <RootStack.Screen name="Challenge" component={ChallengeScreen} />
          <RootStack.Screen name="Product" component={ProductScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
export default Navigator;