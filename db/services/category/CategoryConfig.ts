import { encloseSQLStatement } from "@/db/utils";

const getGroupedCategorySQL = `SELECT 
      p.id  primary_id,
      p.name AS primary_name,
      p.color AS primary_color,
      p.svg AS primary_svg,
      p.type AS primary_type,
      s.id AS secondary_id,
      s.name AS secondary_name,
      s.color AS secondary_color,
      s.svg AS secondary_svg
    FROM Category AS p
    LEFT JOIN Category AS s
    ON p.id = s.parentId
    WHERE p.parentId IS NULL`;

const getSubCategoryWithTotalSQL = `SELECT 
      p.id AS id,
      p.name AS name,
      p.color AS color,
      p.svg AS svg,
      p.parentId AS parentId,
      SUM(o.amount) AS total
    FROM Category AS p
    LEFT JOIN Operation AS o
    ON p.id = o.categoryId
    WHERE p.parentId IS NOT NULL
    GROUP BY p.id`;

const getGroupedCategoryWithTotalSQL = `
  WITH sub_category AS (
    ${getSubCategoryWithTotalSQL}
  )
  SELECT 
      p.id as primary_id,
      p.name AS primary_name,
      p.color AS primary_color,
      p.svg AS primary_svg,
      p.type AS primary_type,
      s.id AS secondary_id,
      s.name AS secondary_name,
      s.color AS secondary_color,
      s.svg AS secondary_svg,
      s.total AS secondary_total,

      FROM Category AS p
    LEFT JOIN sub_category AS s
    ON p.id = s.parentId
    LEFT JOIN Operation AS o
    ON p.id = o.categoryId
    WHERE p.parentId IS NULL
    GROUP BY s.id`;

export default class CategoryConfig {
  static fetchGroupedCategoryQuery = () =>
    encloseSQLStatement(getGroupedCategorySQL);

  static fetchGroupedCategoryWithTotalQuery = () =>
    encloseSQLStatement(getGroupedCategoryWithTotalSQL);
}
