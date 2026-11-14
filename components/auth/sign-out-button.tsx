"use client";

import { useFormStatus } from "react-dom";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth/actions";
import { Button, type ButtonProps } from "@/components/ui/button";

function SubmitButton({ className, ...props }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className={className} {...props}>
      {pending ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
      {pending ? "Signing out…" : "Sign out"}
    </Button>
  );
}

export function SignOutButton({ className }: { className?: string }) {
  return (
    <form action={signOut}>
      <SubmitButton variant="outline" size="sm" className={className} />
    </form>
  );
}
