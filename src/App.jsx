import React, { useState } from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Navigator from './navigation/Navigatior';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [routeName, setRouteName] = useState();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent routeName={routeName} onRouteChange={setRouteName} />
      </SafeAreaProvider>
    </Provider>
  );
}

function AppContent({ routeName, onRouteChange }) {
  const insets = useSafeAreaInsets();
  const headerScreens = ['mealsDetail', 'weightDetail', 'activityDetail']; // 헤더가 있는 화면 목록
  const usesHeader = headerScreens.includes(routeName);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: usesHeader ? 0 : insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Navigator onRouteChange={onRouteChange} />
    </View>
  );
}

export default App;
