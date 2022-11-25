import React from 'react';
import AppProvider from "./src/context/AppProvider";
import AppTheme from "./src/theme/AppTheme";
import BottomNavigator from "./src/routes/BottomNavigator";

const App = () => {
  return (
    <AppProvider>
      <AppTheme>
        <BottomNavigator />
      </AppTheme>
    </AppProvider>
  );
};

export default App;
