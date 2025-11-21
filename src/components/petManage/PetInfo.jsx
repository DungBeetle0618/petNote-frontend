/**
 * 동물정보 카드
 */
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ScrollView, Text, FlatList, Pressable, Alert } from 'react-native';
import gs, { COLORS } from '../../assets/styles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';

import EBoldTextN from '../font/EBoldText_n';
import LightTextN from '../font/LightText_n';
import ChevronIcon from '../common/ChevronIcon';

const PetInfo = ({ data }) => {
    const [expanded, setExpanded] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [main, setMain] = useState(data?.main);

    useEffect(() => {
        setMain(data.main)
    }, [data?.main])

    /**
     * 대표설정
     */
    function setMainPet(main) {

        Alert.alert(
            'PetNote',
            '대표 동물로 설정하시겠습니까?',
            [
                { text: '취소', onPress: () => { }, style: 'cancel' },
                { text: '확인', onPress: () => { setMain(!main) }, style: 'default' },
            ],
            {
                cancelable: true,
                onDismiss: () => { }
            }
        )
    }

    //특이사항(예시)
    const contents = '아주 건강하고 똑똑하지만 약간 멍청함\n먹는거 좋아하고 사람이나 다른 강아지들 좋아함\n알러지 없음\n하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하\n하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하';

    // const photos = [];
    const photos = Array.from({ length: 9 }).map((_, i) => ({
        id: i.toString(),
        image: `https://picsum.photos/200?random=${i}`, // 예시 이미지
    }));

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (res) => {
            if (res.assets && res.assets[0]?.uri) onChange(res.assets[0].uri);
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.info}>
                <EBoldTextN style={styles.infoName}>{data.name}</EBoldTextN>
                <LightTextN style={styles.infoBreed}><Material name="pets" /> {data.species} • {data.breed}</LightTextN>

                <ScrollView
                    horizontal
                    contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
                    shadowHorizontalScrollIndicator={false}
                >
                    <View style={[styles.infoSub, { width: 100 }]}>
                        <EBoldTextN style={{ fontSize: 12, marginBottom: 6 }}>생일</EBoldTextN>
                        <LightTextN styles={styles.subContent}>{data.birth}</LightTextN>
                    </View>
                    <View style={styles.infoSub}>
                        <EBoldTextN style={{ fontSize: 12, marginBottom: 6 }}>나이</EBoldTextN>
                        <LightTextN styles={styles.subContent}>{data.age}</LightTextN>
                    </View>
                    <View style={[styles.infoSub,]}>
                        <EBoldTextN style={{ fontSize: 12, marginBottom: 6 }}>몸길이</EBoldTextN>
                        <LightTextN styles={styles.subContent}>300cm</LightTextN>
                    </View>
                    <View style={styles.infoSub}>
                        <EBoldTextN style={{ fontSize: 12, marginBottom: 6 }}>성별</EBoldTextN>
                        <LightTextN styles={styles.subContent}>{data.gender}</LightTextN>
                    </View>
                    <View style={styles.infoSub}>
                        <EBoldTextN style={{ fontSize: 12, marginBottom: 6 }}>중성화</EBoldTextN>
                        <LightTextN styles={styles.subContent}>Y</LightTextN>
                    </View>
                </ScrollView>

                <View style={styles.memo}>
                    <View style={{ flexDirection: 'row', alignItems: 'start', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: 600 }}>NOTES</Text>
                        {contents.length > 100 && (
                            <TouchableOpacity onPress={() => setExpanded(prev => !prev)} activeOpacity={1} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
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

                {/* 수정, 대표 선택 */}
                <View style={styles.modiView}>
                    <Pressable onPress={() => { alert('수정') }} activeOpacity={1} style={styles.modiBtn}>
                        <Text style={styles.modiText}>수정하기  <FontAwesome name="pencil" style={{ fontSize: 12 }} /></Text>
                    </Pressable>
                    <Pressable style={styles.setMainBtn} onPress={() => setMainPet(main)} activeOpacity={1}>
                        {
                            main ? <FontAwesome name='star' style={{ fontSize: 20, color: 'white' }} />
                                : <FontAwesome name='star-o' style={{ fontSize: 20, color: 'white' }} />
                        }
                    </Pressable>
                </View>
                        

            </View>

            <View style={styles.albumView}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, }}>
                    <Text style={{ fontSize: 20, fontWeight: 600 }}>PHOTO</Text>
                    <Pressable onPress={pickImage}>
                        <FontAwesome6 name='plus' style={{ fontSize: 20 }} />
                    </Pressable>
                </View>

                {
                    !photos || photos.length == 0 ?
                        (
                            <View style={[styles.photoItem, {width: '30%', height: 'auto'}]}>
                                <Text style={styles.noPhoto}>사진을 추가해보세요</Text>
                            </View>
                        )
                        :
                        (
                            <FlatList
                                scrollEnabled={false}
                                data={photos}
                                numColumns={3}
                                keyExtractor={(item) => item.id}
                                columnWrapperStyle={{ gap: 10 }}      // 가로 간격
                                contentContainerStyle={{ gap: 10 }}   // 세로 간격
                                renderItem={({ item }) => (
                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.photoItem,
                                            { opacity: pressed ? 0.7 : 1 },
                                        ]}
                                        onPress={() => console.log("Pressed:", item.id)}
                                    >
                                        <Image
                                            source={{ uri: item.image }}
                                            style={styles.image}
                                            resizeMode="cover"
                                        />
                                    </Pressable>
                                )}
                            />
                        )
                }

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    info: {
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
    infoName: {
        fontSize: 20,
        marginBottom: 8,
        marginHorizontal: 10,
        marginTop: 25,
    },
    infoBreed: {
        color: COLORS.textSecondary, //TODO: 컬러변경
        fontSize: 13,
        marginHorizontal: 10,
    },
    infoSub: {
        padding: 12,
        borderRadius: 10,
        width: 100,
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
        paddingHorizontal: 10
    },
    memoContent: {
        lineHeight: 20,
        flexShrink: 1,
        fontSize: 14,
        color: '#555',
    },
    modiView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    modiBtn: {
        width: '82%',
        height: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        paddingBlock: 4
    },
    modiText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 500
    },
    setMainBtn: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    albumView: {
        width: '100%',
        marginTop: 60,
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 120,
        backgroundColor: '#efefef'
    },



    photoItem: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 12,
        overflow: 'hidden', // round가 이미지에 적용되도록
        backgroundColor: '#ccc', // 이미지 로딩 전 placeholder
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    noPhoto: {
        fontSize: 12,
        color: 'white',
        paddingHorizontal: 15,
        textAlign: 'center',
    }

});

export default PetInfo;
