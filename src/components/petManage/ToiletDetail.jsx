import React, { useState, useEffect, useMemo } from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
} from 'react-native';
import gs, { COLORS, PX_SIZE } from '../../assets/styles/globalStyles';
import FullModal from '../common/FullModal';
import dayjs from 'dayjs';
import { AppCalendar } from '../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToiletStatusCard from './ToiletStatusCard';
import ToiletAddModal from './ToiletAddModal';

const ToiletDetail = ({ visible, onClose, title }) => {
    const [daySelected, setDaySelected] = useState(dayjs().format('YYYY-MM-DD'));

    //추가, 수정 모달
    const [open, setOpen] = useState(false);
    const [modiData, setModiData] = useState(null);

    const handleSubmit = () => {
        console.log('배변량:', data);
        setOpen(false);
    };

    const kor = useMemo(() => dayjs(daySelected).format('YYYY년 MM월 DD일'), [daySelected]);

    const toiletStatus = [
        { toiletDate: '2026-11-26', toiletTime: '8:30', memo: '특이사항 없음.', toiletType: '01', typeName: '대변' },
        { toiletDate: '2026-11-26', toiletTime: '9:00', memo: '', toiletType: '02', typeName: '소변' },
        { toiletDate: '2026-11-26', toiletTime: '14:30', memo: '오늘 양이 쫌 많음', toiletType: '01', typeName: '대변' },
    ]

    const StoolStatusCard = ({ list, text }) => {
        return (
            list.length > 0 ? list.map((item, key) => {
                return (
                    <ToiletStatusCard key={key} item={item} setOpen={setOpen} setModiData={setModiData} />
                )
            })
                :
                <Text style={styles.noLogs}>{text}</Text>
        )
    }

    const daySelectHandle = (day) => {
        setDaySelected(day);
    }

    /**
     * 상태 초기화
     */
    const resetStates = () => {
        setDaySelected(dayjs().format('YYYY-MM-DD'));
        setModiData(null);
    }
    const handleClosed = () => {
        resetStates();
        onClose();
    }

    return (
        <FullModal visible={visible} onClose={handleClosed} title={title} >
            <View style={styles.container}>
                <AppCalendar selected={daySelected} setSelected={(day) => daySelectHandle(day)} />

                <View style={{ marginTop: 40 }}>
                    <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.calTitle}>{kor}</Text>
                        <TouchableOpacity
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                            onPress={() => { setModiData(null); setOpen(true); }}
                        >
                            <AntDesign name='pluscircle' style={{ color: COLORS.primary, fontSize: 22 }} />
                        </TouchableOpacity>
                    </View>
                    <StoolStatusCard list={toiletStatus} text={'배변로그를 기록해보세요.'} />
                </View>
            </View>

            {/* 추가/수정 모달 */}
            <ToiletAddModal visible={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} modiData={modiData} day={kor} selectDay={daySelected} />
        </FullModal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        paddingHorizontal: PX_SIZE.lg, 
        paddingVertical: 20,
    },
    calTitle: {
        fontSize: 16,
        fontWeight: 600,
    },
    noLogs: {
        color: COLORS.textSecondary,
        marginBlock: 20,
        textAlign: 'center'
    }


});

export default ToiletDetail;
