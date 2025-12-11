import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert
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
import { insertPet, updatePet, deletePet } from '../../api/pet';
import { useNavigation } from '@react-navigation/native';

export default function PetRegistModal({ visible, onClose, onSubmit, modiData }) {
    const navigation = useNavigation();

    const [speciesOptions, setSpeciesOptions] = useState([]);
    const [breedOptions, setBreedOptions] = useState([]);
    const initialSpeciesLoad = useRef(true); // 첫 로드에서는 breedCode를 비우지 않는다

    //valid 체크
    const [errorName, setErrorName] = useState('');
    const [errorSpecies, setErrorSpecies] = useState('');
    const [errorBreed, setErrorBreed] = useState('');
    const [errorEtc, setErrorEtc] = useState('');
    const nameRef = useRef(null);
    const etcRef = useRef(null);
    
    // 종 구분 api 호출
    const getSpeciesType = async() => {
        try {
            const {data} = await getCommonCode('BREED_TYPE', 'SPECIES');
            if(data.result === 'SUCCESS') {
                setSpeciesOptions(data.list);
            }
        } catch(e) {
            console.log(e);
        }
    }
    
    // 품종 구분 api 호출
    const getBreedType = async(species) => {
        try {
            const {data} = await getCommonCode('BREED_TYPE', species);
            if(data.result === 'SUCCESS') {
                // if(species === 'ETC') data.list = [{code: '9999', korName: '기타'}]
                setBreedOptions(data.list);
            }
        } catch(e) {
            console.log(e);
        }
    }

    // 초기값
    const initialData = {
        petName: '',
        petInfo: '',
        birth: '',
        birthKnowYn: 'Y',
        gender: '',
        neutrificationYn: '',
        speciesType: '',
        breedType: '',
        breed: '',
        remark: '',
        profileImg: null,
        bodyLength: ''
    }

    const [petData, setPetData] = useState(initialData);

    useEffect(() => {
        if (!visible) {
            //초기화
            setPetData(initialData);
            setDisabled(false);
            setShowDatePicker(false);
            setErrorName('');
            setErrorSpecies('');
            setErrorBreed('');
            setErrorEtc('');

            initialSpeciesLoad.current = true;
        } else {
            if(modiData) {
                setPetData(modiData);
            }
        }
    }, [visible]);

    //종 옵션 리스트
    useEffect(()=>{
        getSpeciesType();
    }, [])

    //품종 옵션 리스트
    useEffect(()=>{
        if (!petData.speciesType) {
            setBreedOptions([]);
            return;
        }
        if (initialSpeciesLoad.current) {
            // 첫 렌더에서는 기존 값 유지
            initialSpeciesLoad.current = false;
        } else {
            handleChange('breedType', '');
        }
        getBreedType(petData.speciesType);
    }, [petData.speciesType])


    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(petData.birth ? new Date(petData.birth) : new Date());
    const [disabled, setDisabled] = useState(petData.birthKnowYn == 'Y' ? false : true);

    const [mainImg, setMainImg] = useState(null);

    const handleChange = (key, value) => setPetData(prev => ({ ...prev, [key]: value }));

    // 제출
    const handleSubmit = async () => {
        //validation 체크
        if (!petData.petName.trim()) {
            setErrorName('이름은 필수입니다.');
            nameRef.current?.focus(); 
            return;
        }
        if (!petData.speciesType.trim()) {
            setErrorSpecies('동물종 선택은 필수입니다.');
            return;
        }
        if ((petData.speciesType && petData.speciesType != 'ETC') && !petData.breedType.trim()) {
            setErrorBreed('세부종 선택은 필수입니다.');
            return;
        }
        if ((petData.breedType === '9999' || petData.speciesType === 'ETC') && !petData.breed.trim()) {
            setErrorEtc('기타 품종 입력은 필수입니다.');
            etcRef.current?.focus(); 
            return;
        }
        else {

            let formData = new FormData();
            Object.entries(petData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            if(mainImg) {
                formData.append("uploadFile", {
                    uri: mainImg.uri,
                    type: mainImg.type,
                    name: mainImg.name
                });
            }

            

            //add API 호출
            try{
                let res;
                if(modiData) {
                    const { data } = await updatePet(formData);
                    res = data; 
                } else {
                    const { data } = await insertPet(formData);
                    res = data;
                }
                if (res.result === "SUCCESS") {
                    onSubmit(petData);
                }
            } catch (e) {
                alert("등록/수정 실패");
                console.log(e);
            }
            onClose();
        }
    };

    /**
     * 펫 삭제
     */
    const onDelete = () => {
        Alert.alert(
            'PetNote',
            '정말 삭제하시겠습니까?',
            [
                { text: '확인', onPress: () => { 
                    callDeletePetApi();
                }, style: 'default' },
                { text: '취소', onPress: () => { }, style: 'cancel' },
            ],
            {
                cancelable: true,
                onDismiss: () => { }
            }
        )
    }

    const callDeletePetApi = async() => {
        try {
            const {data} = await deletePet(modiData.petNo);
            if(data.result === 'SUCCESS') {
               onClose();
               Alert.alert('삭제되었습니다.');
               navigation.navigate('PetselectScreen');
            }
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <BottomModal visible={visible} onClose={onClose} title="동물 정보" maxHeight='85%'>
            <View style={{paddingHorizontal: 24, paddingBottom: 24}}>
                <AppInput label="이름" value={petData.petName} onChangeText={v => {
                    setErrorName('');
                    handleChange('petName', v);
                }} 
                    error={errorName} 
                    ref={nameRef}
                />
                <AppInput label="한마디" value={petData.petInfo} onChangeText={v => handleChange('petInfo', v)} placeholder='반려동물에 대한 한마디를 적어주세요' />

                {/* <AppInput
                    label="나이"
                    value={petData.age}
                    onChangeText={v => handleChange('age', v)}
                    keyboardType="numeric"
                /> */}

                <View style={styles.inputGroup}>
                    <View style={styles.rowLabel}>
                        <Text style={styles.label}>생일</Text>

                        <TouchableOpacity
                            onPress={() => {
                                const next = petData.birthKnowYn=="Y" ? "N" : "Y";
                                setDisabled(next=='Y' ? false : true);
                                handleChange('birthKnowYn', next);

                                if (next) {
                                    handleChange('birth', '');
                                    setShowDatePicker(false);
                                }
                            }}
                            style={styles.checkboxRow}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.checkbox, (petData.birthKnowYn=="N") && styles.checkboxActive]} />
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
                        <Text style={{ color: petData.birth ? '#333' : '#999' }}>
                            {petData.birth ? petData.birth : '날짜 선택'}
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
                    value={petData.bodyLength}
                    onChangeText={v => handleChange('bodyLength', v)}
                />

                <AppSelect
                    label="성별"
                    options={[{code: 'M', korName: '남'}, {code: 'F', korName: '여'}]}
                    selected={petData.gender}
                    onSelect={(v) => handleChange('gender', v)}
                />

                <AppSelect
                    label="중성화 여부"
                    options={[{code: 'Y', korName: '예'}, {code: 'N', korName: '아니오'}]}
                    selected={petData.neutrificationYn}
                    onSelect={(v) => handleChange('neutrificationYn', v)}
                />

                <AppSelect
                    label="품종1 (동물종)"
                    options={speciesOptions}
                    selected={petData.speciesType}
                    onSelect={(v) => {
                        setErrorSpecies("");
                        handleChange('speciesType', v)
                    }}
                    error={errorSpecies} 
                />

                {(petData.speciesType && petData.speciesType != 'ETC') && (
                    <AppDropdown
                        label="품종2 (세부종)"
                        data={breedOptions.map(o => ({ label: o.korName, value: o.code }))}
                        value={petData.breedType}
                        onChange={(v) => {
                            setErrorBreed("");
                            handleChange('breedType', v)
                        }}
                        isSearch={true}
                        error={errorBreed} 
                    />
                )}

                {(petData.breedType === '9999' || petData.speciesType === 'ETC') && (
                    <AppInput
                        label="기타 품종"
                        value={petData.breed}
                        onChangeText={(v) => {
                            setErrorEtc('');
                            handleChange('breed', v)
                        }}
                        error={errorEtc} 
                        ref={etcRef}
                    />
                )}

                <AppTextArea
                    label="특이사항"
                    value={petData.remark}
                    onChangeText={(v) => handleChange('remark', v)}
                />

                <AppImagePicker
                    label="대표 사진"
                    value={petData.profileImg}
                    onChange={(v) => { setMainImg(v); handleChange('profileImg', v.uri); }}
                />

                { modiData && (
                    <TouchableOpacity style={{marginBlock: 10, padding: 8, width: 80, display: 'flex', alignSelf: 'flex-end'}} 
                        onPress={onDelete}>
                        <Text style={{textAlign: 'right', color: '#555'}}>삭제하기</Text>
                    </TouchableOpacity>
                )}
            
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
