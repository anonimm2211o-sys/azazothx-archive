"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Category, ReadingStatus } from "@/lib/types";
import { Loader2, Plus } from "lucide-react";

const categories: Category[] = [
  "Finance",
  "Investasi",
  "Bisnis",
  "Programming",
  "Self Development",
];

interface AddBookFormProps {
  onCreated?: () => void;
}

export default function AddBookForm({ onCreated }: AddBookFormProps) {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<Category>("Programming");
  const [coverUrl, setCoverUrl] = useState("");
  const [status, setStatus] = useState<ReadingStatus>("to_read");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Kamu perlu masuk dulu sebelum menambahkan buku.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("books").insert({
      user_id: user.id,
      title,
      author,
      category,
      cover_url: coverUrl || null,
      status,
      progress: status === "finished" ? 100 : 0,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setTitle("");
    setAuthor("");
    setCoverUrl("");
    onCreated?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-6 flex flex-col gap-4"
    >
      <h3 className="font-display text-xl text-glow">Tambah Buku Baru</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Judul buku">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            placeholder="Contoh: Rich Dad Poor Dad"
          />
        </Field>
        <Field label="Penulis">
          <input
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="input"
            placeholder="Contoh: Robert Kiyosaki"
          />
        </Field>
        <Field label="Kategori">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="input"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status membaca">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ReadingStatus)}
            className="input"
          >
            <option value="to_read">Belum dibaca</option>
            <option value="reading">Sedang dibaca</option>
            <option value="finished">Selesai</option>
            <option value="paused">Dijeda</option>
          </select>
        </Field>
        <Field label="URL cover (opsional)">
          <input
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            className="input"
            placeholder="https://..."
          />
        </Field>
      </div>

      {error && <p className="text-sm text-ember">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="self-start flex items-center gap-2 px-5 py-2.5 rounded-full bg-neon hover:bg-neon-soft text-void font-semibold text-sm transition-colors shadow-glow-sm disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        Simpan buku
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          background: rgba(11, 9, 18, 0.7);
          border: 1px solid #221a38;
          border-radius: 0.75rem;
          padding: 0.6rem 0.9rem;
          font-size: 0.875rem;
          color: #e8e4f4;
        }
        .input:focus {
          outline: none;
          border-color: rgba(177, 76, 255, 0.6);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-mist">
      {label}
      {children}
    </label>
  );
}
