import CategoryMapper from "@/mappers/CategoryMapper";
import { SQLiteDatabase } from "expo-sqlite";
import CategoryConfig from "./CategoryConfig";
import {
  GroupedCategory,
  GroupedCategoryWithTotal,
} from "@/db/dao/CategoryDAO";

export default class CategoryService {
  static async getCategory(db: SQLiteDatabase): Promise<void> {
    const groupedCategory = await db.getAllAsync<GroupedCategory>(
      CategoryConfig.getGroupedCategory
    );
    console.log(JSON.stringify(groupedCategory, null, 2));
    console.log(
      JSON.stringify(CategoryMapper.getCategories(groupedCategory), null, 2)
    );
  }
}
