import React from 'react';
import {Text} from 'react-native';

/**
 * 남양주 고딕 Bold 텍스트
 * @param {*} props 
 * @returns 
 */
const BoldTextN = props => {
  return (
    <Text
      {...props}
      style={[{
        fontFamily: '남양주고딕Bold (OTF)',
        letterSpacing: -1
      }, props.style,]}>
      {props.children}
    </Text>
  );
};

export default BoldTextN;