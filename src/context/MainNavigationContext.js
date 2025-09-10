import React, { createContext, useContext, useState } from "react";

const MainNavigationContext = createContext();

export const MainNavigationProvider = ({ children }) => {
  const [navigation, setNavigation] = useState(null);

  return (
    <MainNavigationContext.Provider value={{ navigation, setNavigation }}>
      {children}
    </MainNavigationContext.Provider>
  );
};

export const useMainNavigation = () => {
  const context = useContext(MainNavigationContext);
  if (context === undefined) {
    throw new Error(
      "useMainNavigation must be used within a MainNavigationProvider"
    );
  }
  return context;
};
