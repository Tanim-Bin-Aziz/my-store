import type { Metadata } from "next";
import Link from "next/link";
import { SiteName } from "@/components/site-name";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-6 p-6">
      <Link href="/" className="block text-center">
        <SiteName className="text-4xl font-bold tracking-tight" />
      </Link>

      <div className="rounded-2xl border bg-background p-6">
        <h1 className="text-xl font-semibold tracking-tight">Create account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Order faster and keep track of your purchases.</p>

        <div className="mt-6">
          <SignupForm />
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-foreground underline">
          Sign in
        </Link>
      </p>
    </main>
  );
}
