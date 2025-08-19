import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, SHADOWS } from "../constants/theme";

// Estilos globales reutilizables
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    ...SHADOWS.light,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: COLORS.surface,
    fontSize: SIZES.md,
    fontFamily: FONTS.medium,
  },

  title: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: SIZES.margin / 2,
  },

  subtitle: {
    fontSize: SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SIZES.margin,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: 12,
    fontSize: SIZES.md,
    fontFamily: FONTS.regular,
    backgroundColor: COLORS.surface,
  },

  inputFocused: {
    borderColor: COLORS.primary,
  },

  inputError: {
    borderColor: COLORS.error,
  },

  errorText: {
    color: COLORS.error,
    fontSize: SIZES.sm,
    fontFamily: FONTS.regular,
    marginTop: 4,
  },

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: SIZES.headerHeight,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.light,
  },

  headerTitle: {
    fontSize: SIZES.lg,
    fontFamily: FONTS.bold,
    color: COLORS.text,
  },
});
