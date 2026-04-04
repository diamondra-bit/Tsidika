"use client";

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Recit {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  cover_image: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}

export default function LatestStories() {
  const [stories, setStories] = useState<Recit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const { data, error } = await supabase
          .from('recits')
          .select('id, slug, title, excerpt, category, cover_image, featured, published, created_at')
          .eq('published', true)
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) throw error;
        setStories(data || []);
      } catch (error) {
        console.error('Erreur chargement récits:', error);
        setStories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStories();
  }, []);

  const mainStory = useMemo(
    () => stories.find((story) => story.featured) || stories[0],
    [stories]
  );

  const secondaryStories = useMemo(() => {
    if (!mainStory) return [];
    return stories.filter((story) => story.id !== mainStory.id).slice(0, 3);
  }, [stories, mainStory]);

  if (loading) {
    return (
      <section className="py-20 px-6 max-w-7xl mx-auto font-lato">
        <h2 className="text-4xl font-black text-slate-900 mb-12">Récits de Voyage</h2>

        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7 h-[560px] rounded-[3rem] bg-slate-100 animate-pulse" />
          <div className="lg:col-span-5 space-y-6">
            <div className="h-36 rounded-[2rem] bg-slate-100 animate-pulse" />
            <div className="h-36 rounded-[2rem] bg-slate-100 animate-pulse" />
            <div className="h-36 rounded-[2rem] bg-slate-100 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (!mainStory) return null;

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto font-lato">
      <div className="flex items-center justify-between gap-6 mb-12">
        <h2 className="text-4xl font-black text-slate-900">Récits de Voyage</h2>

        <Link
          href="/recits"
          className="border-2 border-emerald-50 px-6 py-2 rounded-full text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition-all flex items-center gap-2"
        >
          Explorer tout <span className="text-xl">→</span>
        </Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-20">
        <Link href={`/recits/${mainStory.slug}`} className="lg:col-span-7 group cursor-pointer block">
          <div className="relative h-[500px] rounded-[3rem] overflow-hidden mb-6 shadow-lg">
            <Image
              src={mainStory.cover_image}
              alt={mainStory.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block uppercase">
                {mainStory.category}
              </span>
              <h3 className="text-3xl font-bold text-white leading-tight">
                {mainStory.title}
              </h3>
            </div>
          </div>
        </Link>

        <div className="lg:col-span-5 space-y-6">
          {secondaryStories.map((story) => (
            <Link
              key={story.id}
              href={`/recits/${story.slug}`}
              className="flex gap-6 group cursor-pointer items-center border-b border-slate-50 pb-6 last:border-0 last:pb-0"
            >
              <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-[1.8rem] overflow-hidden shadow-sm transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={story.cover_image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-emerald-700 text-[10px] font-black mb-1 uppercase tracking-[0.2em]">
                  {story.category}
                </span>

                <h4 className="text-md md:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                  {story.title}
                </h4>

                {story.excerpt && (
                  <p className="text-slate-500 text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed">
                    {story.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}