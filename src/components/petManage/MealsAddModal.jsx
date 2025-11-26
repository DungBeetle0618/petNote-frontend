import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import gs, { COLORS } from '../../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import { BottomModal, AppInput, AppSelect, AppButton } from '../common';
import DatePicker from 'react-native-date-picker';
import TimePicker from '../common/TimePicker';

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
    const onChange = (value) => handleChange('pendingTime', value);

    const handleSubmit = () => {
        if (!data.meal.trim()) return alert('식사종류를 입력해주세요.');
        if (!data.foodType.trim()) return alert('음식종류를 입력해주세요.');
        onSubmit(data);
        onClose();
    };

    return (

        < BottomModal visible={visible} onClose={onClose} >
            <View style={{padding: 24}}>
                <Text style={styles.modalTitle}>{day?day:'오늘의 기록'}</Text>

                <AppSelect
                    label={'식사종류'}
                    options={[{code: '0001', korName: '아침'}, {code: '0002', korName: '점심'}, {code: '0003', korName: '저녁'}, {code: '0004', korName: '아침 간식'}, {code: '0005', korName: '점심 간식'}, {code: '0006', korName: '저녁 간식'}]}
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
                    placeholder={'숫자만 입력해주세요'}
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
                    options={[{code: 'C', korName: '완료'}, {code: 'P', korName: '예정'}]}
                    selected={data.status}
                    onSelect={(v) => handleChange('status', v)}
                />
                {
                    data.status === "P" && (
                        <TimePicker label="예정 시간" onChange={onChange} selectTime={data.pendingTime}  />
                    )
                }

                <AppButton title={modiData ? '수정하기' : '추가하기'} onPress={handleSubmit} />
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                    <Text style={styles.cancelText}>닫기</Text>
                </TouchableOpacity>
            </View>
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
