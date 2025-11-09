import { RGB } from "@/types";

export default interface CategoryDAO {
  id: number;
  name: string;
  color: RGB;
  svg: string;
  parentId: number;
}
