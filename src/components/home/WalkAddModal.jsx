import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import gs, { COLORS } from '../../assets/styles/globalStyles';
import { BottomModal, AppInput, AppSelect, AppButton } from '../common';


const WalkAddModal = ({visible, onClose, onSubmit }) => {
    return (
        <BottomModal visible={visible} onClose={onClose}>
            <Text style={styles.modalTitle}>{day?day:'오늘의 기록'}</Text>
            <AppSelect
                label={'함께 산책할 동물'}
                options={[{code: '0001', title: '아침'}, {code: '0002', title: '점심'}, {code: '0003', title: '저녁'}, {code: '0004', title: '아침 간식'}, {code: '0005', title: '점심 간식'}, {code: '0006', title: '저녁 간식'}]}
                selected={data.meal}
                onSelect={(v) => handleChange('meal', v)}
            />
        </BottomModal>
    )
};