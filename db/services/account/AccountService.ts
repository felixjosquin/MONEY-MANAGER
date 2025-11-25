import { SQLiteDatabase } from "expo-sqlite";
import AccountConfig from "./AccountConfig";
import AccountDAO from "@/db/dao/AccountDAO";
import Account from "@/models/Account";
import AccountMapper from "@/mappers/AccountMapper";

export default class AccountService {
  static async getAccounts(db: SQLiteDatabase): Promise<Account[]> {
    const accounts = await db.getAllAsync<AccountDAO>(
      AccountConfig.getAccountsQuery
    );
    return AccountMapper.getAccounts(accounts);
  }
}
