import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import gs, { COLORS, PX_SIZE } from '../../assets/styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppCalendar from '../common/AppCalendar';
import MealsAddModal from './MealsAddModal';
import dayjs from 'dayjs';
import MealStatusCard from './MealStatusCard';
import FullModal from '../common/FullModal';

const MealsDetail = ({ visible, onClose, title }) => {
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

    const MealStatusListComponent = ({ list, text = '식사로그를 기록해보세요.' }) => {
        return (
            list.length > 0 ? list.map((item, key) => {
                return (<MealStatusCard key={key} item={item} setOpen={setOpen} setModiData={setModiData} />)
            })
                :
                <Text style={styles.noLogs}>{text}</Text>
        )
    }

    /**
     * 상태 초기화
     */
    const resetStates = () => {
        setDaySelected(dayjs().format('YYYY-MM-DD'));
        setModiData(null);
    }
    const handleClosed = () => {
        resetStates();
        onClose();
    }

    return (
        <FullModal visible={visible} onClose={handleClosed} title={title} >
            <View style={styles.container}>
                <AppCalendar selected={daySelected} setSelected={(day) => daySelectHandle(day)} />

                <View style={{ marginTop: 40 }}>
                    <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.calTitle}>{kor}</Text>
                        <TouchableOpacity
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                            onPress={() => { setModiData(null); setOpen(true); }}
                        >
                            <AntDesign name='pluscircle' style={{ color: COLORS.primary, fontSize: 22 }} />
                        </TouchableOpacity>
                    </View>
                    <MealStatusListComponent list={mealStatus} />
                </View>
            </View>

            {/* 추가/수정 모달 */}
            <MealsAddModal visible={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} modiData={modiData} day={kor} />

        </FullModal>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        paddingHorizontal: PX_SIZE.lg,
        paddingVertical: 30,
    },
    calTitle: {
        fontSize: 16,
        fontWeight: 600,
    },
    noLogs: {
        color: COLORS.textSecondary,
        marginBlock: 20,
        textAlign: 'center'
    }

});

export default MealsDetail;
