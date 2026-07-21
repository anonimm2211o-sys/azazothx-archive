# AZAZOTHX Archive

Personal knowledge system untuk menyimpan buku, ilmu, rangkuman, dan catatan pembelajaran. Dark futuristic, glassmorphism, aksen ungu neon.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres + Auth)

## Setup

1. Install dependency:
   ```bash
   npm install
   ```

2. Buat project di [supabase.com](https://supabase.com), lalu jalankan `supabase/schema.sql` di SQL Editor project kamu (ini bikin tabel `books`, `profiles`, `book_notes`, `timeline_entries`, `tags`, plus RLS policy dan trigger auto-create profile).

3. Salin `.env.example` jadi `.env.local`, isi dengan URL dan anon key dari Settings → API di dashboard Supabase kamu:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

4. Jalankan dev server:
   ```bash
   npm run dev
   ```
   Buka http://localhost:3000

## Struktur Folder

```
src/
  app/
    page.tsx                 -> Landing page
    login/page.tsx           -> Login
    register/page.tsx        -> Register
    (app)/
      layout.tsx              -> Shell (Navbar + Sidebar) untuk halaman yang butuh login
      dashboard/page.tsx       -> Statistik belajar
      books/page.tsx           -> Koleksi buku, search & filter
      books/[id]/page.tsx      -> Detail buku, catatan, timeline
      books/[id]/NoteForm.tsx  -> Form tambah catatan
      profile/page.tsx         -> Profil pengguna
      profile/SignOutButton.tsx
  components/
    Navbar.tsx
    Sidebar.tsx
    BookCard.tsx
    SearchFilter.tsx
    AddBookForm.tsx
  lib/
    types.ts                  -> Tipe Book, BookNote, TimelineEntry
    supabase/client.ts         -> Supabase client untuk Client Component
    supabase/server.ts         -> Supabase client untuk Server Component
  middleware.ts                -> Refresh session Supabase di tiap request
supabase/schema.sql            -> Skema database lengkap + RLS
```

## Yang sudah jalan
- Auth email/password (login, register, sign out)
- CRUD dasar buku (tambah, lihat, filter, search)
- Catatan/rangkuman per buku
- Timeline belajar per buku (tabel siap, tinggal tambah UI form kalau perlu)
- Dashboard statistik (total buku, selesai, sedang dibaca, progres rata-rata, breakdown kategori)
- Row Level Security: setiap user cuma bisa lihat & edit datanya sendiri

## Lanjutan yang bisa ditambahkan
- Form tambah entry timeline (tabelnya sudah ada di schema)
- Edit & hapus buku dari halaman detail
- Upload cover ke Supabase Storage (sekarang masih via URL manual)
- Tag multi-select pakai tabel `tags` & `book_tags` yang sudah disiapkan di schema

## Deploy
Push ke GitHub, lalu import ke [Vercel](https://vercel.com). Jangan lupa set environment variable `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` di project settings Vercel.
