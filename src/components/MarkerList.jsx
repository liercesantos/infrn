import React, { useState } from "react";
import { Text, View } from "react-native";
import MarkerRow from "./MarkerRow";
import { useApp } from "../hooks/useApp";
import { Box, Divider, FlatList } from "native-base";
import { IconButton } from "./FloatButtom";


export default function MarkerList({navigation}) {
  const {styles, markers} = useApp();
  const renderRows = ({item}) => (
    <>
      <MarkerRow marker={item} navigation={navigation} />
    </>
  )

  return (
    <Box height="full">
      {markers.length > 0 ?
        <FlatList
          data={markers}
          ItemSeparatorComponent={Divider}
          renderItem={renderRows}
        /> :
        <IconButton
          icon={'add'}
          bgColor={styles.textColor}
          position={{ right: 16, bottom: 16 }}
          onPress={() => {
            navigation.navigate('MarkerForm');
          }}/>
      }
    </Box>
  )
}
