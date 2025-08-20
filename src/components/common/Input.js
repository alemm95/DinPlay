import React from "react";
import { Text, TextInput, View } from "react-native";
import inputStyles from "./styles/inputStyles";
import { globalStyles } from "../../styles/globalStyles";

const Input = ({ label, error, onChangeText, value, ...props }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={{ display: "flex", gap: 16 }}>
      <Text style={globalStyles.headerTitle}>{label}</Text>
      <TextInput
        style={[inputStyles.email, isFocused && inputStyles.focused]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value || ""}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

export default Input;
