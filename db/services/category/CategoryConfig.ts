export default class CategoryConfig {
  static getGroupedCategory = `SELECT 
      p.id as primary_id,
      p.name AS primary_name,
      p.color AS primary_color,
      p.svg AS primary_svg,
      s.id AS secondary_id,
      s.name AS secondary_name,
      s.color AS secondary_color,
      s.svg AS secondary_svg
    FROM Category AS p
    LEFT JOIN Category AS s
    ON p.id = s.parentId
    WHERE p.parentId IS NULL;`;

  static getSubCategoryWithTotal = `SELECT 
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
    GROUP BY p.id;`;

  static getGroupedCategoryWithTotal = `SELECT 
      p.id as primary_id,
      p.name AS primary_name,
      p.color AS primary_color,
      p.svg AS primary_svg,
      s.id AS secondary_id,
      s.name AS secondary_name,
      s.color AS secondary_color,
      s.svg AS secondary_svg,
      s.total AS secondary_total
    FROM Category AS p
    LEFT JOIN ( ${CategoryConfig.getSubCategoryWithTotal.replace(
      ";",
      ""
    )} ) AS s
    ON p.id = s.parentId
    WHERE p.parentId IS NULL;`;
}
