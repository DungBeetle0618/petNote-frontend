import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {
    BottomModal,
    AppInput,
    AppSelect,
    AppDatePicker,
    AppDropdown,
    AppTextArea,
    AppImagePicker,
    AppButton,
} from '../components/common';
import DatePicker from 'react-native-date-picker';
import { MODAL_COLORS } from '../assets/styles/globalStyles';

export default function PetRegistModal({ visible, onClose, onSubmit }) {
    const [data, setData] = useState({
        petName: '',
        age: '',
        birth: '',
        birthKnowYn: false,
        gender: '',
        neuterYn: '',
        breedType1: '',
        breedType2: '',
        breed: '',
        remark: '',
        profileImg: null,
    });

    useEffect(() => {
        if (!visible) {
            setData({
                petName: '',
                age: '',
                birth: '',
                birthKnowYn: false,
                gender: '',
                neuterYn: '',
                breedType1: '',
                breedType2: '',
                breed: '',
                remark: '',
                profileImg: null,
            });
            setDisabled(false);
            setShowDatePicker(false);
        }
    }, [visible]);

    const breedOptions = {
        DOG: [{code: '0000', title: '말티즈'}, {code: '0001', title: '푸들'}, {code: '0002', title: '시바견'}, {code: '0003', title: '리트리버'}, {code: '0004', title: '시츄'}, {code: '0005', title: '포메라니안'}, {code: '0006', title: '기타'},],
        CAT: [{code: '0000', title: '러시안블루'}, {code: '0001', title: '페르시안'}, {code: '0002', title: '먼치킨'}, {code: '0003', title: '스코티시폴드'}, {code: '0004', title: '기타'}],
        ETC: [{code: '0000', title: '기타'}],
    };

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(data.birth ? new Date(data.birth) : new Date());
    const [disabled, setDisabled] = useState(data.birthKnowYn);

    const handleChange = (key, value) => setData(prev => ({ ...prev, [key]: value }));

    const handleSubmit = () => {
        if (!data.petName.trim()) return alert('이름을 입력해주세요 🐶');
        onSubmit(data);
        onClose();
    };

    return (
        <BottomModal visible={visible} onClose={onClose} title="🐾 동물 정보 등록" maxHeight='85%'>
            <AppInput label="이름" value={data.petName} onChangeText={v => handleChange('petName', v)} />

            <AppInput
                label="나이"
                value={data.age}
                onChangeText={v => handleChange('age', v)}
                keyboardType="numeric"
            />

            <View style={styles.inputGroup}>
                <View style={styles.rowLabel}>
                    <Text style={styles.label}>생일</Text>

                    <TouchableOpacity
                        onPress={() => {
                            const next = !data.birthKnowYn;
                            setDisabled(next);
                            handleChange('birthKnowYn', next);

                            if (next) {
                                handleChange('birth', '');
                                setShowDatePicker(false);
                            }
                        }}
                        style={styles.checkboxRow}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.checkbox, data.birthKnowYn && styles.checkboxActive]} />
                        <Text style={styles.checkboxLabel}>생일 모름</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[
                        styles.input,
                        { justifyContent: 'center' },
                        disabled && { backgroundColor: '#f2f2f2' },
                    ]}
                    onPress={() => !disabled && setShowDatePicker(true)}
                    activeOpacity={disabled ? 1 : 0.7}
                >
                    <Text style={{ color: data.birth ? '#333' : '#999' }}>
                        {data.birth ? data.birth : '날짜 선택'}
                    </Text>
                </TouchableOpacity>

                {
                    showDatePicker && <DatePicker
                        modal
                        mode="date"
                        open={showDatePicker}
                        date={date}
                        locale="ko"
                        maximumDate={new Date()} // 미래 선택 방지
                        confirmText="확인"
                        cancelText="취소"
                        title="생일 선택"
                        onConfirm={(selectedDate) => {
                            setShowDatePicker(false);
                            setDate(selectedDate);
                            const yyyy = selectedDate.getFullYear();
                            const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
                            const dd = String(selectedDate.getDate()).padStart(2, '0');
                            handleChange('birth', `${yyyy}-${mm}-${dd}`);
                        }}
                        onCancel={() => setShowDatePicker(false)}

                    />
                }
            </View>

            <AppSelect
                label="성별"
                options={[{code: 'M', title: '수컷'}, {code: 'F', title: '암컷'}]}
                selected={data.gender}
                onSelect={(v) => handleChange('gender', v)}
            />

            <AppSelect
                label="중성화 여부"
                options={[{code: 'Y', title: '예'}, {code: 'N', title: '아니오'}]}
                selected={data.neuterYn}
                onSelect={(v) => handleChange('neuterYn', v)}
            />

            <AppSelect
                label="품종1 (동물종)"
                options={[{code: 'DOG', title: '강아지'}, {code: 'CAT', title: '고양이'}, {code: 'ETC', title: '기타'}]}
                selected={data.breedType1}
                onSelect={(v) => handleChange('breedType1', v)}
            />

            {data.breedType1 && (
                <AppDropdown
                    label="품종2 (세부종)"
                    data={breedOptions[data.breedType1].map(o => ({ label: o.title, value: o.code }))}
                    value={data.breedType2}
                    onChange={(v) => handleChange('breedType2', v)}
                    isSearch={true}
                    />
            )}

            {data.breedType2 === '기타' && (
                <AppInput
                    label="기타 품종"
                    value={data.breed}
                    onChangeText={(v) => handleChange('breed', v)}
                />
            )}

            <AppTextArea
                label="특이사항"
                value={data.remark}
                onChangeText={(v) => handleChange('remark', v)}
            />

            <AppImagePicker
                label="대표 사진"
                value={data.profileImg}
                onChange={(v) => handleChange('profileImg', v)}
            />

            <AppButton title="등록하기" onPress={handleSubmit} />
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>닫기</Text>
            </TouchableOpacity>
        </BottomModal>
    );
}

const styles = StyleSheet.create({
    rowLabel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    checkbox: {
        width: 18, height: 18,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        marginRight: 8,
    },
    checkboxActive: { backgroundColor: '#FF6600' },
    checkboxLabel: { color: '#555' },
    cancelBtn: { paddingVertical: 8 },
    cancelText: { textAlign: 'center', color: '#999' },
    inputGroup: { marginBottom: 12 },
    label: { fontSize: 14, color: '#555', marginBottom: 6 },
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
})