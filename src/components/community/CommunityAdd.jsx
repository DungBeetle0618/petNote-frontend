import React, { useCallback, useState } from 'react'
import { Pressable, ScrollView } from 'react-native';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import usePermissions from '../../hooks/usePermissions';
import { COLORS } from '../../assets/styles/globalStyles';
import { TextInput } from 'react-native';
import DismissKeyboardView from '../DismissKeyboardView';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

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
	 multiple:true,
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  return (
	<DismissKeyboardView style={{backgroundColor:'#fff', position:'relative', flex:1}}>
		<View style={{flex:1}}>
			<Pressable style={styles.preview} onPress={onChangeFile}>
				{preview ? <Image style={styles.previewImage} source={preview}/> : <Text>클릭해서 이미지를 업로드하세요. </Text>}
			</Pressable>
			<View style={styles.textInputWrapper}>
				<TextInput style={styles.textInput} placeholder='문구를 작성하거나 설문을 추가하세요..' multiline ></TextInput>
			</View>
			<View style={styles.shareWrapper}>
				<View style={styles.release}>
					<Text style={styles.releaseText}><FontAwesome6 name='eye' size={16} /> 공개대상</Text>
					<Text style={styles.releaseText}>팔로워</Text>
				</View>
				<View style={styles.share}>
					<Text style={styles.shareText}>공유</Text>
				</View>
			</View>
		</View>
	</DismissKeyboardView>
    
  )
}


const styles = StyleSheet.create({
  preview: {
    width: Dimensions.get('window').width - 40,
    height:Dimensions.get('window').height / 4,
    borderWidth:StyleSheet.hairlineWidth,
    alignItems:'center',
    justifyContent:'center',
    margin:20,
  },
  previewImage: {
    resizeMode: 'contain',
    height:'100%'
  },
  textInputWrapper: {
    width: Dimensions.get('window').width - 40,
    marginHorizontal:20,
    flex:1,
  },
  textInput:{
    color:'#000',
    flexWrap:'wrap',
  },
  shareWrapper:{
	margin:20,
	width: Dimensions.get('window').width - 40,
	backgroundColor:'##0d6efd',
	justifyContent:'center',
	borderTopWidth:StyleSheet.hairlineWidth,
	paddingTop:15,
  },
  release:{
	flexDirection:'row',
	alignItems:'center',
	justifyContent:'space-between',
	marginBottom:13,
  },
  releaseText:{
	fontSize:16
  },
  share:{
	width: '100%',
	height: 55,
	backgroundColor:COLORS.primary,
	alignItems:'center',
	justifyContent:'center',
	borderRadius:12,
  },
  shareText:{
	color:'#fff',
	fontWeight:600,
  },
});

export default CommunityAdd