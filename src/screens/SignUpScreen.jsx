import React from "react";
import { View, Text } from "react-native";

const SignUpScreen = () => {

    return
     <View>
        <Button
         title='로그인 화면으로'
         onPess={()=>navigation.navigate('login')}/>
    </View>
}

export default SignUpScreen;