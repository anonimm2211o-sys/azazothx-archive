import { createClient } from "@/lib/supabase/server";
import { BookOpen, CheckCircle2, Clock, Flame } from "lucide-react";
import type { Book } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  const books = (data ?? []) as Book[];
  const total = books.length;
  const finished = books.filter((b) => b.status === "finished").length;
  const reading = books.filter((b) => b.status === "reading").length;
  const avgProgress = total
    ? Math.round(books.reduce((sum, b) => sum + b.progress, 0) / total)
    : 0;

  const byCategory = books.reduce<Record<string, number>>((acc, b) => {
    acc[b.category] = (acc[b.category] ?? 0) + 1;
    return acc;
  }, {});

  const stats = [
    { label: "Total buku", value: total, icon: BookOpen },
    { label: "Selesai dibaca", value: finished, icon: CheckCircle2 },
    { label: "Sedang berjalan", value: reading, icon: Clock },
    { label: "Rata-rata progres", value: `${avgProgress}%`, icon: Flame },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl text-glow">Dashboard Belajar</h1>
        <p className="text-mist text-sm mt-1">
          Ringkasan perjalanan belajarmu sejauh ini.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass rounded-2xl p-5 flex flex-col gap-2">
            <Icon className="h-5 w-5 text-neon" />
            <span className="font-display text-2xl text-glow">{value}</span>
            <span className="text-xs text-mist">{label}</span>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl text-glow mb-4">Per Kategori</h2>
        <div className="flex flex-col gap-3">
          {Object.entries(byCategory).length === 0 && (
            <p className="text-sm text-mist">
              Belum ada buku. Tambahkan koleksi pertamamu di halaman Koleksi Buku.
            </p>
          )}
          {Object.entries(byCategory).map(([cat, count]) => (
            <div key={cat} className="flex items-center gap-3">
              <span className="text-sm text-mist w-36 shrink-0">{cat}</span>
              <div className="flex-1 h-2 rounded-full bg-edge overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-dim to-neon-bright"
                  style={{ width: `${(count / total) * 100}%` }}
                />
              </div>
              <span className="text-xs text-mist w-6 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
