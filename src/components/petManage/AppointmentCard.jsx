import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import gs, { COLORS } from '../../assets/styles/globalStyles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ImageBackground } from 'react-native/types_generated/index';

const AppointmentCard = ({ data }) => {
    
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                {/* <FontAwesome6 name="hospital" size={20} color="#333" /> */}
                <Image source={{uri: 'https://picsum.photos/id/237/200/300'}} style={{width: 50, height: 50, backgroundColor: '#eee', borderRadius: 25}} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.hospitalName}>{data.hospital}</Text>
                    <Text style={styles.time}>{data.time}</Text>
                </View>
            </View>

            {data.vaccine && (
                <Text style={styles.vaccineTag}>💉 {data.vaccine}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F9F7FF',
        padding: 18,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E6E0FF',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hospitalName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#333',
    },
    time: {
        fontSize: 13,
        color: '#444',
        marginTop: 2,
    },
    vaccineTag: {
        backgroundColor: '#EDE7FF',
        alignSelf: 'flex-start',
        marginTop: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontSize: 12,
        borderRadius: 10,
        color: '#4A2EFF',
        fontWeight: '600',
    },

});

export default AppointmentCard;
