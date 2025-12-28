import { degreeToRadian } from "./utils";
const PAD_ANGLE_INNER = degreeToRadian(2);
const PAD_ANGLE_OUTER = degreeToRadian(1);

export function generateArc(
  cx: number,
  cy: number,
  radiusInner: number,
  radiusOuter: number,
  startAngle: number,
  endAngle: number
) {
  const x1 = cx + radiusOuter * Math.cos(startAngle + PAD_ANGLE_OUTER / 2);
  const y1 = cy + radiusOuter * Math.sin(startAngle + PAD_ANGLE_OUTER / 2);
  const x2 = cx + radiusOuter * Math.cos(endAngle - PAD_ANGLE_OUTER / 2);
  const y2 = cy + radiusOuter * Math.sin(endAngle - PAD_ANGLE_OUTER / 2);

  const x3 = cx + radiusInner * Math.cos(endAngle - PAD_ANGLE_INNER / 2);
  const y3 = cy + radiusInner * Math.sin(endAngle - PAD_ANGLE_INNER / 2);
  const x4 = cx + radiusInner * Math.cos(startAngle + PAD_ANGLE_INNER / 2);
  const y4 = cy + radiusInner * Math.sin(startAngle + PAD_ANGLE_INNER / 2);

  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

  return [
    `M ${x1} ${y1}`,
    `A ${radiusOuter} ${radiusOuter} 0 ${largeArc} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${radiusInner} ${radiusInner} 0 ${largeArc} 0 ${x4} ${y4}`,
    `Z`,
  ].join(" ");
}
