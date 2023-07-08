import {View, Text} from 'react-native';
import React from 'react';
import {BodyText, TitleText, CaptionText} from './CustomText.stlyes';

interface CustomText {
  variant: 'body' | 'title' | 'caption';
  children: string;
}

const getComponent = (variant: CustomText['variant']) => {
  switch (variant) {
    case 'body':
      return BodyText;
    case 'title':
      return TitleText;
    case 'caption':
      return CaptionText;
    default:
      return BodyText;
  }
};

export const CustomText = ({variant, children}: CustomText) => {
  const Component = getComponent(variant);

  return <Component>{children}</Component>;
};
