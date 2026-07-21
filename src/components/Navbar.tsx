"use client";

import Link from "next/link";
import { Search, Bell, ScrollText } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-edge/60">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <ScrollText className="h-5 w-5 text-neon group-hover:text-neon-bright transition-colors" />
          <span className="font-display text-xl tracking-wide text-glow">
            AZAZOTHX <span className="text-neon">Archive</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mist" />
            <input
              type="text"
              placeholder="Cari buku, penulis, atau catatan..."
              className="w-full bg-abyss/70 border border-edge rounded-full pl-10 pr-4 py-2 text-sm text-mist placeholder:text-mist/60 focus:outline-none focus:border-neon/60 focus:ring-1 focus:ring-neon/40 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="Notifikasi"
            className="text-mist hover:text-neon-bright transition-colors"
          >
            <Bell className="h-5 w-5" />
          </button>
          <Link
            href="/profile"
            className="h-9 w-9 rounded-full bg-gradient-to-br from-neon to-ember flex items-center justify-center text-xs font-semibold shadow-glow-sm"
          >
            RZ
          </Link>
        </div>
      </div>
    </header>
  );
}
