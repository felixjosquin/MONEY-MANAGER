import { IconsName, RGB } from "@/types";
import { ViewProps, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { ThemedView } from "../ThemedView";
import Svg, { G, Path } from "react-native-svg";
import { generateArc } from "./describeArc";

type ChartSegment = {
  key: string;
  value: number;
  label: string;
  color: RGB;
  //   svgName: IconsName;
};

type Props = ViewProps & {
  data: ChartSegment[];
  size: number;
  padAngle?: number;
  radiusInner?: number;
  style?: StyleProp<ViewStyle>;
};

export const PieChart = ({
  data,
  size,
  padAngle = 2,
  radiusInner = size / 4,
  style,
}: Props) => {
  const cx = size / 2;
  const cy = size / 2;
  const radiusOuter = size / 2;

  const total = data.reduce((sum, d) => sum + d.value, 0);

  let cumulativeAngle = 0;

  const slices = data
    .sort((d1, d2) => d2.value - d1.value)
    .map(({ value, color, key }) => {
      const angle = (value / total) * 360;
      const startAngle = cumulativeAngle + padAngle / 2;
      const endAngle = cumulativeAngle + angle - padAngle / 2;

      const path =
        endAngle - startAngle > 0
          ? generateArc(cx, cy, radiusInner, radiusOuter, startAngle, endAngle)
          : "";
      cumulativeAngle += angle;

      return {
        path,
        color,
        key,
      };
    });

  return (
    <ThemedView
      bgVariant="primary"
      borderVariant="primary"
      raduisVariant="md"
      style={[styles.container, style]}
    >
      <Svg width={size} height={size}>
        <G>
          {slices.map(({ path, key, color }) => (
            <Path key={key} d={path} fill={color} />
          ))}
        </G>
      </Svg>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
});
