import React from "react";
import { Image } from "react-native";

/**
 * Componente para mostrar el logo de la aplicación
 * @param {number} size - Tamaño del logo (default: 200)
 * @param {Object} style - Estilos adicionales
 */
const AppLogo = ({ size = 200, style = {} }) => {
  return (
    <Image
      source={require("../../../assets/logo.png")}
      style={[
        {
          width: size,
          height: size,
          alignSelf: "center",
        },
        style,
      ]}
    />
  );
};

export default AppLogo;
