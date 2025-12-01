/**
 * 반려동물 관리 화면 
 */
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Platform } from 'react-native';

import gs, { COLORS, PX_SIZE } from '../assets/styles/globalStyles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import EBoldText from '../components/font/EBoldText';
import BoldText from '../components/font/BoldText';
import PetRegistModal from '../components/petManage/PetRegistModal';
import PetSelectBox from '../components/petManage/PetSelectBox';
import { useNavigation } from '@react-navigation/native';
import { getPetList, getPetInfo } from '../api/pet';

const PetSelectScreen = () => {
    const navigation = useNavigation();

    const [petModalVisible, setPetModalVisible] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSubmit = data => {
        setPetModalVisible(false);
    };

    //나의 펫 리스트 조회
    const getMyPetList = async () => {
        try {
            const { data } = await getPetList();
            if (data.result === "SUCCESS") {
                setOptions(data.list);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getMyPetList();
    }, [])


    //상세페이지 이동
    const handleSelect = async (item) => {
        //나의 펫 상세 조회
        try {
            const { data } = await getPetInfo(item.petNo);
            if (data.result === "SUCCESS") {
                console.log(data)
                navigation.navigate('PetManageScreen', { pet: data.data });
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={[gs.screen, { height: '100%' }]} >

            <EBoldText style={gs.title}>Pet</EBoldText>
            <Text style={gs.subtitle}>반려동물의 건강정보를 한눈에 확인하세요!</Text>
            <Text style={{ fontSize: 12, color: 'red' }}>TODO: 배지 색상은 변경 예정</Text>

            {/* 동물 추가 버튼 */}
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.addBtn}
                onPress={() => { setPetModalVisible(true); }}
            >
                <FontAwesome6 name='plus' style={styles.whiteFont} />
            </TouchableOpacity>
            <PetRegistModal visible={petModalVisible}
                onClose={() => setPetModalVisible(false)}
                onSubmit={handleSubmit}
            />

            {/* 동물 리스트 */}
            {
                !options || options.length == 0
                    ? (
                        <View style={styles.noPet}>
                            <Text style={[styles.noPetText, { fontSize: 16, fontWeight: 500, marginBottom: 10 }]}>아직 등록된 반려동물이 없습니다.</Text>
                            <Text style={styles.noPetText}>+ 버튼을 눌러 등록해 주세요.</Text>
                        </View>
                    )
                    : (
                        <FlatList
                            data={options}
                            renderItem={({ item }) => (
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