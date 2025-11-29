import { ThemedView } from "./ThemedView";
import { StyleSheet, View } from "react-native";
import Account from "@/models/Account";
import ThemedText from "./ThemedText";
import { DynamicSvg } from "./DynamicSvg";

type Props = {
  account: Account;
};

export function AccountCard({ account }: Props) {
  return (
    <ThemedView style={style.container} bgVariant="transparent">
      <DynamicSvg name={account.svg} width={40} height={40} color={"#000000"} />
      <View style={style.textContainer}>
        <ThemedText>{account.name}</ThemedText>
        <ThemedText fontSize="sm" colorVariant="secondary">
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
          }).format(account.balance)}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const style = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    alignItems: "center",
  },
});
