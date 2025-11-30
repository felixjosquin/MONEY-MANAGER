import { AccountSelector } from "@/components/AccountSelector";
import AccountService from "@/db/services/account/AccountService";
import { useDbQuery } from "@/hooks/useDbQuery";
import { MainLayout } from "../MainLayout";
import { useEffect } from "react";
import CategoryService from "@/db/services/category/CategoryService";
import { useSQLiteContext } from "expo-sqlite";
import { PieChart } from "@/components/PieChart";

export function Home() {
  const { data: accounts } = useDbQuery({
    queryFn: AccountService.getAccounts,
    queryKey: ["accounts"],
  });
  const db = useSQLiteContext();

  useEffect(() => {
    CategoryService.getCategoryWithTotal(db);
  }, [db]);
  return (
    <MainLayout>
      <AccountSelector accounts={accounts} />
      <PieChart data={[]} size={100}></PieChart>
    </MainLayout>
  );
}
