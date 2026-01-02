import {
  GroupedCategory,
  GroupedCategoryWithTotal,
  isSubCategory,
} from "@/db/dao/CategoryDAO";
import { Category, CategoryWithTotal, SubCategory } from "@/models/Category";
import { RGB } from "@/types";

type StandaloneCategory = Omit<Category, "subCategory">;

export default class CategoryMapper {
  static groupCategory<
    Input,
    Output extends Category,
    Primary extends { id: number }
  >(
    rawData: Input[],
    parseRawData: (raw: Input) => {
      primary: Primary;
      secondary: SubCategory<Output> | null;
    },
    buildPrimary: (
      primary: Primary,
      subCategories: SubCategory<Output>[]
    ) => Output
  ): Output[] {
    const groupMap = new Map<
      number,
      { primary: Primary; subCategories: SubCategory<Output>[] }
    >();

    for (const row of rawData) {
      const { primary, secondary } = parseRawData(row);
      if (!groupMap.has(primary.id)) {
        groupMap.set(primary.id, { primary, subCategories: [] });
      }
      const group = groupMap.get(primary.id)!;
      if (secondary != null) {
        group.subCategories.push(secondary);
      }
    }

    return Array.from(groupMap.values()).map(({ primary, subCategories }) =>
      buildPrimary(primary, subCategories)
    );
  }

  static extractCategory(rawData: GroupedCategory): {
    primary: StandaloneCategory;
    secondary: SubCategory<Category> | null;
  } {
    const primary: StandaloneCategory = {
      id: rawData.primary_id,
      name: rawData.primary_name,
      type: rawData.primary_type,
      svg: rawData.primary_svg,
      color: rawData.primary_color as RGB,
    };

    const secondary = isSubCategory(rawData)
      ? {
          id: rawData.secondary_id,
          name: rawData.secondary_name,
          svg: rawData.secondary_svg,
          color: rawData.secondary_color as RGB,
        }
      : null;

    return {
      primary,
      secondary,
    };
  }

  static extractCategoryWithTotal(rawData: GroupedCategoryWithTotal): {
    primary: StandaloneCategory;
    secondary: SubCategory<CategoryWithTotal> | null;
  } {
    const { primary, secondary } = CategoryMapper.extractCategory(rawData);

    if (secondary === null || !isSubCategory(rawData)) {
      return {
        primary,
        secondary: null,
      };
    }

    return {
      primary,
      secondary: { ...secondary, total: rawData.secondary_total },
    };
  }

  static getCategories(raw: GroupedCategory[]): Category[] {
    return CategoryMapper.groupCategory(
      raw,
      CategoryMapper.extractCategory,
      (primary, subCategories) => ({
        ...primary,
        subCategory: subCategories,
      })
    );
  }

  static getCategoriesWithTotal(
    raw: GroupedCategoryWithTotal[]
  ): CategoryWithTotal[] {
    return CategoryMapper.groupCategory(
      raw,
      CategoryMapper.extractCategoryWithTotal,
      (primary, subCategories) => ({
        ...primary,
        total: subCategories.reduce((sum, c) => sum + c.total, 0),
        subCategory: subCategories,
      })
    );
  }
}
