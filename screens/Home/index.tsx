import { AccountSelector } from "@/components/AccountSelector";
import AccountService from "@/db/services/account/AccountService";
import { useDbQuery } from "@/hooks/useDbQuery";
import { MainLayout } from "../MainLayout";

export function Home() {
  const { data: accounts } = useDbQuery({
    queryFn: AccountService.getAccounts,
    queryKey: ["accounts"],
  });

  return (
    <MainLayout>
      <AccountSelector accounts={accounts} />
    </MainLayout>
  );
}
