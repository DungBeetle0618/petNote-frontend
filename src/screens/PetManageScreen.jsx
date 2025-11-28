import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Alert,
    Dimensions,
    Platform
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useAnimatedReaction, runOnJS, useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { Tabs } from 'react-native-collapsible-tab-view';

import EBoldTextN from '../components/font/EBoldText_n';
import TabMenu from '../components/common/TabMenu';
import { COLORS } from '../assets/styles/globalStyles';

import PetInfo from '../components/petManage/PetInfo';
import HealthTab from '../components/petManage/HealthTab';
import ConditionsTab from '../components/petManage/ConditionsTab';
import ActivityTab from '../components/petManage/ActivityTab';

const HEADER_HEIGHT = 300;

const PetManageScreen = ({ route, navigation }) => {
    const { pet } = route.params;

    const [headerHeight, setHeaderHeight] = useState(HEADER_HEIGHT);

    // const PetInfoContent = (props) => <PetInfo {...props} />;
    // const HealthTabContent = (props) => <HealthTab {...props} />;
    // const ConditionsTabContent = (props) => <ConditionsTab {...props} />;
    // const ActivityTabContent = (props) => <ActivityTab {...props} />;

    const tabs = ['정보', '건강', '식사/배변', '활동'];

    const Header = ({ pet, navigation }) => (
        <View style={styles.headerImageWrapper} onLayout={event => setHeaderHeight(event.nativeEvent.layout.height)}>
            <ImageBackground
                source={pet.profileImg}
                resizeMode="cover"
                style={styles.bgImage}
            >
                <Pressable
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="arrow-left" style={{ color: 'white', fontSize: 40 }} />
                </Pressable>

                <View>
                    <EBoldTextN style={[styles.petName, styles.textShadow]}>
                        {pet.name}
                    </EBoldTextN>

                    <Text style={[styles.petBreed, styles.textShadow]}>
                        {pet.info}
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );



    const CustomTabBar = ({ tabs, index, onTabPress }) => {
        const [active, setActive] = useState(0);

        useAnimatedReaction(
            () => index.value,
            (val) => {
                runOnJS(setActive)(val);
            },
            [index]
        );

        return (
            <View style={styles.tabBarWrapper}>
                <TabMenu
                    menuList={tabs}
                    activeTab={tabs[active]}
                    onPressHandler={(name) => {
                        onTabPress(name);  // string 전달
                    }}
                    color={'#fff'}
                />
            </View>
        );
    };




    return (
        <View style={{ flex: 1 }}>
            <Tabs.Container
                lazy={false}
                pagerProps={{
                    offscreenPageLimit: 4    // 탭 개수만큼
                }}
                allowHeaderOverscroll={false}
                snapThreshold={0.5}
                gestureHandlerProps={{
                    activeOffsetX: [-50, 50],  // 좌우 스와이프 민감도
                    activeOffsetY: [-10, 10],  // 세로 스크롤 부드럽게
                }}
                headerHeight={headerHeight}
                revealHeaderOnScroll={false}
                renderHeader={() => <Header pet={pet} navigation={navigation} />}
                renderTabBar={(props) => (
                    <CustomTabBar
                        tabs={tabs}
                        index={props.index}
                        onTabPress={props.onTabPress}
                    />
                )}
                containerStyle={{ paddingTop: 0 }}
            >
                <Tabs.Tab name="정보">
                    <Tabs.ScrollView
                        scrollEventThrottle={16}
                        style={[styles.bottomSheet, { paddingHorizontal: 0 }]} >
                        <PetInfo data={pet} />
                    </Tabs.ScrollView>
                </Tabs.Tab>

                <Tabs.Tab name="건강">
                    <Tabs.ScrollView
                        scrollEventThrottle={16}
                        style={styles.bottomSheet}>
                        <HealthTab />
                    </Tabs.ScrollView>
                </Tabs.Tab>

                <Tabs.Tab name="식사/배변">
                    <Tabs.ScrollView
                        scrollEventThrottle={16}
                        style={styles.bottomSheet}>
                        <ConditionsTab />
                    </Tabs.ScrollView>
                </Tabs.Tab>

                <Tabs.Tab name="활동">
                    <Tabs.ScrollView
                        scrollEventThrottle={16}
                        style={styles.bottomSheet}>
                        <ActivityTab />
                    </Tabs.ScrollView>
                </Tabs.Tab>
            </Tabs.Container>
        </View>
    );
};


const styles = StyleSheet.create({
    headerImageWrapper: {
        height: HEADER_HEIGHT,
        width: '100%',
        position: 'relative',
        backgroundColor: '#ececec',
        overflow: 'hidden'
    },
    bgImage: {
        // height: HEADER_HEIGHT,
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        // overflow: 'hidden'
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
        marginBottom: 30,
    },
    textShadow: {
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: -0.3, height: 0.3 },
        textShadowRadius: 10,
    },
    bottomSheet: {
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 75,
    },
    tabBarWrapper: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,

        borderRadius: 24,
        backgroundColor: '#fff',

        justifyContent: 'center',

        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.12,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
            },
            android: {
                elevation: 8,
            },
        }),

        // zIndex: 9999,
        overflow: 'hidden',
    },

});

export default PetManageScreen;