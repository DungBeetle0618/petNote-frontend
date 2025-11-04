import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';

export default function AppImagePicker({ label, value, onChange }) {
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (res) => {
      if (res.assets && res.assets[0]?.uri) onChange(res.assets[0].uri);
    });
  };

  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.picker} onPress={pickImage}>
        {value ? (
          <Image source={{ uri: value }} style={styles.image} />
        ) : (
          <Text style={{ color: MODAL_COLORS.placeholder }}>사진 선택하기</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 14, color: '#555', marginBottom: 6 },
  picker: {
    height: 120,
    borderWidth: 1,
    borderColor: MODAL_COLORS.border,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MODAL_COLORS.background,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});
