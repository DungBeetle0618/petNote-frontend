/**
 * 반려동물 관리 화면 
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import EBoldText from '../components/font/EBoldText';
import gs from '../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';

import PetSelectBox from '../components/PetSelectBox';
import { useEffect } from 'react';
import RegularText from '../components/font/RegularText';
import PetInfo from '../components/PetInfo';

const PetManageScreen = () => {
    const [selected, setSelected] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    //예시데이터
    const options = [
        { no: 1, name: '레오나르도', breed: '골든리트리버', profile: require('../assets/images/golden_retriever_sample.png') },
        { no: 2, name: '아치', breed: '코리안 숏헤어', profile: '' },
        { no: 4, name: '흰둥이', breed: '비숑', profile: require('../assets/images/siro.jpg') },
        { no: 3, name: '마루', breed: '푸들', profile: '' },
    ];

    useEffect(()=>{
        //대표동물 기본 선택
        setSelected(options[2]);
    }, [])

    return (
        <ScrollView contentContainerStyle={[gs.screen, {backgroundColor: '#faf5ff80'}]} >

            <EBoldText style={gs.title}>Pet</EBoldText>
            <RegularText style={{fontSize: scale(14)}}>반려동물의 건강정보를 한눈에 확인하세요!</RegularText>

            <View style={{paddingTop: scale(20)}}>
                <PetSelectBox 
                    visible={dropdownVisible}
                    onOpen={() => setDropdownVisible(true)}
                    onClose={() => setDropdownVisible(false)}
                    onSelect={(pet) => {
                        setSelected(pet);
                        setDropdownVisible(false);
                    }}
                    options={options}
                    selectedValue={selected}
                />
            </View>

            <PetInfo data={selected} />

        </ScrollView>
    );
};

export default PetManageScreen;