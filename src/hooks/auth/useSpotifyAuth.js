import { useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { loginWithSpotify, clearError } from "../../store/slices/authSlice";

/**
 * Hook para manejar la autenticación con Spotify
 * @returns {Object} - Funciones y estado de autenticación
 */
export const useSpotifyAuth = () => {
  const dispatch = useDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const login = useCallback(async () => {
    try {
      await dispatch(loginWithSpotify()).unwrap();
    } catch (error) {
      console.error("Error en login:", error);
      Alert.alert("Error de Autenticación", error, [{ text: "OK" }]);
    }
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Limpiar errores al montar el hook
  useEffect(() => {
    clearAuthError();
  }, [clearAuthError]);

  return {
    login,
    clearAuthError,
    loading,
    error,
  };
};
