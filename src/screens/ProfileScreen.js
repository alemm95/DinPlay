import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/common";
import { globalStyles } from "../styles/globalStyles";
import { COLORS } from "../constants/theme";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={styles.container}>
        <Text style={globalStyles.title}>Perfil de Usuario</Text>
        <Text style={styles.description}>
          Esta es la pantalla de perfil del usuario.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Ir a Configuración"
            onPress={() => navigation.navigate("Settings")}
            style={styles.button}
          />
          <Button
            title="Volver al Inicio"
            onPress={() => navigation.navigate("Home")}
            variant="outline"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    marginBottom: 8,
  },
});

export default ProfileScreen;
