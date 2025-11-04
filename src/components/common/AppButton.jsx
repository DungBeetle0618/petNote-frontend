import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';

export default function AppButton({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: MODAL_COLORS.primary,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
