import { RGB } from "@/types";

export interface Category {
  id: number;
  name: string;
  svg: string;
  color: RGB;
  subCategory: Category[] | null;
}

export interface CategoryWithTotal extends Category {
  total: number;
  subCategory: CategoryWithTotal[] | null;
}
