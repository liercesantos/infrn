import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator, Text } from "react-native";

export const CustomPressable = styled.Pressable`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

export const AppButton = ({bg, onPress, children, loading}) => {
  const bgColor = loading ? '#3a3a3a' : bg;

  return(
    <CustomPressable color={bgColor} onPress={() => {
      if(!loading){
        onPress()
      }
    }}>
      {loading ? <ActivityIndicator size={'small'} color={'#FFFFFF'} style={{marginRight: 8}} /> : <></> }
      <Text style={{fontSize: 24, color: '#FFFFFF'}}>{children}</Text>
    </CustomPressable>
  );
}
