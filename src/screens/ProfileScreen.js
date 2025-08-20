import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card } from "../components/common";
import { globalStyles } from "../styles/globalStyles";
import { COLORS } from "../constants/theme";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  const openSpotifyProfile = () => {
    if (user?.externalUrl) {
      Linking.openURL(user.externalUrl);
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <View style={[styles.container, { justifyContent: "center" }]}>
          <Text style={globalStyles.title}>No hay usuario autenticado</Text>
          <Button
            title="Ir al Login"
            onPress={() => navigation.navigate("Login")}
          />
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
        <Text style={globalStyles.title}>Mi Perfil</Text>

        <Card>
          <View style={styles.profileHeader}>
            {user.image && (
              <Image source={{ uri: user.image }} style={styles.profileImage} />
            )}
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
              <Text style={styles.profileId}>ID: {user.id}</Text>
            </View>
          </View>
        </Card>

        <Card title="Información de Spotify">
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>País</Text>
              <Text style={styles.infoValue}>{user.country}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Seguidores</Text>
              <Text style={styles.infoValue}>{user.followers}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tipo de cuenta</Text>
              <Text
                style={[styles.infoValue, user.premium && styles.premiumText]}
              >
                {user.premium ? "Premium ⭐" : "Free"}
              </Text>
            </View>
          </View>

          {user.externalUrl && (
            <TouchableOpacity
              onPress={openSpotifyProfile}
              style={styles.spotifyButton}
            >
              <Text style={styles.spotifyButtonText}>Ver en Spotify 🎵</Text>
            </TouchableOpacity>
          )}
        </Card>

        <Card title="Información Técnica">
          <View style={styles.techInfo}>
            <Text style={styles.techItem}>
              • URI de Spotify: {user.spotifyUri}
            </Text>
            <Text style={styles.techItem}>
              • Autenticación: OAuth 2.0 + PKCE
            </Text>
            <Text style={styles.techItem}>
              • Framework: React Native + Expo
            </Text>
            <Text style={styles.techItem}>• Estado: Redux Toolkit</Text>
          </View>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            title="Volver al Inicio"
            onPress={() => navigation.navigate("Home")}
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
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  profileId: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  infoGrid: {
    marginTop: 10,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  premiumText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  spotifyButton: {
    backgroundColor: "#1DB954",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  spotifyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  techInfo: {
    marginTop: 10,
  },
  techItem: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  button: {
    marginBottom: 8,
  },
});

export default ProfileScreen;
