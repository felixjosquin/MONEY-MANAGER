import { NullableFields, Prefixed } from "@/types";
import CategoryDAO from "../dao/CategoryDAO";

type CategoryWithoutParent = Omit<CategoryDAO, "parentId">;

type CategoryWithoutParentNullable = NullableFields<CategoryWithoutParent>;

// prettier-ignore
export type GroupedCategory = Prefixed<CategoryWithoutParent,"primary"> & Prefixed<CategoryWithoutParentNullable, "secondary">;
