"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Share2, Bookmark, Plus, ChevronLeft } from 'lucide-react';
import Navbar from '@/app/components/Navbar';

export default function RecitDetail() {
  return (
    <main className="bg-white min-h-screen font-lato selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      {/* ---HERO SECTION --- */}
      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-20 items-start">
          
          <div className="lg:col-span-5 space-y-12">
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-600">
              Récit SAVA
              <div className="flex-1 h-[1px] bg-slate-100" />
            </div>

            {/* Principal Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-light text-slate-900 leading-[0.95] tracking-tighter">
                Le parfum de la <br />
                <span className="font-serif italic text-emerald-950/90 font-medium">Vanille Sauvage</span>
              </h1>
              <p className="text-slate-500 text-sm leading-relaxed font-light italic max-w-sm">
                Une immersion sensorielle au cœur des plantations de l'or noir malgache.
              </p>
            </div>

            <div className="flex items-center gap-6 border-t border-slate-50 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">
                  IM
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1">Irina Mery</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Auteur</p>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-slate-100" />
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Mars 2026</span>
            </div>
          </div>

          <div className="lg:col-span-7 mt-12 lg:mt-0">
            <div className="relative h-[50vh] lg:h-[70vh] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/5 group">
              <Image 
                src="/images/recits/sava.jpg" 
                alt="Vanille SAVA" 
                fill 
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                priority 
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 pb-32">
        
        <article className="lg:col-span-8 space-y-16">
          <div className="relative py-4">
            <div className="absolute left-0 top-0 w-1 h-full bg-emerald-500/20 rounded-full" />
            <p className="text-3xl md:text-3xl text-slate-900 font-serif italic leading-snug pl-10">
              "S'enfoncer dans la SAVA, c'est accepter que le temps ne se compte plus en heures, mais en <span className="text-emerald-700">effluves de vanille</span> et de terre mouillée."
            </p>
          </div>
          
          <div className="space-y-8 text-lg md:text-xl text-slate-600 font-light leading-relaxed">
            <p>
              Le trajet entre <span className="font-medium text-slate-900 uppercase text-xs tracking-widest">Sambava</span> et <span className="font-medium text-slate-900 uppercase text-xs tracking-widest">Antalaha</span> est une succession de tableaux vivants. Les séchoirs à vanille bordent la route, dégageant ce parfum sucré et lourd qui définit l'identité de toute une nation. On ne vient pas ici pour la plage, on vient pour l'immersion totale dans le vert.
            </p>
            <p>
              Nous avons rencontré des planteurs qui travaillent la terre avec une précision chirurgicale. <span className="font-serif italic text-slate-900">Marier chaque fleur de vanille à la main</span> est un geste d'amour et de patience. C'est cette dimension humaine qui transforme un simple voyage en un véritable récit de vie.
            </p>
          </div>

          {/* Navigation*/}
          <div className="pt-20">
            <Link href="/recits" className="inline-flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                <ChevronLeft size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-slate-900 transition-colors">Retour</p>
                <p className="font-serif italic text-slate-900 group-hover:text-emerald-700 transition-colors">Toutes les explorations</p>
              </div>
            </Link>
          </div>
        </article>

        {/* ACTIONS */}
        <aside className="lg:col-span-4">
          <div className="sticky top-32 space-y-4">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-6 ml-2">Expérience</p>
            
            {[
              { icon: <Bookmark size={18} />, label: "Enregistrer", sub: "Lire plus tard" },
              { icon: <Plus size={18} />, label: "Mon Voyage", sub: "Ajouter au trajet" },
              { icon: <Share2 size={18} />, label: "Partager", sub: "Envoyer à un proche" }
            ].map((action, i) => (
              <button key={i} className="w-full flex items-center gap-5 p-5 rounded-[1.5rem] border border-slate-50 bg-white hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 group text-left">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                  {action.icon}
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase text-slate-900 tracking-wider mb-0.5">{action.label}</p>
                  <p className="text-[10px] font-serif italic text-slate-400 group-hover:text-slate-600">{action.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

      </div>
    </main>
  );
}