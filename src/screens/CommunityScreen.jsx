/**
 * 커뮤니티 화면
 */
import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Pressable,
    Alert
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import EBoldText from '../components/font/EBoldText';
import gs from '../assets/styles/globalStyles';
import FeedScreen from './FeedScreen';
import ColumnsScreen from './ColumnsScreen';
import ReivewsScreen from './ReivewsScreen';
import TabMenu from '../components/TabMenu';

const Tab = createBottomTabNavigator();

const CommunityScreen = () => {

    const [feedRender, setFeedRender] = useState(true);
    const [columnsRender, setColumnsRender] = useState(false);
    const [reivewsRender, setReivewsRender] = useState(false);
    const [activeTabName, setActiveTabName] = useState('');

    const onPressHandler = (renderName) => {
        if(renderName == 'Feed'){
          setFeedRender(true);
          setColumnsRender(false);
          setReivewsRender(false);
          setActiveTabName('Feed');
        } 
        if(renderName == 'Columns'){
          setFeedRender(false);
          setColumnsRender(true);
          setReivewsRender(false);
          setActiveTabName('Columns');
        }
        if(renderName == 'Reviews'){
          setFeedRender(false);
          setColumnsRender(false);
          setReivewsRender(true);
          setActiveTabName('Reviews');
        }
    }

    return (
        <ScrollView contentContainerStyle={gs.screen}>

            <View>
                <EBoldText style={gs.title}>Community</EBoldText>
            </View>
            <View>
                <Text style={gs.subtitle}>Connect with pet lovers</Text>
            </View>

            <TabMenu onPressHandler={onPressHandler} menuList={['Feed', 'Columns', 'Reviews']} activeTab={activeTabName}/>

            {feedRender && <FeedScreen/>}
            {columnsRender && <ColumnsScreen/>}
            {reivewsRender && <ReivewsScreen/>}

        </ScrollView>
    );
};


export default CommunityScreen;