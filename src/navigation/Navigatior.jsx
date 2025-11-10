import React, { useRef, useCallback } from 'react';
import { View, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReanimatedDrawerLayout from 'react-native-gesture-handler/ReanimatedDrawerLayout';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../src/auth/AuthProvider';
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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

function Navigator({ onRouteChange }) {
  const { state } = useAuth(); // 'loading' | 'authenticated' | 'unauthenticated'
  const drawerRef = useRef(null);
  const navigationRef = useRef(null);

  /**
   * 커스텀 Drawer 네비게이터
   * @returns 
   */
  const renderDrawerContent = useCallback(() => (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60 }}>
      <Button
        title="⏰ Reminder"
        onPress={() => {
          drawerRef.current?.closeDrawer();
          navigationRef.current?.reset({
            index: 0,
            routes: [{ name: 'HiddenStack', params: { screen: 'Reminder' } }],
          });
        }}
      />
      <Button
        title="📦 Product"
        onPress={() => {
          drawerRef.current?.closeDrawer();
          navigationRef.current?.reset({
            index: 0,
            routes: [{ name: 'HiddenStack', params: { screen: 'Product' } }],
          });
        }}
      />
      <Button
        title="🏆 Challenge"
        onPress={() => {
          drawerRef.current?.closeDrawer();
          navigationRef.current?.reset({
            index: 0,
            routes: [{ name: 'HiddenStack', params: { screen: 'Challenge' } }],
          });
        }}
      />
      <Button
        title="👤 Mypage"
        onPress={() => {
          drawerRef.current?.closeDrawer();
          navigationRef.current?.reset({
            index: 0,
            routes: [{ name: 'HiddenStack', params: { screen: 'Mypage' } }],
          });
        }}
      />
    </View>
  ), []);


  /**
   * 메뉴 스택
   * @returns 
   */
  function HiddenStackNavigator() {
    return (
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="Reminder" component={ReminderScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Challenge" component={ChallengeScreen} />
        <Stack.Screen name="Mypage" component={MypageScreen} />
      </Stack.Navigator>
    );
  }

  /**
   * 하단 탭 커스텀
   * @returns 
   */
  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="PetManage" component={PetManageScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Nearby" component={NearbyScreen} />
      <Tab.Screen
        name="Menu"
        component={HomeScreen}
        options={{
          title: 'Menu',
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => drawerRef.current?.openDrawer()}
            >
            </TouchableOpacity>
          ),
        }}
      />

      {/* Drawer Menu 용 숨겨진 탭  */}
      <Tab.Screen
        name="HiddenStack"
        component={HiddenStackNavigator}
        options={{
          tabBarItemStyle: { display: 'none' }, 
        }}
      />
    </Tab.Navigator>
  );

  /**
   * 헤더 옵션
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

  // 상태별 화면 분기

  // 1. 로딩 중 → 스플래시 화면
  if (state === 'loading') {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  // 2. 비로그인 → 로그인 화면만 표시 (Navigator 없음)
  if (state !== 'authenticated') {
    return <LoginScreen />;
  }

  // 3. 로그인 완료 → 전체 네비게이터 렌더링
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReanimatedDrawerLayout
        ref={drawerRef}
        drawerWidth={280}
        drawerPosition="right"
        renderNavigationView={renderDrawerContent}
      >
        <NavigationContainer
          ref={navigationRef}
          onReady={() => onRouteChange?.(navigationRef.current?.getCurrentRoute()?.name)}
          onStateChange={() => onRouteChange?.(navigationRef.current?.getCurrentRoute()?.name)}
        >
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Tabs" component={TabNavigator} />
            <RootStack.Screen name="mealsDetail" component={MealsDetailScreen} options={headerOptions} />
            <RootStack.Screen name="weightDetail" component={WeightDetailScreen} options={headerOptions} />
            <RootStack.Screen name="activityDetail" component={ActivityDetailScreen} options={headerOptions} />
          </RootStack.Navigator>
        </NavigationContainer>
      </ReanimatedDrawerLayout>
    </GestureHandlerRootView>
  );
}
export default Navigator;