import { IconsName, RGB } from "@/types";
import { generateArc } from "./describeArc";
import { G, Path } from "react-native-svg";
import { ICONS } from "@/constants/icons/icons";
import { degreeToRadian } from "./utils";
import { useThemeColor } from "@/hooks/useThemeColor";

const PAD_ANGLE = degreeToRadian(2);
const ICON_SIZE = 12;

type Props = {
  angle: number;
  color: RGB;
  cx: number;
  cy: number;
  offsetAngle: number;
  innerRadius: number;
  outerRadius: number;
  svgId: IconsName;
};

export const PieChartSlice = ({
  angle,
  color,
  cx,
  cy,
  offsetAngle,
  innerRadius,
  outerRadius,
  svgId,
}: Props) => {
  const startAngle = offsetAngle + PAD_ANGLE / 2;
  const endAngle = offsetAngle + angle - PAD_ANGLE / 2;

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
      <G transform={iconTransform} opacity={0.1}>
        <Icon
          height={ICON_SIZE}
          width={ICON_SIZE}
          fill={themeColor["color-transparency"]}
          opacity={0.5}
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
