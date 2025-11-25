import { useThemeColor } from "@/hooks/useThemeColor";
import { BgColorNames, BorderColorNames } from "@/types";
import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps & {
  borderVariant?: BorderColorNames;
  bgVariant?: BgColorNames;
};

export function ThemedView({
  borderVariant,
  bgVariant,
  style,
  ...rest
}: Props) {
  const themeColors = useThemeColor();
  const viewStyle: ViewStyle = {
    backgroundColor: themeColors[`bg-${bgVariant ?? "primary"}`],
    borderColor: themeColors[`border-${borderVariant ?? "primary"}`],
    borderWidth: borderVariant ? 1 : 0,
  };
  return <View style={[viewStyle, style]} {...rest} />;
}
