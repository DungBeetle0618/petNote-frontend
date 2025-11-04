import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const ReviewCard = () => {
  return (
    <Shadow 
                style={styles.reviewsCardWrap}
                distance={2}
                startColor="#fdecd5"
                endColor="#fdecd5"
                sides={['top','bottom','left','right']}
                containerViewStyle={{ borderRadius: 16 }}
            >
                <View style={styles.reviewCard}>
                    <View style={styles.reviewCardLeft}>
                        <View style={styles.reviewCardIcon}>
                            <Text style={{fontSize:22}}>🏋️</Text>
                        </View>
                    </View>
                    <View style={styles.reviewCardRight}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:10}}>
                            <View>
                                <View style={{marginBottom:5}}><Text style={styles.reviewName}>Jennifer Park</Text></View>
                                <View><Text style={styles.reviewArea}>Happy Animal Hospital</Text></View>
                            </View>
                            <View><Text style={styles.reviewStar}>★ ★ ★ ★ ★</Text></View>
                        </View>
                        <View>
                            <Text style={styles.reviewText}>
                                The staff was incredibly kind and professional. Dr. Kim took great care of my dog during the vaccination. Highly recommended!
                            </Text>
                        </View>
                    </View>
                </View>
            </Shadow>
  )
}


const styles = StyleSheet.create({
    reviewsCardWrap: {
        alignSelf: 'stretch', 
        marginBottom:30,
    },
    reviewCard:{
        height:150,
        borderRadius: 16,
        padding:13,
        flexDirection:'row',
    },
    reviewCardLeft:{
        flex:2,
    },
    reviewCardRight:{
        flex:8,
    },
    reviewCardIcon:{
        width:43,
        height:43,
        backgroundColor:'#fdecd5',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        marginRight:12,
    },
    reviewName:{
        fontSize:14
    },
    reviewArea:{
        fontSize:13,
        color:'#525252'
    },
    reviewText:{
        fontSize:14,
        color:'#333'
    },
    reviewStar:{
        color:'#ff6900'
    }
});

export default ReviewCard