import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "native-base";


export default function MarkerRow({marker, navigation}) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        navigation.navigate('MarkerForm', { marker: marker, initial: false });
      }}>
      <View style={{...styles.color, backgroundColor: marker.color}}></View>
      <View style={styles.data}>
        <Text style={styles.text}>{marker.name}</Text>
        <Divider />
        <Text style={styles.coords}>
          Lat: {marker.coords.latitude} / Lng: {marker.coords.longitude}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  color: {
    width: 48,
    height: 48,
    borderRadius: 100
  },
  data: {
    flexDirection: 'column',
    paddingLeft: 16,
  }
});
