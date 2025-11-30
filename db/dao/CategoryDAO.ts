import { Prefixed } from "@/types";
import { NullableId } from "../types";

export interface CategoryDAO {
  id: number;
  name: string;
  color: string;
  svg: string;
  parentId: number;
}

export interface CategoryWithTotal extends CategoryDAO {
  total: number;
}

type WithoutParentId<E extends CategoryDAO> = Omit<E, "parentId">;

export type GroupedCategory = Prefixed<
  WithoutParentId<CategoryDAO>,
  "primary"
> &
  Prefixed<NullableId<WithoutParentId<CategoryDAO>>, "secondary">;

export type GroupedCategoryWithTotal = Prefixed<
  WithoutParentId<CategoryDAO>,
  "primary"
> &
  Prefixed<NullableId<WithoutParentId<CategoryWithTotal>>, "secondary">;
