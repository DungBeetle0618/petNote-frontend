import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';

export default function AppDatePicker({ label, value, onChange, maximumDate }) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(value ? new Date(value) : new Date());

    return (
        <View style={styles.inputGroup}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
                <Text style={{ color: value ? MODAL_COLORS.text : MODAL_COLORS.placeholder }}>
                    {value || '날짜 선택'}
                </Text>
            </TouchableOpacity>

            <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                locale="ko"
                maximumDate={new Date()} // 미래 선택 방지
                confirmText="확인"
                cancelText="취소"
                title="생일 선택"
                onConfirm={(selectedDate) => {
                    setOpen(false);
                    setDate(selectedDate);
                    const yyyy = selectedDate.getFullYear();
                    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
                    const dd = String(selectedDate.getDate()).padStart(2, '0');
                    onChange?.(`${yyyy}-${mm}-${dd}`);
                }}
                onCancel={() => setOpen(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputGroup: { marginBottom: 12 },
    label: { fontSize: 14, color: MODAL_COLORS.label, marginBottom: 6 },
    input: {
        borderWidth: 1,
        borderColor: MODAL_COLORS.border,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: MODAL_COLORS.background,
        fontSize: 14,
        justifyContent: 'center',
    },
});
