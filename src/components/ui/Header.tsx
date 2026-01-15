import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full fixed top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-bold text-yellow-400">
          Pico Media
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/brand-identity"
            className="px-3 py-1 text-sm border border-yellow-500/40 rounded-md
                       hover:bg-yellow-500/10 transition"
          >
            الهوية البصرية
          </Link>

          <button className="px-3 py-1 text-sm border border-white/20 rounded-md">
            English
          </button>
        </div>
      </div>
    </header>
  );
}
