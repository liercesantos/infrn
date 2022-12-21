import React from 'react';
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Text,
  Stack
} from "native-base";

const AppCard = (props) => {

 return (
   <Box
     {...props}
     rounded={"lg"}
     overflow={"hidden"}
     borderColor={"coolGray.200"}
     borderWidth={"1"}
     _dark={{
       borderColor: "coolGray.600",
       backgroundColor: "gray.700"
     }}
     _web={{
       shadow: 2,
       borderWidth: 0
     }}
     _light={{
       backgroundColor: "gray.50"
     }}>
     {props.children}
   </Box>
 );
}

const AppImageCardHeader = (props) => {

  return (
    <Box {...props}>
      <AspectRatio w="100%" ratio={16 / 9}>
        <Image source={{ uri: props.uri }} alt="image" />
      </AspectRatio>
      <Center
        bg={"primary.700"}
        _dark={{
          bg: "primary.300"
        }}
        _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }}
        position={"absolute"}
        bottom={"0"}
        px={"3"}
        py={"1.5"}>
        {props.children}
      </Center>
    </Box>
  );
}

const AppCardBody = (props) => {
  return (
    <Stack p={"4"} space={3}>
      <Stack space={2}>
        <Heading size={"md"} ml={"-1"}>
          {props.title}
        </Heading>
        <Text
          fontSize={"xs"}
          _light={{
            color: "violet.500"
          }}
          _dark={{
            color: "violet.400"
          }}
          fontWeight="500"
          ml={"-0.5"}
          mt={"-1"}>
          {props.subtitle}
        </Text>
        {props.children}
      </Stack>
    </Stack>
  );
}

const AppCardFooter = (props) => {

  return (
    <HStack alignItems={"center"} space={4} justifyContent={"space-between"}>
      <HStack alignItems={"center"}>
        <Text
          color={"coolGray.600"}
          _dark={{
            color: "warmGray.200"
          }}
          fontWeight={"400"}>
          {props.children}
        </Text>
      </HStack>
    </HStack>
  );
}

export {AppCard, AppImageCardHeader, AppCardBody, AppCardFooter};