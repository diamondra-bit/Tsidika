import Link from 'next/link';
import Button from './Button';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-black tracking-tighter text-emerald-700 leading-none">
            TSIDIKA
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
            Madagascar
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            Accueil
          </Link>
          <Link href="/destination" className="hover:text-emerald-600 transition-colors">
            Destinations
          </Link>
          <Link href="/planification" className="hover:text-emerald-600 transition-colors">
            Mon voyage
          </Link>
          <Link href="/mes-itineraires" className="hover:text-emerald-600 transition-colors">
            Mes itinéraires
          </Link>
           <Link href="/recits" className="hover:text-emerald-600 transition-colors">
            Récits
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {/* <select className="bg-transparent text-xs font-bold text-slate-500 outline-none cursor-pointer">
            <option>FR</option>
            <option>MG</option>
            <option>EN</option>
          </select> */}

          <Link href="/planification">
            <Button variant="secondary">
              Planifier
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}