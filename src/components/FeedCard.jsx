import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { BottomModal } from './common';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const FeedCard = () => {

	const [visible, setVisible] = useState(false);

	//리덕스로 전역상태값 불러오는거
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const onCloseCommnet = () => {
		setVisible(false);
	}

	const onOpenComment = () => {
		setVisible(true);
	}

	useEffect(()=>{

	}, [visible]);



  return (
	<>
	{isLoggedIn && <View><Text>로그인 완료</Text></View>}
	<View style={styles.card}>
			<View style={styles.cardHeader}>
			<View style={{flexDirection:'row'}}>
				<View style={styles.cardHeaderImg}><Text style={{fontSize:21}}>🐶</Text></View>
				<View style={styles.cardHeaderTextWrap}>
					<Text style={styles.cardHeaderText}>Sarah Kim</Text>
					<Text style={styles.cardHeaderText}>2h ago</Text>
				</View>
			</View>
			<View><Text><AntDesign name="book" size={15} color="#333" /></Text></View>
			</View>
			<View style={styles.cardBody}>
			<Image source={require('../assets/images/feed1.jpg')} style={styles.cardImg} />
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

		<BottomModal  visible={visible} onClose={onCloseCommnet} title={false} maxHeight='96%'>
			<View style={modal.noCommnetLayOutTitle}>
				<Text style={modal.noCommnetLayOutTitleText}>댓글</Text>
			</View>
			<View style={modal.noCommnetLayOutContents}>
				<View>
					<Text style={{fontSize:17, fontWeight:700, textAlign:'center'}}>아직 댓글이</Text>
					<Text style={{fontSize:17, fontWeight:700, textAlign:'center'}}>없습니다.</Text>
					<Text style={{fontSize:13, fontWeight:500, color:'777', marginTop:5}}>대화를 시작하세요.</Text>
				</View>
			</View>
			<View style={modal.noCommnetLayOutFooter}>
				<View style={{width:40,height:40,backgroundColor:'#7ecc89ff', borderRadius:50, alignItems:'center', justifyContent:'center', marginRight:7,}}><Text style={{fontSize:21}}>🐶</Text></View>
				<TextInput style={modal.noCommnetLayOutFooterInput} placeholder='ㅇㅇㅇ 님에게 댓글 추가..'></TextInput>
				<Pressable style={{color:'#ccc'}}><Text style={{fontSize:25}}>⬆️</Text></Pressable>
			</View>
		</BottomModal>

	 </>
  )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 50,
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5, // Android 그림자
    },
    cardHeader:{
        paddingRight:15,
        paddingLeft:15,
        paddingTop:15,
        paddingBottom:30,
        flexDirection:'row',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },
    cardHeaderImg:{
        backgroundColor:'#ab86ff',
        width: 33,
        height: 33,
        borderRadius:100,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    cardHeaderTextWrap:{
        paddingLeft:10,
    },
    cardHeaderText:{
        fontSize:12,
    },
    cardBody:{
        marginBottom:30,
    },
    cardImg:{
        width: '100%',
        height: 300,
    },
    cardFoot:{
        paddingRight:15,
        paddingLeft:15,
    },
    cardFootMarign:{
        marginBottom: 10,
    },
    cardFootText:{
        fontSize: 13,
    },
    cardFootTextHash:{
        color:'#f54a00',
        marginRight:8,
        fontSize: 13,
    }
});

const modal = StyleSheet.create({
	noCommnetLayOutTitle : {
		textAlign:'center',
		position:'absolute',
		zIndex:1,
		width:'100%',
		alignItems:'center',
		justifyContent:'center',
		paddingBottom:20,
		borderBlockColor:'#ccc',
		borderBottomWidth:StyleSheet.hairlineWidth
	},
	noCommnetLayOutTitleText : {
		fontSize:15,
	},
	noCommnetLayOutContents : {
		height:'100%',
		alignItems:'center',
		justifyContent:'center',
	},
	noCommentTitle : {
		color:'#111',
		fontWeight:'600',
		textAlign:'center'
	},
	noCommnetLayOutFooter : {
		flexDirection:'row',
		textAlign:'center',
		position:'absolute',
		zIndex:1,
		width:'100%',
		alignItems:'center',
		justifyContent:'center',
		paddingTop:20,
		borderBlockColor:'#ccc',
		bottom:0,
		borderTopWidth:StyleSheet.hairlineWidth
	},
	noCommnetLayOutFooterInput:{
		flexGrow:1,
	}
});


export default FeedCard