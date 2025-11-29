import { ThemedView } from "./ThemedView";
import { StyleSheet } from "react-native";
import Account from "@/models/Account";
import ThemedText from "./ThemedText";
import { DynamicSvg } from "./DynamicSvg";

type Props = {
  account: Account;
};

export function AccountCard({ account }: Props) {
  return (
    <ThemedView style={styleAccountCard.container} bgVariant="transparent">
      <DynamicSvg name={account.svg} width={48} height={48} color={"#000000"} />
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
