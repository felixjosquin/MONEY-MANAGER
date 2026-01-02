import { AccountType, RGB } from "@/types";

export interface Category {
  id: number;
  name: string;
  svg: string;
  color: RGB;
  type: AccountType;
  subCategory: SubCategory<Category>[] | null;
}

export interface CategoryWithTotal extends Category {
  total: number;
  subCategory: SubCategory<CategoryWithTotal>[] | null;
}

export type SubCategory<C> = Omit<C, "subCategory" | "type">;
