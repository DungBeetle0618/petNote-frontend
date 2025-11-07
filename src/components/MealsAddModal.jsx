import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import { BottomModal, AppInput, AppSelect, AppButton } from './common';

const MealsAddModal = ({visible, onClose, onSubmit, modiData, day }) => {
    const [data, setData] = useState({
        meal: '',
        foodType: '',
        amount: '',
        calorie: '',
        status: '',
        pendingTime: '',
    });

    useEffect(() => {
        if (!visible) {
            setData({
                meal: '',
                foodType: '',
                amount: '',
                calorie: '',
                status: '',
                pendingTime: '',
            });
        } else {
            if(modiData) {
                setData(modiData);
            }
        }
    }, [visible]);

    const handleChange = (key, value) => setData(prev => ({ ...prev, [key]: value }));

    const handleSubmit = () => {
        if (!data.meal.trim()) return alert('식사종류를 입력해주세요.');
        if (!data.foodType.trim()) return alert('음식종류를 입력해주세요.');
        onSubmit(data);
        onClose();
    };

    return (

        < BottomModal visible={visible} onClose={onClose} >
            <Text style={styles.modalTitle}>{day?day:'오늘의 기록'}</Text>

            <AppSelect
                label={'식사종류'}
                options={['아침', '점심', '저녁', '아침 간식', '점심 간식', '저녁 간식']}
                selected={data.meal}
                onSelect={(v) => handleChange('meal', v)}
            />
            <AppInput
                label={'음식종류'}
                placeholder={'건식사료, 습식사료'}
                value={data.foodType}
                onChangeText={(v) => handleChange('foodType', v)}
            />
            <AppInput
                label={'식사량 (g)'}
                value={data.amount}
                onChangeText={(v) => handleChange('amount', v)}
            />
            <AppInput
                label={'칼로리'}
                value={data.calorie}
                onChangeText={(v) => handleChange('calorie', v)}
            />
            <AppSelect
                label={'식사 완료 여부'}
                options={['완료', '예정']}
                selected={data.status}
                onSelect={(v) => handleChange('status', v)}
            />
            {
                data.status === "예정" && (
                    <AppInput
                        label={'예정 시간 (리마인더로 알려드려요!)'}
                        placeholder={'시간picker 필요'}
                    />
                )
            }

            <AppButton title={'추가하기'} onPress={handleSubmit} />
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>닫기</Text>
            </TouchableOpacity>
        </ BottomModal >

    );
};

const styles = StyleSheet.create({
    cancelBtn: { paddingVertical: 8 },
    cancelText: { textAlign: 'center', color: '#999' },
    modalTitle: {
        marginBottom: scale(28),
        fontSize: 18,
        fontWeight: 500
    }

});

export default MealsAddModal;
