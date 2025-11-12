package com.petnote.kakaomap

import android.util.Log
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.kakao.vectormap.MapView

class KakaoMapViewManager : SimpleViewManager<MapView>() {

    override fun getName(): String = "KakaoMapView"

    override fun createViewInstance(reactContext: ThemedReactContext): MapView {
        Log.d("KAKAO_MAP", "MapView Created ✅")
        val mapView = MapView(reactContext)
        return mapView
    }
}
