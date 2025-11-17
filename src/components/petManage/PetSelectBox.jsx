/**
 * 동물 선택 셀렉트박스 컴포넌트
 */
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Image , Text} from 'react-native';
import gs, { COLORS } from '../../assets/styles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import RegularText from '../font/RegularText';
import BoldText from '../font/BoldText';

const PetSelectBox = ({ item, onSelect, mb }) => {

    return (
        <TouchableOpacity
            style={[styles.selectBox, mb && {marginBottom: mb}]}
            onPress={onSelect}
            activeOpacity={0.8}
        >
            <View style={styles.selectContainer}>
                <View style={styles.profileView}>
                    <Image
                        source={item.profile}
                        style={styles.profileImg}
                    />
                </View>
                <View>
                    <BoldText style={styles.title}>{item.name}</BoldText>
                    <View style={styles.tagView}>
                        <View style={[styles.breedTag, {backgroundColor: COLORS.primary, marginRight: 6}]}>
                            <Text style={styles.breed}>
                                {item.species}
                            </Text>
                        </View>
                        <View style={[styles.breedTag, {backgroundColor: '#9a8fff'}]}>
                            <Text style={styles.breed}>
                                {item.breed}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* <FontAwesome5 name='chevron-right' style={{fontSize: 16, color: '#999'}} /> */}
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    selectBox: {
        width: '99%',
        borderWidth: 1,
        borderColor: COLORS.sub,
        padding: 14,
        borderRadius: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
            },
            android: {
                elevation: 2,
            }
        })
    },
    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20
    },
    profileView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginRight: 20,
        backgroundColor: '#ececec'
    },
    profileImg: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 500,
        color: '#333',
    },
    breed: {
        fontSize: 10,
        color: '#fff'
    },

    tagView: {
        flexDirection: 'row',
    },
    breedTag: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: COLORS.sub,
        marginTop: 6
    }
    
});

export default PetSelectBox;
