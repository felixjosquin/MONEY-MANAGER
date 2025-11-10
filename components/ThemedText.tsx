import { useThemeColor } from "@/hooks/useThemeColor";
import { TextColorNames } from "@/types";
import { StyleSheet, Text, TextProps } from "react-native";

type FontSize = "sm" | "md" | "lg";
type FontWeight = "medium" | "regular" | "bold";

type Props = TextProps & {
  fontWeight?: FontWeight;
  fontSize?: FontSize;
  color?: TextColorNames;
};

export default function ThemedText({
  fontWeight,
  fontSize,
  color,
  ...rest
}: Props) {
  const colors = useThemeColor();
  return (
    <Text
      style={[
        style[fontSize ?? "md"],
        style[fontWeight ?? "medium"],
        { color: colors[`text-${color ?? "primary"}`] },
        rest.style,
      ]}
      {...rest}
    />
  );
}

const style = StyleSheet.create({
  sm: { fontSize: 11, lineHeight: 16 },
  md: { fontSize: 13, lineHeight: 20 },
  lg: { fontSize: 15, lineHeight: 22 },

  medium: { fontFamily: "sf-medium" },
  regular: { fontFamily: "sf-regular" },
  bold: { fontFamily: "sf-bold" },
});
