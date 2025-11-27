import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { convertToAmPm } from '../../assets/js/common';

const ToiletStatusCard = ({item, setOpen, setModiData }) => {

    return (
        <TouchableOpacity
                activeOpacity={0.8}
                underlayColor="transparent"
                onLongPress={()=>{alert('삭제')}}
                onPress={() => { 
                    setOpen(true);
                    setModiData({ toiletDate: item.toiletDate, toiletTime: item.toiletTime, memo: item.memo, toiletType: item.toiletType  },) }}
            >
                <View style={[styles.stoolItem, item.toiletType == '02' ? styles.urineItem : styles.fecalItem ]}>
                    <Text style={styles.stoolTime}>{convertToAmPm(item.toiletTime)}</Text>
                    <Text style={styles.stoolSub}>{item.typeName} • {item.memo ? item.memo : '메모 없음'}</Text>
                </View>
            </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    
    stoolItem: {
        paddingBlock: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 10,
        // elevation: 2,
        // backgroundColor: '#fff'
        borderWidth: 1
    },
    fecalItem: {
        backgroundColor: '#F3FFF6',
        borderColor: '#D7F5E0',
    },
    urineItem: {
        backgroundColor: '#FFF8F2',
        borderColor: '#FFE1C4',
    },
    stoolTime: {
        fontSize: 15,
        fontWeight: 500
    },
    stoolSub: {
        fontSize: 13,
        color: '#333',
        marginTop: 6
    }

});

export default ToiletStatusCard;
