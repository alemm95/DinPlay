import React from "react";
import { Button } from "../common";

/**
 * Botón específico para autenticación con Spotify
 * @param {Function} onPress - Función al presionar
 * @param {boolean} loading - Estado de carga
 */
const SpotifyButton = ({ onPress, loading = false }) => {
  return (
    <Button
      title={loading ? "Conectando con Spotify..." : "Login con Spotify"}
      onPress={onPress}
      disabled={loading}
    />
  );
};

export default SpotifyButton;
