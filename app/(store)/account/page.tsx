import type { Metadata } from "next";
import Link from "next/link";
import { getProfile, requireUser } from "@/lib/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  const user = await requireUser("/account");
  const profile = await getProfile();

  return (
    <main className="container flex flex-col gap-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your account</h1>
          <p className="text-sm text-muted-foreground">Signed in as {user.email}</p>
        </div>
        <SignOutButton />
      </div>

      <section className="rounded-2xl border p-5">
        <h2 className="font-semibold">Profile</h2>
        <dl className="mt-3 grid grid-cols-[110px_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Name</dt>
          <dd>{profile?.full_name || "—"}</dd>
          <dt className="text-muted-foreground">Email</dt>
          <dd>{user.email}</dd>
          <dt className="text-muted-foreground">Role</dt>
          <dd className="capitalize">{profile?.role ?? "customer"}</dd>
        </dl>
      </section>

      <section className="rounded-2xl border p-5">
        <h2 className="font-semibold">Orders</h2>
        <p className="mt-1 text-sm text-muted-foreground">You have no orders yet.</p>
        <Link href="/products" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-3")}>
          Start shopping
        </Link>
      </section>
    </main>
  );
}
