import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, MODAL_COLORS } from '../../assets/styles/globalStyles';

const AppRadioToggle = ({ label, value, onChange, error }) => {
    return (
        <View style={styles.inputGroup}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TouchableOpacity
                onPress={() => onChange(value == "Y" ? "N" : "Y")}
                activeOpacity={0.8}
            >
                <View
                    style={[
                        styles.toggle,
                        value == "Y" && styles.toggleActive,
                        error && styles.errorBorder,
                    ]}
                >
                    <View
                        style={[
                            styles.knob,
                            value == "Y" && styles.knobActive,
                        ]}
                    />
                </View>
            </TouchableOpacity>

            {error && <Text style={styles.errorMessage}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    label: {
        fontSize: 14,
        color: '#555',
    },

    toggle: {
        width: 46,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#E0E0E0',
        padding: 3,
        justifyContent: 'center',
        marginLeft: 20
    },

    toggleActive: {
        backgroundColor: COLORS.primary,
    },

    knob: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#8A8A8A',
        alignSelf: 'flex-start',
    },

    knobActive: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-end',
    },

    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },

    errorBorder: {
        borderWidth: 1,
        borderColor: 'red',
    },
});

export default AppRadioToggle;
