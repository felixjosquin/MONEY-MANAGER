import { ChartSegment } from "./type";

type SliceData = {
  angle: number;
};

type Props = {
  data: SliceData;
  chartCenter: { cx: number; cy: number };
  size: number;
  padAngle: number;
  radiusInner: number;
  style?: StyleProp<ViewStyle>;
};

export const PieChartSlice = () => {};
