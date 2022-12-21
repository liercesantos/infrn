import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components/native';
import MapView, {Marker, MapMarker} from 'react-native-maps';
import analytics from '@react-native-firebase/analytics';
import { useApp } from '../hooks/useApp';
import DayMap from '../utils/day-map.json';
import NightMap from '../utils/night-map.json';
import { useAppGeoLocation } from "../hooks/useAppGelocation";
import { IconButton } from "../components/FloatButtom";
import { Markers } from "../components/Markers";

const MapContainer = styled.View`
  width: 100%;
  height: 100%;
`;
export default function HomeScreen({route, navigation}) {
  const {styles, isDarkMode, setRunning} = useApp();
  const {allowGeolocation, currentPosition} = useAppGeoLocation();
  const [position, setPosition] = useState({
    longitude: 0,
    latitude: 0,
    longitudeDelta: 0.004,
    latitudeDelta: 0.009
  });
  const mapMode = isDarkMode ? NightMap : DayMap;

  useEffect(() => {
    allowGeolocation().then((success) => {
      if(success){
        currentPosition(setPosition);
        setRunning(false);
      }
    })
  }, []);

  useEffect(() => {
    analytics().logEvent('position', {
      latitude: position.latitude,
      longitude: position.longitude
    }).finally();
  }, [position]);

  return (
    <MapContainer>
      <IconButton
        icon={'add'}
        bgColor={styles.textColor}
        position={{ right: 16, bottom: 16 }}
        onPress={() => {
          navigation.navigate('MarkerForm');
        }}/>

      <MapView
        showsUserLocation
        showsBuildings={false}
        showsIndoors={false}
        showsMyLocationButton={true}
        showsCompass={false}
        toolbarEnabled={false}
        customMapStyle={mapMode}
        style={styles.map}
        region={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: position.latitudeDelta,
          longitudeDelta: position.longitudeDelta,
        }}>
        <Markers navigation={navigation} />
      </MapView>
    </MapContainer>
  )
}
