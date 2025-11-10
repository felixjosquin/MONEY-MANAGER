import { THEMECOLORS } from "@/constants/colors/themeColors";
import { useColorScheme } from "react-native";

export function useThemeColor() {
  const theme = useColorScheme() ?? "light";
  return THEMECOLORS[theme];
}
