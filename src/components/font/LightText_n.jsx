import React from 'react';
import {Text} from 'react-native';

/**
 * 남양주 고딕 Light 텍스트
 * @param {*} props 
 * @returns 
 */
const LightTextN = props => {
  return (
    <Text
      {...props}
      style={[{
        fontFamily: '남양주고딕Light (OTF)',
      }, props.style,]}>
      {props.children}
    </Text>
  );
};

export default LightTextN;