import { RADIUSVALUE } from "@/constants/styles/spaceValues";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BgColorNames, BorderColorNames, RadiusVariant } from "@/types";
import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps & {
  borderVariant?: BorderColorNames;
  bgVariant?: BgColorNames;
  raduisVariant?: RadiusVariant;
};

export function ThemedView({
  borderVariant,
  bgVariant,
  raduisVariant,
  style,
  ...rest
}: Props) {
  const themeColors = useThemeColor();
  const viewStyle: ViewStyle = {
    backgroundColor: themeColors[`bg-${bgVariant ?? "primary"}`],
    borderColor: themeColors[`border-${borderVariant ?? "primary"}`],
    borderWidth: borderVariant ? 1 : 0,
    borderRadius: RADIUSVALUE[raduisVariant ?? "none"],
  };
  return <View style={[viewStyle, style]} {...rest} />;
}
