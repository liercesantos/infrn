import React, { useState } from "react";
import MarkerList from "../components/MarkerList";
import { View } from "react-native";
import { AppHeader } from "../components/AppHeader";


export default function ListScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <AppHeader navigation={navigation} title={"Marcadores"} />

      <View style={{flex: 1, marginTop: 32}}>
        <MarkerList navigation={navigation} />
      </View>
    </View>
  )
}
