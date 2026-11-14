"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, Loader2, LogOut, User as UserIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/auth/actions";

type MenuUser = {
  email: string | null;
  name: string | null;
  role: "customer" | "admin";
};

const iconButtonClass = "flex h-11 w-11 items-center justify-center rounded-md hover:bg-muted";
const itemClass = "flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted";

function SignOutItem({ className }: { className: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}

export function UserMenu() {
  const [user, setUser] = React.useState<MenuUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function load() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      if (!active) return;
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", currentUser.id)
        .maybeSingle();
      if (!active) return;
      setUser({
        email: currentUser.email ?? null,
        name: (data?.full_name as string | null) ?? null,
        role: (data?.role as "customer" | "admin") ?? "customer",
      });
      setLoading(false);
    }

    load();
    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      load();
    });
    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  // Close when navigating.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on outside click or Escape.
  React.useEffect(() => {
    if (!open) return;
    function handlePointer(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (loading) {
    return (
      <span className={iconButtonClass} aria-hidden="true">
        <UserIcon size={20} className="text-muted-foreground" />
      </span>
    );
  }

  if (!user) {
    return (
      <Link href="/login" aria-label="Sign in" className={iconButtonClass}>
        <UserIcon size={20} />
      </Link>
    );
  }

  const isAdmin = user.role === "admin";
  const label = user.name || user.email || "Account";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Account menu"
        onClick={() => setOpen((value) => !value)}
        className={iconButtonClass}
      >
        <UserIcon size={20} />
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-1 w-56 overflow-hidden rounded-lg border bg-background py-1 shadow-md">
          <div className="border-b px-3 py-2">
            <div className="truncate text-sm font-medium">{label}</div>
            <div className="text-xs capitalize text-muted-foreground">{user.role}</div>
          </div>

          <Link href="/account" className={itemClass}>
            <UserIcon size={16} />
            Your account
          </Link>
          <Link href="/" className={itemClass}>
            <Home size={16} />
            Home
          </Link>
          {isAdmin ? (
            <Link href="/admin" className={itemClass}>
              <LayoutDashboard size={16} />
              Admin panel
            </Link>
          ) : null}

          <form action={signOut} className="border-t">
            <SignOutItem className={itemClass} />
          </form>
        </div>
      ) : null}
    </div>
  );
}
