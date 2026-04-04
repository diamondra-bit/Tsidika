import Link from 'next/link';

const mainLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Destinations', href: '/destination' },
  { label: 'Planification', href: '/planification' },
  { label: 'Mes itinéraires', href: '/mes-itineraires' },
  { label: 'Récits', href: '/recits' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200/60 pt-20 pb-10 px-6 font-lato">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 mb-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black tracking-tighter text-slate-900">
                TSIDIKA
              </h2>
              <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-700 font-black mt-2">
                Madagascar autrement
              </p>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed max-w-md">
              Explorez Madagascar à travers des destinations choisies avec soin,
              des récits inspirants et des itinéraires pensés pour transformer un
              simple voyage en expérience inoubliable.
            </p>

            <div className="flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <span className="px-3 py-2 rounded-full bg-white border border-slate-200">
                Explorer
              </span>
              <span className="px-3 py-2 rounded-full bg-white border border-slate-200">
                Planifier
              </span>
              <span className="px-3 py-2 rounded-full bg-white border border-slate-200">
                Vivre l&apos;aventure
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] mb-8 text-emerald-800 justify-items-center text-center">
              Navigation
            </h3>

           <div className="grid grid-cols-1 gap-y-4 text-slate-600 text-sm font-medium justify-items-center text-center">
              {mainLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-800">
              Prêt à partir ?
            </h3>

            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Créez votre itinéraire, choisissez vos étapes et enregistrez votre
              voyage pour le retrouver à tout moment.
            </p>

            <Link
              href="/planification"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-full text-sm font-black transition-all shadow-lg shadow-emerald-100"
            >
              Planifier maintenant <span className="text-base">→</span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Une expérience simple pour organiser vos envies d&apos;évasion sur la Grande Île.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/60 text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center">
          <p>© {year} TSIDIKA Madagascar. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}