import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default async function RecitDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: recit, error } = await supabase
    .from('recits')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !recit) {
    notFound();
  }

  return (
    <div className="bg-[#FDFCFB] min-h-screen font-lato">
      <Navbar />

      <main className="pt-[100px] pb-20">
        <section className="max-w-7xl mx-auto px-6">
          <div className="relative h-[500px] rounded-[2.5rem] overflow-hidden">
            <Image
              src={recit.cover_image}
              alt={recit.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-10 left-10 right-10 text-white">
              <p className="text-emerald-300 text-sm font-black uppercase tracking-[0.2em] mb-4">
                {recit.category}
              </p>
              <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-5xl">
                {recit.title}
              </h1>
              {recit.excerpt && (
                <p className="mt-4 text-lg md:text-xl text-white/85 max-w-3xl">
                  {recit.excerpt}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 mt-16">
          <div className="mb-8 text-sm text-slate-400">
            {recit.read_time || 5} min de lecture
          </div>

          <article className="prose prose-lg max-w-none prose-slate">
            {String(recit.content)
              .split('\n')
              .filter(Boolean)
              .map((paragraph: string, index: number) => (
                <p key={index} className="text-slate-700 leading-8 mb-6">
                  {paragraph}
                </p>
              ))}
          </article>
        </section>
      </main>
    </div>
  );
}