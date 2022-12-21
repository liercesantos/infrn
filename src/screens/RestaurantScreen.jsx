import React from 'react';
import { AppCard, AppCardBody, AppCardFooter, AppImageCardHeader } from "../components/AppCard";
import { Box, Center, Divider, HStack, Text, Pressable, useTheme } from "native-base";
import { AppButton } from "../components/AppButton";
import { useSelector } from "react-redux";
import { AppHeader } from "../components/AppHeader";
import { Linking, View } from "react-native";
import { generateColor } from "../utils/form.helpers";
import { useAppMarkers } from "../hooks/useAppMarkers";
import { useApp } from "../hooks/useApp";

const RestaurantScreen = ({navigation}) => {
  const { colors } = useTheme();
  const {markers, setMarkers, setRunning} = useApp();
  const {addMarker, getMarkers} = useAppMarkers();
  const restaurant = useSelector((state) => state.restaurant.business);

  const handleSeconds = (value) => {
    const hour = value.substring(0, 2);
    const minutes = value.substring(2);
    return `${hour}:${minutes}`;
  }

  const onBtnPress = () => {
    const data = {
      name: restaurant.name,
      color: generateColor(),
      coords: {
        latitude: restaurant.coordinates.latitude,
        longitude: restaurant.coordinates.longitude
      }
    }

    addMarker(data, markers, () => {
      getMarkers((_markers) => {
        setMarkers(_markers);
        setRunning(false);
        console.log('Marcador adicionado.');
        navigation.navigate('List');
      });
    }).catch(err => console.log('Erro ao adicionar o marcador.'));
  }

  return(
    <View style={{flex: 1}}>
      <AppHeader navigation={navigation} title={"Detalhes do Restaurante"} />
      <Box px={'8px'} mt={'16px'} mb={'16px'}>
        <AppCard w={'100%'}>
          <AppImageCardHeader uri={restaurant.photo}>
            <Pressable onPress={() => {
              Linking.openURL(restaurant.url).catch(err => console.error(err))
            }}>
              <Text color={'white'}>Acessar URL</Text>
            </Pressable>
          </AppImageCardHeader>
          <AppCardBody
            title={restaurant.name}
            subtitle={
              `Nota: ${restaurant.rating} - ` +
              `${restaurant.distance}` +
              `${restaurant.is_open_now}`
            }>
            <Box>
              <Text>{restaurant.price ? `Preço: ${restaurant.price}` : ''}</Text>
              <Divider />
              <Box mt={'8px'} mb={'16px'}>
                <Box alignSelf={'center'}>
                  <Center>Horários</Center>
                { restaurant.schedule && restaurant.schedule.length > 0
                  ? restaurant.schedule.map((row, index) => {
                      return(
                        <HStack key={index}>
                          <Center w="20">{handleSeconds(row.start)}</Center>
                          <Center w="20">{handleSeconds(row.end)}</Center>
                        </HStack>
                      )
                    }) : <Text>Horários não definidos.</Text> }
                </Box>
              </Box>
            </Box>
            <Box>
              <AppButton
                bg={colors.custom['400']}
                alignSelf={"center"}
                onPress={onBtnPress}>
                Salvar no Mapa
              </AppButton>
            </Box>
            <Divider />
            <AppCardFooter>
              {restaurant.categories}
            </AppCardFooter>
          </AppCardBody>
        </AppCard>
      </Box>
    </View>
  )
}
export default RestaurantScreen;