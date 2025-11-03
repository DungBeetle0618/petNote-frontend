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
      style={{
        ...props.style,
        fontFamily: '남양주고딕Bold (OTF)',
      }}>
      {props.children}
    </Text>
  );
};

export default BoldTextN;