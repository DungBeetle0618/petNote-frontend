import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

const DayWalkCard = ({ item, index, isFirst, isLast }) => {
    const convertToAmPm = (timeStr) => {
        const [hourStr, minute] = timeStr.split(':');
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        return `${hour}:${minute} ${ampm}`;
    };

    const calcDuration = (startStr, endStr) => {
        const [sh, sm] = startStr.split(':').map(Number);
        const [eh, em] = endStr.split(':').map(Number);
        const start = sh * 60 + sm;
        const end = eh * 60 + em;
        let diff = end - start;
        if (diff < 0) diff += 24 * 60;

        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        return hours > 0
            ? `${hours}시간 ${minutes > 0 ? `${minutes}분` : ''}`
            : `${minutes}분`;
    };

    const startAmPm = convertToAmPm(item.start);
    const duration = calcDuration(item.start, item.end);

    const hour = parseInt(item.start.split(':')[0]);
    let icon, color, label;
    if (hour >= 5 && hour < 12) {
        icon = <Feather name="sun" size={20} color="#FDB813" />;
        color = '#fff9ef';
        label = '아침 산책';
    } else if (hour >= 12 && hour < 18) {
        icon = <Ionicons name="paw-outline" size={20} color="#FF914D" />;
        color = '#fff4ec';
        label = '오후 산책';
    } else {
        icon = <Feather name="moon" size={20} color="#5B5EA6" />;
        color = '#f3f5ff';
        label = '저녁 산책';
    }

    return (
        <View style={styles.timelineRow}>
            {/* 왼쪽 라인 (road) */}
            <View style={[styles.lineContainer, isFirst && { marginTop: 16 }, isLast && { marginBottom: 25 }]}>
                {!isFirst && <View style={styles.lineTop} />}
                <View style={styles.iconCircle}>{icon}</View>
                {!isLast && <View style={styles.lineBottom} />}
            </View>

            {/* 오른쪽 산책 카드 */}
            <View style={[styles.walkCard, { backgroundColor: '#fff' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontWeight: '600', marginBottom: 4 }}>{label}</Text>
                        <Text style={{ fontSize: 13, color: '#555' }}>
                            {startAmPm} • {item.steps} steps
                        </Text>
                    </View>
                </View>
                <Text style={{ fontSize: 13, fontWeight: '500', color: '#333' }}>
                    {duration}
                </Text>
            </View>
        </View>
    );
};


const ActivityComponent = () => {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [totalSteps, setTotalSteps] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(0);

    const walkData = [
        { start: '7:30', end: '7:55', steps: '2800' },
        { start: '15:00', end: '16:00', steps: '5563' },
        { start: '20:30', end: '21:35', steps: '7460' },
    ];

    // ✅ 총 걸음수 / 총 시간 계산
    useEffect(() => {
        let stepsSum = 0;
        let minutesSum = 0;

        walkData.forEach((walk) => {
            // steps 합계
            stepsSum += parseInt(walk.steps, 10);

            // 시간 차이 계산
            const [sh, sm] = walk.start.split(':').map(Number);
            const [eh, em] = walk.end.split(':').map(Number);
            const start = sh * 60 + sm;
            const end = eh * 60 + em;
            let diff = end - start;
            if (diff < 0) diff += 24 * 60;
            minutesSum += diff;
        });

        setTotalSteps(stepsSum);

        // 시:분 변환
        setTotalMinutes(minutesSum);
    }, [walkData]);

    // 총 산책시간 형식 변환
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const totalTimeString = () => {
        if (totalHours > 0) {
            return (
                <>
                    {totalHours}
                    <Text style={{ fontSize: 13, color: '#333' }}> 시간   </Text>
                    {remainingMinutes > 0 && (
                        <>
                            {remainingMinutes}
                            <Text style={{ fontSize: 13, color: '#333' }}> 분</Text>
                        </>
                    )}
                </>
            );
        } else {
            return (
                <>
                    {remainingMinutes}
                    <Text style={{ fontSize: 13, color: '#333' }}>분</Text>
                </>
            );
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <View style={[gs.flexRow, { alignItems: 'center' }]}>
                    <Feather name="activity" style={styles.titleIcon} />
                    <View>
                        <Text style={styles.title}>오늘의 활동</Text>
                        <Text style={styles.subTitle}>오늘의 산책 기록을 확인하세요</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setOpen(true)} style={styles.calendar}>
                    <FontAwesome name="calendar" style={{ fontSize: 20, color: '#381600ff' }} />
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 40 }}>

                <Text style={{ marginBottom: 16, fontWeight: 700, fontSize: 16 }}>
                    오늘은 이만큼 산책했어요!
                </Text>

                <View style={styles.statsRow}>
                    <View style={[styles.statCard, {backgroundColor: '#fffbe9ff',}]}>
                        <View style={styles.iconBox}>
                            <Image
                                source={require('../assets/images/icon/dogwalk.png')}
                                style={styles.iconImage}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.statTitle}>총 걸음수</Text>
                        <Text style={styles.statValue}>
                            {totalSteps.toLocaleString()}
                            <Text style={styles.statUnit}> 걸음</Text>
                        </Text>
                    </View>

                    <View style={[styles.statCard, {backgroundColor: '#fff7f7ff',}]}>
                        <View style={styles.iconBox}>
                            <Image
                                source={require('../assets/images/icon/walktime.png')}
                                style={styles.iconImage}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.statTitle}>총 산책시간</Text>
                        <Text style={styles.statValue}>{totalTimeString()}</Text>
                    </View>
                </View>


                <View style={{ marginTop: 40 }}>
                    <Text style={{ marginBottom: 16, fontWeight: 700, fontSize: 16 }}>
                        오늘은 {walkData.length}번 산책했어요 <FontAwesome name='paw' style={{fontSize:16}} />
                    </Text>
                    
                    {walkData.map((item, index) => (
                        <DayWalkCard
                            item={item}
                            index={index}
                            key={index}
                            isFirst={index === 0}
                            isLast={index === walkData.length - 1}
                        />
                    ))}
                    {
                        walkData.length==0 && 
                            <Text style={{color: '#777', textAlign: 'center', marginBlock: 20}}>
                                우리아이가 산책을 기다려요 <Feather name='frown' style={{fontSize: 14}} />
                            </Text>
                    }
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: COLORS.sub,
        borderRadius: 20,
        padding: 20,
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        verticalAlign: 'middle',
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
    },
    subTitle: {
        fontSize: 12,
    },

    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCard: {
        width: '48%',
        padding: 14,
        justifyContent: 'center',
        // backgroundColor: '#fdf8e2',
        borderRadius: 100,
        paddingVertical: 18,
        // shadowColor: '#000',
        // shadowOpacity: 0.05,
        // shadowRadius: 5,
        // elevation: 2,
    },
    iconBox: {
        marginBottom: 10,
    },
    iconImage: {
        width: 50,
        height: 50,
    },
    statTitle: {
        fontSize: 13,
        color: '#555',
        marginBottom: 5,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    statUnit: {
        fontSize: 13,
        color: '#555',
        fontWeight: '400',
    },


    walkCard: {
        borderRadius: 20,
        // borderWidth: 2,
        // borderColor: '#FFD8B0',
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginLeft: 10,
        // backgroundColor: '#fff9f2ff'

        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,

        width: '85%'
    },



    timelineRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    lineContainer: {
        width: 36,
        alignItems: 'center',
    },
    lineTop: {
        flex: 1,
        width: 2,
        backgroundColor: '#ececec',
    },
    lineBottom: {
        flex: 1,
        width: 2,
        backgroundColor: '#ececec',
    },
    iconCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ddd',
        marginVertical: 4,
        // shadowColor: '#000',
        // shadowOpacity: 0.08,
        // shadowRadius: 3,
        // elevation: 2,
    },

});

export default ActivityComponent;
