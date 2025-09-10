import { useCallback } from "react";
import { dismissKeyboard } from "../../utils/native";

/**
 * Hook para manejar el dismiss del teclado de forma optimizada
 * @returns {Function} - Función para cerrar el teclado
 */
export const useKeyboardDismiss = () => {
  const handleDismiss = useCallback(() => {
    dismissKeyboard();
  }, []);

  return handleDismiss;
};
