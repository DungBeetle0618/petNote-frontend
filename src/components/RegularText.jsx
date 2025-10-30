import React from 'react';
import {Text} from 'react-native';

/**
 * Regular 텍스트
 * @param {*} props 
 * @returns 
 */
const RegularText = props => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontFamily: 'NanumSquareR',
      }}>
      {props.children}
    </Text>
  );
};

export default RegularText;