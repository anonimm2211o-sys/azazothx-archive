"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="self-start flex items-center gap-2 px-4 py-2.5 rounded-full border border-edge hover:border-ember/50 hover:text-ember transition-colors text-sm"
    >
      <LogOut className="h-4 w-4" />
      Keluar
    </button>
  );
}
