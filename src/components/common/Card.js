import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, SHADOWS } from "../../constants/theme";

const Card = ({
  children,
  title,
  subtitle,
  style,
  headerStyle,
  bodyStyle,
  ...props
}) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {(title || subtitle) && (
        <View style={[styles.header, headerStyle]}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      <View style={[styles.body, bodyStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin,
    ...SHADOWS.heavy,
  },
  header: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding / 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  body: {
    padding: SIZES.padding,
  },
  title: {
    fontSize: SIZES.lg,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: SIZES.sm,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
});

export default Card;
