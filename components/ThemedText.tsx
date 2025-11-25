import { useThemeColor } from "@/hooks/useThemeColor";
import { TextColorNames } from "@/types";
import { StyleSheet, Text, TextProps } from "react-native";

type FontSize = "sm" | "md" | "lg";
type FontWeight = "medium" | "regular" | "bold";

type Props = TextProps & {
  fontWeight?: FontWeight;
  fontSize?: FontSize;
  colorVariant?: TextColorNames;
};

export default function ThemedText({
  fontWeight,
  fontSize,
  colorVariant,
  style,
  ...rest
}: Props) {
  const themeColors = useThemeColor();
  return (
    <Text
      style={[
        styleSheet[fontSize ?? "md"],
        styleSheet[fontWeight ?? "medium"],
        { color: themeColors[`text-${colorVariant ?? "primary"}`] },
        style,
      ]}
      {...rest}
    />
  );
}

const styleSheet = StyleSheet.create({
  sm: { fontSize: 11, lineHeight: 16 },
  md: { fontSize: 13, lineHeight: 20 },
  lg: { fontSize: 15, lineHeight: 22 },

  medium: { fontFamily: "sf-medium" },
  regular: { fontFamily: "sf-regular" },
  bold: { fontFamily: "sf-bold" },
});
