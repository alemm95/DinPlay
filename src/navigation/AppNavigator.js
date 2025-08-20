import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, ProfileScreen } from "../screens";
import { COLORS } from "../constants/theme";
import LoginScreen from "../screens/LoginScreen";
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
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "DinPlay" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Perfil" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
