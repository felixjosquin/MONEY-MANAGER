import Account from "@/models/Account";
import { useState } from "react";
import { Text } from "react-native";
import { AccountCard } from "./AccountCard";
import { Selector } from "./Selector";

type Props = {
  accounts: Account[] | undefined;
};
export function AccountSelector({ accounts }: Props) {
  const [selectedId, setSelectedId] = useState<number>(-1);

  if (!accounts) {
    return <Text>Loading...</Text>;
  }
  return (
    <Selector
      items={accounts}
      renderCard={({ item }) => <AccountCard account={item} />}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
    />
  );
}
