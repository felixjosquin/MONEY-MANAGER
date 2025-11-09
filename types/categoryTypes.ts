import Category from "@/models/Category";

export type StandaloneCategory = Omit<Category, "subCategory">;
