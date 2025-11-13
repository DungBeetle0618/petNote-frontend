import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const COLORS = {
  primary: '#FF6600',
  sub: '#FED7AA',
  subSecondary: '#FFF7ED',
  orange200: '#FED7AA',
  background: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#777777',
  textLight: '#999999',
  border: '#CCCCCC',
  cardBg: '#F9F9F9',
};

export const MODAL_COLORS = {
  border: '#FFD8B0',
  primary: '#FF6600',
  text: '#333',
  label: '#555',
  background: '#fff',
  activeBorder: '#FF6600',
  activeBg: '#FF660022',
  activeText: '#FF6600',
  placeholder: '#999',
}

export const PX_SIZE = {
  xs: 12,    
  sm: 14,   
  md: 16,    
  lg: 20,     
  xl: 24,    
};

const globalStyles = StyleSheet.create({
  /* 화면 기본 틀 */
  screen: {
    // flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: PX_SIZE.lg, 
    paddingVertical: 30,
  },

  /* 제목 텍스트 */
  title: {
    fontSize: PX_SIZE.xl,
    // fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
    letterSpacing: -2,
  },

  /* 부제목 */
  subtitle: {
    fontSize: PX_SIZE.md,
    // fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: 20, 
  },

  /* 일반 본문 텍스트 */
  text: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 22,
  },


  /* 섹션 컨테이너 */
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Android 그림자
  },

  /* 중앙 정렬 */
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },

  mt25: {
    marginTop: scale(25)
  },
  mt40: {
    marginTop: scale(40)
  },

  bar: {
    height: 1,
    backgroundColor: '#ececec',
    marginBlock: 12,
    width: '70%'
  }
});

export default globalStyles;