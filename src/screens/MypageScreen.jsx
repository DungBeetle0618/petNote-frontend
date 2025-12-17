/**
 * 마이페이지
 */
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EBoldText from '../components/font/EBoldText';
import gs from '../assets/styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../api/user'

const petsData = [
  { id: 1, name: 'Charlie', breed: 'Golden Retriever', age: '3 years', weight: '12.3kg', image: require('../assets/images/golden_retriever_sample.png') },
  { id: 2, name: 'Coco', breed: 'Bichon Frisé', age: '2 years', weight: '5.4kg', image: require('../assets/images/golden_retriever_sample.png') },
  { id: 3, name: 'Nana', breed: 'Poodle', age: '1 year', weight: '4.1kg', image: require('../assets/images/golden_retriever_sample.png') },
];


const MypageScreen = () => {
  useEffect(() => {
      (async () => {
        try {
          const userId = await getUser();
          console.log(userId)
        } catch (e) {
          console.log(e)
        }
      })();
    }, []);
  const navigation = useNavigation();
  const [activePet, setActivePet] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Profile */}
        <View style={styles.profileInfo}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>SJ</Text>
          </View>
          <View>
            <Text style={styles.name}>Sarah Johnson</Text>
            <Text style={styles.email}>sarah.j@example.com</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard value="12" label="Challenges" />
          <StatCard value="342" label="Followers" />
          <StatCard value="189" label="Following" />
        </View>
      </View>

      {/* My Pets Slider */}
      <View style={styles.petSection}>
        <View style={styles.petHeader}>
          <Text style={styles.petTitle}>My Pets</Text>
          <Text style={styles.petCount}>{activePet + 1} of {petsData.length}</Text>
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
            setActivePet(index);
          }}
          scrollEventThrottle={16}
        >
          {petsData.map((pet, index) => (
            <View key={pet.id} style={[styles.petCard, { width: screenWidth - 48 }]}>
              <Image source={pet.image} style={styles.petImage} />
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petBreed}>{pet.breed}</Text>
              <Text style={styles.petDetail}>{pet.age} · {pet.weight}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Dots */}
        <View style={styles.dotWrap}>
          {petsData.map((_, i) => (
            <View key={i} style={[styles.dot, { opacity: activePet === i ? 1 : 0.3 }]} />
          ))}
        </View>
      </View>

      {/* Feature List */}
      <Section title="Features">
        <MenuItem icon={<MaterialCommunityIcons name="store" size={22} color={"#FF6A21"} />} onPress={()=>{navigation.navigate('Product')}} label="Products" sub="AI-powered pet product recommendations" />
        <MenuItem icon={<Feather name="bell" size={22} color={"#589BFF"} />} onPress={()=>{navigation.navigate('Reminder')}} label="Reminders" sub="Manage your pet care schedule" />
        <MenuItem icon={<MaterialCommunityIcons name="trophy" size={22} color={"#A44BFF"} />} onPress={()=>{navigation.navigate('Challenge')}} label="Challenges" sub="Track progress and compete" />
      </Section>

      {/* Social */}
      <Section title="Social">
        <MenuItem icon={<Feather name="heart" size={22} color={"#FF6A21"} />} label="My Activity" />
      </Section>

      {/* Settings */}
      <Section title="Settings">
        <MenuItem icon={<Feather name="user" size={22} color={"#FF6A21"} />} onPress={()=>{navigation.navigate('MyProfile')}} label="My Profile" />
        <MenuItem icon={<Feather name="settings" size={22} color={"#666"} />} label="Settings" />
      </Section>
    </ScrollView>
  );
};

function StatCard({ value, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function MenuItem({ icon, label, sub, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon}
        <View style={{ marginLeft: 14 }}>
          <Text style={styles.menuLabel}>{label}</Text>
          {sub && <Text style={styles.menuSub}>{sub}</Text>}
        </View>
      </View>
      <Feather name="chevron-right" size={20} color="#bbb" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5E9' },
  header: { backgroundColor: '#FF6A21', padding: 24, paddingTop: 50, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  profileInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  avatarCircle: { width: 60, height: 60, backgroundColor: '#FFF', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarText: { fontWeight: '700', color: '#FF6A21', fontSize: 20 },
  name: { color: '#FFF', fontSize: 22, fontWeight: '700' },
  email: { color: '#FFE6CF', fontSize: 13 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statCard: { backgroundColor: '#FFF', width: '31%', paddingVertical: 14, borderRadius: 16, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '700', color: '#FF6A21' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 4 },

  petSection: { marginTop: 28 },
  petHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24 },
  petTitle: { fontSize: 15, fontWeight: '700', color: '#555' },
  petCount: { fontSize: 13, color: '#999' },
  petCard: { backgroundColor: '#FFF', borderRadius: 20, marginHorizontal: 24, padding: 20, alignItems: 'center' },
  petImage: { width: 140, height: 140, resizeMode: 'contain' },
  petName: { fontSize: 18, fontWeight: '700', marginTop: 10 },
  petBreed: { fontSize: 13, color: '#FF6A21', marginTop: 6 },
  petDetail: { fontSize: 13, color: '#777', marginTop: 4 },
  dotWrap: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF6A21', marginHorizontal: 4 },

  section: { marginTop: 32, paddingHorizontal: 24 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#666', marginBottom: 12 },
  menuItem: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuLabel: { fontSize: 14, fontWeight: '600', color: '#333' },
  menuSub: { fontSize: 12, color: '#888', marginTop: 4 },

  footerText: { textAlign: 'center', fontSize: 12, color: '#777', marginTop: 30 },
  footerVersion: { textAlign: 'center', fontSize: 11, color: '#bbb', marginBottom: 20 },
});

export default MypageScreen;