import React from 'react';
import {Text} from 'react-native';

/**
 * 남양주 고딕 Regular 텍스트
 * @param {*} props 
 * @returns 
 */
const RegularTextN = props => {
  return (
    <Text
      {...props}
      style={[{
        fontFamily: '남양주고딕Medium (OTF)',
      }, props.style,]}>
      {props.children}
    </Text>
  );
};

export default RegularTextN;