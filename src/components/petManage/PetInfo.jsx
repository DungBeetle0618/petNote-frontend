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
    ImageBackground,
    Text,
    Alert
} from 'react-native';
import gs, { COLORS } from '../../assets/styles/globalStyles';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialIcons';
import { Shadow } from 'react-native-shadow-2';

import RegularText from '../font/RegularText';
import BoldText from '../font/BoldText';
import LightText from '../font/LightText';
import EBoldText from '../font/EBoldText';
import EBoldTextN from '../font/EBoldText_n';
import LightTextN from '../font/LightText_n';
import ChevronIcon from '../common/ChevronIcon';

const PetInfo = ({ data }) => {
    const [main, setMain] = useState(data.main);
    const [expanded, setExpanded] = useState(false);
    const [showMore, setShowMore] = useState(false);

    //특이사항(예시)
    const contents = '아주 건강하고 똑똑하지만 약간 멍청함\n먹는거 좋아하고 사람이나 다른 강아지들 좋아함\n알러지 없음\n하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하\n하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하';
    

    useEffect(()=>{
        setMain(data.main)
    }, [data])

    /**
     * 대표설정
     */
    function setMainPet(main) {

        Alert.alert(
            'PetNote',
            '대표 동물로 설정하시겠습니까?',
            [
                {text: '취소', onPress:()=>{}, style: 'cancel'},
                {text: '확인', onPress:()=>{setMain(!main)}, style: 'default'},
            ],
            {
                cancelable: true,
                onDismiss: () => {}
            }
        )
    }

    return (
        <Shadow 
            distance={6}
            offset={[3, 3]}
            startColor="rgba(0,0,0,0.12)"
            finalColor="rgba(0,0,0,0)"
            radius={45}
            sides={{ bottom: true }}
            getChildRadius={false}
            containerStyle={{
                borderRadius: 45,
                backgroundColor: '#fff',
            }}
            style={styles.shadow}
        >                 
            <View style={styles.card} >
                <View style={styles.infoHead} >
                    <Image source={data.profile} style={styles.profileImg} />
                    <TouchableOpacity style={styles.setMainBtn} onPress={()=>setMainPet(main)} activeOpacity={1}>
                        {
                            main ? <FontAwesome name='star' style={{fontSize: 20, color: 'pink'}} /> 
                            : <FontAwesome name='star-o' style={{fontSize: 20, color: COLORS.textPrimary}} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{alert('수정')}} activeOpacity={1} style={{position: 'absolute', right: 20, bottom: 0}}>
                        <FontAwesome name="pencil" style={{fontSize: 16}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.info}>
                    <EBoldTextN style={styles.infoName}>{data.name}</EBoldTextN>
                    <LightTextN style={styles.infoBreed}><Material name="pets"/> {data.species} • {data.breed}</LightTextN>

                    <ScrollView
                        horizontal
                        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 25 }}
                        shadowHorizontalScrollIndicator={false}
                    >
                        <View style={[styles.infoSub, {width: 100}]}>
                            <EBoldTextN style={{fontSize: 12, marginBottom: 6}}>생일</EBoldTextN>
                            <LightTextN styles={styles.subContent}>{data.birth}</LightTextN>
                        </View>
                        <View style={styles.infoSub}>
                            <EBoldTextN style={{fontSize: 12, marginBottom: 6}}>나이</EBoldTextN>
                            <LightTextN styles={styles.subContent}>{data.age}</LightTextN>
                        </View>
                        <View style={styles.infoSub}>
                            <EBoldTextN style={{fontSize: 12, marginBottom: 6}}>성별</EBoldTextN>
                            <LightTextN styles={styles.subContent}>{data.gender}</LightTextN>
                        </View>
                        <View style={styles.infoSub}>
                            <EBoldTextN style={{fontSize: 12, marginBottom: 6}}>중성화</EBoldTextN>
                            <LightTextN styles={styles.subContent}>Y</LightTextN>
                        </View>
                    </ScrollView>

                    <View style={styles.memo}>
                        <View style={{flexDirection: 'row', alignItems: 'start', justifyContent: 'space-between'}}>
                            <EBoldTextN style={{fontSize: 16, marginBottom: 8}}>NOTES</EBoldTextN>
                            { contents.length > 100 && (
                                <TouchableOpacity onPress={() => setExpanded(prev=>!prev)} activeOpacity={1} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                    <ChevronIcon visible={expanded} size={16} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => setExpanded(prev => !prev)} activeOpacity={1}>
                            {expanded ? (
                                <Text style={styles.memoContent}
                                    key="open"
                                    ellipsizeMode='tail'
                                >
                                    {contents}
                                </Text>
                            ) : (
                                <Text style={styles.memoContent}
                                    key="closed"
                                    numberOfLines={3}
                                    ellipsizeMode='tail'
                                    onTextLayout={e => {
                                        if (e.nativeEvent.lines.length > 3 && !showMore) {
                                            setShowMore(true);
                                        }
                                    }}
                                >
                                    {contents}
                                </Text>
                            )}
                        </TouchableOpacity> 
                    </View>
                </View>
            </View>
        </Shadow>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',

        backgroundColor: '#f8f0f0ff',
        borderRadius: 45,
        alignItems: 'center',
    },
    shadow: {
      width: '100%', 
      marginBottom: 12  ,
      borderRadius: 45,
    },
    profileImg: {
        width: 160,
        height: 160,
        // borderRadius: 150/2,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 85,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 60,
    },
    infoHead: {
        width: '100%',
        // height: 200,
        alignItems: 'center',
        marginBlock: 15,
        position: 'relative',
    },
    setMainBtn: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
        backgroundColor: '#fff',
        position: 'absolute',
        right: 20,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        width: '100%',
        borderTopRightRadius: 45,
        borderBottomRightRadius: 45,
        borderBottomLeftRadius: 45,
        minHeight: 200,
        backgroundColor: '#fff',
        paddingBottom: 30
    },
    infoName: {
        fontSize: 20,
        marginBottom: 8,
        marginHorizontal: 25,
        marginTop: 25,
    },
    infoBreed: {
        color: COLORS.textSecondary,
        fontSize: 13,
        marginHorizontal: 25,
    },
    infoSub: {
        padding: 12,
        borderRadius: 10,
        width: 80,
        height: 60,
        backgroundColor: '#fdf8e2',
        marginRight: 10,
        alignItems: 'center'
    },
    subContent: {
        fontSize: 10
    },
    memo: {
        width: '100%',
        minHeight: 50,
        marginTop: 20,
        paddingHorizontal: 25
    },
    memoContent: {
        lineHeight: 20,
        flexShrink: 1,
        fontSize: 14,
        color: '#555',
    }
    

});

export default PetInfo;
