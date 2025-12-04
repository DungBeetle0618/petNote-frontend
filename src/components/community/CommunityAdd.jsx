import React, { useCallback, useState } from 'react'
import { Alert, Image, Pressable, ScrollView } from 'react-native';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import usePermissions from '../../hooks/usePermissions';
import { COLORS } from '../../assets/styles/globalStyles';
import { TextInput } from 'react-native';
import DismissKeyboardView from '../DismissKeyboardView';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { api } from '../../net/api';

const CommunityAdd = () => {

  usePermissions();

  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [contents, setContents] = useState('');

  const onResponse = useCallback(async (response) => {
	const list = Array.isArray(response) ? response : [response];

	const previewList = list.map(img => ({
	uri: `data:${img.mime};base64,${img.data}`,
	}));
	setPreview(previewList);
	console.log(previewList);


	const uploadFiles = list.map(img => ({
		uri: img.path, 
		type: img.mime,
		name: img.filename || `img_${Date.now()}.jpg`
		}));
	setFiles(uploadFiles);


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


  const onChangeContents =  useCallback(text => {
    setContents(text);
  }, []);

  
const onUpload = () => {
  let formData = new FormData();
	formData.append("contents", contents);

	files.forEach(f => {
	formData.append("uploadFiles", {
		uri: f.uri,
		type: f.type,
		name: f.name,
		});
	});


  api({
    method: 'POST',
    url: 'api/community/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(res => {
      console.log("res", res.data);
    })
    .catch(err => {
      console.log("error >>>", err.message);
    });
};

  

  return (
	<DismissKeyboardView style={{backgroundColor:'#fff', position:'relative', flex:1}}>
		<View style={{flex:1}}>
			<Pressable style={styles.preview} onPress={onChangeFile}>
				{
					preview.length === 0  ?
						<Text>클릭해서 이미지를 업로드하세요. </Text>
						: 
						preview.map((item, index) => (
							<Image
								key={index}
								source={{ uri: item.uri }}
								style={styles.previewImage}
							/>
					))
				}
			</Pressable>
			<View style={styles.textInputWrapper}>
				<TextInput style={styles.textInput} placeholder='문구를 작성하거나 설문을 추가하세요..' onChangeText={onChangeContents} multiline ></TextInput>
			</View>
			<View style={styles.shareWrapper}>
				<View style={styles.release}>
					<Text style={styles.releaseText}><FontAwesome6 name='eye' size={16} /> 공개대상</Text>
					<Text style={styles.releaseText}>팔로워</Text>
				</View>
				<Pressable style={styles.share} onPress={onUpload}>
					<Text style={styles.shareText}>공유</Text>
				</Pressable>
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
    height:'100%',
    width:'100%',
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