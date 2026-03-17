import Navbar from '@/app/components/Navbar';
import { recits } from '@/data/recits';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function RecitDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recit = recits.find(r => r.slug === slug);

  if (!recit) notFound();

  return (
    <div>
    <Navbar/>
    <article className="min-h-screen bg-white pb-20">
      <header className="relative h-[70vh] w-full mb-20">
        <Image src={recit.coverImage} alt={recit.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-20 left-0 w-full px-6">
          <div className="max-w-4xl mx-auto text-white">
            <span className="bg-emerald-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
              {recit.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight uppercase">
              {recit.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center gap-6 mb-16 pb-8 border-b border-slate-100">
          <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
            {recit.author[0]}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{recit.author}</p>
            <p className="text-xs text-slate-500">{recit.date} • Région {recit.regionName}</p>
          </div>
        </div>

        <div className="prose prose-slate prose-xl max-w-none">
          <p className="text-2xl font-medium text-slate-700 italic leading-relaxed mb-12">
            {recit.excerpt}
          </p>

          <div className="text-slate-600 leading-[1.8] space-y-8">
            {recit.content}
          </div>
        </div>
      </div>
    </article>
    </div>
  );
}