import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const MainStack = createNativeStackNavigator();

/**
 * Navegador interno para pantallas principales (sin header ni animaciones)
 * Se usa dentro del MainLayout para cambiar solo el contenido
 */
const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false, // Sin header propio
        animation: "fade", // Animación suave de fade en lugar de slide
        animationDuration: 200, // Animación más rápida
      }}
      initialRouteName="HomeContent"
    >
      <MainStack.Screen
        name="HomeContent"
        component={HomeScreen}
        options={{ title: "Inicio" }}
      />
      <MainStack.Screen
        name="ProfileContent"
        component={ProfileScreen}
        options={{ title: "Mi Perfil" }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
