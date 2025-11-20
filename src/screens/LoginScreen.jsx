import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, StatusBar, Alert, Image,
} from 'react-native';
import { loginWithKakaoAccount as KaKaoLogin , login as KaKaoLoginWeb } from "@react-native-seoul/kakao-login";
import NaverLogin from '@react-native-seoul/naver-login';
import ForgotHelperSheet from '../components/ForgotHelperSheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/AuthProvider'
import * as KakaoLogins from '@react-native-seoul/kakao-login';
const COLORS = {
  bg: '#FFF4EA',
  card: '#FFFFFF',
  text: '#1F2937',
  subText: '#6B7280',
  primary: '#F15A24',
  primaryPressed: '#E24F1E',
  inputBorder: '#E5E7EB',
  link: '#F15A24',
  shadow: '#000',
  kakao: '#FEE500',
  naver: '#03C75A'
};

const SIZES = { radiusLg: 20, radiusXl: 24 };

export default function LoginScreen() {
  const navigation = useNavigation();
  const { signIn, socialLoginKakao, socialLoginNaver } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const naverLoginConfig = { 
    appName: "PetNote",
    consumerKey: "ofddJH526zwmEwSowGKP",
    consumerSecret : "rIAvtVXITB",
    serviceUrlSchemeIOS : "petnote"
  }

  NaverLogin.initialize(naverLoginConfig)

  const onLogin = async () => {
      if (!userId.trim() || !password) {
        Alert.alert('입력 확인', '아이디와 비밀번호를 입력해 주세요.');
        return;
      }
      setLoading(true);
      const result = await signIn(userId, password);
      if(!result){
        setLoading(false);
      }
  };

  const onKakaoLogin = async () => {
    try {
      const  { accessToken } = await KaKaoLoginWeb();
      const kakaoLogin = await socialLoginKakao(accessToken);
    } catch (e) {
      console.log(e);
    }
  };
  const onNaverLogin = async () => {
    try{
      const { successResponse, failureResponse } = await NaverLogin.login();
      console.log(successResponse)
      console.log(successResponse.accessToken)
      const naverLogin = await socialLoginNaver(successResponse.accessToken);
    } catch (e) {
      console.log(e)
    }

    
    
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.container}>
          {/* 로고/타이틀 */}
          <View style={styles.logoWrap}>
            <View style={styles.logoCircle}>
              <Ionicons name="heart" size={30} color="#fff" />
            </View>
            <Text style={styles.title}>PETNOTE</Text>
            <Text style={styles.subtitle}>반려동물 케어 동반자</Text>
          </View>

          {/* 카드 */}
          <View style={styles.card}>
            {/* 아이디 */}
            <Text style={styles.label}>아이디</Text>
            <View style={styles.inputWrap}>
              <MaterialCommunityIcons name="account-outline" size={20} color={COLORS.subText} style={styles.inputIcon} />
              <TextInput
                value={userId}
                onChangeText={setUserId}
                placeholder="아이디를 입력하세요"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                returnKeyType="next"
              />
            </View>

            {/* 비밀번호 */}
            <Text style={[styles.label, { marginTop: 14 }]}>비밀번호</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.subText} style={styles.inputIcon} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="비밀번호를 입력하세요"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                returnKeyType="done"
                onSubmitEditing={onLogin}
              />
            </View>

            {/* 로그인 정보 찾기 */}
            <TouchableOpacity onPress={() => setHelpOpen(true)}>
              <Text style={{ color: '#F15A24', fontWeight: '700', marginTop: 12 }}>
                로그인 정보가 기억나지 않나요?
              </Text>
            </TouchableOpacity>

            <ForgotHelperSheet visible={helpOpen} onClose={() => setHelpOpen(false)} />

            {/* 로그인 버튼 */}
            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.7 }]}
              onPress={onLogin}
              activeOpacity={0.85}
              disabled={loading}
            >
              <Ionicons name="log-in-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>{loading ? '로그인 중…' : '로그인'}</Text>
            </TouchableOpacity>

            {/* 소셜 로그인 구분선 */}
            <View style={styles.snsContainer}>
              <View style={styles.snsLine}></View>
                <Text style={styles.snsText}>SNS 계정으로 로그인</Text>
              <View style={styles.snsLine}></View>
            </View>
            {/* 카카오 로그인 */}
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={onKakaoLogin}
            >
              <Image
                source={require('../assets/images/icon/login/kakao_login_btn.png')}
                style={styles.socialBtnImg}
                resizeMode="stretch"
              />
            </TouchableOpacity>

            {/* 네이버 로그인 */}
            <TouchableOpacity 
              style={styles.socialBtn}
              onPress={onNaverLogin}>
              <Image
                source={require('../assets/images/icon/login/naver_login_btn.png')}
                style={styles.socialBtnImg}
                resizeMode="stretch"
              />
            </TouchableOpacity>

            {/* 구분선 */}
            <View style={[styles.hr, { marginTop: 18 }]} />

            {/* 회원가입 링크 */}
            <Text style={styles.signupText}>
              아직 계정이 없나요?{' '}
              <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
                회원가입
              </Text>
            </Text>
          </View>

          {/* 약관 안내 */}
          <Text style={styles.legal}>
            계속 진행하면 PetNote의 <Text style={styles.link}>서비스 이용약관</Text>과{' '}
            <Text style={styles.link}>개인정보 처리방침</Text>에 동의한 것으로 간주됩니다.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  snsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },

  snsLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc', // 선 색상
  },

  snsText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },

  socialBtn: {
    width: '70%',
    height: 50,
    marginBottom: 12, // 버튼 사이 간격
    marginLeft: 50
  },

  socialBtnImg: {
    width: '100%',
    height: '100%',
  },

  safe: { flex: 1, backgroundColor: COLORS.bg },
  flex: { flex: 1 },
  container: { flex: 1, alignItems: 'center', paddingHorizontal: 20, backgroundColor: COLORS.bg },

  logoWrap: { alignItems: 'center', marginTop: 24, marginBottom: 16 },
  logoCircle: {
    width: 84, height: 84, borderRadius: 42, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.shadow, shadowOpacity: 0.16, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 6
  },
  title: { marginTop: 16, fontSize: 20, fontWeight: '700', color: COLORS.text },
  subtitle: { marginTop: 6, fontSize: 14, color: COLORS.subText },

  card: {
    width: '100%', backgroundColor: COLORS.card, borderRadius: SIZES.radiusXl, padding: 22, marginTop: 10,
    shadowColor: COLORS.shadow, shadowOpacity: 0.09, shadowRadius: 12, shadowOffset: { width: 0, height: 8 }, elevation: 3
  },

  label: { color: COLORS.text, marginBottom: 8, fontWeight: '600' },
  inputWrap: {
    height: 48, borderWidth: 1, borderColor: COLORS.inputBorder, borderRadius: 12,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, backgroundColor: '#FFF'
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16, color: COLORS.text },

  forgot: { alignSelf: 'flex-start', marginTop: 10, color: COLORS.link, fontWeight: '600' },

  button: {
    marginTop: 14, height: 52, borderRadius: 14, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8
  },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 16 },

  hr: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 18 },

  socialTitle: { textAlign: 'center', color: COLORS.subText, marginBottom: 10 },

  kakaoBtn: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  kakaoImg: {
    width: '100%',
    height: '100%',
  },

  naverBtn: {
    height: 48, borderRadius: 12, backgroundColor: COLORS.naver,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  },
  naverText: { color: '#fff', fontWeight: '700' },

  socialIcon: { position: 'absolute', left: 14 },
  socialIconImg: { width: 18, height: 18, position: 'absolute', left: 14, resizeMode: 'contain' },

  signupText: { textAlign: 'center', color: COLORS.subText },
  signupLink: { color: COLORS.link, fontWeight: '700' },

  legal: { marginTop: 16, marginBottom: 10, textAlign: 'center', color: COLORS.subText, fontSize: 12, lineHeight: 18, paddingHorizontal: 20 },
  link: { color: COLORS.link, fontWeight: '700' }
});