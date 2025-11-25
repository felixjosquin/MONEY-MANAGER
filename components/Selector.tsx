import { FlatList, StyleSheet, ListRenderItem } from "react-native";
import { ThemedView } from "./ThemedView";

type Props<E extends { id: number }> = {
  items: E[];
  renderItem: ListRenderItem<E>;
  selectedId: number;
};

export function Selector<E extends { id: number }>({
  items,
  renderItem,
  selectedId,
}: Props<E>) {
  return (
    <ThemedView borderVariant="primary" style={styles.selectorContainer}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
        horizontal={true}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  selectorContainer: {
    padding: 4,
    flexDirection: "row",
  },
});
