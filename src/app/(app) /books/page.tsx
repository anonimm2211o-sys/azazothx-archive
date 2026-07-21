"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import BookCard from "@/components/BookCard";
import SearchFilter from "@/components/SearchFilter";
import AddBookForm from "@/components/AddBookForm";
import type { Book, Category, ReadingStatus } from "@/lib/types";
import { Plus, X } from "lucide-react";

export default function BooksPage() {
  const supabase = createClient();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [status, setStatus] = useState<ReadingStatus | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });
    setBooks((data ?? []) as Book[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filtered = books.filter((b) => {
    const matchesQuery =
      query.trim() === "" ||
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !category || b.category === category;
    const matchesStatus = !status || b.status === status;
    return matchesQuery && matchesCategory && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-glow">Koleksi Buku</h1>
          <p className="text-mist text-sm mt-1">
            {books.length} buku tersimpan di arsipmu.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neon text-void font-semibold text-sm shadow-glow-sm hover:bg-neon-soft transition-colors"
        >
          {showForm ? (
            <X className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {showForm ? "Tutup" : "Tambah Buku"}
        </button>
      </div>

      {showForm && (
        <AddBookForm
          onCreated={() => {
            setShowForm(false);
            fetchBooks();
          }}
        />
      )}

      <SearchFilter
        query={query}
        onQueryChange={setQuery}
        activeCategory={category}
        onCategoryChange={setCategory}
        activeStatus={status}
        onStatusChange={setStatus}
      />

      {loading ? (
        <p className="text-sm text-mist">Memuat koleksi...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-mist">
          Tidak ada buku yang cocok. Coba ubah filter atau tambahkan buku baru.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
