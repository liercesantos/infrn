import React, { createContext, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StatusBar, useColorScheme, View } from "react-native";
import { useAppMarkers } from "../hooks/useAppMarkers";

export const AppContext = createContext({
  running: false,
  setRunning: () => {},
  markers: [],
  setMarkers: () => {},
  isDarkMode: false,
  styles: {}
});

const screen = Dimensions.get('window').height;
export default function AppProvider({children}) {
  const isDarkMode = useColorScheme() === 'dark';
  const {getMarkers} = useAppMarkers();
  const [running, setRunning] = useState(false);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setRunning(true);
    getMarkers((response) => {
      console.log(response)
      setMarkers(response);
      setRunning(false);
    });
  }, []);

  const styles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#2169A3" : "#CBCBCB",
      flexDirection: "column"
    },
    statusbarColor: isDarkMode ? "#2169A3" : "#2F74C8",
    backgroundColor: isDarkMode ? "#2169A3" : "#CBCBCB",
    textColor: isDarkMode ? "#2169A3" : "#2F74C8",
    map: {
      width: '100%',
      height: '100%',
    },
  };

  return (
    <AppContext.Provider value={{
      running,
      setRunning,
      markers,
      setMarkers,
      isDarkMode,
      styles
    }}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={styles.statusbarColor} />
        {children}
      </SafeAreaView>
    </AppContext.Provider>
  )
}


