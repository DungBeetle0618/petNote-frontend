import axios from 'axios';
import { getAccessToken, saveAccessToken, clearAccessToken } from '../secure/tokenStorage';

// 에뮬레이터에서 로컬 백엔드 접근
// - Android: http://10.0.2.2:8080
// - iOS 시뮬레이터: http://localhost:8080
const BASE = 'http://10.0.2.2:8080/api';

export const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
  withCredentials: true, // 리프레시를 httpOnly 쿠키로 운용 시
});

let refreshing = false;
let queue = [];

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { config, response } = err;
    if (!response || response.status !== 401 || config.__retry) throw err;

    if (!refreshing) {
      refreshing = true;
      try {
        // BASE에서 /api 제거 후 /api/auth/refresh 호출 (같은 호스트)
        const refreshURL = BASE.replace('/api', '') + '/api/auth/refresh';
        const { data } = await axios.post(refreshURL, {}, { withCredentials: true });
        await saveAccessToken(data.accessToken);
        queue.forEach((cb) => cb(data.accessToken));
      } catch (e) {
        await clearAccessToken();
        queue.forEach((cb) => cb(null));
        throw e;
      } finally {
        refreshing = false;
        queue = [];
      }
    }

    return new Promise((resolve, reject) => {
      queue.push((newToken) => {
        if (!newToken) return reject(err);
        config.__retry = true;
        config.headers.Authorization = `Bearer ${newToken}`;
        resolve(api(config));
      });
    });
  }
);