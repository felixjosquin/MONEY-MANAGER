import { IconName, RGB } from "@/types";
import { generateArc } from "./describeArc";
import { G, Path } from "react-native-svg";
import { ICONS } from "@/constants/icons/icons";
import { useThemeColor } from "@/hooks/useThemeColor";

const ICON_SIZE = 12;

type Props = {
  startAngle: number;
  color: RGB;
  cx: number;
  cy: number;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
  svgId: IconName;
};

export const PieChartSlice = ({
  startAngle,
  color,
  cx,
  cy,
  endAngle,
  innerRadius,
  outerRadius,
  svgId,
}: Props) => {
  const path = generateArc(
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle
  );

  const iconTransform = getIconTransform(
    cx,
    cy,
    (endAngle + startAngle) / 2,
    (outerRadius + innerRadius) / 2
  );
  const Icon = ICONS[svgId];
  const themeColor = useThemeColor();

  return (
    <>
      <Path d={path} fill={color} />
      <G transform={iconTransform}>
        <Icon
          height={ICON_SIZE}
          width={ICON_SIZE}
          fill={themeColor["color-transparency"]}
        />
      </G>
    </>
  );
};

const getIconTransform = (
  cx: number,
  cy: number,
  median: number,
  radiusMidle: number
) => {
  const xtranslate = cx - ICON_SIZE / 2 + radiusMidle * Math.cos(median);
  const ytranslate = cy - ICON_SIZE / 2 + radiusMidle * Math.sin(median);
  return `translate(${xtranslate},${ytranslate})`;
};
