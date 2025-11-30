export function generateArc(
  cx: number,
  cy: number,
  radiusInner: number,
  radiusOuter: number,
  startAngle: number,
  endAngle: number
  // cornerRadius: number = 0
) {
  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((endAngle - 90) * Math.PI) / 180;

  const x1 = cx + radiusOuter * Math.cos(startRad);
  const y1 = cy + radiusOuter * Math.sin(startRad);
  const x2 = cx + radiusOuter * Math.cos(endRad);
  const y2 = cy + radiusOuter * Math.sin(endRad);

  const x3 = cx + radiusInner * Math.cos(endRad);
  const y3 = cy + radiusInner * Math.sin(endRad);
  const x4 = cx + radiusInner * Math.cos(startRad);
  const y4 = cy + radiusInner * Math.sin(startRad);

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${x1} ${y1}`,
    `A ${radiusOuter} ${radiusOuter} 0 ${largeArc} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${radiusInner} ${radiusInner} 0 ${largeArc} 0 ${x4} ${y4}`,
    `Z`,
  ].join(" ");
}
