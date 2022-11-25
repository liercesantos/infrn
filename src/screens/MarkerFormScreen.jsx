import React, { useCallback, useEffect, useState } from "react";
import { VStack, useTheme, ScrollView, Flex, Box } from "native-base";
import {useFocusEffect} from '@react-navigation/native';
import RequiredFormField from "../components/RequiredFormField";
import { AppButton } from "../components/AppButton";
import { AppHeader } from "../components/AppHeader";
import { validate } from "../utils/form.helpers";
import { useAppMarkers } from "../hooks/useAppMarkers";
import { useApp } from "../hooks/useApp";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { useAppGeoLocation } from "../hooks/useAppGelocation";
import CurrentPosition from "../components/CurrentPosition";

const initialData = {
  id: undefined,
  name: undefined,
  latitude: undefined,
  longitude: undefined,
  color: undefined,
}
export default function MarkerFormScreen({route, navigation}) {
  const {marker, initial} = route.params ?? {};
  const {allowGeolocation, currentPosition} = useAppGeoLocation();
  const { colors } = useTheme();
  const {markers, setMarkers, running, setRunning} = useApp();
  const {addMarker, updateMarker, deleteMarker, getMarkers} = useAppMarkers();
  const [formData, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [position, setPosition] = useState({});

  useEffect(() => {
    allowGeolocation().then((success) => {
      if(success){
        currentPosition(setPosition);
        setRunning(false);
      }
    })

    if(marker?.id) {
      setData({
        id: marker.id,
        name: marker.name,
        latitude: `${marker.coords.latitude}`,
        longitude: `${marker.coords.longitude}`,
        color: marker.color,
      })
    }

    if(initial){
      setData(initialData)
    }
  }, [marker?.id]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        navigation.setParams({marker: {}, initial: true})
      };
    }, []),
  );

  const onSubmit = () => {
    if(validate(formData, setErrors, errors)){
      const data = {
        name: formData.name,
        color: formData.color,
        coords: {
          latitude: +formData.latitude,
          longitude: +formData.longitude
        }
      }
      setRunning(true);
      if(formData.id){
        data.id = formData.id;
        updateMarker(data, markers, () => {
          getMarkers((_markers) => {
            setMarkers(_markers);
            setRunning(false);
            setData(initialData);
            console.log('Marcador atualizado.');
            navigation.navigate('List');
          });
          setErrors({});
        }).catch(err => console.log('Erro ao atualizar o marcador.'));
        return;
      }
      addMarker(data, markers, () => {
        getMarkers((_markers) => {
          setMarkers(_markers);
          setRunning(false);
          console.log('Marcador adicionado.');
          navigation.navigate('List');
        });
        setErrors({});
      }).catch(err => console.log('Erro ao adicionar o marcador.'));
    }
  };

  const onDelete = () => {
    setRunning(true);
    if(formData.id){
      deleteMarker(formData.id, markers, () => {
        getMarkers((_markers) => {
          setMarkers(_markers);
          setRunning(false);

          console.log('Marcador removido.');
          navigation.navigate('List');
        });
        setErrors({});
      });
    }
  };

  return (
    <VStack width="100%" maxW="100%">
      <AppHeader navigation={navigation} title={`${ marker?.id ? "Editar Marcador" : "Adicionar Marcador" }`} />
      <CurrentPosition location={position} />

      <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode={"never"}>
          <Flex pl={8} pr={8} pb={48} mt={8}>
            <RequiredFormField
              label={"Nome do marcador"}
              placeholder="(Ex: Loja de Doces)"
              value={formData.name}
              error={errors.name}
              max={12}
              onChange={value => setData({ ...formData, name: value })} />

            <RequiredFormField
              label={"Latitude"}
              placeholder="(Ex: 47.125446)"
              value={formData.latitude}
              error={errors.latitude}
              type={'numeric'}
              max={11}
              onChange={value => {
                setData({ ...formData, latitude: value.replace(/[ A-z*;,<>\{\}\[\]\\\/]/gi, '') })
              }} />

            <RequiredFormField
              label={"Longitude"}
              placeholder="(Ex: 47.125446)"
              value={formData.longitude}
              error={errors.longitude}
              type={'numeric'}
              max={11}
              onChange={value => {
                setData({ ...formData, longitude: value.replace(/[ A-z*;,<>\{\}\[\]\\\/]/gi, '') })
              }} />

            <RequiredFormField
              label={"Cor do marcador"}
              placeholder="(Ex: #000099)"
              value={formData.color}
              error={errors.color}
              max={7}
              onChange={value => {
                setData({ ...formData, color: value.replace(/[- *;,<>\{\}\[\]\\\/]/gi, '') })
              }} />

            <AppButton bg={colors.custom['400']} onPress={onSubmit} loading={running}>
              Salvar
            </AppButton>

            { formData.id ?
              <AppButton bg={'#b75050'} onPress={onDelete} loading={running}>
                Remover
              </AppButton> : <></>
            }
          </Flex>
        </ScrollView>
      </KeyboardAvoidingView>
    </VStack>
  )
}
