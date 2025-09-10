import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../constants/theme";
import LoginScreen from "../screens/LoginScreen";
import MainContainer from "../components/layouts/MainContainer";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { checkAuthStatus } from "../store/slices/authSlice";
import { View, Text, ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const [isInitialCheck, setIsInitialCheck] = useState(true);

  useEffect(() => {
    // Verificar estado de autenticación al iniciar la app
    const checkAuth = async () => {
      await dispatch(checkAuthStatus());
      setIsInitialCheck(false);
    };

    checkAuth();
  }, [dispatch]);

  // Mostrar loading solo durante la verificación inicial
  if (isInitialCheck && loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: COLORS.text }}>
          Verificando autenticación...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade", // Animación suave entre Login y Main
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Main"
          component={MainContainer}
          options={{ title: "DinPlay" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
