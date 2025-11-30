import { useThemeColor } from "@/hooks/useThemeColor";
import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const MainLayout = ({ children }: { children: ReactElement[] }) => {
  const themeColor = useThemeColor();

  return (
    <SafeAreaView
      style={{ backgroundColor: themeColor["bg-primary"], flex: 1 }}
    >
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingTop: 4,
    gap: 4,
    alignItems: "center",
  },
});
