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
}
