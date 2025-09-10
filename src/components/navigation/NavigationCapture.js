import React, { useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useMainNavigation } from "../../context/MainNavigationContext";

/**
 * Componente que captura la navegación del stack interno
 * y la comparte con el contexto
 */
const NavigationCapture = ({ children }) => {
  const navigation = useNavigation();
  const { setNavigation } = useMainNavigation();

  useEffect(() => {
    setNavigation(navigation);
  }, [navigation, setNavigation]);

  return children;
};

export default NavigationCapture;
