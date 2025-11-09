import { RGB } from "@/types";

export default interface Category {
  id: number;
  name: string;
  svg: string;
  color: RGB;
  subCategory: Category[] | null;
}
