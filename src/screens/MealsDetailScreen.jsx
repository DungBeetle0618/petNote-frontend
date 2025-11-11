import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomModal } from '../components/common';
import AppCalendar from '../components/common/AppCalendar';
import MealsAddModal from '../components/MealsAddModal';
import dayjs from 'dayjs';
import MealStatusCard from '../components/MealStatusCard';

const MealsDetailScreen = () => {
    const [daySelected, setDaySelected] = useState(dayjs().format('YYYY-MM-DD'));

    //추가, 수정 모달
    const [open, setOpen] = useState(false);
    const [modiData, setModiData] = useState(null);

    const handleSubmit = () => {
        console.log('식사량:', data);
        setOpen(false);
    };

    const kor = useMemo(() => dayjs(daySelected).format('YYYY년 MM월 DD일'), [daySelected]);

    const mealStatus = [
        { meal: '0001', foodType: '사료(건식)', amount: '200g', status: 'C' },
        { meal: '0005', foodType: '간식(개껌)', amount: '100g', status: 'C' },
        { meal: '0003', foodType: '사료(습식)', amount: '200g', status: 'P' },
    ]

    const daySelectHandle = (day) => {
        setDaySelected(day);
    }

    const MealStatusListComponent = ({list, text='식사로그를 기록해보세요.'}) => {
        return (
            list.length>0 ? list.map((item, key) => {
                return (<MealStatusCard key={key} item={item} setOpen={setOpen} setModiData={setModiData} />)
            })
            :
            <Text style={styles.noLogs}>{text}</Text>
        )
    }


    return (
        <ScrollView style={gs.screen}>
            <AppCalendar selected={daySelected} setSelected={(day) => daySelectHandle(day)} />

            <View style={{ marginTop: scale(30) }}>
                <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.calTitle}>{kor}</Text>
                    <TouchableOpacity
                        style={styles.mealPlus}
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                        onPress={() => { setModiData(null); setOpen(true); }}
                    >
                        <AntDesign name='pluscircle' style={{color: COLORS.primary, fontSize: scale(20)}}/>
                    </TouchableOpacity>
                </View>
                <MealStatusListComponent list={mealStatus} />
            </View>

            {/* 추가/수정 모달 */}
            <MealsAddModal visible={open} onClose={()=>setOpen(false)} onSubmit={handleSubmit} modiData={modiData} day={kor} />

        </ScrollView>

    );
};

const styles = StyleSheet.create({
    
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
        paddingBlock: scale(8),
        backgroundColor: COLORS.primary,
        borderRadius: scale(20)
    },
    addBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 800
    },
    calTitle: {
        fontSize: 16,
        fontWeight: 600,
    },
    mealPlusText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 600
    },
    noLogs: {
        color: COLORS.textSecondary,
        marginBlock: scale(20),
        textAlign: 'center'
    }

});

export default MealsDetailScreen;
