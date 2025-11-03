import React from 'react';
import {Text} from 'react-native';

/**
 * 남양주 고딕 Extra Bold 텍스트
 * @param {*} props 
 * @returns 
 */
const EBoldTextN = props => {
  return (
    <Text
      {...props}
      style={[{
        fontFamily: '남양주고딕Extra Bold (OTF)',
        letterSpacing: -2
      }, props.style,]}>
      {props.children}
    </Text>
  );
};

export default EBoldTextN;