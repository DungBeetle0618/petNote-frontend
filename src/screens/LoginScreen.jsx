import React from 'react'

import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../auth/AuthProvider';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [userId, setUserId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>로그인</Text>
      <TextInput
        placeholder="ID"
        value={userId}
        onChangeText={setUserId}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />
      <Button title="Login" onPress={() => signIn(userId, password)} />
      <Button title="회원가입" onPress={()=>navigation.navigate('signUp')} />
      <TouchableOpacity
        title='회원가입 화면으로'
        onPress={()=>navigation.navigate('signUp')}>
          <Text>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}