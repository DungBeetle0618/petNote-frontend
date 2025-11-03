import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import gs from '../assets/styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const FeedScreen = () => {

    return (
            <View style={{paddingHorizontal:1, paddingVertical:5}}>

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
                                <View style={{flexDirection:'row', marginRight:25, alignItems:'center'}}>
                                    <Text><Feather name="message-circle" size={14} color="#000" /></Text>
                                    <Text>18</Text>
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
                                <View style={{flexDirection:'row', marginRight:25, alignItems:'center'}}>
                                    <Text><Feather name="message-circle" size={14} color="#000" /></Text>
                                    <Text>18</Text>
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
                                <View style={{flexDirection:'row', marginRight:25, alignItems:'center'}}>
                                    <Text><Feather name="message-circle" size={14} color="#000" /></Text>
                                    <Text>18</Text>
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
                                <View style={{flexDirection:'row', marginRight:25, alignItems:'center'}}>
                                    <Text><Feather name="message-circle" size={14} color="#000" /></Text>
                                    <Text>18</Text>
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

            </View>
    );

};


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
})


export default FeedScreen;
