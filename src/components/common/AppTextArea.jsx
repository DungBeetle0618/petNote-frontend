import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';

export default function AppTextArea({ label, value, onChangeText, placeholder }) {
  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.textarea}
        value={value}
        onChangeText={onChangeText}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        placeholder={placeholder || `${label}을 입력하세요`}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 14, color: MODAL_COLORS.label, marginBottom: 6 },
  textarea: {
    borderWidth: 1,
    borderColor: MODAL_COLORS.border,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: MODAL_COLORS.background,
    fontSize: 14,
    color: MODAL_COLORS.text,
  },
});
