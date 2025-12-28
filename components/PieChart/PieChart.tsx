import Svg from "react-native-svg";
import { IconsName, RGB } from "@/types";
import { ViewProps, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { ThemedView } from "../ThemedView";
import { PieChartSlice } from "./PieChartSlice";
import { degreeToRadian, percentageToRadian } from "./utils";
import { ChartSegment } from "./type";
import { PieChartLegend } from "./PieChartLegend";

const MIN_ANGLE = degreeToRadian(5);

type Props = ViewProps & {
  data: ChartSegment[];
  size: number;
  padAngle?: number;
  innerRadius?: number;
  style?: StyleProp<ViewStyle>;
};

export const PieChart = ({
  data,
  size,
  innerRadius = size / 4,
  style,
}: Props) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const outerRaduis = size / 2;

  let cumulativeAngle = -Math.PI / 2;

  return (
    <ThemedView bgVariant="primary" style={[styles.container, style]}>
      <Svg width={size} height={size}>
        {data.map(({ value, color, key, svgName }) => {
          const angle = percentageToRadian(value / total);
          if (angle < MIN_ANGLE) return;
          const offsetAngle = cumulativeAngle;
          cumulativeAngle += angle;
          return (
            <PieChartSlice
              key={key}
              startAngle={offsetAngle}
              color={color}
              endAngle={offsetAngle + angle}
              innerRadius={innerRadius}
              outerRadius={outerRaduis}
              svgId={svgName}
              cx={cx}
              cy={cy}
            />
          );
        })}
      </Svg>
      <PieChartLegend data={data} />
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
