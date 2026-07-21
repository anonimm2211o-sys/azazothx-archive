"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, NotebookPen } from "lucide-react";

export default function NoteForm({ bookId }: { bookId: string }) {
  const supabase = createClient();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [pageRef, setPageRef] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    await supabase.from("book_notes").insert({
      book_id: bookId,
      user_id: user.id,
      content,
      page_reference: pageRef || null,
    });

    setContent("");
    setPageRef("");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis rangkuman atau insight dari buku ini..."
        rows={3}
        className="w-full bg-abyss/70 border border-edge rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-neon/60"
      />
      <div className="flex items-center gap-3">
        <input
          value={pageRef}
          onChange={(e) => setPageRef(e.target.value)}
          placeholder="Halaman (opsional)"
          className="w-40 bg-abyss/70 border border-edge rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-neon/60"
        />
        <button
          type="submit"
          disabled={loading}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-neon text-void text-sm font-semibold hover:bg-neon-soft transition-colors disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <NotebookPen className="h-4 w-4" />
          )}
          Simpan catatan
        </button>
      </div>
    </form>
  );
}
