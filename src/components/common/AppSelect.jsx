import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';

export default function AppSelect({ label, options, selected, onSelect }) {
  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.selectRow}>
        {options.map((o) => (
          <TouchableOpacity
            key={o.code}
            style={[styles.selectBox, selected === o.code && styles.selectBoxActive]}
            onPress={() => onSelect(o.code)}
          >
            <Text
              style={[styles.selectText, selected === o.code && styles.selectTextActive]}
            >
              {o.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 14, color: '#555', marginBottom: 6 },
  selectRow: { flexDirection: 'row', flexWrap: 'wrap' },
  selectBox: {
    borderWidth: 1,
    borderColor: MODAL_COLORS.border,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 6,
    backgroundColor: '#FFF3E0',
  },
  selectBoxActive: {
    borderColor: MODAL_COLORS.activeBorder,
    backgroundColor: MODAL_COLORS.activeBg,
  },
  selectText: { color: MODAL_COLORS.text, fontSize: 14 },
  selectTextActive: { color: MODAL_COLORS.activeText, fontWeight: '600' },
});
