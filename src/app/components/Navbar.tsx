import Link from 'next/link';
import Button from './Button';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-black tracking-tighter text-emerald-700 leading-none">TSIDIKA</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Madagascar</span>
        </Link>

        {/* Link */}
        <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-slate-700">
          <Link href="/Region" className="hover:text-emerald-600 transition-colors">Régions</Link>
          <Link href="/themes" className="hover:text-emerald-600 transition-colors">Thématiques</Link>
          <Link href="/carte" className="hover:text-emerald-600 transition-colors">Carte Interactive</Link>
          <Link href="/blog" className="hover:text-emerald-600 transition-colors">Récits</Link>
        </div>

        {/* Languages */}
        <div className="flex items-center gap-6">
          <select className="bg-transparent text-xs font-bold text-slate-500 outline-none cursor-pointer">
            <option>FR</option>
            <option>MG</option>
            <option>EN</option>
          </select>

        {/* Button */}
         <Button variant="secondary">
          Planifier
        </Button>
        </div>
      </div>
    </nav>
  );
}