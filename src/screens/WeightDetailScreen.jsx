import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Modal, Pressable } from "react-native";
import dayjs from "dayjs";
import { AppButton, AppCalendar, BottomModal } from "../components/common";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from 'react-native-vector-icons/Ionicons';
import gs from '../assets/styles/globalStyles';
import WeightAddModal from "../components/petManage/WeightAddModal";

const WeightDetailScreen = () => {
    const [weightData, setWeightData] = useState([
        { date: "2025-10-28", weight: 12.0, type: 'kg', note: "산책량 많음" },
        { date: "2025-11-01", weight: 12.3, type: 'kg', note: "사료 교체" },
        { date: "2025-11-06", weight: 12.7, type: 'kg', note: "간식 과다 섭취" },
        { date: "2025-11-10", weight: 12.6, type: 'kg', note: "" },
    ]);

    // 날짜 선택
    const [daySelected, setDaySelected] = useState(dayjs().format('YYYY-MM-DD'));
    const kor = useMemo(() => dayjs(daySelected).format('YYYY년 MM월 DD일'), [daySelected]);

    const selectedRecord = weightData.find((d) => d.date === daySelected); //선택한 날짜의 데이터
    const idx = weightData.findIndex((d) => d.date === daySelected);
    const diff =
        idx > 0 ? Number(weightData[idx].weight) - Number(weightData[idx - 1].weight) : null;

    const selectedMonth = daySelected
        ? dayjs(daySelected).format("YYYY-MM")
        : dayjs().format("YYYY-MM");

    // 몸무게 월 평균
    const monthlyAvg = useMemo(() => {
        const monthData = weightData.filter((d) => d.date.startsWith(selectedMonth));
        if (monthData.length === 0) return null;
        const avg =
            monthData.reduce((sum, d) => sum + Number(d.weight), 0) / monthData.length;
        return avg.toFixed(1);
    }, [selectedMonth, weightData]);


    // 수정/삭제 선택 모달
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [modiData, setModiData] = useState(null);

    const handleSubmit = () => {
        console.log('몸무게:', data);
        setOpen(false);
    };
    

    return (
        <ScrollView style={gs.screen}>
            <AppCalendar
               selected={daySelected}
                setSelected={setDaySelected}
                data={weightData}
                valueKey={'weight'}
            />
            {monthlyAvg && (
                <View style={{ alignItems: "center", marginVertical: 20 }}>
                    <Text style={{ color: "#666" }}>
                        {`${dayjs(selectedMonth).format('YYYY년 MM월')} 평균: ${monthlyAvg} kg`}
                    </Text>
                </View>
            )}
            

            {selectedRecord ? (
                <View style={styles.detailBox}>
                    <View style={styles.moreView}>
                        <Text style={styles.dateText}>
                            {kor}
                        </Text>
                        <TouchableOpacity onPress={()=>{setOpen(true)}} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                            <Ionicons name='ellipsis-vertical' style={{fontSize: 18}} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.weightView}>
                        <Text style={styles.weightText}>{selectedRecord.weight} {selectedRecord.type}</Text>

                        {diff !== null && (
                            <Text
                                style={[
                                    styles.diffText,
                                    {
                                        color:
                                            diff > 0 ? "#E74C3C" : diff < 0 ? "#2980B9" : "#444",
                                    },
                                ]}
                            >
                                {diff > 0
                                    ? `▲ ${diff.toFixed(1)}kg 증가`
                                    : diff < 0
                                        ? `▼ ${Math.abs(diff).toFixed(1)}kg 감소`
                                        : "변화 없음"}
                            </Text>
                        )}
                    </View>

                    <View style={styles.noteBox}>
                        <View>
                            <Text style={styles.noteLabel}><FontAwesome5Icon name="book-open" /> 메모</Text>
                        </View>
                        <Text style={styles.noteContent}>
                            {selectedRecord.note || "메모 없음"}
                        </Text>
                    </View>
                </View>
            ) : (
                <View>
                    <Text style={{ marginTop: 40, textAlign: "center", color: "#999" }}>
                        날짜를 선택하세요
                    </Text>
                    <AppButton title={'몸무게 입력하기'} onPress={()=>{setModiData(null); setVisible(true);}} style={{marginTop: 50}} />
                </View>
            )}

            {/* 편집/삭제 선택 */}
            <BottomModal visible={open} onClose={()=>setOpen(false)} >
                <View style={{paddingBlock: 25, alignItems: 'center'}}>
                    <Pressable style={styles.menuBtn} onPress={()=>{setOpen(false); setVisible(true); setModiData(selectedRecord)}}><Text style={{textAlign: 'center'}}>편집</Text></Pressable>
                    <View style={gs.bar}/>
                    <Pressable style={styles.menuBtn} onPress={()=>{alert('삭제'); setOpen(false);}}><Text style={{textAlign: 'center'}}>삭제</Text></Pressable>
                </View>
            </BottomModal>

            <WeightAddModal visible={visible} onClose={()=>setVisible(false)} onSubmit={()=>handleSubmit} modiData={modiData} day={kor}  />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    detailBox: {
        backgroundColor: "#FDF8F3",
        paddingHorizontal: 16,
        paddingBlock: 25,
        borderRadius: 12,
        marginTop: 20,
    },
    dateText: { 
        fontSize: 14, 
        fontWeight: "600", 
        color: "#444" 
    },
    weightText: { 
        fontSize: 22, 
        fontWeight: "bold", 
    },
    diffText: { 
        fontSize: 14, 
        marginLeft: 10, 
        fontWeight: "500" 
    },
    noteBox: { marginTop: 20 },
    noteLabel: { fontWeight: "bold", marginBottom: 6 },
    noteContent: { color: "#444", marginBottom: 8 },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
    },
    saveBtn: {
        backgroundColor: "#FF6600",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },

    weightView: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 20
    },
    moreView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    menuBtn: {
        marginBlock: 8,
        width: '70%',
    }

    
});

export default WeightDetailScreen;
