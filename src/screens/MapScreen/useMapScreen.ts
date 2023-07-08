import { useUserLocationStateContext } from "context/UserLocationSateContext"
import { useTextSearchQuery } from "models/places/useTextSearchQuery"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import type { LatLng, UserLocationChangeEvent } from "react-native-maps"
import type MapView from "react-native-maps"
import { MapDirectionsResponse } from 'react-native-maps-directions'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { scale } from "react-native-size-matters"

const LATITUDE_DELTA = 0.0022
const LONTITUDE_DELTA = 0.005

export const useMapScreen = () => {
  const mapRef = useRef<MapView>(null)  
  const [modalVisible, setModalVisible] = useState(false)
  const [mapMarkers, setMapMarkers] = useState<LatLng[]>([])
  const [mapDirections, setMapDirections] = useState<MapDirectionsResponse>()
  const insets = useSafeAreaInsets()

  const {userLocation, setUserLocation} = useUserLocationStateContext()

  const isRouteVisible = mapMarkers.length === 2

  useEffect(() => {
    if (mapDirections?.coordinates) {
      mapRef.current?.fitToCoordinates(mapDirections?.coordinates, {
        edgePadding: {
          top: insets.top + scale(15),
          bottom: scale(15),
          left: scale(15),
          right: scale(15),
        }
      })
    }
  }, [mapDirections?.coordinates, insets.top])
  
  const centerToUserLocaion = useCallback(() => {
    if (userLocation) {
      mapRef.current?.animateToRegion({
          longitude: userLocation.coords.longitude,
          latitude: userLocation.coords.latitude,
          longitudeDelta: LONTITUDE_DELTA,
          latitudeDelta: LATITUDE_DELTA
      })
  }
  }, [userLocation])

    useEffect(() => {
      centerToUserLocaion
    }, [centerToUserLocaion])

    const closeDestinationModal = () => {
      setModalVisible(false)
    }

  const handleUserLocationChange = ({
    nativeEvent: {coordinate},
  }: UserLocationChangeEvent) => {
    if (coordinate && !modalVisible && !isRouteVisible) {
      setUserLocation({
        coords: {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude
        }
      })
    }
  }

  const handleMapSearchBarPress = () => {
    setModalVisible(true)
  }

  const handlePlaceItemPress = (coords: LatLng) => {
    return () => {
      if (userLocation?.coords) {
        setMapMarkers([userLocation?.coords, coords])
        setModalVisible(false)
      }
    }
  }

  const handleMapDirectionsReady = (routeInfo: MapDirectionsResponse) => {
    setMapDirections(routeInfo)
  }

  const handleRoundButtonPress = () => {
    if (isRouteVisible) {
      setMapMarkers([])
      centerToUserLocaion()
    }
  }

  return {
    models: {
        mapRef,
        modalVisible,
        mapMarkers,
        isRouteVisible
    }, 
    operations: {
        handleUserLocationChange,
        handleMapSearchBarPress,
        closeDestinationModal,
        handlePlaceItemPress,
        handleMapDirectionsReady,
        handleRoundButtonPress
    }
  }
}
