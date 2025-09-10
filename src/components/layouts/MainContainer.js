import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppHeader from "../navigation/AppHeader";
import Sidebar from "../navigation/Sidebar";
import MainStackNavigator from "../../navigation/MainStackNavigator";
import { globalStyles } from "../../styles/globalStyles";
import { MainNavigationProvider } from "../../context/MainNavigationContext";

// Mapeo de rutas a títulos
const ROUTE_TITLES = {
  HomeContent: "Inicio",
  ProfileContent: "Mi Perfil",
};

/**
 * Container principal que mantiene header y sidebar estáticos
 * mientras cambia solo el contenido interno
 */
const MainContainer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentTitle, setCurrentTitle] = useState("Inicio");

  return (
    <MainNavigationProvider>
      <View style={globalStyles.container}>
        {/* Header estático */}
        <AppHeader title={currentTitle} />

        {/* Contenido que cambia */}
        <View style={styles.content}>
          <MainStackNavigator />
        </View>

        {/* Sidebar estático */}
        <Sidebar />
      </View>
    </MainNavigationProvider>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default MainContainer;
