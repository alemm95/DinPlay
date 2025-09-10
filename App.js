import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { SidebarProvider } from "./src/context/SidebarContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <SidebarProvider>
        <AppNavigator />
        <StatusBar style="light" />
      </SidebarProvider>
    </Provider>
  );
}
