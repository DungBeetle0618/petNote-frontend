import React from 'react'

import { View, Text, TextInput, Button } from 'react-native';
import { useAuth } from '../auth/AuthProvider';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [id, setId] = React.useState('');
  const [pw, setPw] = React.useState('');

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>로그인</Text>
      <TextInput
        placeholder="ID"
        value={id}
        onChangeText={setId}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />
      <Button title="Login" onPress={() => signIn(id, pw)} />
    </View>
  );
}