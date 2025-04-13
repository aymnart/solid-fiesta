import { Separator } from "@/components/ui/separator";
import { SecurityForm } from "@/components/settings/security-form";
import { auth } from "@/auth";
import { getIsTwoFactorEnabledById } from "@/data/user";
import { getAccountById } from "@/data/account";

export default async function SecurityPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <p>You need to be logged in to edit settings.</p>;
  }
  const account = await getAccountById(userId, { provider: true });
  const isTwoAuthEnabled = await getIsTwoFactorEnabledById(userId);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Configure security parameters for your account.
        </p>
      </div>
      <Separator />
      <SecurityForm
        provider={account?.provider}
        two_factor={isTwoAuthEnabled}
      />
    </div>
  );
}
