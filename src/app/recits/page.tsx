import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import { supabase } from '@/lib/supabase';

export default async function RecitsPage() {
  const { data: recits, error } = await supabase
    .from('recits')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur chargement récits:', error);
  }

  return (
    <div className="bg-[#FDFCFB] min-h-screen font-lato">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-[120px] pb-20">
        <div className="mb-16 border-l-4 border-slate-900 pl-8">
          <h1 className="text-5xl font-black text-slate-900 mb-3">
            Récits de Voyage
          </h1>
          <p className="text-slate-500 text-lg">
            Histoires, conseils et inspirations pour explorer Madagascar autrement.
          </p>
        </div>

        {!recits || recits.length === 0 ? (
          <div className="bg-white rounded-[2rem] border border-slate-100 p-10 text-slate-400">
            Aucun récit publié pour le moment.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {recits.map((recit) => (
              <Link
                key={recit.id}
                href={`/recits/${recit.slug}`}
                className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-72">
                  <Image
                    src={recit.cover_image}
                    alt={recit.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-8">
                  <p className="text-emerald-700 text-sm font-black uppercase tracking-[0.2em] mb-3">
                    {recit.category}
                  </p>

                  <h2 className="text-3xl font-black text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">
                    {recit.title}
                  </h2>

                  {recit.excerpt && (
                    <p className="mt-4 text-slate-500 leading-relaxed">
                      {recit.excerpt}
                    </p>
                  )}

                  <p className="mt-6 text-sm text-slate-400">
                    {recit.read_time || 5} min de lecture
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}