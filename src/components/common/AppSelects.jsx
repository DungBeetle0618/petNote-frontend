import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';

export default function AppSelects({ label, options, selected = [], onSelect }) {

  // code를 누르면 배열에서 추가/삭제하는 함수
  const toggleSelect = (code) => {
    let newSelected;

    if (selected.includes(code)) {
      // 이미 있으면 제거
      newSelected = selected.filter(item => item !== code);
    } else {
      // 없으면 추가
      newSelected = [...selected, code];
    }

    onSelect(newSelected); 
  };

  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.selectRow}>
        {options.map((o) => {
          const isActive = selected.includes(o.code);

          return (
            <TouchableOpacity
              key={o.code}
              style={[styles.selectBox, isActive && styles.selectBoxActive]}
              onPress={() => toggleSelect(o.code)}
            >
               {o.image && (
                <Image 
                  source={o.image}
                  style={styles.boxImage}
                  resizeMode="contain"
                />
              )}
              <Text
                style={[styles.selectText, isActive && styles.selectTextActive]}
              >
                {o.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 14, color: '#555', marginBottom: 6 },

  selectRow: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between'  
  },
  selectBox: {
    width: '32%', 
    borderWidth: 1,
    borderColor: MODAL_COLORS.border,
    borderRadius: 16,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center', 
    backgroundColor: '#FFF3E0',
  },
  selectBoxActive: {
    borderColor: MODAL_COLORS.activeBorder,
    backgroundColor: MODAL_COLORS.activeBg,
  },
  boxImage: {
    width: 40,
    height: 40,
    marginBottom: 6,
  },
  selectText: { color: MODAL_COLORS.text, fontSize: 14 },
  selectTextActive: { color: MODAL_COLORS.activeText, fontWeight: '600' },
});
