import type { Metadata } from "next";
import Link from "next/link";
import { SiteName } from "@/components/site-name";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; message?: string }>;
}) {
  const { next, message } = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-6 p-6">
      <Link href="/" className="block text-center">
        <SiteName className="text-4xl font-bold tracking-tight" />
      </Link>

      <div className="rounded-2xl border bg-background p-6">
        <h1 className="text-xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back. Sign in to your account.</p>

        {message ? (
          <p role="status" className="mt-4 rounded-md border border-input bg-muted px-3 py-2 text-sm">
            {message}
          </p>
        ) : null}

        <div className="mt-6">
          <LoginForm next={next} />
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link href="/signup" className="font-medium text-foreground underline">
          Create an account
        </Link>
      </p>
    </main>
  );
}
