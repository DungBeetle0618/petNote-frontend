import React, {useRef, useState} from "react";
import { View, Text, TextInput, Button } from "react-native";

const SignUpScreen = () => {
    const [id, setId] = useState('');

    return (
        <View>
            <Text>아이디</Text>
                <TextInput
                    value={id}
                    onChangeText={setId}
                    
                />

            <Button
            title='로그인 화면으로'
            onPess={()=>navigation.navigate('login')}/>
        </View>
    )
}

export default SignUpScreen;