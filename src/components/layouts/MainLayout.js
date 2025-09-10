import React from "react";
import { View, StyleSheet } from "react-native";
import AppHeader from "../navigation/AppHeader";
import Sidebar from "../navigation/Sidebar";
import { globalStyles } from "../../styles/globalStyles";

/**
 * Layout principal con header y sidebar para pantallas autenticadas
 * @param {ReactNode} children - Contenido de la pantalla
 * @param {string} title - Título del header
 * @param {boolean} showHeader - Mostrar header (default: true)
 */
const MainLayout = ({ children, title = "DinPlay", showHeader = true }) => {
  return (
    <View style={globalStyles.container}>
      {showHeader && <AppHeader title={title} />}

      <View style={styles.content}>{children}</View>

      {/* Sidebar con overlay */}
      <Sidebar />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default MainLayout;
