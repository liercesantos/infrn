import React from "react";
import { ArrowBackIcon, Flex, Heading, Pressable } from "native-base";

export const AppHeader = ({navigation, title}) => {

  return(
    <Flex pl={8} pr={8} bg={'custom.400'} h={16} justify={'flex-start'} align={'center'} direction={'row'}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <ArrowBackIcon size={8} mr={4} color={'custom.100'} />
      </Pressable>
      <Heading size={'lg'} color={'custom.100'}>{title}</Heading>
    </Flex>
  );
}
