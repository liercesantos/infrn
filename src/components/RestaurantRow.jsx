import React, {memo} from "react";
import {
  AppCard,
  AppCardBody,
  AppCardFooter,
  AppImageCardHeader
} from "./AppCard";
import { DecimalConverter } from "../utils/form.helpers";
import { Box, Divider, useTheme } from "native-base";
import { AppButton } from "./AppButton";

const RestaurantRow = ({restaurant, navigation}) => {
  const { colors } = useTheme();

  const handleCategories = () => {
    return restaurant.categories.map((category) => {
      return category.alias;
    }).join(' - ');
  }

  const handleDistance = () => {
    if(restaurant.distance > 1000){
      return `${DecimalConverter((restaurant.distance / 1000), 1, ',', '.')} Km`
    }

    return `${DecimalConverter(restaurant.distance, 1, ',', '.')} m`
  }

  const handleIsOpenNow = () => {
    if(restaurant.hours.length > 0){
      return restaurant.hours[0].is_open_now ? ' - Aberto' : ' - Fechado';
    }
     return '';
  }

  const onBtnPress = () => {
    console.log(restaurant.coordinates)
  }

  return (
    <Box px={'8px'} mt={'16px'} mb={'16px'}>
      <AppCard w={'100%'}>
        <AppImageCardHeader uri={restaurant.photos[0]}>
          Detalhes
        </AppImageCardHeader>
        <AppCardBody
          title={restaurant.name}
          subtitle={
            `Nota: ${DecimalConverter(restaurant.rating, 1, '.')} - ` +
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