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
      <PieChart
        data={[
          {
            label: "nourriture",
            color: "#9c659c",
            key: "food",
            value: 523,
            svgName: "apple",
          },
          {
            label: "loisir",
            color: "#659c81",
            key: "leisure",
            value: 230,
            svgName: "apple",
          },
          {
            label: "autres",
            color: "#5952b3",
            key: "other",
            value: 153,
            svgName: "apple",
          },
        ]}
        size={100}
      ></PieChart>
    </MainLayout>
  );
}
