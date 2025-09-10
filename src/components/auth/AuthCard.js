import React from "react";
import { View, Text } from "react-native";
import { Card, Button } from "../common";
import { globalStyles } from "../../styles/globalStyles";

/**
 * Componente de tarjeta para pantallas de autenticación
 * @param {string} title - Título de la tarjeta
 * @param {string} subtitle - Subtítulo/descripción
 * @param {string} buttonText - Texto del botón
 * @param {Function} onButtonPress - Función del botón
 * @param {boolean} loading - Estado de carga
 * @param {boolean} disabled - Estado deshabilitado
 */
const AuthCard = ({
  title,
  subtitle,
  buttonText,
  onButtonPress,
  loading = false,
  disabled = false,
}) => {
  return (
    <Card>
      <View style={styles.container}>
        {title && <Text style={globalStyles.title}>{title}</Text>}
        {subtitle && (
          <Text style={[globalStyles.subtitle, { textAlign: "center" }]}>
            {subtitle}
          </Text>
        )}
        <Button
          title={buttonText}
          onPress={onButtonPress}
          disabled={disabled || loading}
        />
      </View>
    </Card>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 16,
  },
};

export default AuthCard;
