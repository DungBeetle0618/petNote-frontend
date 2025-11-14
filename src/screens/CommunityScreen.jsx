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

import EBoldText from '../components/font/EBoldText';
import gs from '../assets/styles/globalStyles';
import FeedScreen from '../components/community/FeedScreen';
import ColumnsScreen from '../components/community/ColumnsScreen';
import ReviewScreen from '../components/community/ReviewScreen';
import TabMenu from '../components/common/TabMenu';

const CommunityScreen = () => {

    const [feedRender, setFeedRender] = useState(true);
    const [columnsRender, setColumnsRender] = useState(false);
    const [reviewsRender, setReivewsRender] = useState(false);
    const [activeTabName, setActiveTabName] = useState('Feed');

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

            {feedRender && <FeedScreen />}
            {columnsRender && <ColumnsScreen />}
            {reviewsRender && <ReviewScreen />}

        </ScrollView>
    );
};


export default CommunityScreen;