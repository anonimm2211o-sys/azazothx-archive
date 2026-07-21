import Link from "next/link";
import {
  ScrollText,
  BookOpen,
  BarChart3,
  Tags,
  Search,
  Timer,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Koleksi Buku Hidup",
    desc: "Setiap buku punya cover, status, dan progres — bukan sekadar entri di daftar.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Statistik",
    desc: "Lihat pola belajarmu: berapa buku selesai, kategori favorit, dan momentum bulanan.",
  },
  {
    icon: Tags,
    title: "Tag & Kategori",
    desc: "Finance, Investasi, Bisnis, Programming, Self Development — terorganisir rapi.",
  },
  {
    icon: Search,
    title: "Pencarian Instan",
    desc: "Filter berdasarkan status, kategori, atau kata kunci dalam hitungan detik.",
  },
  {
    icon: Timer,
    title: "Timeline Belajar",
    desc: "Rekam jejak perjalanan belajarmu dari buku ke buku, bab ke bab.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <ScrollText className="h-5 w-5 text-neon" />
          <span className="font-display text-lg tracking-wide">
            AZAZOTHX <span className="text-neon">Archive</span>
          </span>
        </div>
        <Link
          href="/login"
          className="text-sm px-4 py-2 rounded-full border border-edge hover:border-neon/50 hover:text-neon-bright transition-colors"
        >
          Masuk
        </Link>
      </nav>

      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-neon/80 mb-4">
          Personal Knowledge System
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-glow mb-6">
          Bukan daftar buku.
          <br />
          <span className="text-neon">Ini arsip perjalananmu.</span>
        </h1>
        <p className="text-mist text-base sm:text-lg max-w-xl mb-10">
          Simpan buku, rangkum ilmu, dan lacak setiap langkah belajarmu di satu
          tempat — dari Finance sampai Self Development.
        </p>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-6 py-3 rounded-full bg-neon text-void font-semibold shadow-glow hover:bg-neon-soft transition-colors"
          >
            Mulai Arsipkan
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-full border border-edge hover:border-neon/50 hover:text-neon-bright transition-colors"
          >
            Lihat Demo
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto w-full px-6 pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="glass glass-hover rounded-2xl p-6 flex flex-col gap-3"
          >
            <Icon className="h-6 w-6 text-neon" />
            <h3 className="font-display text-xl text-glow">{title}</h3>
            <p className="text-sm text-mist leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      <footer className="text-center text-xs text-mist/50 pb-10">
        AZAZOTHX Archive — arsipkan ilmu, terangi jalan belajarmu.
      </footer>
    </main>
  );
}
