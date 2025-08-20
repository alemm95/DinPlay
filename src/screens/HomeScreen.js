import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card } from "../components/common";
import { globalStyles } from "../styles/globalStyles";
import { COLORS } from "../constants/theme";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { checkAuthStatus, logout } from "../store/slices/authSlice";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  );

  // Remover la verificación automática para evitar loops

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  const handleGoToProfile = () => {
    navigation.navigate("Profile");
  };

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text style={globalStyles.subtitle}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={globalStyles.title}>
          ¡Hola{user?.name ? `, ${user.name}` : ""}! 🎵
        </Text>
        <Text style={globalStyles.subtitle}>Bienvenido a DinPlay</Text>

        {user && (
          <Card
            title="Tu Perfil de Spotify"
            subtitle="Información de tu cuenta"
          >
            <View style={styles.userInfo}>
              {user.image && (
                <Image source={{ uri: user.image }} style={styles.avatar} />
              )}
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Text style={styles.userCountry}>📍 {user.country}</Text>
                <Text style={styles.userFollowers}>
                  👥 {user.followers} seguidores
                </Text>
                {user.premium && (
                  <Text style={styles.premiumBadge}>⭐ Spotify Premium</Text>
                )}
              </View>
            </View>
          </Card>
        )}

        <Card title="Funcionalidades de DinPlay">
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>
              • Autenticación con Spotify ✅
            </Text>
            <Text style={styles.featureItem}>• Reproducción de música</Text>
            <Text style={styles.featureItem}>• Listas de reproducción</Text>
            <Text style={styles.featureItem}>• Búsqueda de canciones</Text>
            <Text style={styles.featureItem}>• Perfil personalizado</Text>
          </View>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            title="Ver Perfil Completo"
            onPress={handleGoToProfile}
            style={styles.button}
          />
          <Button
            title="Cerrar Sesión"
            onPress={handleLogout}
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
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  userCountry: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  userFollowers: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  premiumBadge: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "bold",
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
