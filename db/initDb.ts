import { SQLiteDatabase } from "expo-sqlite";

const createTable = async (db: SQLiteDatabase) => {
  const createTableCategory = `CREATE TABLE IF NOT EXISTS Category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT NOT NULL,
      svg TEXT NOT NULL,
      parentId INTEGER,
      type TEXT CHECK(type IN ('EXPENSE','INCOME')) NOT NULL,
      FOREIGN KEY (parentId) REFERENCES Category(id)
    );`;
  const createTableAccount = `CREATE TABLE IF NOT EXISTS Account (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      svg TEXT NOT NULL,
      balance INTEGER NOT NULL
    );`;
  const createTableOperation = `CREATE TABLE IF NOT EXISTS Operation (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      amount INTEGER NOT NULL,
      categoryId INTEGER NOT NULL,
      FOREIGN KEY (categoryId) REFERENCES Category(id)
    );`;

  await db.runAsync(createTableCategory);
  await db.runAsync(createTableAccount);
  await db.runAsync(createTableOperation);
};

const dropTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    DROP TABLE IF EXISTS Category;
    DROP TABLE IF EXISTS Account;
    DROP TABLE IF EXISTS Operation;
  `);
};

const insertTable = async (db: SQLiteDatabase) => {
  const statementCategory = await db.prepareAsync(
    "INSERT INTO Category (id, name,type, color, svg, parentId) VALUES ($id, $name,$type, $color, $svg, $parent_id)"
  );
  statementCategory.executeAsync({
    $name: "Nourriture",
    $color: "#96e1e4",
    $svg: "fork",
    $type: "EXPENSE",
    $parent_id: null,
    $id: 1,
  });
  statementCategory.executeAsync({
    $name: "Supermarché",
    $type: "EXPENSE",
    $color: "#cf6262",
    $svg: "cash",
    $parent_id: 1,
    $id: 2,
  });
  statementCategory.executeAsync({
    $name: "Fruits & Légumes",
    $color: "#212e6c",
    $svg: "apple",
    $type: "EXPENSE",
    $parent_id: null,
    $id: 3,
  });
  statementCategory.executeAsync({
    $name: "Loisir",
    $color: "#636363",
    $svg: "people",
    $type: "EXPENSE",
    $parent_id: null,
    $id: 4,
  });
  statementCategory.executeAsync({
    $name: "Ping-Pong",
    $color: "#689b82",
    $svg: "people",
    $type: "EXPENSE",
    $parent_id: 4,
    $id: 5,
  });
  statementCategory.executeAsync({
    $name: "Salaire",
    $color: "#96e1e4",
    $svg: "fork",
    $type: "INCOME",
    $parent_id: null,
    $id: 6,
  });

  const statementAccount = await db.prepareAsync(
    "INSERT INTO Account (name, svg, balance) VALUES ($name, $svg, $balance)"
  );
  statementAccount.executeAsync({
    $name: "Banque",
    $svg: "bank",
    $balance: 6523,
  });
  statementAccount.executeAsync({
    $name: "Cash",
    $svg: "piggy-bank",
    $balance: 5616,
  });
  statementAccount.executeAsync({
    $name: "Lydia",
    $svg: "dollar",
    $balance: 235,
  });

  const statementOperation = await db.prepareAsync(
    "INSERT INTO Operation (date, amount, categoryId) VALUES ($date, $amount, $categoryId)"
  );
  statementOperation.executeAsync({
    $date: "2025-11-29",
    $amount: 100,
    $categoryId: 2,
  });
  statementOperation.executeAsync({
    $date: "2025-11-29",
    $amount: 200,
    $categoryId: 2,
  });
  statementOperation.executeAsync({
    $date: "2025-11-29",
    $amount: 600,
    $categoryId: 3,
  });
  statementOperation.executeAsync({
    $date: "2025-11-29",
    $amount: 400,
    $categoryId: 5,
  });
};

export const migrateDb = async (db: SQLiteDatabase) => {
  await dropTable(db);
  await createTable(db);
  await insertTable(db);
};
