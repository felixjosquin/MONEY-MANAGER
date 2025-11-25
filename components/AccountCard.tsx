import { ThemedView } from "./ThemedView";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import Account from "@/models/Account";
import ThemedText from "./ThemedText";
import { DynamicSvg } from "./DynamicSvg";

type Props = {
  account: Account;
};

export function AccountCard({ account }: Props) {
  return (
    <ThemedView bgVariant="brand-primary" style={styleAccountCard.container}>
      <DynamicSvg name={account.svg} width={48} height={48} color={"#FF0000"} />
      <ThemedText>{account.name}</ThemedText>
    </ThemedView>
  );
}

const styleAccountCard = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
