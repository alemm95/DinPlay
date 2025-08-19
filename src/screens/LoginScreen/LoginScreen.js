import React from "react";
import { Image, Text, View } from "react-native";
import { Button, Card, Input } from "../../components/common";
import { globalStyles } from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    console.log(email, password);
    if (email && password) {
      if (email.includes("@") && password === "1111") {
        navigation.navigate("Home");
      }
    }
  };

  return (
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
            <Button title="Login" onPress={handleLogin} />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
