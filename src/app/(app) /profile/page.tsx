import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";

export default async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { count: bookCount } = await supabase
    .from("books")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  return (
    <div className="flex flex-col gap-8 max-w-lg">
      <div>
        <h1 className="font-display text-3xl text-glow">Profil</h1>
        <p className="text-mist text-sm mt-1">
          Identitas arsipmu di AZAZOTHX.
        </p>
      </div>

      <div className="glass rounded-2xl p-6 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-neon to-ember flex items-center justify-center font-display text-xl shadow-glow-sm">
          {(profile?.username ?? user.email ?? "?").slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="font-display text-lg text-glow">
            {profile?.full_name || profile?.username || "Penjelajah Ilmu"}
          </p>
          <p className="text-sm text-mist">{user.email}</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 flex justify-between">
        <div>
          <p className="text-xs text-mist uppercase tracking-wider">
            Total buku diarsipkan
          </p>
          <p className="font-display text-2xl text-glow mt-1">
            {bookCount ?? 0}
          </p>
        </div>
      </div>

      <SignOutButton />
    </div>
  );
}
