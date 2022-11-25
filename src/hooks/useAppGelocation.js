import React, { useState } from "react";
import { PermissionsAndroid } from "react-native";
import Geolocation from '@react-native-community/geolocation';

export const useAppGeoLocation = () => {
  const [allowed, setAllowed] =  useState(false);

  const allowGeolocation = async () => {
    return new Promise((resolve, reject) => {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Infnet - React Native",
            message:
              "O aplicativo Infnet - React Native precisa de acesso a sua localização, " +
              "assim você poderá visualizar a região próxima a você.",
            buttonNeutral: "Perguntar depois",
            buttonNegative: "Negar",
            buttonPositive: "Aceitar"
          }
        ).then((status) => {
          const response = status === PermissionsAndroid.RESULTS.GRANTED;
          setAllowed(response);
          resolve(response);
        });

      } catch (err) {
        reject(err);
      }
    })
  }

  const getCurrentPosition = (getPosition) => {
    Geolocation.getCurrentPosition(
      (position) => {
        getPosition({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          longitudeDelta: 0.004,
          latitudeDelta: 0.009
        });
      },
      (error) => console.log('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true }
    );
  };

  return {
    allowGeolocation: allowGeolocation,
    currentPosition: getCurrentPosition,
    allowed
  };
};
