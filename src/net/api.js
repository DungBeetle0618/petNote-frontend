import axios from 'axios';
import { Alert, Platform } from 'react-native';
import { getAccessToken, saveAccessToken, clearAccessToken } from '../secure/tokenStorage';

const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:9090',  // AVD
  ios: 'http://localhost:9090',     // iOS 시뮬레이터
  default: 'http://localhost:9090',
});

// refresh는 쿠키 기반(httponly)이라고 가정
const REFRESH_URL = `${BASE_URL}/auth/refresh`;

// 1) 공용 인스턴스(인증 전/후 공통)
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
});

// ---- 요청 인터셉터: 액세스 토큰 자동 첨부 ----
api.interceptors.request.use(async (config) => {
  // auth 호출에는 Authorization 헤더 안 붙임(자기 자신으로 루프 방지)
  if (config.url?.includes('/auth/')) return config;

  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---- 응답 인터셉터: 401/403이면 refresh 시도 + 재요청 큐 ----
let isRefreshing = false;
let queue = []; // { resolve, reject, original }

const enqueue = (executor) =>
  new Promise((resolve, reject) => queue.push({ resolve, reject, executor }));

const flushQueue = (error, token) => {
  queue.forEach(({ resolve, reject, executor }) => {
    if (token) resolve(executor(token));
    else reject(error);
  });
  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { config, response } = err;

    // 네트워크 오류 등
    if (!response) return Promise.reject(err);

    const status = response.status;
    const url = config?.url || '';

    // refresh 자기 자신이 실패하면 그대로 종료(무한루프 방지)
    if (url.includes('/auth/refresh')) return Promise.reject(err);

    // 로그인/회원가입/로그아웃 등은 refresh 시도하지 않음
    if (url.includes('/auth/login') || url.includes('/auth/signup') || url.includes('/auth/logout')) {
      return Promise.reject(err);
    }

    // 401/403만 refresh 대상
    const shouldRefresh = (status === 401 || status === 403) && !config.__retry;
    if (!shouldRefresh) return Promise.reject(err);

    // 👇 여기가 새 포인트
    if (status === 404) {
      alert('요청하신 페이지를 찾을 수 없습니다.');
      // navigation.navigate('Error404'); // RN에서는 이렇게 이동 가능
    } else if (status >= 500) {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } else if (data?.message) {
      // 서버가 커스텀 메시지를 내려주는 경우
      alert(data.message);
    }

    config.__retry = true;

    if (isRefreshing) {
      // 이미 갱신 중이면 큐 대기 → 갱신 완료 후 재시도
      return enqueue((newToken) => {
        config.headers.Authorization = `Bearer ${newToken}`;
        return api(config);
      });
    }

    isRefreshing = true;
    try {
      // refresh는 Authorization 없이 "생" axios로 호출(헤더 오염 방지)
      const resp = await axios.post(REFRESH_URL, {}, { withCredentials: true, timeout: 15000 });
      const newToken = resp.data?.accessToken;
      if (!newToken) throw new Error('No accessToken from /auth/refresh');

      await saveAccessToken(newToken);

      // 대기중인 요청들 처리
      flushQueue(null, newToken);

      // 현재 실패한 요청 재시도
      config.headers.Authorization = `Bearer ${newToken}`;
      return api(config);
    } catch (e) {
      // refresh 실패 → 토큰 제거 및 큐 실패 처리
      await clearAccessToken();
      flushQueue(e, null);
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);