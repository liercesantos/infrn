import React, { useState } from "react";
import { Text, View } from "react-native";
import MarkerRow from "./MarkerRow";
import { useApp } from "../hooks/useApp";
import { Box, Divider, FlatList } from "native-base";


export default function MarkerList({navigation}) {
  const {markers} = useApp();
  const renderRows = ({item}) => (
    <>
      <MarkerRow marker={item} navigation={navigation} />
    </>
  )

  return (
    <Box height="full">
      <FlatList
        data={markers}
        ItemSeparatorComponent={Divider}
        renderItem={renderRows}
      />
    </Box>
  )
}
