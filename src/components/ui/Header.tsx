"use client";

import Link from "next/link";
import { Globe } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/80 backdrop-blur border-b border-yellow-500/20">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-wide text-yellow-400"
        >
          Pico Media
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm text-white">

          <Link
            href="/"
            className="hover:text-yellow-400 transition"
          >
            الصفحة الرئيسية
          </Link>

          <Link
            href="/brand-identity"
            className="hover:text-yellow-400 transition"
          >
            الهوية البصرية
          </Link>

          {/* Language */}
          <button
            type="button"
            className="flex items-center gap-1 rounded border border-yellow-500/40 px-3 py-1 text-yellow-400 hover:bg-yellow-500 hover:text-black transition"
          >
            <Globe size={14} />
            EN
          </button>

        </nav>
      </div>
    </header>
  );
}
