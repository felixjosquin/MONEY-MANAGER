import { THEMECOLORS } from "@/constants/styles/themeColors";
import { useColorScheme } from "react-native";

export function useThemeColor() {
  const theme = useColorScheme() ?? "light";
  return THEMECOLORS[theme];
}
