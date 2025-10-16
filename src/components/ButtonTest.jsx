import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';

/**
 * 스타일
 * 'react-native'에서 StyleSheet를 import 해야 사용할수있습니당
 */
const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: 150,
    height: 50,
  },
});

function clickBtn() {
  console.log('aaa') //npx react-native log-android 로 확인가능

  //Alert도 import 후 사용가능
  Alert.alert(
    '테스트ㅎㅎ',
    '확인하셨습니까?',
    [
      {text: '확인', onPress:()=>{}, style: 'cancel'}
    ],
    {
      cancelable: true,
      onDismiss: () => {}
    }
  )
}


const ButtonTest = () => {
  return (
    <View style={styles.button} >
        {/* onPress가 Button에만 먹는건지.. View에 다니까 안되는거 같더라구요 
            Button도 import!!
        */}
        <Button onPress={clickBtn} title='컴포넌트테스트'/>
    </View>
  );
};


//export default는 필수!!!!
export default ButtonTest;