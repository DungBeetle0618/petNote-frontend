import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import gs, { COLORS } from '../../assets/styles/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { BottomModal, AppInput, AppSelect, AppButton } from '../common';
import { useNavigation } from '@react-navigation/native';
import { convertToAmPm } from '../../assets/js/common';
import ToiletAddModal from './ToiletAddModal';

const ToiletComponent = () => {
    const navigation = useNavigation();

    //추가, 수정 모달
    const [open, setOpen] = useState(false);
    const [modiData, setModiData] = useState(null);

    const handleSubmit = (data) => {
         console.log('배변량 :', data);
        setOpen(false);
    };

    const mealStatus = [
        { day: '2026-11-26', time: '8:30', memo: '특이사항 없음.', type: '01', typeName: '대변'  },
        { day: '2026-11-26', time: '9:00', memo: '', type: '02', typeName: '소변'  },
        { day: '2026-11-26', time: '14:30', memo: '오늘 양이 쫌 많음', type: '01', typeName: '대변'  },
    ]

    const MealStatusListComponent = ({ list, text }) => {
        return (
            list.length > 0 ? list.map((item, key) => {
                return (
                    <View key={key} style={[styles.stoolItem, item.type == '02' ? styles.urineItem : styles.fecalItem ]}>
                        <Text style={styles.stoolTime}>{convertToAmPm(item.time)}</Text>
                        <Text style={styles.stoolSub}>{item.typeName} • {item.memo ? item.memo : '메모 없음'}</Text>
                    </View>
                )
            })
                :
                <Text style={styles.noLogs}>{text}</Text>
        )
    }


    return (
        <>
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <View style={[gs.flexRow, { alignItems: 'center' }]}>
                        <FontAwesome6 name='droplet' style={styles.titleIcon} />
                        <View>
                            <Text style={styles.title}>배변량</Text>
                            <Text style={styles.subTitle}>소화 건강을 살펴보세요</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('mealsDetail', { headerTitle: '배변 기록' })}
                        style={styles.calendar}
                    >
                        <FontAwesome name='calendar' style={{ fontSize: 20, color: '#381600ff' }} />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={[styles.stoolBox, {backgroundColor: '#fff7ed'}]}>
                        <Text style={styles.stoolCountTitle}>Today</Text>
                        <Text style={styles.stoolCount}>2</Text>
                    </View>
                    <View style={styles.stoolBox}>
                        <Text style={styles.stoolCountTitle}>이번주</Text>
                        <Text style={styles.stoolCount}>14</Text>
                    </View>
                    <View style={styles.stoolBox}>
                        <Text style={styles.stoolCountTitle}>일평균</Text>
                        <Text style={styles.stoolCount}>2.0</Text>
                    </View>
                </View>

                <View style={{ marginTop: 40 }}>
                    <MealStatusListComponent list={mealStatus} text='오늘은 아직인가요?' />
                </View>

                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={() => { setModiData(null); setOpen(true); }}>
                        <Text style={styles.addBtnText}>배변로그 기록</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {/* 추가/수정 모달 */}
            <ToiletAddModal visible={open} onClose={()=>setOpen(false)} onSubmit={handleSubmit} modiData={modiData} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: COLORS.sub,
        borderRadius: 20,
        padding: 20
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleIcon: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 10,
        fontSize: 20,
        color: '#fff',
        marginRight: 10,
        width: 45,
        height: 45,
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    title: {
        fontSize: 16,
        fontWeight: 600
    },
    subTitle: {
        fontSize: 12,
    },
    addBtn: {
        width: '100%',
        paddingBlock: 8,
        backgroundColor: COLORS.primary,
        borderRadius: 20
    },
    addBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 700
    },
    noLogs: {
        color: COLORS.textSecondary,
        marginBlock: 20,
        textAlign: 'center'
    },

    stoolBox: {
        width: '31%',
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#fafafa',
        alignItems: 'center'
    },
    stoolCountTitle: {
        fontSize: 12,
        color: '#333'
    },
    stoolCount: {
        marginTop: 8,
        fontWeight: 500,
        fontSize: 18
    },
    stoolItem: {
        paddingBlock: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 10,
        // elevation: 2,
        // backgroundColor: '#fff'
        borderWidth: 1
    },
    fecalItem: {
        backgroundColor: '#F3FFF6',
        borderColor: '#D7F5E0',
    },
    urineItem: {
        backgroundColor: '#FFF8F2',
        borderColor: '#FFE1C4',
    },
    stoolTime: {
        fontSize: 15,
        fontWeight: 500
    },
    stoolSub: {
        fontSize: 13,
        color: '#333',
        marginTop: 6
    }

});

export default ToiletComponent;
