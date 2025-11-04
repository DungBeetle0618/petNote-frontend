import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    ScrollView,
    Image,
    Animated,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';


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

    const [translateY] = useState(new Animated.Value(400));

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(data.birth ? new Date(data.birth) : new Date());

    React.useEffect(() => {
        Animated.timing(translateY, {
            toValue: visible ? 0 : 400,
            duration: visible ? 250 : 200,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const breedOptions = {
        강아지: ['말티즈', '푸들', '시바견', '리트리버', '시츄', '포메라니안', '기타'],
        고양이: ['러시안블루', '페르시안', '먼치킨', '스코티시폴드', '기타'],
        기타: ['기타'],
    };

    const handleChange = (key, value) => setData(prev => ({ ...prev, [key]: value }));

    const handleSelectImage = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, res => { 
            if (res?.didCancel || res?.errorCode) 
                return; 
            
            const uri = res?.assets?.[0]?.uri; 
            if (uri) handleChange('profileImg', uri); });
    };

    const handleSubmit = () => {
        if (!data.petName.trim()) return alert('이름을 입력해주세요 🐶');
        onSubmit(data);
        onClose();
    };

    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
            <Pressable style={styles.overlay} onPress={onClose} />

            <Animated.View style={[styles.sheetContainer, { transform: [{ translateY }] }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>🐾 동물 정보 등록</Text>

                    <Input label="이름" value={data.petName} onChangeText={v => handleChange('petName', v)} />
                    <Input label="나이" value={data.age} onChangeText={v => handleChange('age', v)} keyboardType="numeric" />
                    {/* <Input label="생일 (YYYY-MM-DD)" value={data.birth} onChangeText={v => handleChange('birth', v)} /> */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>생일</Text>
                        <TouchableOpacity
                            style={[styles.input, { justifyContent: 'center' }]}
                            onPress={() => setShowDatePicker(true)}
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

                    <TouchableOpacity onPress={() => {
                            handleChange('birthKnowYn', !data.birthKnowYn); 
                            if(!data.birthKnowYn) handleChange('birth', ''); 
                            setShowDatePicker(false);}
                        } 
                        style={styles.checkboxRow}
                    >
                        <View style={[styles.checkbox, data.birthKnowYn && styles.checkboxActive]} />
                        <Text style={styles.checkboxLabel}>생일 모름</Text>
                    </TouchableOpacity>

                    <Select label="성별" options={['수컷', '암컷']} selected={data.gender} onSelect={v => handleChange('gender', v)} />
                    <Select label="중성화 여부" options={['예', '아니오']} selected={data.neuterYn} onSelect={v => handleChange('neuterYn', v)} />

                    <Select label="품종1 (동물종)" options={Object.keys(breedOptions)} selected={data.breedType1} onSelect={v => {
                        handleChange('breedType1', v);
                        handleChange('breedType2', '');
                        handleChange('breed', '');
                    }} />

                    {data.breedType1 ? (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>품종2 (세부종)</Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                search
                                searchPlaceholder="품종을 검색하세요"
                                data={breedOptions[data.breedType1].map(o => ({ label: o, value: o }))}
                                labelField="label"
                                valueField="value"
                                placeholder="선택하세요"
                                value={data.breedType2}
                                onChange={item => handleChange('breedType2', item.value)}
                            />
                        </View>
                    ) : null}

                    {data.breedType2 === '기타' && (
                        <Input label="기타 품종" value={data.breed} onChangeText={v => handleChange('breed', v)} />
                    )}

                    <Input label="특이사항" value={data.remark} onChangeText={v => handleChange('remark', v)} multiline />

                    <Text style={styles.label}>대표 사진</Text>
                    <TouchableOpacity style={styles.imagePicker} onPress={handleSelectImage}>
                        {data.profileImg ? (
                            <Image source={{ uri: data.profileImg }} style={styles.profileImg} />
                        ) : (
                            <Text style={{ color: '#777777' }}>사진 선택하기</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                        <Text style={styles.submitText}>등록하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                        <Text style={styles.cancelText}>닫기</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Animated.View>
        </Modal>
    );
}

// 🧩 하위 컴포넌트
const Input = ({ label, ...props }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} placeholder={label} {...props} />
    </View>
);

const Select = ({ label, options, selected, onSelect }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.selectRow}>
            {options.map(o => (
                <TouchableOpacity
                    key={o}
                    style={[styles.selectBox, selected === o && styles.selectBoxActive]}
                    onPress={() => onSelect(o)}
                >
                    <Text style={[styles.selectText, selected === o && styles.selectTextActive]}>{o}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);


const COLORS = {
    primary: '#FF6600',      
    secondary: '#FF9E40',    
    lightBorder: '#FFD8B0',  
    background: '#FFF8F0',   
    textPrimary: '#FF6600',  
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    sheetContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        maxHeight: '85%',
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: -6 },
        shadowRadius: 12,
        elevation: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 18,
    },
    inputGroup: { marginBottom: 12 },
    label: { fontSize: 14, color: '#555', marginBottom: 6 },
    input: {
        borderWidth: 1,
        borderColor: COLORS.lightBorder,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: '#FFFFFF',
        fontSize: 14,
        color: '#333',
        shadowColor: COLORS.lightBorder,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    checkbox: {
        width: 18, height: 18,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        marginRight: 8,
    },
    checkboxActive: { backgroundColor: COLORS.secondary },
    checkboxLabel: { color: '#555' },
    selectRow: { flexDirection: 'row', flexWrap: 'wrap' },
    selectBox: {
        borderWidth: 1,
        borderColor: COLORS.lightBorder,
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 14,
        marginRight: 8,
        marginBottom: 6,
        backgroundColor: '#FFF3E0',
    },
    selectBoxActive: { backgroundColor: COLORS.primary + '22', borderColor: COLORS.primary },
    selectText: { color: '#555', fontSize: 14 },
    selectTextActive: { color: COLORS.primary, fontWeight: '600' },
    dropdown: {
        height: 48,
        borderColor: COLORS.lightBorder,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        backgroundColor: '#fff',
    },
    placeholderStyle: { fontSize: 14, color: '#999' },
    selectedTextStyle: { fontSize: 14, color: '#333' },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
        color: '#333',
        borderBottomWidth: 0.5,
        borderColor: COLORS.lightBorder,
    },
    imagePicker: {
        height: 120,
        borderWidth: 1,
        borderColor: COLORS.lightBorder,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        shadowColor: COLORS.lightBorder,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    profileImg: { width: '100%', height: '100%' },
    submitBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        paddingVertical: 12,
        marginTop: 8,
    },
    submitText: {
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
    },
    cancelBtn: { paddingVertical: 8 },
    cancelText: { textAlign: 'center', color: '#999' },
});
