import React from 'react';
import { extendTheme, NativeBaseProvider } from "native-base";
import { useApp } from "../hooks/useApp";


const AppTheme = ({children}) => {
  const {styles, isDarkMode} = useApp();

  const appColors = {
    custom: {
      50: '#ecfeff',
      100: '#E6E6E4',
      200: '#CBCBCB',
      300: '#408FCE',
      400: '#2169A3',
      500: '#2F74C8',
      600: '#155e75',
      700: '#164e63',
      800: '#174e63',
      900: '#184e63',
    },
  };
  const theme = extendTheme({
    colors: appColors,
    components: {
      Button: {
        defaultProps: {
          colorScheme: 'custom',
        },
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      {children}
    </NativeBaseProvider>
  );
};

export default AppTheme;
