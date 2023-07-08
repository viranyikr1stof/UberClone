import React from 'react';
import {Modal} from 'react-native';
import {RoundButton} from 'components/RoundButton';
import {StyledFlatList, useStyles} from './DestinationModa.styles';
import {FlatListHeader} from './components/FlatListHeader';
import {useDestinationModal} from './useDestinationModal';
import {PlaceItem} from 'components/common/PlaceItem';
import {TextSearchItem} from 'models/places/types/TextSearchItem';
import {Spacer} from 'components/common/Spacer';
import {scale} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LatLng} from 'react-native-maps';

interface DestinationModalProps {
  visible: boolean;
  closeModal: () => void;
  onPlaceItemPress: (coords: LatLng) => () => void;
}

const itemSeparatorComponent = () => <Spacer height={scale(15)} />;

export const DestinationModal = ({
  visible,
  closeModal,
  onPlaceItemPress,
}: DestinationModalProps) => {
  const {models, operations} = useDestinationModal();
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);

  const handleRoundButtonPress = () => {
    closeModal();
  };

  const renderFlatListItem = ({item}: {item: TextSearchItem}) => {
    return (
      <PlaceItem
        key={item.place_id}
        name={item.name}
        iconUrl={item.icon}
        address={item.formatted_address}
        onPress={onPlaceItemPress({
          latitude: item.geometry.location.lat,
          longitude: item.geometry.location.lng,
        })}
      />
    );
  };

  return (
    <Modal onRequestClose={closeModal} visible={visible} animationType="fade">
      <StyledFlatList
        stickyHeaderIndices={[0]}
        data={models.textSearchQueryResponseData}
        renderItem={renderFlatListItem}
        ItemSeparatorComponent={itemSeparatorComponent}
        contentContainerStyle={styles.flatlistContainer}
        ListHeaderComponent={
          <FlatListHeader
            destinationValue={models.destinationInputValue}
            onDestinationTextChange={
              operations.handleDestinationInputTextChange
            }
          />
        }
      />
      <RoundButton icon="arrow-back-outline" onPress={handleRoundButtonPress} />
    </Modal>
  );
};
