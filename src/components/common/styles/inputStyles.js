import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

const inputStyles = StyleSheet.create({
  email: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#F0F0F0",
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  focused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
});

export default inputStyles;
