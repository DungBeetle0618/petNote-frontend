import React, { useState, useEffect } from 'react';
import {
    Modal,
    Pressable,
    View,
    Animated,
    StyleSheet,
    ScrollView,
    Text,
} from 'react-native';
import gs, { COLORS, MODAL_COLORS } from '../../assets/styles/globalStyles';
import Feather from 'react-native-vector-icons/Feather';

const FullModal = ({ visible, onClose, title, children }) => {
    const maxHeight = '100%';

    return (
        <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
            <Pressable style={styles.overlay} onPress={onClose} />
            <Animated.View style={[styles.sheetContainer, { height: maxHeight }]}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Pressable
                            style={styles.backBtn}
                            onPress={onClose}
                        >
                            <Feather name="arrow-left" style={{ color: '#000', fontSize: 28 }} />
                        </Pressable>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View>{children}</View>
                </ScrollView>
            </Animated.View>
        </Modal>
    );
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
        backgroundColor: MODAL_COLORS.background,
        shadowColor: MODAL_COLORS.primary,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: -6 },
        shadowRadius: 12,
        elevation: 10,
    },
    header: {
        alignItems: 'center',
        paddingBlock: 16,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    }, 
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        textAlign: 'center',
        // marginTop: 10,
        // marginBottom: 18,
    },
    backBtn: {
        position: 'absolute',
        top: 16,
        left: 10
    }


});

export default FullModal;
