import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import { BottomModal, AppInput, AppSelect, AppButton, AppDropdown } from './common';

const WeightAddModal = ({visible, onClose, onSubmit, modiData, day }) => {
    const [data, setData] = useState({
        weight: '',
        type: ''
    });

    useEffect(() => {
        if (!visible) {
            setData({
                weight: '',
                type: ''
            });
        } else {
            if(modiData) {
                setData(modiData);
            }
        }
    }, [visible]);

    const handleChange = (key, value) => setData(prev => ({ ...prev, [key]: value }));

    const handleSubmit = () => {
        if (!data.weight.trim()) return alert('몸무게를 입력해주세요.');
        onSubmit(data);
        onClose();
    };

    return (

        < BottomModal visible={visible} onClose={onClose} >
            <Text style={styles.modalTitle}>{day?day:'오늘의 몸무게'}</Text>

            <AppInput
                label={'몸무게'}
                keyboardType="numeric"
                value={data.weight}
                onChangeText={(v) => handleChange('weight', v)}
            />
            <AppDropdown 
                label={'g/kg'}
                data={[{label: 'g', value: 'g'}, {label: 'kg', value: 'kg'}]}
                value={data.type}
                onChange={(v) => handleChange('type', v)}
            />

            <AppButton title={modiData ? '수정하기' : '추가하기'} onPress={handleSubmit} />
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

export default WeightAddModal;
