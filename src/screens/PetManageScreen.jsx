/**
 * 반려동물 관리 화면
 */
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Animated,
    ImageBackground,
    Pressable,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialIcons';

import EBoldTextN from '../components/font/EBoldText_n';
import TabMenu from '../components/common/TabMenu';

import PetInfo from '../components/petManage/PetInfo';
import HealthTab from '../components/petManage/HealthTab';
import ConditionsTab from '../components/petManage/ConditionsTab';
import ActivityTab from '../components/petManage/ActivityTab';

import PagerView from 'react-native-pager-view';

const HEADER_HEIGHT = 320;
const TABBAR_HEIGHT = 33;
const MIN_Y = 350;

const PetManageScreen = ({ route, navigation }) => {
    const { pet } = route.params;

    const scrollY = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef(null);
    const pagerRef = useRef(null);

    const { height, width } = Dimensions.get('window');

    const tabs = ['정보', '건강', '식사/배변', '활동'];
    const [page, setPage] = useState(0);

    const [parentLocked, setParentLocked] = useState(false);
    const [lock, setLock] = useState(false);
    const [childCanScroll, setChildCanScroll] = useState(false);

    const [childScrollable, setChildScrollable] = useState(false);  
    // 자식 컨텐츠가 스크롤 가능할 때만 true

    const handleTabPress = (index) => {
        setPage(index);
        pagerRef.current?.setPage(index);
    };

    /** 부모 스크롤 */
    const onParentScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: true,
            listener: (e) => {
                if (lock) return;

                const y = e.nativeEvent.contentOffset.y;

                if (!parentLocked) {
                    if (y >= MIN_Y) {
                        setParentLocked(true);
                        setChildCanScroll(true);

                        setLock(true);
                        scrollRef.current?.scrollTo({ y: MIN_Y, animated: false });
                        setTimeout(() => setLock(false), 0);
                    }
                } else {
                    if (y < MIN_Y) {
                        setLock(true);
                        scrollRef.current?.scrollTo({ y: MIN_Y, animated: false });
                        setTimeout(() => setLock(false), 0);
                    }
                }
            },
        }
    );

    /** 자식 스크롤 top 감지 → 부모 unlock */
    const onChildScroll = (e) => {
        const y = e.nativeEvent.contentOffset.y;

        if (y <= 0 && parentLocked) {
            setParentLocked(false);
            setChildCanScroll(false);

            scrollRef.current?.scrollTo({ y: MIN_Y, animated: false });
        }
    };

    /** 자식 content 크기 체크 → 스크롤 여부 자동 판단 */
    const onChildContentSizeChange = (w, h) => {
        const availableHeight = height - HEADER_HEIGHT;

        if (h > availableHeight) {
            if (!childScrollable) setChildScrollable(true);
        } else {
            if (childScrollable) setChildScrollable(false);

            // 자식 스크롤이 필요 없으면 부모를 항상 움직이도록
            if (parentLocked) {
                setParentLocked(false);
                setChildCanScroll(false);
                scrollRef.current?.scrollTo({ y: MIN_Y, animated: false });
            }
        }
    };

    /** BottomSheet 애니메이션 */
    const sheetTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, TABBAR_HEIGHT],
        extrapolate: 'clamp',
    });

    /** Sticky TabMenu */
    const tabTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [HEADER_HEIGHT, TABBAR_HEIGHT - 20],
        extrapolate: 'clamp',
    });

    return (
        <View style={{ flex: 1 }}>
            {/* HEADER */}
            <Animated.View style={[styles.headerImageWrapper]}>
                <ImageBackground
                    source={pet.profile}
                    resizeMode="cover"
                    style={styles.bgImage}
                >
                    <Pressable
                        style={styles.backBtn}
                        onPress={() => navigation.goBack()}
                    >
                        <Feather
                            name="arrow-left"
                            style={{ color: 'white', fontSize: 40 }}
                        />
                    </Pressable>

                    <View>
                        <EBoldTextN style={[styles.petName, styles.textShadow]}>
                            {pet.name}
                        </EBoldTextN>

                        <Text style={[styles.petBreed, styles.textShadow]}>
                            <Material name="pets" /> {pet.species} • {pet.breed}
                        </Text>
                    </View>
                </ImageBackground>
            </Animated.View>

            {/* Sticky Tab */}
            <Animated.View
                style={[styles.tabBar, { transform: [{ translateY: tabTranslateY }] }]}
            >
                <TabMenu
                    menuList={tabs}
                    activeTab={tabs[page]}
                    onPressHandler={(name) =>
                        handleTabPress(tabs.indexOf(name))
                    }
                    color={'#fff'}
                />
            </Animated.View>

            {/* 부모 스크롤 */}
            <Animated.ScrollView
                ref={scrollRef}
                nestedScrollEnabled={true}
                scrollEnabled={!parentLocked}
                onScroll={onParentScroll}
                scrollEventThrottle={16}
                bounces={false}
                overScrollMode="never"
                contentContainerStyle={{ paddingTop: 300 }}
            >
                <Animated.View
                    style={[
                        styles.bottomSheet,
                        { transform: [{ translateY: sheetTranslateY }] },
                    ]}
                >
                    {/* Pager */}
                    <View style={{ flex: 1, height: height * 1 }}>
                        <PagerView
                            ref={pagerRef}
                            style={{ flex: 1 }}
                            initialPage={0}
                            onPageSelected={(e) =>
                                setPage(e.nativeEvent.position)
                            }
                        >
                            {/* INFO 탭 */}
                            <Animated.ScrollView
                                key={'info'}
                                nestedScrollEnabled={true}
                                scrollEnabled={childCanScroll && childScrollable}
                                onScroll={onChildScroll}
                                onContentSizeChange={onChildContentSizeChange}
                                contentContainerStyle={{
                                    paddingBottom: 150,
                                    minHeight: height * 0.6,
                                }}
                            >
                                <PetInfo data={pet} />
                            </Animated.ScrollView>

                            {/* HEALTH 탭 */}
                            <Animated.ScrollView
                                key={'health'}
                                nestedScrollEnabled={true}
                                scrollEnabled={childCanScroll && childScrollable}
                                onScroll={onChildScroll}
                                onContentSizeChange={onChildContentSizeChange}
                                contentContainerStyle={{
                                    paddingBottom: 150,
                                    minHeight: height * 0.6,
                                }}
                            >
                                <HealthTab />
                            </Animated.ScrollView>

                            {/* CONDITIONS 탭 */}
                            <Animated.ScrollView
                                key={'conditions'}
                                nestedScrollEnabled={true}
                                scrollEnabled={childCanScroll && childScrollable}
                                onScroll={onChildScroll}
                                onContentSizeChange={onChildContentSizeChange}
                                contentContainerStyle={{
                                    paddingBottom: 150,
                                    minHeight: height * 0.6,
                                }}
                            >
                                <ConditionsTab />
                            </Animated.ScrollView>

                            {/* ACTIVITY 탭 */}
                            <Animated.ScrollView
                                key={'activity'}
                                nestedScrollEnabled={true}
                                scrollEnabled={childCanScroll && childScrollable}
                                onScroll={onChildScroll}
                                onContentSizeChange={onChildContentSizeChange}
                                contentContainerStyle={{
                                    paddingBottom: 150,
                                    minHeight: height * 0.6,
                                }}
                            >
                                <ActivityTab />
                            </Animated.ScrollView>
                        </PagerView>
                    </View>
                </Animated.View>
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    headerImageWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        zIndex: -99,
    },

    bgImage: {
        justifyContent: 'flex-end',
        height: HEADER_HEIGHT,
        width: '100%',
    },

    backBtn: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
    },

    petName: {
        fontSize: 30,
        marginBottom: 8,
        color: 'white',
        textAlign: 'center',
    },

    petBreed: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 40,
    },

    tabBar: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        height: TABBAR_HEIGHT,
        paddingHorizontal: 20,
        justifyContent: 'center',
        zIndex: 20,
    },

    bottomSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 70,
        minHeight: 300,
    },

    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -0.3, height: 0.3 },
        textShadowRadius: 10,
    },
});

export default PetManageScreen;
