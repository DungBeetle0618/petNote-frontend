import React from 'react';
import {Text} from 'react-native';

/**
 * Light 텍스트
 * @param {*} props 
 * @returns 
 */
const LightText = props => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontFamily: 'NanumSquareL',
      }}>
      {props.children}
    </Text>
  );
};

export default LightText;