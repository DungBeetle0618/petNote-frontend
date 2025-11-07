import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';

export default function AppInput({ label, placeholder, style, ...props }) {
  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder?placeholder:label}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 14, color: MODAL_COLORS.label, marginBottom: 6 },
  input: {
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
