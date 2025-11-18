import React, { useCallback, useState } from 'react'
import { Pressable } from 'react-native';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import usePermissions from '../../hooks/usePermissions';
import { COLORS } from '../../assets/styles/globalStyles';
import { TextInput } from 'react-native';

const CommunityAdd = () => {

  usePermissions();

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState();

  const onResponse = useCallback(async response => {
    setPreview({uri: `data:${response.mime};base64,${response.data}`});
    const orientation = response.exif.Orientation;
    console.log('orientation', orientation);
    return ImageResizer.createResizedImage(
      response.path,
      600,
      600,
      response.mime.includes('jpeg') ? 'JPEG' : 'PNG',
      100,
      0,
    ).then(r => {
      console.log(r.uri, r.name);
      setImage({
        uri: r.uri,
        name: r.name,
        type: response.mime,
      });
    });
  }, []);


  const onChangeFile = useCallback(() => {
    return ImagePicker.openPicker({
      includeExif: true,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  return (
    <View style={{backgroundColor:'#D2D2D2'}}>
      <View style={styles.preview}>
        {preview && <Image style={styles.previewImage} source={preview} />}
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable style={styles.button} onPress={onChangeFile}>
          <Text style={styles.buttonText}>이미지 선택</Text>
       </Pressable>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput style={styles.textInput} placeholder='글입력........' multiline ></TextInput>
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>완료</Text>
        </Pressable>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  orderId: {
    padding: 20,
  },
  preview: {
    marginHorizontal: 10,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 3,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  previewImage: {
    height: Dimensions.get('window').height / 3,
    resizeMode: 'contain',
  },
  buttonWrapper: {flexDirection: 'row', justifyContent: 'flex-end'},
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 120,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'white',
  },
  buttonDisabled: {
    backgroundColor: '#fff',
  },
  textInputWrapper: {
    width: Dimensions.get('window').width - 20,
    height: 200,
    marginHorizontal: 10,
    borderWidth:StyleSheet.hairlineWidth,
    borderRadius:12,
    backgroundColor:'#fff'
  },
  textInput:{
    color:'#000',
    flexWrap:'wrap'
  },
});

export default CommunityAdd