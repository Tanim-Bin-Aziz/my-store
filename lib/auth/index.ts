import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: "customer" | "admin";
};

export type AuthState = {
  error?: string;
  message?: string;
};

/** Server-validated user (never trust client-side session state for authorization). */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile(): Promise<Profile | null> {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .single();

  return (data as Profile | null) ?? null;
}

export async function requireUser(next = "/account") {
  const user = await getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  return user;
}

/** Admin-only gate. Non-admins get a 404 so the panel's existence isn't revealed. */
export async function requireAdmin() {
  const user = await requireUser("/admin");
  const profile = await getProfile();
  if (profile?.role !== "admin") notFound();
  return { user, profile };
}
