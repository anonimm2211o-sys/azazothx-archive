"use client";

import { Search } from "lucide-react";
import clsx from "clsx";
import type { Category, ReadingStatus } from "@/lib/types";

const categories: Category[] = [
  "Finance",
  "Investasi",
  "Bisnis",
  "Programming",
  "Self Development",
];

const statuses: { value: ReadingStatus; label: string }[] = [
  { value: "to_read", label: "Belum dibaca" },
  { value: "reading", label: "Sedang dibaca" },
  { value: "finished", label: "Selesai" },
  { value: "paused", label: "Dijeda" },
];

interface SearchFilterProps {
  query: string;
  onQueryChange: (value: string) => void;
  activeCategory: Category | null;
  onCategoryChange: (value: Category | null) => void;
  activeStatus: ReadingStatus | null;
  onStatusChange: (value: ReadingStatus | null) => void;
}

export default function SearchFilter({
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
  activeStatus,
  onStatusChange,
}: SearchFilterProps) {
  return (
    <div className="glass rounded-2xl p-4 flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mist" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          type="text"
          placeholder="Cari judul atau penulis..."
          className="w-full bg-abyss/70 border border-edge rounded-full pl-10 pr-4 py-2.5 text-sm placeholder:text-mist/60 focus:outline-none focus:border-neon/60 focus:ring-1 focus:ring-neon/40"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={chip(activeCategory === null)}
        >
          Semua kategori
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onCategoryChange(c)}
            className={chip(activeCategory === c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onStatusChange(null)}
          className={chip(activeStatus === null)}
        >
          Semua status
        </button>
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => onStatusChange(s.value)}
            className={chip(activeStatus === s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function chip(active: boolean) {
  return clsx(
    "text-xs px-3 py-1.5 rounded-full border transition-colors",
    active
      ? "bg-neon/15 border-neon/50 text-neon-bright shadow-glow-sm"
      : "border-edge text-mist hover:border-neon/30 hover:text-neon-bright"
  );
}
