import React from "react";
import { Image, View, TouchableWithoutFeedback, Alert } from "react-native";
import { Button, Card, Input } from "../../components/common";
import { globalStyles } from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { dismissKeyboard } from "../../utils/native";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { loginWithSpotify, clearError } from "../../store/slices/authSlice";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    // Limpiar errores al montar el componente
    dispatch(clearError());
  }, [dispatch]);

  // Navegar automáticamente cuando se autentica
  React.useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Home");
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = async () => {
    try {
      await dispatch(loginWithSpotify()).unwrap();
      // No necesitamos navegar manualmente aquí,
      // el useEffect se encarga cuando isAuthenticated cambie
    } catch (error) {
      console.error("Error en login:", error);
      Alert.alert("Error de Autenticación", error, [{ text: "OK" }]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={globalStyles.safeArea}>
        <View
          style={{ paddingHorizontal: 32, justifyContent: "center", flex: 1 }}
        >
          <Image
            source={require("../../../assets/logo.png")}
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
            }}
          />
          <Card>
            <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Input label="Email" value={email} onChangeText={setEmail} />
              <Input
                label="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Button
                title={
                  loading ? "Conectando con Spotify..." : "Login con Spotify"
                }
                onPress={handleLogin}
                disabled={loading}
              />
            </View>
          </Card>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
