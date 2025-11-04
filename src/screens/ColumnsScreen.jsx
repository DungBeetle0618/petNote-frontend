import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const ColumnsScreen = () => {

    return (
            <View style={{paddingHorizontal:1, paddingVertical:5}}>
                
<Shadow style={styles.columnsCardwrap}
                    distance={2}
                    startColor="#fdecd5"
                    endColor="#fdecd5"
                    sides={['top','bottom','left','right']}               // 사방
                    containerViewStyle={{ borderRadius: 16 }}             // ✅ 핵심 1: 래퍼 radius
                >
                    <View style={styles.columnsCard}>
                        <View style={styles.columnsHeader}>
                            <View style={styles.columnsHeaderIcon}><Text style={{fontSize:26}}>🏋️</Text></View>
                            <View>
                                <View style={{marginBottom:7, flexDirection:'row'}}><Text style={styles.columnsHeaderText1}>Trainer</Text></View>
                                <View style={{marginBottom:7}}><Text style={styles.columnsHeaderText2}>10-Minute Daily Training Routine</Text></View>
                                <View><Text style={styles.columnsHeaderText3}>By Alex Johnson</Text></View>
                            </View>
                        </View>
                        <View style={styles.columnsBody}>
                            <Text style={styles.columnsBodyText} numberOfLines={2} ellipsizeMode="tail">Learn to read your pet's body language and understand what they're trying to tell you...</Text>
                        </View>
                        <Pressable style={styles.columnsFooter}><Text style={styles.columnsFooterText}>Read More</Text></Pressable>
                    </View>
                </Shadow>

                <Shadow style={styles.columnsCardwrap}
                    distance={2}
                    startColor="#fdecd5"
                    endColor="#fdecd5"
                    sides={['top','bottom','left','right']}               // 사방
                    containerViewStyle={{ borderRadius: 16 }}             // ✅ 핵심 1: 래퍼 radius
                >
                    <View style={styles.columnsCard}>
                        <View style={styles.columnsHeader}>
                            <View style={styles.columnsHeaderIcon}><Text style={{fontSize:26}}>🏋️</Text></View>
                            <View>
                                <View style={{marginBottom:7, flexDirection:'row'}}><Text style={styles.columnsHeaderText1}>Trainer</Text></View>
                                <View style={{marginBottom:7}}><Text style={styles.columnsHeaderText2}>10-Minute Daily Training Routine</Text></View>
                                <View><Text style={styles.columnsHeaderText3}>By Alex Johnson</Text></View>
                            </View>
                        </View>
                        <View style={styles.columnsBody}>
                            <Text style={styles.columnsBodyText} numberOfLines={2} ellipsizeMode="tail">Learn to read your pet's body language and understand what they're trying to tell you...</Text>
                        </View>
                        <Pressable style={styles.columnsFooter}><Text style={styles.columnsFooterText}>Read More</Text></Pressable>
                    </View>
                </Shadow>

                <Shadow style={styles.columnsCardwrap}
                    distance={2}
                    startColor="#fdecd5"
                    endColor="#fdecd5"
                    sides={['top','bottom','left','right']}               // 사방
                    containerViewStyle={{ borderRadius: 16 }}             // ✅ 핵심 1: 래퍼 radius
                >
                    <View style={styles.columnsCard}>
                        <View style={styles.columnsHeader}>
                            <View style={styles.columnsHeaderIcon}><Text style={{fontSize:26}}>🏋️</Text></View>
                            <View>
                                <View style={{marginBottom:7, flexDirection:'row'}}><Text style={styles.columnsHeaderText1}>Trainer</Text></View>
                                <View style={{marginBottom:7}}><Text style={styles.columnsHeaderText2}>10-Minute Daily Training Routine</Text></View>
                                <View><Text style={styles.columnsHeaderText3}>By Alex Johnson</Text></View>
                            </View>
                        </View>
                        <View style={styles.columnsBody}>
                            <Text style={styles.columnsBodyText} numberOfLines={2} ellipsizeMode="tail">Learn to read your pet's body language and understand what they're trying to tell you...</Text>
                        </View>
                        <Pressable style={styles.columnsFooter}><Text style={styles.columnsFooterText}>Read More</Text></Pressable>
                    </View>
                </Shadow>

            </View>
    );
};



const styles = StyleSheet.create({
    columnsCardwrap:{
        alignSelf: 'stretch', 
        marginBottom:30,
    },
    columnsCard:{
        height: 225,
        borderRadius: 16,
        padding:13,
    },
    columnsHeader:{
        flexDirection:'row',
        marginBottom:'30',
    },
    columnsHeaderIcon:{
        width:57,
        height:57,
        backgroundColor:'#fdecd5',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginRight:12,
    },
    columnsHeaderText1:{
        paddingHorizontal:8,
        paddingVertical:3,
        borderRadius:13,
        backgroundColor:'#ff6900',
        color:'#fff',
        fontSize:11,
        letterSpacing:0.5
    },
    columnsHeaderText2:{
        fontSize:14,
        letterSpacing:0.5
    },
    columnsHeaderText3:{
        fontSize:13,
        letterSpacing:0.5,
        color:'#525252'
    },
    columnsBody:{
         marginBottom:'30',
    },
    columnsBodyText:{
        width:310,
        fontSize:13,
        letterSpacing:0.5
    },
    columnsFooter:{
        borderColor:'#ff6900',
        height:30,
        borderRadius:12,
        borderWidth:StyleSheet.hairlineWidth,
        alignItems:'center',
        justifyContent:'center'
    },
    columnsFooterText:{
        color:'#ff6900',
    },
})


export default ColumnsScreen;
