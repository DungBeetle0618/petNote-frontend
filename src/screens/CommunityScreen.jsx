/**
 * 커뮤니티 화면
 */
import React, {useCallback, useEffect, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Pressable,
    Alert,
    Modal,
    Animated,
    Dimensions,
    TextInput,
    Image,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import EBoldText from '../components/font/EBoldText';
import gs, { COLORS, MODAL_COLORS } from '../assets/styles/globalStyles';
import Feed from '../components/community/Feed';
import Columns from '../components/community/Columns';
import Review from '../components/community/Review';
import TabMenu from '../components/common/TabMenu';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import DismissKeyboardView from '../components/DismissKeyboardView';

import { api } from '../net/api';
import Swiper from 'react-native-swiper';


const CommunityScreen = ({navigation}) => {

    const [feedRender, setFeedRender] = useState(true);
    const [columnsRender, setColumnsRender] = useState(false);
    const [reviewsRender, setReivewsRender] = useState(false);
    const [activeTabName, setActiveTabName] = useState('Feed');

    /* modal START */
    const [communityAddModal, setCommunityAddModal] = useState(false);
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


    /* modal END */


    const maxHeight = '100%';
    const [translateY] = useState(new Animated.Value(400));

    const onPressHandler = (renderName) => {
        if(renderName == 'Feed'){
          setFeedRender(true);
          setColumnsRender(false);
          setReivewsRender(false);
          setActiveTabName('Feed');
        }

        if(renderName == 'Columns'){
          setFeedRender(false);
          setColumnsRender(true);
          setReivewsRender(false);
          setActiveTabName('Columns');
        }

        if(renderName == 'Reviews'){
          setFeedRender(false);
          setColumnsRender(false);
          setReivewsRender(true);
          setActiveTabName('Reviews');
        }
    }

     const onBoardAdd = useCallback(() => {
		//navigation.navigate('CommunityAdd');
        setCommunityAddModal(true);
	});

    const onCloseCommnet = () => {
		setCommunityAddModal(false);
	}


    return (
	<View>
        <ScrollView contentContainerStyle={gs.screen}>
            <View>
                <EBoldText style={gs.title}>Community</EBoldText>
            </View>
            <View>
                <Text style={gs.subtitle}>Connect with pet lovers</Text>
            </View>

            <TabMenu onPressHandler={onPressHandler} menuList={['Feed', 'Columns', 'Reviews']} activeTab={activeTabName}/>
            <View style={{marginTop:20}}>
                {feedRender && <Feed />}
                {columnsRender && <Columns />}
                {reviewsRender && <Review />}
            </View>

        </ScrollView>



		<Pressable style={communityDot.addBox} onPress={onBoardAdd}>
			<Text><FontAwesome6 name='plus' style={communityDot.addBoxFont} /></Text>
		</Pressable>

        <Modal transparent visible={communityAddModal} animationType="fade" onRequestClose={onCloseCommnet}>
             <Animated.View style={styles.modalContainer}>
                <View style={styles.preview}>
                    {
                            preview.length === 0 ? (
                                <Pressable onPress={onChangeFile} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:12}}>클릭해서 이미지를 업로드하세요.</Text>
                                </Pressable>
                                ) : (
                                <Swiper dot={
                                        <View
                                            style={{
                                            backgroundColor: 'rgba(255,255,255,0.3)', 
                                            width: 8,
                                            height: 8,
                                            borderRadius: 4,
                                            marginLeft: 3,
                                            marginRight: 3,
                                            marginTop: 3,
                                            marginBottom: 3,
                                            }}
                                        />
                                        }
                                            activeDot={
                                            <View
                                                style={{
                                                backgroundColor: 'rgba(255,255,255,0.9)',
                                                width: 8,
                                                height: 8,
                                                borderRadius: 4,
                                                marginLeft: 3,
                                                marginRight: 3,
                                                marginTop: 3,
                                                marginBottom: 3,
                                                }}
                                            />
                                        }
                                        showsPagination={true} 
                                        loop={false}
                                        showsButtons={true}
                                        nextButton={<Text style={{fontSize: 40, color: 'rgba(255,255,255,0.8)'}}>›</Text>}
                                        prevButton={<Text style={{fontSize: 40, color: 'rgba(255,255,255,0.8)'}}>‹</Text>}
                                        >
                                {preview.map((item, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: item.uri }}
                                        style={styles.previewImage}
                                    />
                                ))}
                                </Swiper>
                            )
                    }
                    {
                        preview.length > 0 && (
                        <Pressable onPress={onChangeFile} style={{position:'absolute', top:'0',right:0, backgroundColor:'rgba(62, 62, 62, 0.8)'}}>
                            <Text style={{color:'#fff', fontSize:12, padding:3,}}>클릭해서 이미지를 변경하세요.</Text>
                        </Pressable>
                        )
                    }
                </View>
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
            </Animated.View>
        </Modal>


    </View>
    );
};



const communityDot = StyleSheet.create({
	addBox:{
		position:'absolute',
		bottom:20,
		right:20,
		width:50,
		height:50,
		backgroundColor: COLORS.primary,
		alignItems:'center',
		justifyContent:'center',
		borderRadius:50,
		opacity:100,
	},
        addBoxFont: {
        color: 'white',
        fontSize: 14
    },
});

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
    },
    preview: {
        width: Dimensions.get('window').width - 40,
        height:300,
        borderWidth:StyleSheet.hairlineWidth,
        alignItems:'center',
        justifyContent:'center',
        margin:20,
    },
    previewImage: {
        resizeMode:'cover',
        width: '100%',
        height: 300
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

export default CommunityScreen;