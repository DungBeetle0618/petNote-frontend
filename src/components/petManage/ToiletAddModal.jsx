import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import gs, { COLORS, MODAL_COLORS } from '../../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import { BottomModal, AppInput, AppSelect, AppButton, AppDropdown, AppTextArea } from '../common';
import DateTimePicker from '../common/DateTimePicker';

const ToiletAddModal = ({ visible, onClose, onSubmit, modiData, day }) => {

    const [data, setData] = useState({
        toiletDate: '',
        toiletTime: '',
        toiletType: '',
        memo: ''
    });

    useEffect(() => {
        if (!visible) {
            setData({
                toiletDate: '',
                toiletTime: '',
                toiletType: '',
                memo: ''
            });
        } else {
            if (modiData) {
                setData(modiData);
            }
        }
    }, [visible]);

    const handleChange = (key, value) => setData(prev => ({ ...prev, [key]: value }));

    const onChange = (key, value) => {
        if(key == "date") handleChange("toiletDate", value);
        if(key == "time") handleChange("toiletTime", value);
    }

    const handleSubmit = () => {
        if (!data.toiletDate.trim()) return alert('날짜/시간을 입력해주세요.');
        onSubmit(data);
        onClose();
    };

    return (

        < BottomModal visible={visible} onClose={onClose} >
            <View style={{ padding: 24 }}>
                <Text style={styles.modalTitle}>{day ? day : '오늘의 기록'}</Text>

                <AppSelect
                    label="종류"
                    options={[{ code: '01', korName: '대변' }, { code: '02', korName: '소변' }]}
                    selected={data.toiletType}
                    onSelect={(v) => handleChange('toiletType', v)}
                />

                <DateTimePicker 
                    label="날짜/시간" 
                    onChange={onChange} 
                    selectDate={data.toiletDate} 
                    selectTime={data.toiletTime}
                />

                <AppTextArea
                    label={'메모'}
                    value={data.memo}
                    onChangeText={(v) => handleChange('memo', v)}
                />

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
    },


});

export default ToiletAddModal;
