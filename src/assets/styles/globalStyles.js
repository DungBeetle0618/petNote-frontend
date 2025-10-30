import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const COLORS = {
  primary: '#FF6600',
  background: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#777777',
  textLight: '#999999',
  border: '#CCCCCC',
  cardBg: '#F9F9F9',
};

export const PX_SIZE = {
  xs: scale(12),    
  sm: scale(14),   
  md: scale(16),    
  lg: scale(20),     
  xl: scale(24),    
};

const globalStyles = StyleSheet.create({
  /* 화면 기본 틀 */
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: PX_SIZE.lg, 
    paddingVertical: PX_SIZE.md,
  },

  /* 제목 텍스트 */
  title: {
    fontSize: PX_SIZE.xl,
    // fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: scale(10),
  },

  /* 부제목 */
  subtitle: {
    fontSize: PX_SIZE.md,
    // fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: scale(20), 
  },

  /* 일반 본문 텍스트 */
  text: {
    fontSize: scale(15),
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
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android 그림자
  },

  /* 중앙 정렬 */
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default globalStyles;