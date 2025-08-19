import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS, SHADOWS } from "../../constants/theme";

const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    let baseStyle = [styles.button, styles[size]];

    if (variant === "secondary") {
      baseStyle.push(styles.secondary);
    } else if (variant === "outline") {
      baseStyle.push(styles.outline);
    }

    if (disabled) {
      baseStyle.push(styles.disabled);
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    let baseTextStyle = [styles.buttonText, styles[`${size}Text`]];

    if (variant === "outline") {
      baseTextStyle.push(styles.outlineText);
    }

    if (disabled) {
      baseTextStyle.push(styles.disabledText);
    }

    if (textStyle) {
      baseTextStyle.push(textStyle);
    }

    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.light,
  },

  // Tamaños
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },

  // Variantes
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  // Estados
  disabled: {
    backgroundColor: COLORS.border,
    opacity: 0.6,
  },

  // Textos
  buttonText: {
    color: COLORS.surface,
    fontFamily: FONTS.medium,
  },
  smallText: {
    fontSize: SIZES.sm,
  },
  mediumText: {
    fontSize: SIZES.md,
  },
  largeText: {
    fontSize: SIZES.lg,
  },
  outlineText: {
    color: COLORS.primary,
  },
  disabledText: {
    color: COLORS.textSecondary,
  },
});

export default Button;
