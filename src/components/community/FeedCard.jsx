import React, { useEffect, useRef, useState } from 'react'
import {Modal, View, Text, ScrollView, StyleSheet, Image, Pressable, Dimensions, Animated } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { BottomModal } from '../common';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import NoComment from './NoComment';
import Comment from './Comment';
import DismissKeyboardView from '../DismissKeyboardView';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const FeedCard = () => {

	const inputRef = useRef();
	const [visible, setVisible] = useState(false);
	const [userRender, setUserRender] = useState(false);
	const modalHeight = height-90;
	const viewWidth = width;

	const maxHeight = '95%';

	//리덕스로 전역상태값 불러오는거
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const onCloseCommnet = () => {
		setVisible(false);
		setUserRender(false);
	}

	const onOpenComment = () => {
		setVisible(true);
	}

	const onPressAnswer = () => {
		
		const name = `@TEST`;

		setUserRender(name);
		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.setNativeProps({
				selection: { start: name.length, end: name.length },
			});
		}, 50);
	}


	const [translateY] = useState(new Animated.Value(400));
	
	useEffect(() => {
	Animated.timing(translateY, {
		toValue: visible ? 0 : 400,
		duration: visible ? 250 : 200,
		useNativeDriver: true,
	}).start();
	}, [visible]);



  return (
		<>
			<View style={styles.card}>
				<View style={styles.cardHeader}>
				<View style={{flexDirection:'row'}}>
					<View style={styles.cardHeaderImg}><Text style={{fontSize:21}}>🐶</Text></View>
					<View style={styles.cardHeaderTextWrap}>
						<Text style={styles.cardHeaderText}>Sarah Kim</Text>
						<Text style={styles.cardHeaderText}>2h ago</Text>
					</View>
				</View>
				<View style={styles.btn}><Text style={styles.btnText}>+ 팔로우</Text></View>
				</View>
				<View style={styles.cardBody}>
					<Swiper
					  	dot={
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
						<View style={styles.slide1}>
							<Image source={require('../../assets/images/feed1.jpg')} style={styles.cardImg} />
						</View>
						<View style={styles.slide2}>
							<Image source={require('../../assets/images/feed1.jpg')} style={styles.cardImg} />
						</View>
						<View style={styles.slide3}>
							<Image source={require('../../assets/images/feed1.jpg')} style={styles.cardImg} />
						</View>
					</Swiper>
				</View>
				<View style={styles.cardFoot}>
				<View style={{flexDirection:'row', alignContent:'center',  marginBottom:25, justifyContent:'space-between'}}>
					<View style={{flexDirection:'row'}}>
						<View style={{flexDirection:'row', marginRight:25, alignItems:'center'}}>
							<FontAwesome name="heart-o" size={14} color="#000" backgroundColor="#fff"/>
							<Text style={{marginLeft:5}}>234</Text>
						</View>
						<View>
							<Pressable onPress={onOpenComment} style={{flexDirection:'row', marginRight:25, alignItems:'center'}}>
								<Text><Feather name="message-circle" size={14} color="#000" /></Text>
								<Text>18</Text>
							</Pressable>
						</View>
					</View>
					<View style={{flexDirection:'row', alignItems:'center'}}>
						<Text><Feather name="share-2" size={13} color="#000" /></Text>
					</View>
				</View>
				<View style={styles.cardFootMarign}>
					<Text style={styles.cardFootText}>Morning walk with Coco! She's loving the autumn weather 🍂</Text>
				</View>
				<View style={[styles.cardFootMarign, {flexDirection:'row'}]}>
					<Text style={styles.cardFootTextHash}>#Bicho</Text>
					<Text style={styles.cardFootTextHash}>#MorningWalk #PetLife</Text>
					<Text style={styles.cardFootTextHash}>#PetLife</Text>
				</View>
				</View>
			</View>





			<Modal transparent visible={visible} animationType="fade" onRequestClose={onCloseCommnet}>
				<Pressable style={styles.overlay} onPress={onCloseCommnet} />
				<Animated.View style={[styles.sheetContainer, { height: maxHeight, transform: [{ translateY }], maxHeight }]}>

					<View style={modal.commnetLayOutTitle}>
						<Text style={modal.commnetLayOutTitleText}>댓글</Text>
					</View>

					<ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
						<View>
							<View style={{paddingLeft:24,paddingRight:24, flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', position:'relative', paddingVertical:10,}}>
									<Comment onPressAnswer={onPressAnswer}/>
									<Comment onPressAnswer={onPressAnswer}/>
									<Comment onPressAnswer={onPressAnswer}/>
							</View>
						</View>
					</ScrollView>

					<View style={{position:'relative'}}>
						{userRender && 
							<View>
								<View style={{flexDirection:'row', backgroundColor:'#000', position:'absolute', width:'100%', top:-40, height:40, backgroundColor:'#f1f1f1',alignItems:'center', justifyContent:'space-between',paddingLeft:15, paddingRight:15}}>
									<Text style={{fontSize:12}}>{userRender && userRender} 님에게 남기는 답글</Text>
									<Pressable><AntDesign name="close" size={12} color="#000" /></Pressable>
								</View>
							</View>
						}
						<View style={modal.commnetLayOutFooter}>
							<View style={{width:40,height:40,backgroundColor:'#7ecc89ff', borderRadius:50, alignItems:'center', justifyContent:'center', marginRight:7}}><Text style={{fontSize:21}}>🐶</Text></View>
							<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', height:45, flex:1}}>
								<View>{userRender && (<View><Text style={{fontSize:12}}>{userRender}</Text></View>)}</View>
								<TextInput style={modal.commnetLayOutFooterInput} placeholder='답글 추가' ref={inputRef}></TextInput>
							</View>
							<Pressable><Feather name="send" size={21} color="#000" /></Pressable>
						</View>
					</View>

				</Animated.View>
			</Modal>


		</>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 50,
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5, // Android 그림자
    },
    cardHeader: {
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 30,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardHeaderImg: {
        backgroundColor: '#ab86ff',
        width: 33,
        height: 33,
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardHeaderTextWrap: {
        paddingLeft: 10
    },
    cardHeaderText: {
        fontSize: 12
    },
    cardBody: {
	position:'relative',
	   height:300,
        marginBottom: 30,
	   overflow: 'visible'
    },
    cardImg: {
        width: '100%',
        height: 300
    },
    cardFoot: {
        paddingRight: 15,
        paddingLeft: 15
    },
    cardFootMarign: {
        marginBottom: 10
    },
    cardFootText: {
        fontSize: 13
    },
    cardFootTextHash: {
        color: '#f54a00',
        marginRight: 8,
        fontSize: 13
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    sheetContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: MODAL_COLORS.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: MODAL_COLORS.primary,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: -6
        },
        shadowRadius: 12,
        elevation: 10
    },
    btn:{
	borderWidth:StyleSheet.hairlineWidth,
	borderRadius:5,
	paddingVertical:3,
	paddingHorizontal:5,
	borderColor:'#555',
    },
    btnText:{
	color:'#222',
	fontSize:13,
    }
});



const modal = StyleSheet.create({
	commnetLayOutTitle : {
		textAlign:'center',
		zIndex:1,
		width:'100%',
		alignItems:'center',
		justifyContent:'center',
		paddingBottom:20,
		paddingTop:24,
		paddingLeft:24,
		paddingRight:24,
		borderBlockColor:'#ccc',
		borderBottomWidth:StyleSheet.hairlineWidth
	},
	commnetLayOutTitleText : {
		fontSize:15,
	},
	commentTitle : {
		color:'#111',
		fontWeight:'600',
		textAlign:'center'
	},
	commnetLayOutFooter : {
		flexDirection:'row',
		textAlign:'center',
		width:'100%',
		alignItems:'center',
		justifyContent:'center',
		borderTopWidth:StyleSheet.hairlineWidth,
		paddingLeft:24,
		paddingRight:24,
		backgroundColor:'#fff'
	},
	commnetLayOutFooterInput:{
		flexGrow:1,
		fontWeight:700,
		color:'#000',
		fontSize:12,
		height:45,
	}
});



export default FeedCard