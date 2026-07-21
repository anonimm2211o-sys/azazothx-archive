import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import type { Book, BookNote, TimelineEntry } from "@/lib/types";
import NoteForm from "./NoteForm";

export default async function BookDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!book) notFound();

  const { data: notes } = await supabase
    .from("book_notes")
    .select("*")
    .eq("book_id", params.id)
    .order("created_at", { ascending: false });

  const { data: timeline } = await supabase
    .from("timeline_entries")
    .select("*")
    .eq("book_id", params.id)
    .order("created_at", { ascending: true });

  const typedBook = book as Book;
  const typedNotes = (notes ?? []) as BookNote[];
  const typedTimeline = (timeline ?? []) as TimelineEntry[];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass">
          {typedBook.cover_url ? (
            <Image
              src={typedBook.cover_url}
              alt={`Sampul ${typedBook.title}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-mist/40">
              <BookOpen className="h-10 w-10" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest text-neon/80">
            {typedBook.category}
          </p>
          <h1 className="font-display text-3xl text-glow">
            {typedBook.title}
          </h1>
          <p className="text-mist">{typedBook.author}</p>

          <div className="mt-2 h-2 w-full max-w-sm rounded-full bg-edge overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-dim to-neon-bright"
              style={{ width: `${typedBook.progress}%` }}
            />
          </div>
          <span className="text-xs text-mist">
            {typedBook.progress}% selesai
          </span>
        </div>
      </div>

      <section className="glass rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="font-display text-xl text-glow">Catatan & Rangkuman</h2>
        <NoteForm bookId={typedBook.id} />
        <div className="flex flex-col gap-4 mt-2">
          {typedNotes.length === 0 && (
            <p className="text-sm text-mist">
              Belum ada catatan. Tulis rangkuman pertamamu di atas.
            </p>
          )}
          {typedNotes.map((note) => (
            <div
              key={note.id}
              className="border-l-2 border-neon/40 pl-4 py-1"
            >
              {note.page_reference && (
                <p className="text-xs text-neon/70 mb-1">
                  Hal. {note.page_reference}
                </p>
              )}
              <p className="text-sm text-mist leading-relaxed">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl text-glow mb-4">
          Timeline Belajar
        </h2>
        {typedTimeline.length === 0 ? (
          <p className="text-sm text-mist">Belum ada jejak timeline.</p>
        ) : (
          <ol className="flex flex-col gap-4">
            {typedTimeline.map((entry) => (
              <li key={entry.id} className="flex gap-3">
                <span className="h-2 w-2 mt-1.5 rounded-full bg-neon shrink-0" />
                <div>
                  <p className="text-sm text-neon-bright">{entry.title}</p>
                  <p className="text-sm text-mist">{entry.event}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
