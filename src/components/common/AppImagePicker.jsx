import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';

const resolveSource = (val) => {
  if (!val) return null;
  return typeof val === 'string' ? { uri: val } : val;
};

export default function AppImagePicker({ label, value, onChange }) {

  const onResponse = useCallback(async (response) => {
    let preview = `data:${response.mime};base64,${response.data}`;
    resolveSource(preview);
  
    const uploadFiles = {
      uri: response.path, 
      type: response.mime,
      name: response.filename || `img_${Date.now()}.jpg`
    };
    onChange(uploadFiles);
  }, []);
  
  const pickImage = useCallback(()=>{
    // launchImageLibrary({ mediaType: 'photo' }, (res) => {
    //   if (res.assets && res.assets[0]?.uri) onChange(res.assets[0]);
    // });
    
    return ImageCropPicker.openPicker({
      includeExif: true,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then(onResponse)
      .catch(console.log);

  }, [onResponse]); 

  const source = resolveSource(value);

  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.picker} onPress={pickImage}>
        {source ? (
          <Image source={source} style={styles.image} resizeMode="cover" />
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
