import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomModal } from '../components/common';
import AppCalendar from '../components/common/AppCalendar';


const today = new Date();
const todayString = today.toISOString().split('T')[0];

const MealsDetailScreen = () => {
    const [open, setOpen] = useState(false);
    const [daySelected, setDaySelected] = useState(todayString);
    const [kor, setKor] = useState('');

    useEffect(() => {
        const day = daySelected.split('-');
        setKor(day[0] + '년 ' + day[1] + '월 ' + day[2] + '일');
    }, [daySelected])

    const mealStatus = [
        { meal: '아침', foodType: '사료(건식)', amount: '200g', status: 'completed' },
        { meal: '간식', foodType: '간식(개껌)', amount: '100g', status: 'completed' },
        { meal: '저녁', foodType: '사료(습식)', amount: '200g', status: 'pending' },
    ]

    const daySelectHandle = (day) => {
        setDaySelected(day);
    }

    const MealStatusListComponent = ({list, text='식사로그를 기록해보세요.'}) => {
        return (
            list.length>0 ? list.map((item, key) => {
                return (<MealStatusCard key={key} meal={item.meal} foodType={item.foodType} amount={item.amount} status={item.status} />)
            })
            :
            <Text style={styles.noLogs}>{text}</Text>
        )
    }


    /**
     * 식사 상태 카드
     * @param {*} param0 
     * @returns 
     */
    const MealStatusCard = ({ meal, foodType, amount, status }) => {
        const isCompleted = status === 'completed';
        const isPending = status === 'pending';

        return (
            <TouchableOpacity style={[
                styles.card,
                isCompleted && styles.completedCard,
                isPending && styles.pendingCard,
            ]}
                activeOpacity={0.8}
                onPress={() => { alert('수정') }}
            >
                <View>
                    <Text style={styles.meal}>{meal}</Text>
                    <Text style={styles.desc}>{foodType} • {amount}</Text>
                </View>
                <View style={[
                    styles.badge,
                    isCompleted && styles.completedBadge,
                    isPending && styles.pendingBadge,
                ]}>
                    <Text style={[
                        styles.badgeText,
                        isCompleted && styles.completedText,
                        isPending && styles.pendingText,
                    ]}>
                        {status == 'completed' ? '완료' : '예정'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }


    return (
        <ScrollView style={gs.screen}>
            <AppCalendar selected={daySelected} setSelected={(day) => daySelectHandle(day)} />

                <View style={{ marginTop: scale(30) }}>
                    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.calTitle}>{kor}</Text>
                        <TouchableOpacity style={styles.mealPlus} onPress={()=>{alert('추가')}}>
                            <AntDesign name='pluscircle' style={{color: COLORS.primary, fontSize: scale(20)}}/>
                        </TouchableOpacity>
                    </View>
                    <MealStatusListComponent list={mealStatus} />
                </View>

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
