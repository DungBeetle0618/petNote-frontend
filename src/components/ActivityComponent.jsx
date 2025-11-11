import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const ActivityComponent = () => {
    const navigation = useNavigation();

    const [open, setOpen] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <View style={[gs.flexRow, { alignItems: 'center' }]}>
                    <Feather name='activity' style={styles.titleIcon} />
                    <View>
                        <Text style={styles.title}>오늘의 활동</Text>
                        <Text style={styles.subTitle}>아 하기싫어</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setOpen(true)} style={styles.calendar}>
                    <FontAwesome name='calendar' style={{ fontSize: 20, color: '#381600ff' }} />
                </TouchableOpacity>
            </View>

            <View style={{marginTop: 40}}>
                <View>
                    <Text>하루 총 걸음수, 총 산책시간</Text>
                </View>
                <View>
                    <Text>산책 별 시간, 걸음수</Text>
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

});

export default ActivityComponent;
