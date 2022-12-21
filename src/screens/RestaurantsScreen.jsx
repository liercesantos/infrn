import React, { useEffect, useState } from "react";

import { View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { useAppGeoLocation } from "../hooks/useAppGelocation";
import { useApp } from "../hooks/useApp";
import RestaurantsList from "../components/RestaurantsList";

export default function RestaurantsScreen({navigation}) {
  const {allowGeolocation, currentPosition} = useAppGeoLocation();
  const {setRunning} = useApp();
  const [position, setPosition] = useState({});

  useEffect(() => {
    allowGeolocation().then((success) => {
      if(success){
        currentPosition(setPosition);
        setRunning(false);
      }
    });
  });

  return (
    <View style={{flex: 1}}>
      <AppHeader navigation={navigation} title={"Restaurantes Próximos"} />

      { position.latitude
        ? <RestaurantsList
            navigation={navigation}
            latitude={position.latitude}
            longitude={position.longitude} />
        : <></>
      }
    </View>
  )
}