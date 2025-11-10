/* eslint-disable @typescript-eslint/no-require-imports */
import { migrateDb } from "@/db/initDb";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "sf-bold": require("../assets/fonts/SFPRODISPLAYBOLD.otf"),
    "sf-medium": require("../assets/fonts/SFPRODISPLAYMEDIUM.otf"),
    "sf-regular": require("../assets/fonts/SFPRODISPLAYREGULAR.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SQLiteProvider databaseName="mydata.db" onInit={migrateDb}>
      <Stack screenOptions={{ headerShown: false }} />
    </SQLiteProvider>
  );
}
