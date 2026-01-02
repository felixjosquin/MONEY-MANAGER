import { PALETTECOLORS } from "@/constants/styles/paletteColors";
import { ICONS } from "@/constants/icons/icons";
import { RGB, IconName } from "@/types";
import React from "react";

interface Props {
  name: IconName;
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
