import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/60 pt-20 pb-10 px-6 font-lato">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Branding  */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter text-slate-900">TSIDIKA</h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Explorez Madagascar autrement. Nous vous guidons vers les joyaux cachés de l'Île Rouge pour des aventures authentiques.
            </p>
            {/* Icons */}
            <div className="flex gap-3">
              {[ 'FB', 'IG', 'YT' ].map((social) => (
                <div key={social} className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm hover:text-emerald-700 hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Discover */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] mb-8 text-emerald-800">Découvrir</h3>
            <ul className="space-y-4 text-slate-600 text-sm font-medium">
              <li><Link href="/regions" className="hover:text-emerald-700 transition-colors">Toutes les Régions</Link></li>
              <li><Link href="/thematiques" className="hover:text-emerald-700 transition-colors">Voyages Thématiques</Link></li>
              <li><Link href="/carte" className="hover:text-emerald-700 transition-colors">Carte de l'Île</Link></li>
              <li><Link href="/recits" className="hover:text-emerald-700 transition-colors">Récits de Voyage</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] mb-8 text-emerald-800">L'Agence</h3>
            <ul className="space-y-4 text-slate-600 text-sm font-medium">
              <li><Link href="/notre-histoire" className="hover:text-emerald-700 transition-colors">Notre Histoire</Link></li>
              <li><Link href="/guide" className="hover:text-emerald-700 transition-colors">Guide de Voyage</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-700 transition-colors">Nous Contacter</Link></li>
              <li><Link href="/partenaires" className="hover:text-emerald-700 transition-colors">Partenaires locaux</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] mb-8 text-emerald-800">Informations</h3>
            <ul className="space-y-4 text-slate-600 text-sm font-medium">
              <li><Link href="/mentions" className="hover:text-emerald-700 transition-colors">Mentions Légales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-emerald-700 transition-colors">Confidentialité</Link></li>
              <li><Link href="/cookies" className="hover:text-emerald-700 transition-colors">Gestion des Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-center items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2026 TSIDIKA Madagascar. Tous droits réservés.</p>
          <p className="flex items-center gap-1.5 grayscale opacity-80 hover:opacity-100 transition-opacity">
          </p>
        </div>
      </div>
    </footer>
  );
}