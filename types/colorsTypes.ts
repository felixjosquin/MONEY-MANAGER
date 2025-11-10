import { THEMECOLORS } from "@/constants/colors/themeColors";

export type RGB = `#${string}`;

type ThemeColors = keyof (typeof THEMECOLORS)["light"];

type ExtractColorNames<T extends string, Prefix extends string> = Extract<
  T,
  `${Prefix}-${string}`
> extends `${Prefix}-${infer R}`
  ? R
  : never;

export type TextColorNames = ExtractColorNames<ThemeColors, "text">;
export type BgColorNames = ExtractColorNames<ThemeColors, "bg">;
export type FgColorNames = ExtractColorNames<ThemeColors, "fg">;
export type BorderColorNames = ExtractColorNames<ThemeColors, "border">;
