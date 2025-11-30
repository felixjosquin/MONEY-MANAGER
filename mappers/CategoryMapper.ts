import {
  GroupedCategory,
  GroupedCategoryWithTotal,
} from "@/db/dao/CategoryDAO";
import { Category, CategoryWithTotal } from "@/models/Category";
import { RGB } from "@/types";

type StandaloneCategory = Omit<Category, "subCategory">;

export default class CategoryMapper {
  static getCategories(rawData: GroupedCategory[]): Category[] {
    const resMap = new Map<number, Category>();

    rawData.forEach((value) => {
      const { primary, secondary } = CategoryMapper.extractCategory(value);
      let category = resMap.get(primary.id);
      if (!category) {
        category = { ...primary, subCategory: [] };
        resMap.set(primary.id, category);
      }
      if (secondary) {
        category.subCategory!.push({ ...secondary, subCategory: null });
      }
    });
    return Array.from(resMap.values());
  }

  static extractCategory(rawData: GroupedCategory): {
    primary: StandaloneCategory;
    secondary: StandaloneCategory | null;
  } {
    const primary: StandaloneCategory = {
      id: rawData.primary_id,
      name: rawData.primary_name,
      svg: rawData.primary_svg,
      color: rawData.primary_color,
    };

    const secondary =
      rawData.secondary_id !== null
        ? {
            id: rawData.secondary_id,
            name: rawData.secondary_name!,
            svg: rawData.secondary_svg!,
            color: rawData.secondary_color!,
          }
        : null;

    return {
      primary,
      secondary,
    };
  }
}
