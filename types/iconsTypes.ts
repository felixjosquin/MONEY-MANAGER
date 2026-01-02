import { ICONS } from "@/constants/icons/icons";

export type IconName = keyof typeof ICONS;

export const isIconName = (id: string): id is IconName =>
  Object.keys(ICONS).includes(id);
