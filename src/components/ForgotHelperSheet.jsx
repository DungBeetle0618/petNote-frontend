import React, { useEffect, useState } from 'react';
import { sendFindIdCode, verifyFindIdCode, sendResetPwCode, verifyResetPwCode } from '../api/auth'
import {
  View, Text, TouchableOpacity, TextInput, StyleSheet, Modal,
  KeyboardAvoidingView, Platform, ScrollView, Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const COLORS = {
  bg: '#FFF4EA',
  card: '#FFFFFF',
  text: '#1F2937',
  subText: '#6B7280',
  primary: '#F15A24',
  inputBorder: '#E5E7EB',
  link: '#F15A24',
  danger: '#EF4444',
  success: '#10B981',
  shadow: '#000',
};
const RESEND_COOLDOWN = 60;
const TABS = { FIND_ID: 'FIND_ID', RESET_PW: 'RESET_PW' };

export default function ForgotHelperSheet({ visible, onClose }) {
  const [tab, setTab] = useState(TABS.FIND_ID);

  // 공통 상태
  const [sending, setSending] = useState(false);
  const [idVerifying, setIdVerifying] = useState(false);
  const [pwVerifying, setPwVerifying] = useState(false);

  // ===== 아이디 찾기: 이메일 + 토큰 인증 =====
  const [findEmail, setFindEmail] = useState('');
  const [findSent, setFindSent] = useState(false);
  const [findResendSec, setFindResendSec] = useState(0);
  const [findCode, setFindCode] = useState('');
  const [foundUserId, setFoundUserId] = useState('');

  // ===== 비밀번호 재설정: 아이디+이메일 + 토큰 인증 후 비번 변경 =====
  const [pwUserId, setPwUserId] = useState('');
  const [pwEmail, setPwEmail] = useState('');
  const [pwSent, setPwSent] = useState(false);
  const [pwResendSec, setPwResendSec] = useState(0);
  const [pwCode, setPwCode] = useState('');

  // 유틸
  const isEmail = (v='') => /^\S+@\S+\.\S+$/.test(v);
  const strongPw = (v='') => v.length >= 8; // 필요시 규칙 강화 가능

  useEffect(() => {
    if (!visible) {
      // 상태 초기화
      setTab(TABS.FIND_ID);
      setSending(false); setIdVerifying(false); setPwVerifying(false);
      setFindEmail(''); setFindSent(false); setFindResendSec(0); setFindCode(''); setFoundUserId('');
      setPwUserId(''); setPwEmail(''); setPwSent(false); setPwResendSec(0); setPwCode('');
    }
  }, [visible]);

  // 타이머
  useEffect(() => {
    let t; if (findResendSec > 0) t = setInterval(()=>setFindResendSec(s=>Math.max(0, s-1)), 1000);
    return () => t && clearInterval(t);
  }, [findResendSec]);
  useEffect(() => {
    let t; if (pwResendSec > 0) t = setInterval(()=>setPwResendSec(s=>Math.max(0, s-1)), 1000);
    return () => t && clearInterval(t);
  }, [pwResendSec]);

  function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

  // ===== 아이디 찾기 핸들러 =====
  const onSendFindCode = async () => {
    if (!isEmail(findEmail)) return Alert.alert('안내', '올바른 이메일을 입력해 주세요.');
    if (findResendSec > 0) return;
    try {
      setSending(true);
      const res = await sendFindIdCode(findEmail.trim());
      if (res) {
        setFindSent(true);
        setFindResendSec(RESEND_COOLDOWN);
        Alert.alert('발송 완료', '입력하신 이메일로 인증번호를 발송했습니다.');
      } else {
        Alert.alert('오류', '인증번호 발송에 실패했습니다.');
      }
    } catch(e) {
      Alert.alert('오류', e.response?.data?.message || '네트워크 오류가 발생했습니다.');
    } finally {
      setSending(false);
    }
  };

  const onVerifyFindCode = async () => {
    if (!findCode.trim()) return Alert.alert('안내', '인증번호를 입력해 주세요.');
    try {
      setPwSent(true);
      const res = await verifyFindIdCode(findEmail.trim(), findCode.trim());
      const data = res?.data
      if (data.status) {
        setFoundUserId(data.message);
        setIdVerifying(true);
        Alert.alert('확인 완료', '계정 확인에 성공했습니다.');
      } else {
        Alert.alert('인증 실패', '인증번호가 올바르지 않습니다.');
      }
    } catch {
      Alert.alert('오류', '네트워크 오류가 발생했습니다.');
    } finally {
      setSending(false);
    }
  };

  // ===== 비밀번호 재설정 핸들러 =====
  const onSendPwCode = async () => {
    if (!pwUserId.trim()) return Alert.alert('안내', '아이디를 입력해 주세요.');
    if (!isEmail(pwEmail)) return Alert.alert('안내', '올바른 이메일을 입력해 주세요.');
    if (pwResendSec > 0) return;
    try {
      setSending(true);
      const res = await sendResetPwCode(pwUserId.trim(), pwEmail.trim());
      if (res) {
        setPwSent(true);
        setPwResendSec(RESEND_COOLDOWN);
        Alert.alert('발송 완료', '입력하신 이메일로 인증번호를 발송했습니다.');
      } else {
        Alert.alert('오류', '인증번호 발송에 실패했습니다.');
      }
    } catch(e) {
      Alert.alert('오류', e.response?.data?.message || '네트워크 오류가 발생했습니다.');
    } finally {
      setSending(false);
    }
  };

  const onVerifyPwCode = async () => {
    if (!pwCode.trim()) return Alert.alert('안내', '인증번호를 입력해 주세요.');
    try {
      setPwVerifying(true);
      const res = await verifyResetPwCode(pwUserId.trim(), pwEmail.trim(), pwCode.trim());
      if (res) {
        Alert.alert('확인 완료', '인증이 완료되었습니다. 임시 비밀번호를 이메일로 발송했습니다.');
      } else {
        Alert.alert('인증 실패', '인증번호가 올바르지 않습니다.');
      }
    } catch(e) {
      Alert.alert('오류', e.response?.data?.message || '네트워크 오류가 발생했습니다.');
    } finally {
      setPwVerifying(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={styles.sheet}>
            {/* 헤더 */}
            <View style={styles.header}>
              <View style={styles.handle} />
              <Text style={styles.title}>로그인 도움말</Text>
              <TouchableOpacity onPress={onClose} style={styles.close}>
                <Ionicons name="close" size={22} color={COLORS.subText} />
              </TouchableOpacity>
            </View>

            {/* 탭 */}
            <View style={styles.tabs}>
              <TabButton label="아이디 찾기" active={tab === TABS.FIND_ID} onPress={() => setTab(TABS.FIND_ID)} />
              <TabButton label="비밀번호 재설정" active={tab === TABS.RESET_PW} onPress={() => setTab(TABS.RESET_PW)} />
            </View>

            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="always">
              {tab === TABS.FIND_ID ? (
                <>
                  <Text style={styles.caption}>이메일로 인증번호를 보내 드립니다.</Text>

                  <Label>이메일</Label>
                  <Input
                    value={findEmail}
                    onChangeText={setFindEmail}
                    placeholder="your@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    maxLength={64}
                  />

                  <Row>
                    <PrimaryButton
                      text={findSent ? (findResendSec > 0 ? `재발송 ${findResendSec}s` : '재발송') : '인증번호 받기'}
                      onPress={onSendFindCode}
                      disabled={sending || (findSent && findResendSec > 0)}
                    />
                  </Row>

                  <Label>인증번호</Label>
                  <Input
                    value={findCode}
                    onChangeText={setFindCode}
                    placeholder="6자리"
                    keyboardType="number-pad"
                    maxLength={6}
                  />

                  <PrimaryButton text="인증번호 보내기" onPress={onVerifyFindCode} loading={sending} />
                  
                  {idVerifying && (
                    <View style={styles.resultCard}>
                      <Text style={styles.resultTitle}>가입된 아이디</Text>
                        <Text style={styles.resultItem}>• {foundUserId}</Text>
                    </View>
                  )}
                    
                </>
              ) : (
                <>
                  <Text style={styles.caption}>아이디와 이메일을 확인하고, 인증번호로 본인확인 후 임시 비밀번호를 설정합니다.</Text>

                  <Label>아이디</Label>
                  <Input
                    value={pwUserId}
                    onChangeText={setPwUserId}
                    placeholder="아이디"
                    autoCapitalize="none"
                    maxLength={32}
                  />

                  <Label>이메일</Label>
                  <Input
                    value={pwEmail}
                    onChangeText={setPwEmail}
                    placeholder="your@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    maxLength={64}
                  />

                  <Row>
                    <PrimaryButton
                      text={pwSent ? (pwResendSec > 0 ? `재발송 ${pwResendSec}s` : '재발송') : '인증번호 받기'}
                      onPress={onSendPwCode}
                      disabled={sending || (pwSent && pwResendSec > 0)}
                    />
                  </Row>

                  <Label>인증번호</Label>
                  <Input
                    value={pwCode}
                    onChangeText={setPwCode}
                    placeholder="6자리"
                    keyboardType="number-pad"
                    maxLength={6}
                  />

                  <PrimaryButton text="인증번호 보내기" onPress={onVerifyPwCode} loading={sending} />

                </>
              )}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

function TabButton({ label, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tabBtn, active && styles.tabBtnActive]}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}
function Label({ children }) { return <Text style={styles.label}>{children}</Text>; }
function Row({ children }) { return <View style={styles.row}>{children}</View>; }
function Input(props) {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor="#9CA3AF"
    />
  );
}
function PrimaryButton({ text, onPress, disabled, loading }) {
  return (
    <TouchableOpacity style={[styles.primaryBtn, disabled && { opacity: 0.6 }]} onPress={onPress} activeOpacity={0.85} disabled={disabled || loading}>
      <Text style={styles.primaryBtnText}>{loading ? '처리 중…' : text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' },
  sheet: {
    backgroundColor: COLORS.card, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 8,
    shadowColor: COLORS.shadow, shadowOpacity: 0.1, shadowRadius: 10, elevation: 12, maxHeight: '88%'
  },
  header: { alignItems: 'center', paddingTop: 6, paddingBottom: 8 },
  handle: { width: 48, height: 4, backgroundColor: '#E5E7EB', borderRadius: 999 },
  title: { marginTop: 8, fontSize: 16, fontWeight: '700', color: COLORS.text },
  close: { position: 'absolute', right: 14, top: 10, padding: 6 },

  tabs: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginTop: 12, marginBottom: 8 },
  tabBtn: { flex: 1, height: 40, borderRadius: 10, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  tabBtnActive: { backgroundColor: '#FEE2D5' },
  tabText: { color: COLORS.subText, fontWeight: '600' },
  tabTextActive: { color: COLORS.primary },

  content: { paddingHorizontal: 16, paddingBottom: 28, gap: 10 },
  caption: { color: COLORS.subText, fontSize: 13, marginBottom: 4 },

  label: { color: COLORS.text, fontWeight: '600', marginTop: 8, marginBottom: 6 },
  input: {
    height: 48, borderWidth: 1, borderColor: COLORS.inputBorder, borderRadius: 12,
    paddingHorizontal: 12, backgroundColor: '#fff', color: COLORS.text
  },
  primaryBtn: {
    marginTop: 12, height: 48, borderRadius: 12, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center'
  },
  primaryBtnText: { color: '#fff', fontWeight: '700' },

  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  resultCard: { marginTop: 14, backgroundColor: '#FAFAFA', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#EEE' },
  resultTitle: { fontWeight: '700', color: COLORS.text, marginBottom: 6 },
  resultItem: { color: COLORS.text },
});