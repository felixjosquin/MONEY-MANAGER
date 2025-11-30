import { IconsName } from "@/types/iconsTypes";

export default interface Account {
  id: number;
  name: string;
  svg: IconsName;
  balance: number;
}
