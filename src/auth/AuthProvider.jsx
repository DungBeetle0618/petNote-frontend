import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native'
import { api } from '../net/api';
import { saveAccessToken, getAccessToken, clearAccessToken } from '../secure/tokenStorage';

const AuthContext = createContext(null);
const DEV_BYPASS_AUTH = __DEV__ && true;
export function AuthProvider({ children }) {
  const [state, setState] = useState('loading'); // 'loading' | 'authenticated' | 'unauthenticated'

  // 앱 시작 시: 토큰 있으면 일단 시도 → /auth/refresh로 세션 건강 확인
  useEffect(() => {
    (async () => {
      try {
        // 개발 우회 !!
        if(DEV_BYPASS_AUTH){
          setState('authenticated')
          return;
        }

        const token = await getAccessToken();
        if (!token) throw new Error('no token');
        // 있더라도 만료됐을 수 있으므로 refresh 시도
        await api.post('/auth/refresh', {});
        setState('authenticated');
      } catch {
        await clearAccessToken();
        setState('unauthenticated');
      }
    })();
  }, []);

  const signIn = useCallback(async (userId, password) => {
    try {
      const { data } = await api.post('/auth/login', { userId, password });
      await saveAccessToken(data.accessToken);
      setState('authenticated');
    } catch (e) {
      Alert.alert('실패','로그인 실패')
    }
  }, []);

  const signOut = useCallback(async () => {
    try { await api.post('/auth/logout'); } catch {}
    await clearAccessToken();
    setState('unauthenticated');
  }, []);

  const reloadSession = useCallback(async () => {
    try { await api.post('/auth/refresh', {}); setState('authenticated'); }
    catch { await clearAccessToken(); setState('unauthenticated'); }
  }, []);

  return (
    <AuthContext.Provider value={{ state, signIn, signOut, reloadSession }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);