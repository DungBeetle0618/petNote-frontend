import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import gs, { COLORS } from '../../assets/styles/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { convertToAmPm } from '../../assets/js/common';
import ToiletAddModal from './ToiletAddModal';
import ToiletDetail from './ToiletDetail';
import ToiletStatusCard from './ToiletStatusCard';

const ToiletComponent = () => {

    //추가, 수정 모달
    const [open, setOpen] = useState(false);
    const [modiData, setModiData] = useState(null);

    const [detailOpen, setDetailOpen] = useState(false);

    const handleSubmit = (data) => {
         console.log('배변량 :', data);
        setOpen(false);
    };

    const toiletStatus = [
        { toiletDate: '2026-11-26', toiletTime: '8:30', memo: '특이사항 없음.', toiletType: '01', typeName: '대변'  },
        { toiletDate: '2026-11-26', toiletTime: '9:00', memo: '', toiletType: '02', typeName: '소변'  },
        { toiletDate: '2026-11-26', toiletTime: '14:30', memo: '오늘 양이 쫌 많음', toiletType: '01', typeName: '대변'  },
    ]

    const StoolStatusCard = ({ list, text }) => {
        return (
            list.length > 0 ? list.map((item, key) => {
                return (
                    <ToiletStatusCard key={key} item={item} setOpen={setOpen} setModiData={setModiData}/>
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
                    <TouchableOpacity onPress={() => setDetailOpen(true) }
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
                    <StoolStatusCard list={toiletStatus} text='오늘은 아직인가요?' />
                </View>

                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={() => { setModiData(null); setOpen(true); }}>
                        <Text style={styles.addBtnText}>배변로그 기록</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {/* 추가/수정 모달 */}
            <ToiletAddModal visible={open} onClose={()=>setOpen(false)} onSubmit={handleSubmit} modiData={modiData} />
            <ToiletDetail visible={detailOpen} onClose={()=>setDetailOpen(false)} title={'배변 기록'} />
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
    

});

export default ToiletComponent;
