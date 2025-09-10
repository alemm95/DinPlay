import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";

/**
 * Hook para manejar la navegación automática basada en el estado de autenticación
 * @param {Object} navigation - Objeto de navegación de React Navigation
 * @returns {Object} - Estado de autenticación { isAuthenticated, loading }
 */
export const useAuthNavigation = (navigation) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigation.navigate("Main");
    }
  }, [isAuthenticated, loading, navigation]);

  return { isAuthenticated, loading };
};
