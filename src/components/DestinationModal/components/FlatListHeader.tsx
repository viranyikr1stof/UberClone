import React from 'react';
import {
  Container,
  DecoratorCircle,
  DecoratorContainer,
  DecoratorLine,
  DecoratorSquare,
  HorizontalContainer,
  InputContainer,
} from './FlatListHeader.styles';
import {DestinationInput} from 'components/DestinationInput';
import {Spacer} from 'components/common/Spacer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';
import {Divider} from 'components/common/Divider';

interface FlatListHeaderProps {
  destinationValue: string;
  onDestinationTextChange: (text: string) => void;
}

export const FlatListHeader = ({
  destinationValue,
  onDestinationTextChange,
}: FlatListHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Container>
        <Spacer height={insets.top + scale(60)} />
        <HorizontalContainer>
          <DecoratorContainer>
            <DecoratorCircle />
            <DecoratorLine />
            <DecoratorSquare />
          </DecoratorContainer>
          <Spacer width={scale(10)} />
          <InputContainer>
            <DestinationInput disabled placeholder="Jelenlegi Helyzet" />
            <Spacer height={scale(10)} />
            <DestinationInput
              value={destinationValue}
              onChangeText={onDestinationTextChange}
              autoFocus
            />
          </InputContainer>
        </HorizontalContainer>
        <Spacer height={scale(15)} />
        <Divider />
      </Container>
      <Spacer height={scale(15)} />
    </>
  );
};
