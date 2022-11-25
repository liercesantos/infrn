import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Marker } from "react-native-maps";
import { Avatar } from "native-base";
import { useApp } from "../hooks/useApp";
import { getInitials } from "../utils/map.helpers";

export const Markers = ({navigation}) => {
  const {running, markers} = useApp();

  return(
    <View>
      { !running && markers.map(marker =>
          marker?.id &&
          marker?.coords && (
            <Marker.Animated
              key={marker.id}
              coordinate={marker.coords}
              onPress={() => {
                navigation.navigate('MarkerForm', { marker: marker, initial: false });
              }}>
              <Avatar size={'42px'} bgColor={marker.color}>{getInitials(marker.name)}</Avatar>
            </Marker.Animated>
          )
      )}
    </View>
  );
}
