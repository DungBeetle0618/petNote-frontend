import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';
import DatePicker from 'react-native-date-picker';

export default function TimePicker({ label, value, onChange, selectTime, maximumTime, ...props }) {
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(value ? new Date(value) : new Date());

    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={[
                    styles.input,
                    { justifyContent: 'center' },
                ]}
                onPress={() => setOpen(true)}
                activeOpacity={0.7}
            >
                <Text style={{ color: selectTime ? '#333' : '#999' }}>
                    {selectTime ? selectTime  : '시간 선택'}
                </Text>
            </TouchableOpacity>

            <DatePicker
                modal
                mode="time"
                open={open}
                date={time}
                locale="ko"
                title="날짜/시간 선택"
                maximumDate={maximumTime} // 미래 선택 방지
                confirmText="확인"
                cancelText="취소"
                onConfirm={(selectedDate) => {
                    setOpen(false);
                    setTime(selectedDate);

                    const tt = String(selectedDate.getHours()).padStart(2, '0');
                    const MM = String(selectedDate.getMinutes()).padStart(2, '0');

                    onChange( `${tt}:${MM}`);
                }}
                onCancel={() => setOpen(false)}
                {...props}
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
        color: MODAL_COLORS.text,
    },
});
