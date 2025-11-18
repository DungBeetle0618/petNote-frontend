import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Alert,
    Dimensions
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import { Tabs } from 'react-native-collapsible-tab-view';

import EBoldTextN from '../components/font/EBoldText_n';
import TabMenu from '../components/common/TabMenu';
import { COLORS } from '../assets/styles/globalStyles';

import PetInfo from '../components/petManage/PetInfo';
import HealthTab from '../components/petManage/HealthTab';
import ConditionsTab from '../components/petManage/ConditionsTab';
import ActivityTab from '../components/petManage/ActivityTab';

const HEADER_HEIGHT = 300;
const {height} = Dimensions.get("window");

const PetManageScreen = ({ route, navigation }) => {
    const { pet } = route.params;
    const [main, setMain] = useState(pet.main);

    console.log(height)

    useEffect(() => {
        setMain(pet.main)
    }, [pet])

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

    const tabs = ['정보', '건강', '식사/배변', '활동'];

    const Header = ({ pet, navigation }) => (
        <View style={styles.headerImageWrapper}>
            <ImageBackground
                source={pet.profile}
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
            {/* <View style={styles.blankView}></View> */}
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

    const ModiPetInfoBtn = () => {
        return (
            <View style={styles.modiView}>
                <Pressable onPress={() => { alert('수정') }} activeOpacity={1} style={styles.modiBtn}>
                    <Text style={styles.modiText}>수정하기  <FontAwesome name="pencil" style={{ fontSize: 16 }} /></Text>
                </Pressable>
                <Pressable style={styles.setMainBtn} onPress={() => setMainPet(main)} activeOpacity={1}>
                    {
                        main ? <FontAwesome name='star' style={{ fontSize: 20, color: 'white' }} />
                            : <FontAwesome name='star-o' style={{ fontSize: 20, color: 'white' }} />
                    }
                </Pressable>
            </View>
        )
    }


    return (
        <View style={{flex: 1}}>
            <Tabs.Container
                headerHeight={HEADER_HEIGHT}
                revealHeaderOnScroll={false}
                headerContainerStyle={{
                    shadowColor: 'transparent',
                    shadowOpacity: 0,
                    shadowRadius: 0,
                    elevation: 0,
                }}
                renderHeader={() => <Header pet={pet} navigation={navigation} />}
                renderTabBar={(props) => (
                    <CustomTabBar
                        tabs={tabs}
                        index={props.index}
                        onTabPress={props.onTabPress}
                    />
                )}
                containerStyle={{ paddingTop: 0 }}   // ← 중요
            >
                <Tabs.Tab name="정보">
                    <Tabs.ScrollView style={[styles.bottomSheet, {paddingHorizontal:0}]} >
                        <PetInfo data={pet} />
                    </Tabs.ScrollView>
                    <ModiPetInfoBtn />
                </Tabs.Tab>

                <Tabs.Tab name="건강">
                    <Tabs.ScrollView style={styles.bottomSheet}>
                        <HealthTab />
                    </Tabs.ScrollView>
                </Tabs.Tab>

                <Tabs.Tab name="식사/배변">
                    <Tabs.ScrollView style={styles.bottomSheet}>
                        <ConditionsTab />
                    </Tabs.ScrollView>
                </Tabs.Tab>

                <Tabs.Tab name="활동">
                    <Tabs.ScrollView style={styles.bottomSheet}>
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
        backgroundColor: '#ececec'
    },
    bgImage: {
        height: HEADER_HEIGHT,
        width: '100%',
        justifyContent: 'flex-end'
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
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
    },
    tabBarWrapper: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,

        // height: 48,
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

        zIndex: 9999,
        overflow: 'hidden',
    },

    modiView: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 999,
        paddingHorizontal: 20
    },
    modiBtn: {
        width: '82%',
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        paddingBlock: 12
    },
    modiText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 500
    },
    setMainBtn: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default PetManageScreen;