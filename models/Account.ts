import { IconsName } from "@/types/IconsTypes";

export default interface Account {
  id: number;
  name: string;
  svg: IconsName;
  balance: number;
}
