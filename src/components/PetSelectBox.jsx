import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Animated,
    Easing,
} from 'react-native';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import RegularText from './RegularText';
import BoldText from './BoldText';

/**
 * 화살표 아이콘 애니메이션 
 */
const RotatingIcon = ({ visible }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(rotateAnim, {
            toValue: visible ? 1 : 0,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <Animated.View style={{ transform: [{ rotate }], marginLeft: 'auto' }}>
            <Ionicons name='chevron-down-outline' style={{ fontSize: scale(20) }} />
        </Animated.View>
    );
};


/**
 * @param options 내 반려동물 리스트
 * @param selectedValue 선택한 동물 object
 * @param onSelect select시 작업
 * @param visible 드롭박스 display 여부
 * @param onOpen 드롭박스 보이게
 * @param onClose 드롭박스 안보이게
 */
const PetSelectBox = ({ options, selectedValue, onSelect, visible, onOpen, onClose }) => {

    return (
        <View style={{ position: 'relative' }}>
            {selectedValue ? (
                <TouchableOpacity
                    style={styles.selectBox}
                    onPress={() => (visible ? onClose() : onOpen())}
                    activeOpacity={1}
                >
                    <View style={styles.selectContainer}>
                        <View style={styles.profileView}>
                            <Image
                                source={selectedValue.profile}
                                style={styles.profileImg}
                            />
                        </View>
                        <View>
                            <BoldText style={styles.title}>{selectedValue.name}</BoldText>
                            <RegularText style={styles.breed}>
                                {selectedValue.breed}
                            </RegularText>
                        </View>
                        <RotatingIcon visible={visible} />
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={[gs.flexRow, styles.selectBox]}>
                    <RegularText style={gs.text}>
                        첫번째 반려동물을 추가해주세요
                    </RegularText>
                    <FontAwesome name="smile-o" style={[gs.text, { marginLeft: 5 }]} />
                </View>
            )}


            {visible && (
                <View style={styles.dropdown}>
                    {options.map((item, key) => (
                        <TouchableOpacity
                            style={[styles.option, selectedValue.no == item.no ? styles.optionSelected : '']}
                            onPress={() => onSelect(item)}
                            key={key}
                        >
                            <View style={styles.optionRow}>
                                {
                                    item.profile ? <Image source={item.profile} style={styles.optionImg} /> 
                                    : <View style={[styles.optionImg, {backgroundColor: COLORS.textLight}]}/>
                                }
                                
                                <RegularText style={styles.optionText}>{item.name}</RegularText>
                                {
                                    selectedValue.no == item.no ? <Ionicons name='checkmark-circle' color={COLORS.primary} style={{marginLeft: 'auto'}}/>
                                    :
                                    <View/>
                                }
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    selectBox: {
        borderWidth: 2,
        borderColor: COLORS.orange200,
        padding: scale(15),
        borderRadius: scale(15),
        backgroundColor: '#fff',
    },
    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: scale(55),
        height: scale(55),
        borderRadius: 50,
        borderWidth: 3,
        borderColor: COLORS.primary,
        marginRight: scale(15),
    },
    profileImg: {
        width: scale(45),
        height: scale(45),
        borderRadius: 50,
    },
    title: {
        fontSize: scale(16),
        marginBottom: scale(5),
        color: '#333',
    },
    breed: {
        fontSize: scale(12),
    },
    dropdown: {
        position: 'absolute',
        top: scale(95),
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: COLORS.orange200,
        borderRadius: scale(15),
        zIndex: 10,
        paddingHorizontal: scale(10),
        paddingTop: scale(10)
    },
    option: {
        paddingVertical: scale(10),
        paddingHorizontal: scale(15),
        marginBottom: scale(10),
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionImg: {
        width: scale(40),
        height: scale(40),
        borderRadius: 50,
        marginRight: scale(20),
    },
    optionText: {
        fontSize: scale(14),
        color: '#333',
    },
    optionSelected: {
        backgroundColor: '#fed7aa56',
        borderRadius: scale(15)
    }
});

export default PetSelectBox;
