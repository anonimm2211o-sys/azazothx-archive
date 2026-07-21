"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import type { Book } from "@/lib/types";

const statusLabel: Record<Book["status"], string> = {
  to_read: "Belum dibaca",
  reading: "Sedang dibaca",
  finished: "Selesai",
  paused: "Dijeda",
};

const statusColor: Record<Book["status"], string> = {
  to_read: "text-mist border-mist/30",
  reading: "text-neon-bright border-neon/40",
  finished: "text-emerald-300 border-emerald-400/30",
  paused: "text-ember border-ember/30",
};

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="group glass glass-hover rounded-2xl overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[3/4] bg-panel">
        {book.cover_url ? (
          <Image
            src={book.cover_url}
            alt={`Sampul ${book.title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-mist/40">
            <BookOpen className="h-10 w-10" />
          </div>
        )}
        <span
          className={`absolute top-2 right-2 text-[10px] px-2 py-1 rounded-full bg-void/70 border ${statusColor[book.status]}`}
        >
          {statusLabel[book.status]}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <p className="text-[11px] uppercase tracking-wider text-neon/80">
          {book.category}
        </p>
        <h3 className="font-display text-lg leading-tight text-glow line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-mist">{book.author}</p>

        <div className="mt-2 h-1.5 w-full rounded-full bg-edge overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-neon-dim to-neon-bright"
            style={{ width: `${book.progress}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
