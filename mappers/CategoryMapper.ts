import {
  GroupedCategory,
  GroupedCategoryWithTotal,
} from "@/db/dao/CategoryDAO";
import { Category, CategoryWithTotal } from "@/models/Category";
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
      secondary: Output | null;
    },
    buildPrimary: (primary: Primary, subCategories: Output[]) => Output
  ): Output[] {
    const groupMap = new Map<
      number,
      { primary: Primary; subCategories: Output[] }
    >();

    for (const row of rawData) {
      const { primary, secondary } = parseRawData(row);
      if (!groupMap.has(primary.id)) {
        groupMap.set(primary.id, { primary, subCategories: [] });
      }
      const group = groupMap.get(primary.id)!;
      if (secondary) {
        group.subCategories.push({ ...secondary, subCategory: null });
      }
    }

    return Array.from(groupMap.values()).map(({ primary, subCategories }) =>
      buildPrimary(primary, subCategories)
    );
  }

  static extractCategory(rawData: GroupedCategory): {
    primary: StandaloneCategory;
    secondary: Category | null;
  } {
    const primary: StandaloneCategory = {
      id: rawData.primary_id,
      name: rawData.primary_name,
      svg: rawData.primary_svg,
      color: rawData.primary_color as RGB,
    };

    const secondary =
      rawData.secondary_id !== null
        ? {
            id: rawData.secondary_id,
            name: rawData.secondary_name,
            svg: rawData.secondary_svg,
            color: rawData.secondary_color as RGB,
            subCategory: null,
          }
        : null;

    return {
      primary,
      secondary,
    };
  }

  static extractCategoryWithTotal({
    secondary_total,
    ...data
  }: GroupedCategoryWithTotal): {
    primary: StandaloneCategory;
    secondary: CategoryWithTotal | null;
  } {
    const { primary, secondary: secondaryCategory } =
      CategoryMapper.extractCategory(data);
    const secondary = secondaryCategory
      ? { ...secondaryCategory, total: secondary_total, subCategory: null }
      : null;
    return {
      primary,
      secondary,
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
