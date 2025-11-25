import { PALETTECOLORS } from "@/constants/colors/paletteColors";
import { ICONS } from "@/constants/icons/iconCategory";
import { RGB } from "@/types";
import React from "react";

interface Props {
  name: keyof typeof ICONS;
  width?: number;
  height?: number;
  color?: RGB;
}

export function DynamicSvg({ name, width = 24, height = 24, color }: Props) {
  const IconComponant = ICONS[name];
  return (
    <IconComponant
      width={width ?? 24}
      height={height ?? 24}
      color={color ?? PALETTECOLORS.black}
    />
  );
}
