import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import gs, { COLORS } from '../../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomModal, AppInput, AppSelect, AppButton } from '../common';
import { useNavigation } from '@react-navigation/native';
import MealsAddModal from './MealsAddModal';
import MealStatusCard from './MealStatusCard';

const MealsComponent = () => {
    const navigation = useNavigation();

    //추가, 수정 모달
    const [open, setOpen] = useState(false);
    const [modiData, setModiData] = useState(null);

    const handleSubmit = (data) => {
         console.log('식사량 :', data);
        setOpen(false);
    };

    const mealStatus = [
        { meal: '0001', foodType: '사료(건식)', amount: '200g', status: 'C' },
        { meal: '0005', foodType: '간식(개껌)', amount: '100g', status: 'C' },
        { meal: '0003', foodType: '사료(습식)', amount: '200g', status: 'P' },
    ]

    const MealStatusListComponent = ({ list, text = '식사로그를 기록해보세요.' }) => {
        return (
            list.length > 0 ? list.map((item, key) => {
                return (<MealStatusCard key={key} item={item} setOpen={setOpen} setModiData={setModiData} />)
            })
                :
                <Text style={styles.noLogs}>{text}</Text>
        )
    }


    return (
        <>
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <View style={[gs.flexRow, { alignItems: 'center' }]}>
                        <FontAwesome name='cutlery' style={styles.titleIcon} />
                        <View>
                            <Text style={styles.title}>오늘의 식사</Text>
                            <Text style={styles.subTitle}>오늘의 영양 밸런스를 기록해요</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('mealsDetail', { headerTitle: '식사 기록' })}
                        style={styles.calendar}
                    >
                        <FontAwesome name='calendar' style={{ fontSize: 20, color: '#381600ff' }} />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 40 }}>
                    <MealStatusListComponent list={mealStatus} text='아직 오늘의 식사를 기록하지 않았어요!' />
                </View>

                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={() => { setModiData(null); setOpen(true); }}>
                        <Text style={styles.addBtnText}>식사로그 기록</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {/* 추가/수정 모달 */}
            <MealsAddModal visible={open} onClose={()=>setOpen(false)} onSubmit={handleSubmit} modiData={modiData} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: COLORS.sub,
        borderRadius: 20,
        padding: 20
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleIcon: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 10,
        fontSize: 20,
        color: '#fff',
        marginRight: 10,
        width: 45,
        height: 45,
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    title: {
        fontSize: 16,
        fontWeight: 600
    },
    subTitle: {
        fontSize: 12,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    completedCard: {
        backgroundColor: '#F3FFF6',
        borderColor: '#D7F5E0',
    },
    pendingCard: {
        backgroundColor: '#FFF8F2',
        borderColor: '#FFE1C4',
    },
    meal: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
    },
    desc: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    badge: {
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 20,
    },
    completedBadge: {
        backgroundColor: '#59b487ff',
    },
    pendingBadge: {
        backgroundColor: '#fd825cff',
    },
    badgeText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
    },
    addBtn: {
        width: '100%',
        paddingBlock: 8,
        backgroundColor: COLORS.primary,
        borderRadius: 20
    },
    addBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 700
    },
    calTitle: {
        fontSize: 16,
        fontWeight: 600,
    },
    mealPlus: {
        // backgroundColor: COLORS.primary,
        // paddingBlock: 6,
        // width: 55,
        // borderRadius: 18
    },
    mealPlusText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 600
    },
    noLogs: {
        color: COLORS.textSecondary,
        marginBlock: 20,
        textAlign: 'center'
    },
    cancelBtn: { paddingVertical: 8 },
    cancelText: { textAlign: 'center', color: '#999' },

});

export default MealsComponent;
