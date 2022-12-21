import React, {memo} from "react";
import {
  AppCard,
  AppCardBody,
  AppCardFooter,
  AppImageCardHeader
} from "./AppCard";
import { DecimalConverter, generateColor } from "../utils/form.helpers";
import { Box, Divider, Text, useTheme } from "native-base";
import { AppButton } from "./AppButton";
import { useDispatch } from "react-redux";
import { Pressable } from "react-native";
import { restaurantSlice, update } from "../redux/restaurantSlice";
import { useApp } from "../hooks/useApp";
import { useAppMarkers } from "../hooks/useAppMarkers";

const RestaurantRow = ({data, navigation}) => {
  const { colors } = useTheme();
  const {markers, setMarkers, setRunning} = useApp();
  const {addMarker, getMarkers} = useAppMarkers();
  const dispatch = useDispatch();

  const handleCategories = () => {
    return data.categories.map((category) => {
      return category.alias;
    }).join(' - ');
  }

  const handleDistance = () => {
    if(data.distance > 1000){
      return `${DecimalConverter((data.distance / 1000), 1, ',', '.')} Km`
    }

    return `${DecimalConverter(data.distance, 1, ',', '.')} m`
  }

  const handleIsOpenNow = () => {
    if(data.hours.length > 0){
      return data.hours[0].is_open_now ? ' - Aberto' : ' - Fechado';
    }
     return '';
  }

  const onBtnPress = () => {
    const form = {
      name: data.name,
      color: generateColor(),
      coords: {
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude
      }
    }

    addMarker(form, markers, () => {
      getMarkers((_markers) => {
        setMarkers(_markers);
        setRunning(false);
        console.log('Marcador adicionado.');
        navigation.navigate('List');
      });
    }).catch(err => console.log('Erro ao adicionar o marcador.'));
  }

  const toDetails = () => {
    dispatch(restaurantSlice.actions.update({
      name: data.name,
      price: data.price,
      distance: handleDistance(),
      rating: DecimalConverter(data.rating, 1, '.'),
      coordinates: {
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude
      },
      categories: handleCategories(),
      is_open_now: handleIsOpenNow(),
      schedule: data.hours.length > 0 ? data.hours[0].open : [],
      url: data.url,
      photo: data.photos[0]
    }));

    navigation.navigate('Restaurant');
  }

  return (
    <Box px={'8px'} mt={'16px'} mb={'16px'}>
      <AppCard w={'100%'}>
        <AppImageCardHeader uri={data.photos[0]}>
          <Pressable onPress={toDetails}>
            <Text color={'white'}>Detalhes</Text>
          </Pressable>
        </AppImageCardHeader>
        <AppCardBody
          title={data.name}
          subtitle={
            `Nota: ${DecimalConverter(data.rating, 1, '.')} - ` +
            `${handleDistance()}` +
            `${handleIsOpenNow()}`
          }>
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
            {handleCategories()}
          </AppCardFooter>
        </AppCardBody>
      </AppCard>
    </Box>
  )
}

export default memo(RestaurantRow);