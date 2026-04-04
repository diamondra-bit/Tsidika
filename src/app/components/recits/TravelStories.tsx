"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Recit } from '@/types/recits';

export default function TravelStories() {
  const [stories, setStories] = useState<Recit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const { data, error } = await supabase
          .from('recits')
          .select('*')
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

  const featuredStory = useMemo(
    () => stories.find((story) => story.featured) || stories[0],
    [stories]
  );

  const sideStories = useMemo(() => {
    if (!featuredStory) return [];
    return stories.filter((story) => story.id !== featuredStory.id).slice(0, 3);
  }, [stories, featuredStory]);

  if (loading) {
    return (
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-slate-900 mb-10">Récits de Voyage</h2>
        <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-10">
          <div className="h-[650px] rounded-[2.5rem] bg-slate-100 animate-pulse" />
          <div className="space-y-8">
            <div className="h-40 rounded-[2rem] bg-slate-100 animate-pulse" />
            <div className="h-40 rounded-[2rem] bg-slate-100 animate-pulse" />
            <div className="h-40 rounded-[2rem] bg-slate-100 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (!featuredStory) return null;

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-12">
        Récits de Voyage
      </h2>

      <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-10 items-start">
        <Link
          href={`/recits/${featuredStory.slug}`}
          className="group block"
        >
          <div className="relative h-[650px] rounded-[2.5rem] overflow-hidden">
            <Image
              src={featuredStory.cover_image}
              alt={featuredStory.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-10 left-10 right-10 text-white">
              <span className="inline-flex px-5 py-2 rounded-full bg-emerald-600 text-sm font-black uppercase tracking-wide mb-6">
                {featuredStory.category}
              </span>

              <h3 className="text-4xl md:text-5xl font-black leading-tight max-w-4xl">
                {featuredStory.title}
              </h3>

              {featuredStory.excerpt && (
                <p className="mt-4 text-lg text-white/85 max-w-2xl">
                  {featuredStory.excerpt}
                </p>
              )}
            </div>
          </div>
        </Link>

        <div className="space-y-8">
          {sideStories.map((story) => (
            <Link
              key={story.id}
              href={`/recits/${story.slug}`}
              className="group flex gap-6 pb-8 border-b border-slate-200 last:border-b-0"
            >
              <div className="relative w-[160px] h-[160px] rounded-[2rem] overflow-hidden shrink-0">
                <Image
                  src={story.cover_image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="pt-1">
                <p className="text-emerald-700 text-sm font-black uppercase tracking-[0.2em] mb-3">
                  {story.category}
                </p>

                <h3 className="text-3xl font-black text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">
                  {story.title}
                </h3>

                {story.excerpt && (
                  <p className="mt-4 text-slate-500 text-lg leading-relaxed">
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