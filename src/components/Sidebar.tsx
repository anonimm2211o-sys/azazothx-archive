"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Library,
  Landmark,
  TrendingUp,
  Briefcase,
  Code2,
  Sparkles,
  User,
} from "lucide-react";
import clsx from "clsx";

const mainLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/books", label: "Koleksi Buku", icon: Library },
  { href: "/profile", label: "Profil", icon: User },
];

const categoryLinks = [
  { href: "/books?category=Finance", label: "Finance", icon: Landmark },
  { href: "/books?category=Investasi", label: "Investasi", icon: TrendingUp },
  { href: "/books?category=Bisnis", label: "Bisnis", icon: Briefcase },
  { href: "/books?category=Programming", label: "Programming", icon: Code2 },
  {
    href: "/books?category=Self Development",
    label: "Self Development",
    icon: Sparkles,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href.split("?")[0];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 glass border-r border-edge/60 min-h-screen px-4 py-6 gap-8">
      <nav className="flex flex-col gap-1">
        {mainLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
              isActive(href)
                ? "bg-neon/10 text-neon-bright border border-neon/30 shadow-glow-sm"
                : "text-mist hover:text-neon-bright hover:bg-panel/60"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div>
        <p className="px-3 text-xs uppercase tracking-widest text-mist/60 mb-2">
          Kategori
        </p>
        <nav className="flex flex-col gap-1">
          {categoryLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-mist hover:text-neon-bright hover:bg-panel/60 transition-colors"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
