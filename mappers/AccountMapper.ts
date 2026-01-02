import AccountDAO from "@/db/dao/AccountDAO";
import Account from "@/models/Account";
import { isIconName } from "@/types";

export default class AccountMapper {
  static getAccounts(rawData: AccountDAO[]): Account[] {
    return rawData.map(AccountMapper.getAccount);
  }

  static getAccount(rawData: AccountDAO): Account {
    return {
      id: rawData.id,
      svg: isIconName(rawData.svg) ? rawData.svg : "question",
      name: rawData.name,
      balance: rawData.balance / 10,
    };
  }
}
