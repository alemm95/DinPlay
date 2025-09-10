import { Image, Touchable, TouchableOpacity } from "react-native";

const ButtonLogo = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      <Image
        source={require("../../../assets/small_logo.png")}
        style={{ width: 75, height: 75 }}
      />
    </TouchableOpacity>
  );
};

export default ButtonLogo;
