import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import {  ArrowRight } from 'lucide-react';

export default async function RecitDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: recit } = await supabase
    .from('recits')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!recit) notFound();

  const { data: nextRecit } = await supabase
    .from('recits')
    .select('title, slug, cover_image')
    .eq('published', true)
    .neq('slug', slug)
    .limit(1)
    .single();

  const paragraphs = String(recit.content).split('\n').filter(Boolean);

  return (
    <div className="bg-[#FDFCFB]  min-h-screen font-lato">
      <Navbar />

      <main className="pt-[120px]">
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.5em]">
                {recit.category}
              </span>
              <h1 className="text-4xl py-4 md:text-5xl font-serif italic text-slate-900 leading-[1.3] tracking-tighter">
                {recit.title}
              </h1>
              {recit.excerpt && (
                <p className="text-xl text-slate-500 font-medium italic leading-relaxed border-l-2 border-emerald-100 pl-6">
                  {recit.excerpt}
                </p>
              )}
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pt-4">
                <span>Journal de Voyage</span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>{recit.read_time} min lecture</span>
              </div>
            </div>

            <div className="relative h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white">
              <Image
                src={recit.cover_image}
                alt={recit.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 mb-32">
          <article className="max-w-5xl mx-auto">
            {paragraphs.map((paragraph: string, index: number) => (
              <div key={index}>
                <p className={`text-slate-700 text-lg leading-9 mb-8 text-justify ${
                  index === 0 
                    ? "first-letter:text-7xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:text-slate-900 first-letter:font-black" 
                    : ""
                }`}>
                  {paragraph}
                </p>  
              </div>
            ))}
          </article>
        </section>

        {nextRecit && (
         <footer className="relative h-[45vh] min-h-[350px] flex items-center overflow-hidden bg-slate-950 px-6">
            <Image 
              src={nextRecit.cover_image} 
              alt="" 
              fill 
              className="object-cover opacity-20 grayscale hover:grayscale-0 transition-all duration-[8s] hover:scale-110" 
            />
            
            <div className="max-w-5xl mx-auto w-full relative z-10">
              <Link href={`/recits/${nextRecit.slug}`} className="group inline-flex flex-col gap-6 items-start">
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">Récit Suivant</span>
                  <div className="h-px w-12 bg-emerald-400 group-hover:w-20 transition-all duration-700" />
                </div>
                
                <h2 className="text-white text-4xl md:text-6xl font-serif italic leading-[1.1] tracking-tighter group-hover:translate-x-4 transition-transform duration-700 max-w-3xl">
                  {nextRecit.title}
                  <ArrowRight className="inline-block ml-6 w-10 h-10 text-emerald-500 group-hover:-rotate-45 transition-transform" strokeWidth={1} />
                </h2>
              </Link>
            </div>
            
            <div className="absolute bottom-8 right-8 z-20">
              <Link href="/recits" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-emerald-400 transition-colors">
                VOIR TOUS LES RÉCITS
              </Link>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}