import { IconsName, RGB } from "@/types";
import { ViewProps, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { ThemedView } from "../ThemedView";
import Svg, { G, Path } from "react-native-svg";
import { generateArc } from "./describeArc";
import { ICONS } from "@/constants/icons/icons";
import { Fragment } from "react";

const MIN_ANGLE = 5;

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
    .map(({ value, color, key, svgName }) => {
      const angle = (value / total) * 360;
      if (angle < MIN_ANGLE) return;
      const startAngle = cumulativeAngle + padAngle / 2;
      const endAngle = cumulativeAngle + angle - padAngle / 2;
      const path = generateArc(
        cx,
        cy,
        radiusInner,
        radiusOuter,
        startAngle,
        endAngle
      );
      const median = (endAngle + startAngle) / 2;
      const midleRadius = (size + radiusInner) / 2;
      const icon = ICONS[svgName];
      cumulativeAngle += angle;
      return {
        path,
        color,
        key,
        median,
        midleRadius,
        icon,
      };
    })
    .filter((val) => val !== undefined);

  return (
    <ThemedView
      bgVariant="primary"
      borderVariant="primary"
      raduisVariant="md"
      style={[styles.container, style]}
    >
      <Svg width={size} height={size}>
        <G>
          {slices.map(
            ({ path, key, color, median, midleRadius, icon: Icon }) => (
              <Fragment key={key}>
                <Path key={key} d={path} fill={color} />
                <G
                  transform={`translate(${
                    cx - 5 + 20 * Math.cos(((median - 90) * Math.PI) / 180)
                  },${
                    cy - 5 + 20 * Math.sin(((median - 90) * Math.PI) / 180)
                  })`}
                >
                  <Icon fill={color} height={10} width={10} />
                </G>
              </Fragment>
            )
          )}
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
