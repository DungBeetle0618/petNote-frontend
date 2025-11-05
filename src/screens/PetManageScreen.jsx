/**
 * 반려동물 관리 화면 
 */
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, TouchableOpacity } from 'react-native';

import { scale } from 'react-native-size-matters';
import gs, { COLORS } from '../assets/styles/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import EBoldText from '../components/font/EBoldText';
import BoldText from '../components/font/BoldText';
import RegularText from '../components/font/RegularText';
import EBoldTextN from '../components/font/EBoldText_n';

import PetSelectBox from '../components/PetSelectBox';
import PetInfo from '../components/PetInfo';
import TabMenu from '../components/TabMenu';
import WeightComponent from '../components/WeightComponent';
import MealsComponent from '../components/MealsComponent';
import ActivityComponent from '../components/ActivityComponent';
import PetRegistModal from '../components/PetRegistModal';

const PetManageScreen = () => {
    const [selected, setSelected] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [petModalVisible, setPetModalVisible] = useState(false);

    const scrollRef = useRef(null);
    const tabMenuRef = useRef(0);

    const handleSubmit = data => {
        console.log('등록된 동물 정보:', data);
        setPetModalVisible(false);
    };

    const [activeTabName, setActiveTabName] = useState('식사량');
    const [weightRender, setWeightRender] = useState(false);
    const [mealsRender, setMealsRender] = useState(true);
    const [activityRender, setActivityRender] = useState(false);

    const onPressHandler = (renderName) => {
        // scrollRef.current?.scrollTo({
        //     animated: true,
        //     y: tabMenuRef.current
        // })

        if (renderName == '몸무게') {
            setWeightRender(true);
            setMealsRender(false);
            setActivityRender(false);
            setActiveTabName('몸무게');
        }
        if (renderName == '식사량') {
            setWeightRender(false);
            setMealsRender(true);
            setActivityRender(false);
            setActiveTabName('식사량');
        }
        if (renderName == '활동량') {
            setWeightRender(false);
            setMealsRender(false);
            setActivityRender(true);
            setActiveTabName('활동량');
        }
    }

    //예시데이터
    const options = [
        { no: 1, name: '뭉치', species: '강아지', breed: '노바 스코샤 덕 톨링 리트리버', profile: require('../assets/images/golden_retriever_sample.png'), birth: '2023.12.25', age: '3살', gender: '수컷' },
        { no: 2, name: '아치', species: '고양이', breed: '코리안 숏헤어', profile: '', birth: '2023.12.25', age: '3살', gender: '암컷' },
        { no: 4, name: '흰둥이', species: '강아지', breed: '비숑', profile: require('../assets/images/siro.jpg'), birth: '2023.12.25', age: '3살', gender: '수컷', main: true },
        { no: 3, name: '마루', species: '강아지', breed: '푸들', profile: '', birth: '2023.12.25', age: '3살', gender: '암컷' },
    ];

    useEffect(() => {
        //대표동물 기본 선택
        setSelected(options[0]);
    }, [])

    return (
        <ScrollView contentContainerStyle={gs.screen} ref={scrollRef} >

            <EBoldTextN style={gs.title}>Pet</EBoldTextN>
            <Text style={{ fontSize: scale(14) }}>반려동물의 건강정보를 한눈에 확인하세요!</Text>

            <View style={{ paddingTop: scale(20) }}>
                {/* 동물 추가 버튼 */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.addBtn, gs.flexRow, { justifyContent: 'center', alignItems: 'center' }]}
                    onPress={() => { setPetModalVisible(true) }}
                >
                    <BoldText style={styles.whiteFont}>등록</BoldText>
                    <FontAwesome name='plus' style={[styles.whiteFont, { marginLeft: scale(5) }]} />
                </TouchableOpacity>
                <PetRegistModal visible={petModalVisible}
                                onClose={() => setPetModalVisible(false)}
                                onSubmit={handleSubmit} 
                />

                {/* 동물 선택 드롭박스 */}
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

            <View style={gs.mt25}>
                {/* 동물 상세 */}
                {selected && <PetInfo data={selected} />}
            </View>

            <View style={gs.mt25} onLayout={(e)=>{
                tabMenuRef.current = e.nativeEvent.layout.y;
            }} collapsable={false}>
                <TabMenu onPressHandler={(name)=>{
                        scrollRef.current?.scrollTo({y: tabMenuRef.current, animated: true});
                        onPressHandler(name);
                    }} 
                    menuList={['몸무게', '식사량', '활동량']} activeTab={activeTabName} 
                />
                {weightRender && <WeightComponent />}
                {mealsRender && <MealsComponent />}
                {activityRender && <ActivityComponent />}
            </View>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    addBtn: {
        width: '100%',
        height: scale(30),
        borderRadius: scale(8),
        backgroundColor: COLORS.primary,
        marginBottom: scale(10),
    },
    whiteFont: {
        fontSize: scale(12),
        color: 'white'
    }
});

export default PetManageScreen;