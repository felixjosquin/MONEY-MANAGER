import { StyleSheet, View, Text } from "react-native";
import { ChartSegment } from "./type";
import { ThemedView } from "../ThemedView";
import ThemedText from "../ThemedText";

type Props = {
  data: ChartSegment[];
};

export const PieChartLegend = ({ data }: Props) => {
  return (
    <View style={styles.container}>
      {data.map(({ key, value, label, color }) => (
        <View key={key} style={styles.element}>
          <ThemedView
            raduisVariant="full"
            style={{ ...styles.labelColor, backgroundColor: color }}
          />
          <Text>
            <ThemedText fontSize="sm">{label} - </ThemedText>
            <ThemedText colorVariant="secondary" fontSize="sm">
              {value} €
            </ThemedText>
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    columnGap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row",
    width: "60%",
  },
  element: {
    gap: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  labelColor: {
    width: 11,
    height: 11,
  },
});
