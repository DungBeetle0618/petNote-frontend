import React from 'react';
import {Text} from 'react-native';

/**
 * Bold 텍스트
 * @param {*} props 
 * @returns 
 */
const BoldText = props => {
  return (
    <Text
      {...props}
      style={[{
        fontFamily: 'NanumSquareB',
      }, props.style,]}>
      {props.children}
    </Text>
  );
};

export default BoldText;