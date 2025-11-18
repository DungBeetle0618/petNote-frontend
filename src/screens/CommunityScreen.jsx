/**
 * 커뮤니티 화면
 */
import React, {useCallback, useEffect, useState} from 'react';
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
import Feed from '../components/community/Feed';
import Columns from '../components/community/Columns';
import Review from '../components/community/Review';
import TabMenu from '../components/common/TabMenu';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


const CommunityScreen = ({navigation}) => {

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

     const onBoardAdd = useCallback(() => {
		navigation.navigate('CommunityAdd');
	});


    return (
	<View>
        <ScrollView contentContainerStyle={gs.screen}>
            <View>
                <EBoldText style={gs.title}>Community</EBoldText>
            </View>
            <View>
                <Text style={gs.subtitle}>Connect with pet lovers</Text>
            </View>

            <TabMenu onPressHandler={onPressHandler} menuList={['Feed', 'Columns', 'Reviews']} activeTab={activeTabName}/>
            <View style={{marginTop:20}}>
                {feedRender && <Feed />}
                {columnsRender && <Columns />}
                {reviewsRender && <Review />}
            </View>

        </ScrollView>



		<Pressable style={communityDot.addBox} onPress={onBoardAdd}>
			<Text><FontAwesome6 name='plus' style={communityDot.addBoxFont} /></Text>
		</Pressable>

	</View>
    );
};



const communityDot = StyleSheet.create({
	addBox:{
		position:'absolute',
		bottom:20,
		right:20,
		width:50,
		height:50,
		backgroundColor:'#9a8fff',
		alignItems:'center',
		justifyContent:'center',
		borderRadius:50,
		opacity:100,
	},
        addBoxFont: {
        color: 'white',
        fontSize: 14
    },
});

export default CommunityScreen;