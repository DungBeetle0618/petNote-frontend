import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * 식사 상태 카드
 * @param {*} param0 
 * @returns 
 */
const MealStatusCard = ({item, setOpen, setModiData }) => {
    
    const isCompleted = item.status === 'C';
    const isPending = item.status === 'P';

    let mealName = '';
    switch (item.meal) {
        case '0001':
            mealName = '아침';
            break;
        case '0002':
            mealName = '점심';
            break;
        case '0003':
            mealName = '저녁';
            break;
        case '0004':
            mealName = '아침 간식';
            break;
        case '0005':
            mealName = '점심 간식';
            break;
        case '0006':
            mealName = '저녁 간식';
            break;
    }


    return (
        <TouchableOpacity
                activeOpacity={0.8}
                underlayColor="transparent"
                onLongPress={()=>{alert('삭제')}}
                onPress={() => { 
                    setOpen(true);
                    setModiData({
                        meal: item.meal,
                        foodType: item.foodType,
                        amount: item.amount,
                        calorie: '',
                        status: item.status,
                        pendingTime: '',
                    }) }}
            >
                <View  style={[
                    styles.card,
                    isCompleted && styles.completedCard,
                    isPending && styles.pendingCard,
                ]}>
                    <View>
                        <Text style={styles.meal}>{mealName}</Text>
                        <Text style={styles.desc}>{item.foodType} • {item.amount}</Text>
                    </View>
                    <View style={[
                        styles.badge,
                        isCompleted && styles.completedBadge,
                        isPending && styles.pendingBadge,
                    ]}>
                        <Text style={[
                            styles.badgeText,
                            isCompleted && styles.completedText,
                            isPending && styles.pendingText,
                        ]}>
                            {item.status == 'C' ? '완료' : '예정'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    completedCard: {
        backgroundColor: '#F3FFF6',
        borderColor: '#D7F5E0',
    },
    pendingCard: {
        backgroundColor: '#FFF8F2',
        borderColor: '#FFE1C4',
    },
    meal: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
    },
    desc: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    badge: {
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 20,
    },
    completedBadge: {
        backgroundColor: '#59b487ff',
    },
    pendingBadge: {
        backgroundColor: '#fd825cff',
    },
    badgeText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
    },

});

export default MealStatusCard;
