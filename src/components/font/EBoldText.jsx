import React from 'react';
import {Text} from 'react-native';

/**
 * Extra Bold 텍스트
 * @param {*} props 
 * @returns 
 */
const EBoldText = props => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontFamily: 'NanumSquareEB',
      }}>
      {props.children}
    </Text>
  );
};

export default EBoldText;