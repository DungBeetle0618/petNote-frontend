import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import gs, { COLORS, MODAL_COLORS } from '../../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import { BottomModal, AppInput, AppSelect, AppButton, AppDropdown, AppTextArea, AppRadioButton } from '../common';
import DateTimePicker from '../common/DateTimePicker';

const ReminderAddModal = ({ visible, onClose, onSubmit, modiData, selectDay, petList }) => {

    const [check, setCheck] = useState(false);

    const [errorTitle, setErrorTitle] = useState('');
    const [errorDate, setErrorDate] = useState('');
    // const [errorPet, setErrorPet] = useState('');

    const [data, setData] = useState({
        petNo: '',
        scheduleDate: '',
        scheduleTime: '',
        scheduleType: '',
        title: '',
        contents: '',
        remindYn: 'N',
        repeatType: 'NONE',
        placeNo: ''
    });

    useEffect(() => {
        if (!visible) {
            setData({
                petNo: '',
                scheduleDate: '',
                scheduleTime: '',
                scheduleType: '',
                title: '',
                contents: '',
                remindYn: 'N',
                repeatType: 'NONE',
                placeNo: ''
            });
        } else {
            if (modiData) {
                setData(modiData);
                console.log(modiData)
            }
        }
    }, [visible]);

    const handleChange = (key, value) => setData(prev => ({ ...prev, [key]: value }));

    const onChange = (key, value) => {
        setErrorDate('');
        if(key == "date") handleChange("scheduleDate", value);
        if(key == "time") handleChange("scheduleTime", value);
    }

    const handleSubmit = () => {
        if (!data.title.trim()) { setErrorTitle('제목은 필수입니다.'); return;}
        if (!data.scheduleDate.trim()) { setErrorDate('날짜/시간 선택은 필수입니다.'); return;}
        onSubmit(data);
        onClose();
    };

    return (

        < BottomModal visible={visible} onClose={onClose} >
            <View style={{ padding: 24 }}>
                {/* <Text style={styles.modalTitle}>{day}</Text> */}

                <AppInput
                    label="제목"
                    value={data.title}
                    onChangeText={v => {setErrorTitle(''); handleChange('title', v);}}
                    error={errorTitle} 
                 />

                <DateTimePicker 
                    label="날짜/시간" 
                    onChange={onChange} 
                    selectDate={data.scheduleDate} 
                    selectTime={data.scheduleTime}
                    value={selectDay}
                    error={errorDate}
                />

                <AppDropdown
                    label="반려동물"
                    data={petList.map(o => ({ label: o.petName, value: o.petNo }))}
                    value={data.petNo}
                    onChange={(v) => {
                        // setErrorPet("");
                        handleChange('petNo', v)
                    }}
                    // isSearch={true}
                    // error={errorPet}
                />

                <AppSelect
                    label="종류"
                    options={[{ code: '01', korName: '병원' }, { code: '02', korName: '산책' }, { code: '03', korName: '미용' }, { code: '04', korName: '기타'}]}
                    selected={data.scheduleType}
                    onSelect={(v) => handleChange('scheduleType', v)}
                />

                <AppTextArea
                    label="메모"
                    value={data.contents}
                    onChangeText={(v) => handleChange('contents', v)}
                />

                <View style={{marginBottom: 20}}/>

                <AppRadioButton
                    label="알림여부"
                    value={check}
                    onPress={() => setCheck(prev => prev=="Y"?"N":"Y")}
                    onChange={(v) => {handleChange('remindYn', v); setCheck(v)}}
                />  

                {data.remindYn=="Y" && (
                    <AppSelect
                        label="반복주기"
                        options={[{ code: 'NONE', korName: '없음' }, { code: 'DAILY', korName: '매일' }, { code: 'WEEKLY', korName: '매주' }, { code: 'MONTHLY', korName: '매달' }, { code: 'YEARLY', korName: '매년' } ]}
                        selected={data.repeatType}
                        onSelect={(v) => handleChange('repeatType', v)}
                    />
                )}
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

export default ReminderAddModal;
