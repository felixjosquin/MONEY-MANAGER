import { IconsName, RGB } from "@/types";
import { ViewProps, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import Svg from "react-native-svg";

type ChartSegment = {
  key: string;
  value: number;
  label: string;
  color: RGB;
  svgName: IconsName;
};

type Props = ViewProps & {
  data: ChartSegment[];
  size: number;
  padAngle?: number;
  innerRadius?: number;
};

export const PieChart = ({
  data,
  size,
  padAngle = 2,
  innerRadius = size * 0.5,
  ...style
}: Props) => {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2;
  return (
    <ThemedView
      bgVariant="primary"
      borderVariant="primary"
      raduisVariant="md"
      style={styles.container}
    >
      <Svg width={size} height={size}></Svg>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
  },
});
