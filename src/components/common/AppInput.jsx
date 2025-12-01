import React, { forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';

const AppInput = forwardRef(({ label, placeholder, style, error, ...props }, ref) => {
  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={ref}
        style={[styles.input,
          style,
          error && styles.inputError  // 에러 시 border 색 변경
        ]}
        placeholder={placeholder ? placeholder : label}
        placeholderTextColor="#999"
        {...props}
      />

      {error && (
        <Text style={styles.errorMessage}>{error}</Text>  // 에러 메시지 표시
      )}
    </View>
  );
});

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

  inputError: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});

export default AppInput;