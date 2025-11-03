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
      style={[{
        fontFamily: 'NanumSquareR',
      }, props.style,]}>
      {props.children}
    </Text>
  );
};

export default RegularText;