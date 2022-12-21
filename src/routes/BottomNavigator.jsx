import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MarkerFormScreen from "../screens/MarkerFormScreen";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import ListScreen from "../screens/ListScreen";
import RestaurantsScreen from "../screens/RestaurantsScreen";
import RestaurantScreen from "../screens/RestaurantScreen";

const Tab = createBottomTabNavigator();

export default function BottomNavigator(){
  return(
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={"Home"}
        backBehavior="initialRoute"
        screenOptions={({ route }) => ({
          tabBarButton: [
            "Restaurant",
          ].includes(route.name)
            ? () => {
              return null;
            }
            : undefined,
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
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
            headerShown: false,
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
            headerShown: false,
            tabBarIcon({color, size}) {
              return <Icon name="list" size={size} color={color} />;
            },
            tabBarLabel(){
              return '';
            }
          }} />
        <Tab.Screen
          name="Restaurants"
          component={RestaurantsScreen}
          options={{
            headerShown: false,
            tabBarIcon({color, size}) {
              return <Icon name="local-dining" size={size} color={color} />;
            },
            tabBarLabel(){
              return '';
            }
          }} />
        <Tab.Screen name="Restaurant" component={RestaurantScreen} options={{headerShown: false}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
