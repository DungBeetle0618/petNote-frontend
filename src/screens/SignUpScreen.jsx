import React, {useRef, useState} from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { signUp } from "../api/auth"

const SignUpScreen = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [nickname, setNickname] = useState('');

    const navigation = useNavigation();

    console.log("g2")
    const submit = async () => {
        console.log('클릭')
        try {
            const payload = { userId, password, confirmPassword, email, phone, nickname };
            const { data } = await signUp(payload);
            Alert.alert('가입 완료', '로그인 화면으로 이동합니다.');
            navigation.navigate('login');
        } catch(e) {
            Alert.alert(e)
            console.log(e)
        }
    }


    return (
        <View>
            <Text>아이디</Text>
            <TextInput
                value={userId}
                onChangeText={setUserId}
                onSubmitEditing={()=>inputRef.current.focus()}
            />
            <Text>비밀번호</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Text>비밀번호 확인</Text>
            <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
            />
            <Text>이메일</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="example@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
            />
            <Text>휴대폰 번호</Text>
            <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="01012345678"
                keyboardType="number-pad"
                returnKeyType="next"
            />
            <Text>닉네임</Text>
            <TextInput
                value={nickname}
                onChangeText={setNickname}
                placeholder="별명 입력"
                returnKeyType="done"
            />

            
            <Button
            title='회원가입'
            onPress={submit}/>
            <Button
            title='로그인 화면으로'
            onPress={()=>navigation.navigate('login')}/>
        </View>
    )
}

export default SignUpScreen;