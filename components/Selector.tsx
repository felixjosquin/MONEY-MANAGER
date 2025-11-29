import {
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "./ThemedView";
import React, { Dispatch, ReactElement, useCallback } from "react";

type Props<E extends { id: number }> = {
  items: E[];
  renderCard: ({
    item,
    isSelected,
  }: {
    item: E;
    isSelected?: boolean;
  }) => ReactElement;
  selectedId: number;
  setSelectedId: Dispatch<number>;
};

export function Selector<E extends { id: number }>({
  items,
  renderCard,
  selectedId,
  setSelectedId,
}: Props<E>) {
  const renderItem: ListRenderItem<E> = useCallback(
    ({ item }) => {
      const isSelected = item.id === selectedId;
      return (
        <SelectCard
          isSelected={isSelected}
          handleSelected={() => setSelectedId(item.id)}
        >
          {renderCard({ item, isSelected })}
        </SelectCard>
      );
    },
    [renderCard, selectedId, setSelectedId]
  );

  return (
    <ThemedView
      borderVariant="primary"
      style={styles.selectorContainer}
      raduisVariant="md"
    >
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

const SelectCard = ({
  isSelected,
  children,
  handleSelected,
}: {
  isSelected: boolean;
  children: ReactElement;
  handleSelected: Dispatch<void>;
}) => (
  <TouchableOpacity onPress={() => handleSelected()}>
    <ThemedView
      raduisVariant="md"
      bgVariant={isSelected ? "brand-primary" : "primary"}
      borderVariant={isSelected ? "brand" : "transparent"}
      style={{ padding: 2 }}
    >
      {children}
    </ThemedView>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  selectorContainer: {
    padding: 4,
    flexDirection: "row",
  },
});
