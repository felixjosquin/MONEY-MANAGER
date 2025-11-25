import AccountDAO from "@/db/dao/AccountDAO";
import Account from "@/models/Account";

export default class AccountMapper {
  static getAccounts(rawData: AccountDAO[]): Account[] {
    return rawData.map(AccountMapper.getAccount);
  }

  static getAccount(rawData: AccountDAO): Account {
    return {
      id: rawData.id,
      svg: rawData.svg,
      name: rawData.name,
      balance: rawData.balance,
    };
  }
}
