import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import { Text } from "react-native";
import MarkerFormScreen from "../screens/MarkerFormScreen";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListScreen from "../screens/ListScreen";

const Tab = createBottomTabNavigator();

export default function BottomNavigator(){
  return(
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={"Home"}
        backBehavior="initialRoute"
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon({color, size}) {
              return <Icon name="home" size={size} color={color} />;
            },
            tabBarLabel(){
              return '';
            }
          }} />
        <Tab.Screen
          name="MarkerForm"
          component={MarkerFormScreen}
          initialParams={{ marker: {}, initial: true }}
          options={{
            tabBarIcon({color, size}) {
              return <Icon name="room" size={size} color={color} />;
            },
            tabBarLabel(){
              return '';
            }
          }} />
        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{
            tabBarIcon({color, size}) {
              return <Icon name="list" size={size} color={color} />;
            },
            tabBarLabel(){
              return '';
            }
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
