import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "native-base";


export default function CurrentPosition({location}) {
  return (
    <View style={styles.row}>
      <View style={styles.data}>
        <Text style={styles.text}>Localização Atual</Text>
        <Divider />
        <Text style={styles.coords}>
          Lat: {location.latitude} / Lng: {location.longitude}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    padding: 8,
    marginVertical: 8,
  },
  text: {
    fontSize: 24,
    color: '#000000'
  },
  coords: {
    fontSize: 12,
    color: '#000000'
  },
  data: {
    flexDirection: 'column'
  }
});
