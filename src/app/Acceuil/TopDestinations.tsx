"use client";

import { useState } from 'react';
import Image from 'next/image';

const DESTINATIONS = [
  // Popular
  { name: "Allée des Baobabs", tag: "INCONTOURNABLE", img: "/TopDestination/baobab1.jpg", category: "populaire" },
  { name: "Nosy Be", tag: "PLAGE & DÉTENTE", img: "/TopDestination/nosybe.jpg", category: "populaire" },
  { name: "Tsingy de Bemaraha", tag: "PATRIMOINE", img: "/TopDestination/tsingy.jpg", category: "populaire" },
  { name: "Île Sainte-Marie", tag: "PARADISIAQUE", img: "/TopDestination/sainte-marie.jpg", category: "populaire" },
  { name: "Parc de l'Isalo", tag: "AVENTURE", img: "/TopDestination/isalo.jpg", category: "populaire" },

  // COASTS & ISLANDS
  { name: "Nosy Iranja", tag: "EAU CRISTALLINE", img: "/TopDestination/iranja.jpg", category: "cotes" },
  { name: "Anakao", tag: "SURF & CALME", img: "/TopDestination/anakao.jpg", category: "cotes" },
  { name: "Tsarabanjina", tag: "LUXE SAUVAGE", img: "/TopDestination/tsarabanjina.jpg", category: "cotes" },
  { name: "Fort Dauphin", tag: "BOUT DU MONDE", img: "/TopDestination/fort-dauphin.jpg", category: "cotes" },
  { name: "Diego Suarez", tag: "BAIE MAJESTUEUSE", img: "/TopDestination/diego.jpg", category: "cotes" },

  // NATIONAL PARKS
  { name: "Andasibe-Mantadia", tag: "LÉMURIENS", img: "/TopDestination/lemurien1.jpg", category: "parcs" },
  { name: "Ranomafana", tag: "FORÊT HUMIDE", img: "/TopDestination/ranomafana.jpg", category: "parcs" },
  { name: "Masoala", tag: "BIODIVERSITÉ", img: "/TopDestination/masoala.jpg", category: "parcs" },
  { name: "Ankarana", tag: "TSINGY GRIS", img: "/TopDestination/ankarana.jpg", category: "parcs" },
  { name: "Amber Mountain", tag: "FAUNE UNIQUE", img: "/TopDestination/amber.jpg", category: "parcs" },

  //HIGHLANDS
  { name: "Antsirabe", tag: "VILLE D'EAU", img: "/TopDestination/antsirabe.jpg", category: "hautes-terres" },
  { name: "Ambohimanga", tag: "HISTOIRE", img: "/TopDestination/ambohimanga.jpg", category: "hautes-terres" },
  { name: "Lemur's Park", tag: "DÉTENTE", img: "/TopDestination/lemur-park.jpg", category: "hautes-terres" },
  { name: "Ankazobe", tag: "PAYSAGE", img: "/TopDestination/ankazobe.jpg", category: "hautes-terres" },
  { name: "Betafo", tag: "RURALITÉ", img: "/TopDestination/betafo.jpg", category: "hautes-terres" },
];

export default function TopDestinations() {
  const [filter, setFilter] = useState('populaire');

  const filteredDestinations = DESTINATIONS.filter(d => d.category === filter);

  const categories = [
    { id: 'populaire', label: 'Populaire' },
    { id: 'cotes', label: 'Côtes & Îles' },
    { id: 'parcs', label: 'Parcs Nationaux' },
    { id: 'hautes-terres', label: 'Hautes Terres' },
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto font-lato">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-6">Top Destinations</h2>
          <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-400">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`${filter === cat.id ? 'text-emerald-700 border-b-2 border-emerald-700' : 'hover:text-slate-600'} pb-1 transition-all`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        
        <button className="border-2 border-emerald-50 px-6 py-2 rounded-full text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition-all flex items-center gap-2">
          Explorer tout <span className="text-xl">→</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 transition-all duration-500">
        {filteredDestinations.map((dest, index) => (
          <div 
            key={index} 
            className="group animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-[380px] rounded-[2.2rem] overflow-hidden mb-4 shadow-sm border-2 border-transparent group-hover:border-white group-hover:shadow-xl transition-all duration-500 bg-slate-100">
              <Image 
                src={dest.img} 
                alt={dest.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                <span className="text-[9px] font-black tracking-widest text-slate-800 uppercase">{dest.tag}</span>
              </div>
            </div>
            <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors ml-2">
              {dest.name}
            </h3>
            <p className="text-xs text-slate-400 font-bold ml-2 uppercase tracking-tight opacity-0 group-hover:opacity-100 transition-opacity">
              Découvrir plus
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}