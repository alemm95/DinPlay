import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import { useSidebar } from "../../context/SidebarContext";
import { useMainNavigation } from "../../context/MainNavigationContext";
import { COLORS, SIZES } from "../../constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.8; // 80% del ancho de pantalla

const Sidebar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isOpen, closeSidebar } = useSidebar();
  const { navigation: innerNavigation } = useMainNavigation();

  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      // Abrir sidebar
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Cerrar sidebar
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SIDEBAR_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const handleNavigate = (screenName) => {
    closeSidebar();
    // Usar la navegación interna si está disponible
    if (innerNavigation) {
      innerNavigation.navigate(screenName);
    } else {
      // Fallback a navegación normal
      console.warn("Inner navigation not available, using main navigation");
      navigation.navigate(screenName);
    }
  };

  const handleLogout = () => {
    closeSidebar();
    setTimeout(() => {
      dispatch(logout());
      navigation.navigate("Login");
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <View style={styles.container}>
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={closeSidebar}>
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
      </TouchableWithoutFeedback>

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <SafeAreaView style={styles.sidebarContent}>
          {/* Header del usuario */}
          <View style={styles.userSection}>
            <Image
              source={require("../../../assets/logo.png")}
              style={styles.appLogo}
            />
            {user && (
              <View style={styles.userInfo}>
                {user.image && (
                  <Image
                    source={{ uri: user.image }}
                    style={styles.userAvatar}
                  />
                )}
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            )}
          </View>

          {/* Opciones de navegación */}
          <View style={styles.menuSection}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("HomeContent")}
            >
              <Text style={styles.menuText}>🏠 Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("ProfileContent")}
            >
              <Text style={styles.menuText}>👤 Mi Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>🎵 Mi Música</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>📱 Playlists</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>⚙️ Configuración</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footerSection}>
            <TouchableOpacity
              style={[styles.menuItem, styles.logoutButton]}
              onPress={handleLogout}
            >
              <Text style={[styles.menuText, styles.logoutText]}>
                🚪 Cerrar Sesión
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: COLORS.surface,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sidebarContent: {
    flex: 1,
    paddingTop: 20,
  },
  userSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: "center",
  },
  appLogo: {
    width: 100,
    height: 100,
  },
  userInfo: {
    alignItems: "center",
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  menuSection: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  menuText: {
    fontSize: 16,
    color: COLORS.text,
  },
  footerSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  logoutButton: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: "#FF6B6B",
  },
});

export default Sidebar;
