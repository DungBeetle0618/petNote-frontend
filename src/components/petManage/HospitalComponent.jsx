import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import gs, { COLORS } from '../../assets/styles/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BottomModal, AppInput, AppSelect, AppButton } from '../common';
import { useNavigation } from '@react-navigation/native';
import AppointmentCard from './AppointmentCard';
import HospitalRecord from './HospitalRecord';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const HospitalComponent = () => {
    const navigation = useNavigation();

    const [currentIndex, setCurrentIndex] = useState(0);
    const rightAnim = useRef(new Animated.Value(0)).current;

    const bounce = (anim, direction = 1) => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(anim, {
                    toValue: 5 * direction,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(anim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    useEffect(() => {
        bounce(rightAnim, 1);   // 오른쪽 화살표 → 방향으로 흔들림
    }, [currentIndex]);


    // 예시 데이터 삽입
    const hospitalData = [
        {
            id: "apt_001",
            hospital: "해피동물병원",
            time: "14:30",
            vaccine: "종합백신 3차"
        }
    ];

    const recordList = [
        {
            id: "diary_001",
            date: "2025-11-12",
            hospital: "해피동물병원",
            memo: "알러지 반응, 귀 청소 필요.",
            symptoms: ["가려움", "발바닥 붉음"]
        },
        {
            id: "diary_002",
            date: "2025-11-08",
            hospital: "펫케어의료센터",
            memo: "정기 검진, 체중 증가",
            symptoms: ["체중증가"]
        }
    ];


    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <View style={[gs.flexRow, { alignItems: 'center' }]}>
                    <FontAwesome name='stethoscope' style={styles.titleIcon} />
                    <View>
                        <Text style={styles.title}>진료 일기</Text>
                        <Text style={styles.subTitle}>병원 진료 기록을 작성해보세요</Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('calendar')}
                    style={styles.calendar}
                >
                    <FontAwesome name='calendar' style={{ fontSize: 20, color: '#381600ff' }} />
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30 }}>
                <Text style={{ marginBottom: 16, fontWeight: 700, fontSize: 16 }}>
                    오늘의 진료 일정
                </Text>
                {!hospitalData || hospitalData.length == 0
                    ? (
                        <View style={styles.emptyBox}>
                            <Text style={styles.emptyText}>오늘 예정된 진료가 없어요.</Text>
                        </View>
                    )
                    :
                    hospitalData.map((item, index) => (
                        <AppointmentCard data={item} key={index} />
                    ))
                }
            </View>

            <View style={{ marginTop: 40 }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Text style={{ marginBottom: 16, fontWeight: 700, fontSize: 16 }}>
                        최근 진료 기록
                    </Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { alert('전체보기') }}>
                        <Text style={{ color: '#777' }}>
                            전체보기
                        </Text>
                    </TouchableOpacity>
                </View>

                {!recordList || recordList.length == 0
                    ? (
                        <View style={styles.emptyBox}>
                            <Text style={styles.emptyText}>등록된 진료 기록이 없어요.</Text>
                        </View>
                    )
                    :
                    (
                        <View style={{ height: 160, position: 'relative' }} >
                            <Swiper
                                showsPagination={false}
                                loop={false}
                                onIndexChanged={(idx) => setCurrentIndex(idx)}
                            >
                                {recordList.map((item, index) => (
                                    <View key={index} style={{ width: width * 0.83, paddingLeft: 4 }} >
                                        <HospitalRecord data={item} />
                                    </View>
                                ))}
                            </Swiper>
                            {
                                currentIndex !== recordList.length - 1 && (
                                    <Animated.View
                                        style={[
                                            styles.arrowRight,
                                            { transform: [{ translateX: rightAnim }] }
                                        ]}
                                    >
                                        <FontAwesome name="angle-right" size={28} color="#ccc" />
                                    </Animated.View>
                                )
                            }
                        </View>
                    )
                }
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: COLORS.sub,
        borderRadius: 20,
        padding: 20
    },

    /* Title Layout */
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

    emptyBox: {
        padding: 20,
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EEE',
        alignItems: 'center',
    },
    emptyText: {
        color: '#777',
        fontSize: 13,
    },

    arrowRight: {
        position: 'absolute',
        right: 0,
        top: 60,
        opacity: 0.4,
        zIndex: 20,
    },

});


export default HospitalComponent;
