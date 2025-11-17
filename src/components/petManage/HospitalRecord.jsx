import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import gs, { COLORS } from '../../assets/styles/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get("window");

const HospitalRecord = ({ data, onPressItem }) => {

    return (
        <TouchableOpacity
            style={styles.diaryCard}
            onPress={() => onPressItem()}
        >
            <Text style={styles.recordDate}>{data.date}</Text>
            <Text style={styles.recordHospital}>{data.hospital}</Text>
            <Text numberOfLines={2} style={styles.recordMemo}>{data.memo}</Text>

            <View style={styles.tags}>
                {data.symptoms?.map((s, idx) => (
                    <Text key={idx} style={styles.tag}>#{s}</Text>
                ))}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    diaryCard: {
        height: 140,
        padding: 16,
        borderRadius: 14,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F2F2F2',
        marginRight: 30
    },
    recordDate: {
        fontSize: 12,
        color: '#888',
        marginBottom: 2,
    },
    recordHospital: {
        fontSize: 15,
        fontWeight: '700',
        color: '#222',
    },
    recordMemo: {
        fontSize: 13,
        color: '#555',
        marginTop: 6,
        lineHeight: 18,
    },

    /* Tag Chips */
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    tag: {
        backgroundColor: '#F7F3FF',
        color: '#6A4DFF',
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderRadius: 8,
        fontSize: 11,
        marginRight: 6,
        marginBottom: 6,
        overflow: 'hidden',
    },

});

export default HospitalRecord;
