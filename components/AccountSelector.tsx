import Account from "@/models/Account";
import { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { AccountCard } from "./AccountCard";
import { Selector } from "./Selector";

type Props = {
  accounts: Account[] | undefined;
};
export function AccountSelector({ accounts }: Props) {
  const [selectedId, setSelectedId] = useState<number>(-1);

  const renderItem = ({ item }: { item: Account }) => (
    <TouchableOpacity onPress={() => setSelectedId(item.id)}>
      <AccountCard account={item} isSelect={item.id === selectedId} />
    </TouchableOpacity>
  );

  if (!accounts) {
    return <Text>Loading...</Text>;
  }
  return (
    <Selector
      items={accounts}
      renderItem={renderItem}
      selectedId={selectedId}
    />
  );
}
