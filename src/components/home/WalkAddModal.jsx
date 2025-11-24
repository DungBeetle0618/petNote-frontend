import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import gs, { COLORS } from '../../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import { BottomModal, AppInput, AppSelects, AppButton } from '../common';


const WalkAddModal = ({visible, onClose, onSubmit, day }) => {
    const [data, setData] = useState({
        petList: [], // 배열로 변경
    });

    const handleChange = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        onSubmit(data);
        onClose();
    };

    return (
        <BottomModal visible={visible} onClose={onClose}>
            <View style={{padding: 24}}>
                <Text style={styles.modalTitle}>{day?day:'함께 산책할 동물'}</Text>
                <AppSelects
                    options={[
                        {code: '0001', title: '토리'},
                        {code: '0002', title: '아치'},
                        {code: '0003', title: '???'},
                    ]}
                    selected={data.petList}
                    onSelect={(v) => handleChange('petList', v)}
                />
                <AppButton title={'산책 시작'} onPress={handleSubmit} />
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                    <Text style={styles.cancelText}>닫기</Text>
                </TouchableOpacity>
            </View>
        </BottomModal>
    )
};

const styles =  StyleSheet.create({
    cancelBtn: { paddingVertical: 8 },
    cancelText: { textAlign: 'center', color: '#999' },
    modalTitle: {
        marginBottom: scale(28),
        fontSize: 18,
        fontWeight: 500
    }
})

export default WalkAddModal;