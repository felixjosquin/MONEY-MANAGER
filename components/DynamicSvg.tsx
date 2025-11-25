import { PALETTECOLORS } from "@/constants/colors/paletteColors";
import { ICONS } from "@/constants/icons/icons";
import { RGB } from "@/types";
import { IconsName } from "@/types/IconsTypes";
import React from "react";

interface Props {
  name: IconsName;
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
