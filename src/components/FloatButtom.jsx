import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const FloatButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  position: absolute;
  ${(props) => props.top ? `top: ${props.top}px` : ''}
  ${(props) => props.right ? `right: ${props.right}px` : ''}
  ${(props) => props.bottom ? `bottom: ${props.bottom}px` : ''}
  ${(props) => props.left ? `left: ${props.left}px` : ''}
  z-index: 999999;
`;

export const IconButton = ({icon, bgColor, position, onPress}) => {
  const {top, right, bottom, left} = position ?? {};

  return(
    <FloatButton
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      color={bgColor}
      onPress={onPress}
    >
      <Icon size={24} name={icon} color={"#FFFFFF"} />
    </FloatButton>
  );
}
