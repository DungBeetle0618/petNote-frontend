import { Platform, requireNativeComponent } from 'react-native';

let NativeKakaoMapView = null;

if (Platform.OS === 'android' && Platform.constants['Brand'] !== 'generic') {
  // 실기기만 로드 (generic = emulator)
  NativeKakaoMapView = requireNativeComponent('KakaoMapView');
}

const KakaoMapView = (props) => {
  if (!NativeKakaoMapView) return null; // 에뮬레이터일 경우 빈 화면
  return <NativeKakaoMapView {...props} />;
};

export default KakaoMapView;