import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function MyProfileScreen({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);

  const [fullName, setFullName] = useState('Sarah Johnson');
  const [email, setEmail] = useState('sarah.j@example.com');

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  const handleSave = () => {
    // TODO: 서버에 저장 로직
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      '정말 탈퇴하시겠어요?\n이 작업은 되돌릴 수 없습니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '탈퇴하기',
          style: 'destructive',
          onPress: () => {
            // TODO: 탈퇴 API 호출
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== Header & Avatar ===== */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={22} color="#FFE8D6" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>My Profile</Text>

            <TouchableOpacity onPress={() => setIsEditing((prev) => !prev)}>
              <Feather name="edit-2" size={20} color="#FFE8D6" />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>SJ</Text>
            </View>

            <TouchableOpacity style={styles.cameraBadge}>
              <Feather name="camera" size={16} color="#FF6A21" />
            </TouchableOpacity>
          </View>

          {/* Premium badge */}
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Premium Member</Text>
          </View>
        </View>

        {/* ===== My Stats ===== */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionLabel}>My Stats</Text>

          <View style={styles.statsRow}>
            <StatItem value="3" label="Pets" />
            <StatItem value="12" label="Challenges" />
            <StatItem value="7" label="Day Streak" />
            <StatItem value="45" label="Posts" />
          </View>
        </View>

        {/* ===== Account Information ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Account Information</Text>

          {isEditing ? (
            <>
              <FieldLabel icon="person" label="Full Name" />
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
              />

              <FieldLabel icon="email" label="Email" />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.infoRows}>
              <InfoRow
                icon="person"
                label="Name"
                value={fullName}
              />
              <InfoRow
                icon="email"
                label="Email"
                value={email}
              />
              <InfoRow
                icon="public"
                label="Member since"
                value="January 2024"
              />
            </View>
          )}
        </View>

        {/* ===== Notifications ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Notifications</Text>

          <ToggleRow
            icon="bell"
            label="Push Notifications"
            sub="Get notified about reminders"
            value={pushEnabled}
            onValueChange={setPushEnabled}
          />

          <ToggleRow
            icon="mail"
            label="Email Updates"
            sub="Receive weekly summaries"
            value={emailEnabled}
            onValueChange={setEmailEnabled}
          />
        </View>

        {/* ===== Security & Privacy ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Security & Privacy</Text>

          <ArrowRow
            icon="lock"
            label="Change Password"
            sub="Update your password"
            onPress={() => {
              // TODO: 비밀번호 변경 화면 이동
            }}
          />

          <ArrowRow
            icon="shield"
            label="Privacy Settings"
            sub="Manage your privacy"
            onPress={() => {
              // TODO: 프라이버시 설정 화면 이동
            }}
          />
        </View>

        {/* ===== Account Actions ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Account Actions</Text>

          <ArrowRow
            icon="logout"
            label="Log Out"
            labelColor="#E44E3A"
            sub="Sign out of your account"
            onPress={() => {
              // TODO: 로그아웃 처리
            }}
          />

          <ArrowRow
            icon="delete"
            label="Delete Account"
            labelColor="#E10000"
            sub="Permanently remove your account"
            onPress={handleDeleteAccount}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ==== 작은 컴포넌트들 ==== */

function StatItem({ value, label }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function FieldLabel({ icon, label }) {
  return (
    <View style={styles.fieldLabelRow}>
      <MaterialIcons name={icon} size={18} color="#FF6A21" />
      <Text style={styles.fieldLabelText}>{label}</Text>
    </View>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLabelRow}>
        <MaterialIcons name={icon} size={18} color="#FF6A21" />
        <Text style={styles.infoLabelText}>{label}</Text>
      </View>
      <Text style={styles.infoValueText}>{value}</Text>
    </View>
  );
}

function ToggleRow({ icon, label, sub, value, onValueChange }) {
  return (
    <View style={styles.toggleRow}>
      <View>
        <View style={styles.toggleLabelRow}>
          <MaterialIcons name={icon} size={18} color="#FF6A21" />
          <Text style={styles.toggleLabel}>{label}</Text>
        </View>
        {sub && <Text style={styles.toggleSub}>{sub}</Text>}
      </View>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

function ArrowRow({ icon, label, sub, onPress, labelColor = '#333' }) {
  return (
    <TouchableOpacity style={styles.arrowRow} onPress={onPress}>
      <View>
        <View style={styles.toggleLabelRow}>
          <MaterialIcons name={icon} size={18} color={labelColor} />
          <Text style={[styles.toggleLabel, { color: labelColor }]}>{label}</Text>
        </View>
        {sub && <Text style={styles.toggleSub}>{sub}</Text>}
      </View>
      <Feather name="chevron-right" size={20} color="#BBB" />
    </TouchableOpacity>
  );
}

/* ==== 스타일 ==== */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF5E9',
  },
  content: {
    paddingBottom: 32,
  },

  /* Header */
  header: {
    backgroundColor: '#FF6A21',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: 'center',
  },
  headerTopRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },

  avatarWrapper: {
    marginTop: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6A21',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: (82 / 2) - 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFE8D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 14,
  },
  premiumText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FF6A21',
  },

  /* Stats */
  statsCard: {
    marginTop: 16,
    marginHorizontal: 24,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6A21',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#777',
  },

  /* Sections */
  sectionCard: {
    marginTop: 20,
    marginHorizontal: 24,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  /* Account Info */
  infoRows: {
    marginTop: 6,
  },
  infoRow: {
    backgroundColor: '#F9F3ED',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  infoLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoLabelText: {
    fontSize: 11,
    color: '#999',
    marginLeft: 6,
  },
  infoValueText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  fieldLabelText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  input: {
    backgroundColor: '#F9F3ED',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
  },
  saveButton: {
    marginTop: 6,
    backgroundColor: '#FF6A21',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },

  /* Toggles / Arrow rows */
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  toggleLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  toggleSub: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    marginLeft: 26,
  },
  arrowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  /* Footer */
  footerVersion: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginTop: 24,
  },
  footerMade: {
    textAlign: 'center',
    fontSize: 11,
    color: '#C0A9A0',
    marginTop: 2,
    marginBottom: 14,
  },
});