/**
 * 반려동물 관리 화면 
 */
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import gs, { COLORS, PX_SIZE } from '../assets/styles/globalStyles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import EBoldText from '../components/font/EBoldText';
import BoldText from '../components/font/BoldText';
import PetRegistModal from '../components/petManage/PetRegistModal';
import PetSelectBox from '../components/petManage/PetSelectBox';
import { useNavigation } from '@react-navigation/native';


const PetSelectScreen = () => {
    const navigation = useNavigation();

    const [petModalVisible, setPetModalVisible] = useState(false);

    const handleSubmit = data => {
        console.log('등록된 동물 정보:', data);
        setPetModalVisible(false);
    };


    //예시데이터
    const options = [
        { no: 1, name: '뭉치', species: '강아지', breed: '노바 스코샤 덕 톨링 리트리버', profile: require('../assets/images/golden_retriever_sample.png'), birth: '2023.12.25', age: '3살', gender: '남' },
        { no: 2, name: '아치', species: '고양이', breed: '코리안 숏헤어', profile: '', birth: '2023.12.25', age: '3살', gender: '여' },
        { no: 4, name: '흰둥이', species: '강아지', breed: '비숑', profile: require('../assets/images/siro.jpg'), birth: '2023.12.25', age: '3살', gender: '남', main: true },
        { no: 3, name: '마루', species: '강아지', breed: '푸들', profile: '', birth: '2023.12.25', age: '3살', gender: '여' },
    ];


    //상세페이지 이동
    const handleSelect = (item) => {
        navigation.navigate('PetManageScreen', { pet: item });
    };

    return (
        <View style={[gs.screen, {height: '100%'}]} >

            <EBoldText style={gs.title}>Pet</EBoldText>
            <Text style={gs.subtitle}>반려동물의 건강정보를 한눈에 확인하세요!</Text>
            <Text style={{fontSize: 12, color: 'red'}}>TODO: 배지 색상은 변경 예정</Text>

            {/* 동물 추가 버튼 */}
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.addBtn}
                onPress={() => { setPetModalVisible(true) }}
            >
                <FontAwesome6 name='plus' style={styles.whiteFont} />
            </TouchableOpacity>
            <PetRegistModal visible={petModalVisible}
                onClose={() => setPetModalVisible(false)}
                onSubmit={handleSubmit}
            />

            {/* 동물 리스트 */}
            {
                !options || options.length==0
                ? ( 
                    <View style={styles.noPet}>
                        <Text style={[styles.noPetText, {fontSize: 16, fontWeight: 500, marginBottom: 10}]}>아직 등록된 반려동물이 없습니다.</Text> 
                        <Text style={styles.noPetText}>+ 버튼을 눌러 등록해 주세요.</Text> 
                    </View>
                )
                : (
                    <FlatList 
                        data={options}
                        renderItem={({item}) => (
                            <PetSelectBox item={item} onSelect={() => handleSelect(item)} mb={20} />
                        )}
                    />
                )
            }

        </View>
    );
};

const styles = StyleSheet.create({
    addBtn: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        zIndex: 99,

        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',

        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
            },
            android: {
                elevation: 4,
            }
        })
    },
    whiteFont: {
        color: 'white',
        fontSize: 14
    },

    noPet: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50%',
        borderWidth: 2,
        borderColor: '#ececec',
        borderRadius: 20,
        paddingBlock: 18
    },
    noPetText: {
        color: '#777'
    }
});

export default PetSelectScreen;