import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import { useKeyboardDismiss } from "../../hooks/common";

/**
 * Layout base para pantallas de autenticación
 * @param {ReactNode} children - Componentes hijos
 * @param {number} paddingHorizontal - Padding horizontal (default: 32)
 */
const AuthLayout = ({ children, paddingHorizontal = 32 }) => {
  const handleDismissKeyboard = useKeyboardDismiss();

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <SafeAreaView style={globalStyles.safeArea}>
        <View
          style={{
            paddingHorizontal,
            justifyContent: "center",
            flex: 1,
          }}
        >
          {children}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AuthLayout;
