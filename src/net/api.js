import axios from 'axios';
import { Alert, Platform } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import { getAccessToken, saveAccessToken, clearAccessToken } from '../secure/tokenStorage';

// -----------------------------------------
// 1) axios 인스턴스 (초기 기본값: 즉시 사용 가능)
//    → 앱 부팅 직후 호출도 안전(나중에 baseURL 자동 교체됨)
export const api = axios.create({
  baseURL: 'http://localhost:9090',
  timeout: 15000,
  withCredentials: true,
});

// -----------------------------------------
// 2) 에뮬/시뮬/실기기 자동 감지하여 baseURL 설정 (useEffect 대체, 1회 실행)
export const apiReady = (async () => {
  try {
    const ip = await NetworkInfo.getIPAddress(); // 기기의 현재 IP
    
    let base;
    if (Platform.OS === 'android') {
      // AVD 에뮬레이터는 10.0.2.2로 PC localhost 접근
      base = ip?.startsWith('10.0.2') ? 'http://10.0.2.2:9090' : `http://${ip}:9090`;
    } else {
      // iOS 시뮬레이터는 localhost 접근 가능
      base = (ip === '127.0.0.1' || ip === '::1')
        ? 'http://localhost:9090'
        : `http://${ip}:9090`;
    }

    api.defaults.baseURL = base;
    if (__DEV__) console.log('📡 API baseURL 자동 설정:', base);
  } catch (e) {
    console.warn('❌ IP 조회 실패: localhost 유지');
  }
})();

// refresh 엔드포인트는 상대경로로 관리(기본 baseURL 붙여서 호출)
const REFRESH_PATH = '/auth/refresh';

// -----------------------------------------
// 3) 요청 인터셉터: 액세스 토큰 자동 첨부 (auth/* 는 제외)
api.interceptors.request.use(async (config) => {
  if (config.url?.includes('/auth')){
    return config; // 로그인/리프레시 자기 자신은 제외
  } 

  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// -----------------------------------------
// 4) 응답 인터셉터: 401/403 → refresh + 재시도 / 공통 에러 처리
let isRefreshing = false;
let queue = []; // { resolve, reject, executor }

const enqueue = (executor) =>
  new Promise((resolve, reject) => queue.push({ resolve, reject, executor }));

const flushQueue = (error, token) => {
  queue.forEach(({ resolve, reject, executor }) => {
    if (token) {
      try {
        resolve(executor(token));
      } catch (e) {
        reject(e);
      }
    } else {
      reject(error);
    }
  });
  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { config, response, code, message } = err;

    // --- 네트워크/타임아웃(서버 응답 자체 없음) ---
    if (!response) {
      if (__DEV__) console.log('❌ API Network Error:', code, message);
      if (code === 'ECONNABORTED' || /timeout/i.test(message)) {
        Alert.alert('요청 시간 초과', '서버 응답이 지연되고 있습니다.');
      } else {
        Alert.alert('네트워크 오류', '서버에 연결할 수 없습니다.');
      }
      return Promise.reject(err);
    }

    const { status, data } = response;
    const serverMessage = data?.message;
    console.log(serverMessage)
    const url = config?.url || '';

    // refresh 자기 자신은 제외 (무한 루프 방지)
    if (url.includes('/auth/refresh')) return Promise.reject(err);

    // 인증 관련 엔드포인트는 refresh 시도 X (그 자리에서 안내)
    if (url.includes('/auth/')) {
      /* if (status >= 500) Alert.alert('서버 오류', serverMessage || '잠시 후 다시 시도해주세요.');
      else if (status === 404) Alert.alert('요청 실패', '요청하신 경로를 찾을 수 없습니다.');
      else if (data?.message) Alert.alert('요청 오류', serverMessage); */
      return Promise.reject(err);
    }

    // --- 401/403만 토큰 갱신 대상 ---
    const shouldRefresh = (status === 401 || status === 403) && !config.__retry;
    if (!shouldRefresh) {
      // 공통 예외 처리
/*       if (status === 404) {
        Alert.alert('요청 실패', '요청하신 경로를 찾을 수 없습니다.');
      } else if (status >= 500) {
        Alert.alert('서버 오류', serverMessage || '잠시 후 다시 시도해주세요.');
      } else if (data?.message) {
        Alert.alert('요청 오류', serverMessage);
      } */
      return Promise.reject(err);
    }

    // --- 여기부터 refresh 처리 ---
    config.__retry = true;

    if (isRefreshing) {
      // 이미 리프레시 진행 중이면 큐 대기 → 완료 후 재시도
      return enqueue((newToken) => {
        config.headers.Authorization = `Bearer ${newToken}`;
        return api(config);
      });
    }

    isRefreshing = true;
    try {
      // Authorization 없이 순수 axios로 호출 (헤더 오염 방지)
      const refreshUrl = `${api.defaults.baseURL}${REFRESH_PATH}`;
      const resp = await axios.post(refreshUrl, {}, { withCredentials: true, timeout: 15000 });
      const newToken = resp.data?.accessToken;
      if (!newToken) throw new Error('No accessToken from /auth/refresh');

      await saveAccessToken(newToken);

      // 대기 중 요청들 처리
      flushQueue(null, newToken);

      // 현재 실패 요청 재시도
      config.headers.Authorization = `Bearer ${newToken}`;
      return api(config);
    } catch (e) {
      await clearAccessToken();
      flushQueue(e, null);
      Alert.alert('세션 만료', '다시 로그인해주세요.');
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);