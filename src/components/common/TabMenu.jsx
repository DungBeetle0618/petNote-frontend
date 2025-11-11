import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';
import BoldTextN from '../font/BoldText_n';
import { scale } from 'react-native-size-matters';


const TabMenu = ({onPressHandler, menuList, activeTab}) => {

  return (
    <View style={styles.div}>
      {menuList.map(name => (
        <Pressable key={name} style={styles.divFlex} onPress={() => onPressHandler(name)}>
            <Text style={[ styles.buttonBox, activeTab === name && styles.buttonBoxActive]}>{name}</Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
    div: {
        flexDirection: 'row',
        backgroundColor: '#f3e8ff',
        borderRadius: 10,
        height: 33,
        marginBottom:20,

    },
    divFlex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonBox: {
        width: '90%',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        textAlign: 'center',
        lineHeight: 25,
        fontSize: 12,
        fontWeight: 400
    },
    buttonBoxActive: {
        backgroundColor: '#fff',
    }
});

export default TabMenu;