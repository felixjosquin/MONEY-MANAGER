export function generateArc(
  cx: number,
  cy: number,
  radiusInner: number,
  radiusOuter: number,
  startAngle: number,
  endAngle: number
  // cornerRadius: number = 0
) {
  const x1 = cx + radiusOuter * Math.cos(startAngle);
  const y1 = cy + radiusOuter * Math.sin(startAngle);
  const x2 = cx + radiusOuter * Math.cos(endAngle);
  const y2 = cy + radiusOuter * Math.sin(endAngle);

  const x3 = cx + radiusInner * Math.cos(endAngle);
  const y3 = cy + radiusInner * Math.sin(endAngle);
  const x4 = cx + radiusInner * Math.cos(startAngle);
  const y4 = cy + radiusInner * Math.sin(startAngle);

  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

  return [
    `M ${x1} ${y1}`,
    `A ${radiusOuter} ${radiusOuter} 0 ${largeArc} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${radiusInner} ${radiusInner} 0 ${largeArc} 0 ${x4} ${y4}`,
    `Z`,
  ].join(" ");
}
