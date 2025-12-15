import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, StatusBar, Alert, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { checkUserId, signUp } from "../api/auth"

const COLORS = {
  bg: '#FFF4EA',
  card: '#FFFFFF',
  text: '#1F2937',
  subText: '#6B7280',
  primary: '#F15A24',
  primaryPressed: '#E24F1E',
  inputBorder: '#E5E7EB',
  link: '#F15A24',
  shadow: '#000'
};
const SIZES = { radiusLg: 20, radiusXl: 24 };

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [userId, setUserId]   = useState('');
  const [phone, setPhone]         = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [confirmPassword, setconfirmPassword]     = useState('');
  const [loading, setLoading]     = useState(false);
  const [isUserIdChecked, setIsUserIdChecked] = useState(false)

  const passwordRef = useRef(null);

  const validateEmail = (v='') => /\S+@\S+\.\S+/.test(v);
  const validatePhone = (v='') => /^01[0-9]{8,9}$/.test(v.replace(/[^0-9]/g, ''));

  const userIdCheck = async () => {
    if (!userId.trim()) {
      Alert.alert('입력 확인', '아이디를 입력해 주세요.'); return;
    }
    try {
      const res = await checkUserId(userId);
      const { message, status } = res.data
      if(status){
        setIsUserIdChecked(true);
        Alert.alert('사용 가능한 아이디입니다.');
        passwordRef.current.focus();
      }else{
        setIsUserIdChecked(false);
        Alert.alert('사용 중인 아이디입니다.');
      }
    } catch (e) {
      setIsUserIdChecked(false);
      Alert.alert('처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  const submit = async () => {
    if (!userId.trim()) {
      Alert.alert('입력 확인', '아이디를 입력해 주세요.'); return;
    }
    if(userId.length < 4) {
      Alert.alert('입력 확인', '아이디는 4자 이상으로 입력해 주세요.'); return;
    }
    if(!isUserIdChecked){
      Alert.alert('입력 확인', '아이디 중복확인을 진행해 주세요.'); return;
    }
    if (password.length < 8) {
      Alert.alert('입력 확인', '비밀번호는 8자 이상으로 설정해 주세요.'); return;
    }
    if (password !== confirmPassword) {
      Alert.alert('입력 확인', '비밀번호 확인이 일치하지 않습니다.'); return;
    }
    if (!validateEmail(email)) {
      Alert.alert('입력 확인', '올바른 이메일을 입력해 주세요.'); return;
    }
    if (!validatePhone(phone)) {
      Alert.alert('입력 확인', '올바른 휴대폰 번호를 입력해 주세요.'); return;
    }
        console.log('클릭')
    try {
        setLoading(true);
        const payload = { userId, password, confirmPassword, email, phone };
        const { data } = await signUp(payload);
        Alert.alert('회원가입 완료', '로그인 화면으로 이동합니다.', [
        { text: '확인', onPress: () => navigation.navigate('Login') }
      ]);
    } catch(e) {
        setLoading(false);
        console.log(e)
        Alert.alert('회원가입 실패', '' || '잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          {/* 로고 */}
          <View style={styles.logoWrap}>
            <View style={styles.logoCircle}>
              <Ionicons name="heart" size={30} color="#fff" />
            </View>
            <Text style={styles.title}>회원가입</Text>
            <Text style={styles.subtitle}>지금 PetNote를 시작하세요</Text>
          </View>

          {/* 카드 */}
          <View style={styles.card}>
            {/*아이디 */}
            <Text style={styles.label}>아이디</Text>
            <View style={styles.row}>
              <View style={[styles.inputWrap, { flex: 1 }]}>
                <MaterialCommunityIcons name="account-outline" size={20} color={COLORS.subText} style={styles.inputIcon}/>
                <TextInput
                  value={userId}
                    onChangeText={text => {
                      // 영문(a~zA~Z), 숫자(0~9), 특수문자(!@#$%^&* 등)만 허용
                      const filtered = text.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]/g, '');
                      setUserId(filtered);
                      setIsUserIdChecked(false);
                    }}
                  placeholder="아이디를 입력하세요"
                  style={styles.input}
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  maxLength={20}
                  returnKeyType="next"
                />
              </View>

              <TouchableOpacity
                style={[styles.dupBtn, isUserIdChecked && styles.dupBtnOk]}
                onPress={userIdCheck}
                activeOpacity={0.8}
              >
                <Text style={styles.dupBtnText}>{isUserIdChecked ? '확인됨' : '중복확인'}</Text>
              </TouchableOpacity>
            </View>

            {/* 비밀번호 */}
            <Text style={[styles.label, { marginTop: 12 }]}>비밀번호</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.subText} style={styles.inputIcon}/>
              <TextInput
                ref={passwordRef}
                value={password}
                onChangeText={setPassword}
                placeholder="비밀번호를 입력하세요"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                returnKeyType="next"
              />
            </View>

            {/* 비밀번호 확인 */}
            <Text style={[styles.label, { marginTop: 12 }]}>비밀번호 확인</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.subText} style={styles.inputIcon}/>
              <TextInput
                value={confirmPassword}
                onChangeText={setconfirmPassword}
                placeholder="비밀번호를 다시 입력하세요"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                returnKeyType="next"
              />
            </View>


            {/* 이메일 */}
            <Text style={[styles.label, { marginTop: 12 }]}>이메일</Text>
            <View style={styles.inputWrap}>
              <MaterialCommunityIcons name="email-outline" size={20} color={COLORS.subText} style={styles.inputIcon}/>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="your.email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                returnKeyType="next"
              />
            </View>

            {/* 휴대폰 */}
            <Text style={[styles.label, { marginTop: 12 }]}>휴대폰 번호</Text>
            <View style={styles.inputWrap}>
              <MaterialCommunityIcons name="cellphone" size={20} color={COLORS.subText} style={styles.inputIcon}/>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="01012345678"
                keyboardType="phone-pad"
                maxLength={11}
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                returnKeyType="done"
                onSubmitEditing={submit}
              />
            </View>

            {/* 회원가입 버튼 */}
            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.7 }]}
              activeOpacity={0.85}
              onPress={submit}
              disabled={loading}
            >
              <Ionicons name="person-add-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>{loading ? '가입 중…' : '회원가입'}</Text>
            </TouchableOpacity>

            {/* 구분선 */}
            <View style={styles.hr} />

            {/* 로그인 링크 */}
            <Text style={styles.bottomText}>
              이미 계정이 있으신가요?{' '}
              <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>로그인</Text>
            </Text>
          </View>

          {/* 약관 */}
          <Text style={styles.legal}>
            회원가입을 진행하면 PetNote의 <Text style={styles.link}>서비스 이용약관</Text> 및{' '}
            <Text style={styles.link}>개인정보 처리방침</Text>에 동의한 것으로 간주됩니다.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  flex: { flex: 1 },
  container: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 24, backgroundColor: COLORS.bg },

  logoWrap: { alignItems: 'center', marginTop: 24, marginBottom: 16 },
  logoCircle: {
    width: 84, height: 84, borderRadius: 42, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.shadow, shadowOpacity: 0.16, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 6
  },
  title: { marginTop: 16, fontSize: 18, fontWeight: '700', color: COLORS.text },
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
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dupBtn: {
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 88,          // 버튼 최소 너비
  },
  dupBtnOk: { backgroundColor: '#10B981' },
  dupBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  button: {
    marginTop: 16, height: 52, borderRadius: 14, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  hr: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 18 },

  bottomText: { textAlign: 'center', color: COLORS.subText },
  loginLink: { color: COLORS.link, fontWeight: '700' },

  legal: {
    marginTop: 16, marginBottom: 10, textAlign: 'center',
    color: COLORS.subText, fontSize: 12, lineHeight: 18, paddingHorizontal: 20
  },
  link: { color: COLORS.link, fontWeight: '700' }
});