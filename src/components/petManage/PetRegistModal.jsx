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
} from '../common';
import DatePicker from 'react-native-date-picker';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';
import { getCommonCode } from '../../api/common';

export default function PetRegistModal({ visible, onClose, onSubmit, modiData }) {
    const [speciesOptions, setSpeciesOptions] = useState([]);
    const [breedOptions, setBreedOptions] = useState([]);
    
    // 종 구분
    const getSpeciesType = async() => {
        try {
            const {data} = await getCommonCode('BREED_TYPE', 'SPECIES');
            if(data.result === 'SUCCESS') {
                setSpeciesOptions(data.list);
            }
            console.log(speciesOptions);
        } catch(e) {
            console.log(e);
        }
    }
    
    // 품종 구분
    const getBreedType = async(species) => {
        try {
            const {data} = await getCommonCode('BREED_TYPE', species);
            if(data.result === 'SUCCESS') {
                setBreedOptions(data.list);
            }
            console.log(breedOptions);
        } catch(e) {
            console.log(e);
        }
    }

    const [data, setData] = useState({
        name: '',
        age: '',
        birth: '',
        birthKnowYn: false,
        gender: '',
        neuterYn: '',
        species: '',
        speciesCode: '',
        breed: '',
        breedCode: '',
        breedEtc: '',
        remark: '',
        profileImg: null,
        length: ''
    });

    useEffect(() => {
        if (!visible) {
            setData({
                name: '',
                age: '',
                birth: '',
                birthKnowYn: false,
                gender: '',
                neuterYn: '',
                species: '',
                breed: '',
                breedEtc: '',
                remark: '',
                profileImg: null,
                length: ''
            });
            setDisabled(false);
            setShowDatePicker(false);
        } else {
            getSpeciesType();
            if(modiData) {
                setData(modiData);
            }
        }
    }, [visible]);

    useEffect(()=>{
        handleChange('breedCode', '');
        if (!data.speciesCode) {
            setBreedOptions([]);
            return;
        }
        getBreedType(data.speciesCode);
    }, [data.speciesCode])


    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(data.birth ? new Date(data.birth) : new Date());
    const [disabled, setDisabled] = useState(data.birthKnowYn);

    const handleChange = (key, value) => setData(prev => ({ ...prev, [key]: value }));

    const handleSubmit = () => {
        if (!data.name.trim()) return alert('이름을 입력해주세요 🐶');
        onSubmit(data);
        onClose();
    };

    return (
        <BottomModal visible={visible} onClose={onClose} title="🐾 동물 정보" maxHeight='85%'>
            <View style={{paddingHorizontal: 24, paddingBottom: 24}}>
                <AppInput label="이름" value={data.name} onChangeText={v => handleChange('name', v)} />

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

                <AppInput 
                    label="몸길이"
                    value={data.length}
                    onChangeText={v => handleChange('length', v)}
                />

                <AppSelect
                    label="성별"
                    options={[{code: 'M', korName: '남'}, {code: 'F', korName: '여'}]}
                    selected={data.gender}
                    onSelect={(v) => handleChange('gender', v)}
                />

                <AppSelect
                    label="중성화 여부"
                    options={[{code: 'Y', korName: '예'}, {code: 'N', korName: '아니오'}]}
                    selected={data.neuterYn}
                    onSelect={(v) => handleChange('neuterYn', v)}
                />

                <AppSelect
                    label="품종1 (동물종)"
                    options={speciesOptions}
                    selected={data.speciesCode}
                    onSelect={(v) => handleChange('speciesCode', v)}
                />

                {data.speciesCode && (
                    <AppDropdown
                        label="품종2 (세부종)"
                        data={breedOptions.map(o => ({ label: o.korName, value: o.code }))}
                        value={data.breedCode}
                        onChange={(v) => handleChange('breedCode', v)}
                        isSearch={true}
                        />
                )}

                {data.breedCode === '9999' && (
                    <AppInput
                        label="기타 품종"
                        value={data.breedEtc}
                        onChangeText={(v) => handleChange('breedEtc', v)}
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

                <AppButton title={modiData ? '수정하기' : '등록하기'} onPress={handleSubmit} />
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                    <Text style={styles.cancelText}>닫기</Text>
                </TouchableOpacity>
            </View>
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