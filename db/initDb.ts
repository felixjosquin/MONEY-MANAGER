import { SQLiteDatabase } from "expo-sqlite";

const createTable = async (db: SQLiteDatabase) => {
  const createTableCategory = `CREATE TABLE IF NOT EXISTS Category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT NOT NULL,
      svg TEXT NOT NULL,
      parentId INTEGER,
      FOREIGN KEY (parentId) REFERENCES Category(id),
      CHECK (parentId IS NULL OR parentId != id)    
  );`;
  const createTableAccount = `CREATE TABLE IF NOT EXISTS Account (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      svg TEXT NOT NULL,
      balance INTEGER NOT NULL
    );`;
  await db.runAsync(createTableCategory);
  await db.runAsync(createTableAccount);
};

const dropTable = async (db: SQLiteDatabase) => {
  db.execAsync(`
    DROP TABLE IF EXISTS Category;
    DROP TABLE IF EXISTS Account;
  `);
};

const insertTable = async (db: SQLiteDatabase) => {
  const statement = await db.prepareAsync(
    "INSERT INTO Category (name, color, svg, parentId) VALUES ($name, $color, $svg_path, $parent_id)"
  );
  statement.executeAsync({
    $name: "Primary",
    $color: "#ffffff",
    $svg_path: "",
    $parent_id: null,
  });
  statement.executeAsync({
    $name: "sub-category-2",
    $color: "#ffffff",
    $svg_path: "dsfs",
    $parent_id: 1,
  });
  statement.executeAsync({
    $name: "sub-category-1",
    $color: "#ffffff",
    $svg_path: "fsdf",
    $parent_id: 1,
  });
  statement.executeAsync({
    $name: "Primary-2",
    $color: "#ffffff",
    $svg_path: "fsd",
    $parent_id: null,
  });
};

export const migrateDb = async (db: SQLiteDatabase) => {
  await dropTable(db);
  await createTable(db);
  await insertTable(db);
};
