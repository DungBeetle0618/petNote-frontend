import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';

export default function AppDropdown({ label, data, value, onChange, isSearch }) {
  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search={isSearch?true:false}
        labelField="label"
        valueField="value"
        placeholder="선택하세요"
        searchPlaceholder="검색..."
        value={value}
        onChange={(item) => onChange(item.value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 14, color: MODAL_COLORS.label, marginBottom: 6 },
  dropdown: {
    height: 48,
    borderColor: MODAL_COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: MODAL_COLORS.background,
  },
  placeholderStyle: { fontSize: 14, color: '#999' },
  selectedTextStyle: { fontSize: 14, color: MODAL_COLORS.text },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: MODAL_COLORS.text,
    borderBottomWidth: 0.5,
    borderColor: MODAL_COLORS.border,
  },
});
