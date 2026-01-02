import { AccountType, Prefixed } from "@/types";

export interface CategoryDAO {
  id: number;
  name: string;
  color: string;
  svg: string;
  type: AccountType;
  parentId: number;
}

export interface CategoryDAOWithTotal extends CategoryDAO {
  total: number;
}

type PrimaryCategory<C extends CategoryDAO> = Prefixed<
  Omit<C, "parentId">,
  "primary"
>;

type SubCategory<C extends CategoryDAO> = Prefixed<
  Omit<C, "parentId" | "type">,
  "secondary"
>;

type NullSubCategory<C extends CategoryDAO> = {
  [K in keyof SubCategory<C>]: null;
};

type SecondaryCategory<C extends CategoryDAO> =
  | SubCategory<C>
  | NullSubCategory<C>;

export const isSubCategory = <C extends CategoryDAO>(
  secondaryCat: SecondaryCategory<C>
): secondaryCat is SubCategory<C> => secondaryCat.secondary_id !== null;

export type GroupedCategory = PrimaryCategory<CategoryDAO> &
  SecondaryCategory<CategoryDAO>;

export type GroupedCategoryWithTotal = PrimaryCategory<CategoryDAOWithTotal> &
  SecondaryCategory<CategoryDAOWithTotal>;
