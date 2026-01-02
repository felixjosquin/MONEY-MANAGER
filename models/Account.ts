import { IconName } from "@/types/iconsTypes";

export default interface Account {
  id: number;
  name: string;
  svg: IconName;
  balance: number;
}
