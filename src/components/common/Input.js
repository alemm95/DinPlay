import { Text, TextInput, View } from "react-native";
import inputStyles from "./styles/inputStyles";
import { globalStyles } from "../../styles/globalStyles";

const Input = ({ label, error, onChangeText, value, ...props }) => {
  return (
    <View style={{ display: "flex", gap: 16 }}>
      <Text style={globalStyles.headerTitle}>{label}</Text>
      <TextInput
        style={[inputStyles.email]}
        value={value || ""}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

export default Input;
