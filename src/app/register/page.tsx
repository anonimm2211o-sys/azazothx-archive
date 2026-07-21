"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ScrollText, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setDone(true);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm glass rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2 justify-center">
          <ScrollText className="h-5 w-5 text-neon" />
          <span className="font-display text-lg">
            AZAZOTHX <span className="text-neon">Archive</span>
          </span>
        </div>

        {done ? (
          <p className="text-sm text-mist text-center">
            Cek emailmu untuk konfirmasi akun, lalu{" "}
            <Link href="/login" className="text-neon-bright hover:underline">
              masuk di sini
            </Link>
            .
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 text-sm text-mist">
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-abyss/70 border border-edge rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neon/60"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-mist">
              Kata sandi
              <input
                required
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-abyss/70 border border-edge rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neon/60"
              />
            </label>

            {error && <p className="text-sm text-ember">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-neon text-void font-semibold text-sm shadow-glow-sm hover:bg-neon-soft transition-colors disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Daftar
            </button>
          </form>
        )}

        <p className="text-center text-sm text-mist">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-neon-bright hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </main>
  );
}
