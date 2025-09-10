import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSidebar } from "../../context/SidebarContext";
import { COLORS, SIZES } from "../../constants/theme";
import { useMainNavigation } from "../../context/MainNavigationContext";
import { useNavigation } from "@react-navigation/native";

const AppHeader = ({
  title = "DinPlay",
  showBackButton = false,
  onBackPress,
}) => {
  const { toggleSidebar } = useSidebar();
  const navigation = useNavigation();
  const { navigation: innerNavigation } = useMainNavigation();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.header}>
        {/* Lado izquierdo - Botón hamburguesa + Logo */}
        <View style={styles.leftSection}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={toggleSidebar}
            activeOpacity={0.7}
          >
            <View style={styles.hamburgerIcon}>
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Centro - Título */}
        <View style={styles.centerSection}>
          <TouchableOpacity
            onPress={() => {
              if (innerNavigation) {
                innerNavigation.navigate("HomeContent");
              } else {
                console.warn("Inner navigation not available");
              }
            }}
          >
            <Image
              source={require("../../../assets/logo.png")}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>

        {/* Lado derecho - Espacio para botones adicionales */}
        <View style={styles.rightSection}>
          {/* Aquí puedes agregar botones adicionales */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.surface,
  },
  header: {
    height: 60,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuButton: {
    padding: 8,
    marginRight: 10,
  },
  hamburgerIcon: {
    width: 24,
    height: 18,
    justifyContent: "space-between",
  },
  hamburgerLine: {
    width: 24,
    height: 3,
    backgroundColor: COLORS.text,
    borderRadius: 2,
  },
  logo: {
    width: 80,
    height: 80,
  },
  centerSection: {
    flex: 2,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  rightSection: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default AppHeader;
