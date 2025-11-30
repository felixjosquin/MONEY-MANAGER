import { ICONS } from "@/constants/icons/icons";
import AccountDAO from "@/db/dao/AccountDAO";
import Account from "@/models/Account";
import { IconsName } from "@/types";

export default class AccountMapper {
  static getAccounts(rawData: AccountDAO[]): Account[] {
    return rawData.map(AccountMapper.getAccount);
  }

  static getAccount(rawData: AccountDAO): Account {
    const isValidIcon = Object.keys(ICONS).includes(rawData.svg);
    return {
      id: rawData.id,
      svg: isValidIcon ? (rawData.svg as IconsName) : "question",
      name: rawData.name,
      balance: rawData.balance / 10,
    };
  }
}
