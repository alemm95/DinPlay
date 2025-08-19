import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card } from "../components/common";
import { globalStyles } from "../styles/globalStyles";
import { COLORS } from "../constants/theme";

const HomeScreen = ({ navigation }) => {
  const handleButtonPress = () => {
    console.log("Botón presionado");
    navigation.navigate("Profile");
    // navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={globalStyles.title}>Bienvenido a DinPlay</Text>
        <Text style={globalStyles.subtitle}>
          Esta es la pantalla principal de tu aplicación
        </Text>

        <Card title="Información" subtitle="Detalles de la aplicación">
          <Text style={styles.cardText}>
            Esta es una estructura de carpetas profesional para React Native.
            Aquí puedes desarrollar tu aplicación de manera organizada.
          </Text>
        </Card>

        <Card title="Funcionalidades">
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Componentes reutilizables</Text>
            <Text style={styles.featureItem}>• Navegación estructurada</Text>
            <Text style={styles.featureItem}>• Gestión de estado</Text>
            <Text style={styles.featureItem}>• Servicios de API</Text>
            <Text style={styles.featureItem}>• Hooks personalizados</Text>
          </View>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            title="Botón Principal"
            onPress={handleButtonPress}
            style={styles.button}
          />
          <Button
            title="Botón Secundario"
            onPress={handleButtonPress}
            variant="outline"
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  button: {
    marginBottom: 8,
  },
});

export default HomeScreen;
