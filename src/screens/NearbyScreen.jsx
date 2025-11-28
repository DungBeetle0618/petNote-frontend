/**
 * 위치기반 추천 화면
 */
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { WebView } from "react-native-webview"; 

import KakaoMapView from '../components/nearby/KakaoMapView';

import EBoldText from '../components/font/EBoldText';
import gs from '../assets/styles/globalStyles';

const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name = "viewport" content="initial-scale=1, maximum-scale=1" />
      <style>
        html, body, #map {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      </style>
      <script type="text/javascript" 
        src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=d2ffe1b123e72871a890c258db75d4ba&autoload=false">
      </script>
    </head>
    <body>
        <div id="map"></div>
        <script>
          kakao.maps.load(function() {
          var container = document.getElementById('map');
          var options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
          };
          new kakao.maps.Map(container, options);
        });
        </script>
      </body>
  </html>
  </html>
`;
const NearbyScreen = () => {
  return (
    <View style={styles.container}>
      <WebView 
      style={{ flex: 1 }} 
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }
});

export default NearbyScreen;