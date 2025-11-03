/**
 * 동물정보 카드
 */
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    ImageBackground
} from 'react-native';
import gs, { COLORS } from '../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialIcons';
import { Shadow } from 'react-native-shadow-2';

import RegularText from './font/RegularText';
import BoldText from './font/BoldText';
import LightText from './font/LightText';
import EBoldText from './font/EBoldText';
import EBoldTextN from './font/EBoldText_n';
import LightTextN from './font/LightText_n';

const PetInfo = ({ data }) => {
    const [main, setMain] = useState(data.main);

    useEffect(()=>{
        setMain(data.main)
    }, [data])

    /**
     * 대표설정
     */
    function setMainPet(main) {
        setMain(!main);
    }

    return (
        <Shadow 
            distance={6}
            offset={[3, 5]}
            startColor="rgba(0,0,0,0.12)"
            finalColor="rgba(0,0,0,0)"
            radius={scale(45)}
            sides={{ bottom: true }}
            getChildRadius={false}
            containerStyle={{
                borderRadius: scale(45),
                backgroundColor: '#fff',
            }}
            style={styles.shadow}
        >                 
            <View style={styles.card} >
                <View style={styles.infoHead} >
                    <Image source={data.profile} style={styles.profileImg} />
                    <TouchableOpacity style={styles.setMainBtn} onPress={()=>setMainPet(main)} activeOpacity={1}>
                        {
                            main ? <FontAwesome name='star' style={{fontSize: scale(25), color: 'pink'}} /> 
                            : <FontAwesome name='star-o' style={{fontSize: scale(25), color: COLORS.textPrimary}} />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.info}>
                    <EBoldTextN style={styles.infoName}>{data.name}</EBoldTextN>
                    <LightTextN style={styles.infoBreed}><Material name="pets"/> {data.species} • {data.breed}</LightTextN>

                    <ScrollView
                        horizontal
                        contentContainerStyle={{ paddingVertical: scale(20), paddingHorizontal: scale(25) }}
                        shadowHorizontalScrollIndicator={false}
                    >
                        <View style={styles.infoSub}>
                            <EBoldTextN style={{fontSize: scale(14), marginBottom: 6}}>생일</EBoldTextN>
                            <LightTextN>{data.birth}</LightTextN>
                        </View>
                        <View style={styles.infoSub}>
                            <EBoldTextN style={{fontSize: scale(14), marginBottom: 6}}>나이</EBoldTextN>
                            <LightTextN>{data.age}</LightTextN>
                        </View>
                        <View style={styles.infoSub}>
                            <EBoldTextN style={{fontSize: scale(14), marginBottom: 6}}>성별</EBoldTextN>
                            <LightTextN>{data.gender}</LightTextN>
                        </View>
                        <View style={styles.infoSub}>
                            <EBoldTextN style={{fontSize: scale(14), marginBottom: 6}}>중성화</EBoldTextN>
                            <LightTextN>Y</LightTextN>
                        </View>
                    </ScrollView>

                    <View style={styles.memo}>
                        <EBoldTextN style={{fontSize: scale(16), marginBottom: 8}}>MEMO</EBoldTextN>
                        <LightTextN style={styles.memoContent}>안녕하세요 만나서 반값습니다 다음에 또 만나요 헬로우헬로우 하하 집에가고싶다 퇴근언제하지
안녕하세요 만나서 반값습니다 다음에 또 만나요 헬로우헬로우 하하 집에가고싶다 퇴근언제하지
안녕하세요 만나서 반값습니다 다음에 또 만나요 헬로우헬로우 하하 집에가고싶다 퇴근언제하지


                        </LightTextN>
                    </View>
                </View>
            </View>
        </Shadow>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',

        backgroundColor: COLORS.sub,
        borderRadius: scale(45),
        alignItems: 'center',
    },
    shadow: {
      width: '100%', 
      marginBottom: 12  ,
      borderRadius: scale(45),
    },
    profileImg: {
        width: scale(150),
        height: scale(150),
        borderRadius: scale(150)/2,
        // marginBlock: scale(20)
    },
    infoHead: {
        width: '100%',
        // height: 200,
        alignItems: 'center',
        marginBlock: scale(20),
        position: 'relative',
    },
    setMainBtn: {
        width: scale(30),
        height: scale(30),
        borderRadius: scale(30)/2,
        backgroundColor: '#fff',
        position: 'absolute',
        right: scale(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        width: '100%',
        borderTopRightRadius: scale(45),
        borderBottomRightRadius: scale(45),
        borderBottomLeftRadius: scale(45),
        minHeight: scale(200),
        backgroundColor: '#fff',
        paddingBottom: scale(30)
    },
    infoName: {
        fontSize: scale(22),
        marginBottom: scale(8),
        marginHorizontal: scale(25),
        marginTop: scale(25),
    },
    infoBreed: {
        color: COLORS.textSecondary,
        fontSize: scale(12),
        marginHorizontal: scale(25),
    },
    infoSub: {
        padding: scale(12),
        borderRadius: scale(10),
        width: scale(80),
        height: scale(60),
        backgroundColor: '#faf0f0ff',
        marginRight: scale(10),
        alignItems: 'center'
    },
    memo: {
        width: '100%',
        minHeight: scale(50),
        marginTop: scale(20),
        paddingHorizontal: scale(25)
    },
    memoContent: {
        lineHeight: 20
    }
    

});

export default PetInfo;