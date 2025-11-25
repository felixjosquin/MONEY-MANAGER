import { SQLiteDatabase } from "expo-sqlite";

const createTable = async (db: SQLiteDatabase) => {
  const createTableCategory = `CREATE TABLE IF NOT EXISTS Category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT NOT NULL,
      svg TEXT NOT NULL,
      parentId INTEGER,
      FOREIGN KEY (parentId) REFERENCES Category(id)
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
  const statementCategory = await db.prepareAsync(
    "INSERT INTO Category (name, color, svg, parentId) VALUES ($name, $color, $svg, $parent_id)"
  );
  statementCategory.executeAsync({
    $name: "Primary",
    $color: "#ffffff",
    $svg: "",
    $parent_id: null,
  });
  statementCategory.executeAsync({
    $name: "sub-category-2",
    $color: "#ffffff",
    $svg: "dsfs",
    $parent_id: 1,
  });
  statementCategory.executeAsync({
    $name: "sub-category-1",
    $color: "#ffffff",
    $svg: "fsdf",
    $parent_id: 1,
  });
  statementCategory.executeAsync({
    $name: "Primary-2",
    $color: "#ffffff",
    $svg: "fsd",
    $parent_id: null,
  });
  const statementAccount = await db.prepareAsync(
    "INSERT INTO Account (name, svg, balance) VALUES ($name, $svg, $balance)"
  );

  statementAccount.executeAsync({
    $name: "Banque",
    $svg: "bank-outline",
    $balance: 10,
  });
  statementAccount.executeAsync({
    $name: "Cash",
    $svg: "piggy-bank-solid",
    $balance: 10,
  });
  statementAccount.executeAsync({
    $name: "Lydia",
    $svg: "bx-dollar-circle",
    $balance: 10,
  });
};

export const migrateDb = async (db: SQLiteDatabase) => {
  await dropTable(db);
  await createTable(db);
  await insertTable(db);
};
