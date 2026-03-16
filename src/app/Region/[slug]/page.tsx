import { regions } from '../../../data/region';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default async function RegionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const regionIndex = regions.findIndex((r) => r.slug === slug);
  const region = regions[regionIndex];

  if (!region) return notFound();

  // Logic for the next region
  const nextRegion = regions[(regionIndex + 1) % regions.length];

  return (
    <div className="min-h-screen bg-white font-lato overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <header className="relative h-[80vh] w-full bg-slate-900 overflow-hidden">
        <Image 
          src={region.image} 
          alt={region.name} 
          fill 
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-emerald-500 font-black uppercase tracking-[0.5em] text-sm mb-4">
            Destination Madagascar
          </span>
          <h1 className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter">
            {region.name}
          </h1>
          <div className="mt-8 h-1 w-24 bg-emerald-500"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 relative">
        
        {/* --- TECHNICAL SPECIFICATIONS --- */}
        <div className="max-w-5xl mx-auto -mt-24 relative z-20 bg-white rounded-3xl shadow-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border border-slate-100">
          <div className="text-center md:border-r border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Chef-lieu</p>
            <p className="text-lg font-black text-slate-800 uppercase">{region.chefLieu}</p>
          </div>
          <div className="text-center md:border-r border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Superficie</p>
            <p className="text-lg font-black text-slate-800 uppercase">{region.superficie}</p>
          </div>
          <div className="text-center md:border-r border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Population</p>
            <p className="text-lg font-black text-slate-800 uppercase">{region.population}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Climat</p>
            <p className="text-lg font-black text-slate-800 uppercase">{region.climat}</p>
          </div>
        </div>

        {/* --- SECTION 01: EXPLORATION --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-40">
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <span className="text-emerald-600 font-bold uppercase tracking-[0.5em] text-xs block">
                Aventure & Découverte
              </span>
              <h2 className="text-6xl font-black text-slate-900 leading-[1.2] uppercase tracking-tighter">
                Explorez une <br /> 
                <span className="inline-block mt-2">approche</span> <br /> 
                <span className="inline-block mt-2 text-emerald-600 italic font-serif lowercase tracking-normal">différente</span>
              </h2>
            </div>
            <p className="text-slate-600 text-xl leading-[1.8] max-w-md">
              {region.description}
            </p>
            <div className="pt-4">
              <button className="group flex items-center gap-6 text-sm font-black uppercase tracking-[0.2em]">
                <span className="w-16 h-[2px] bg-slate-900 group-hover:w-24 transition-all duration-500"></span>
                Culture & Traditions
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8 relative h-[550px] rounded-2xl overflow-hidden shadow-2xl translate-y-12">
                <Image src={region.image} alt={region.name} fill className="object-cover" />
              </div>
              <div className="absolute -right-4 top-24 col-span-6 w-80 h-[400px] rounded-2xl overflow-hidden shadow-2xl border-[12px] border-white z-20 hidden md:block">
                <Image src={region.pointsForts[0].img} alt="Focus" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 02: THE GOOD DEAL --- */}
        <section className="bg-emerald-50/50 -mx-6 px-6 py-32 mb-40 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
              <span className="text-8xl text-emerald-200 absolute -top-16 left-0 font-serif opacity-50">“</span>
              <p className="text-3xl md:text-4xl font-medium text-emerald-900 leading-relaxed italic px-8">
                {region.bonPlan}
              </p>
              <p className="mt-12 text-xs font-black uppercase tracking-[0.5em] text-emerald-600">
                — Guide Expert Tsidika
              </p>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-100/30 rounded-full blur-3xl shadow-inner"></div>
        </section>

        {/* --- SECTION 03: TOP DESTINATIONS --- */}
        <section className="mb-40">
          <div className="flex justify-between items-end mb-16 border-b border-slate-100 pb-8">
            <div className="space-y-4">
              <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-xs">Points d'intérêt</span>
              <h3 className="text-5xl font-black text-slate-900 uppercase">Destinations</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {region.pointsForts.map((poi, index) => (
              <div key={index} className={`group cursor-pointer ${index === 1 ? 'md:translate-y-12' : ''}`}>
                <div className="relative h-[500px] rounded-3xl overflow-hidden mb-6 shadow-lg">
                  <Image src={poi.img} alt={poi.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{poi.tag}</span>
                    <h4 className="text-white text-3xl font-black uppercase tracking-tighter">{poi.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 04 : GASTRONOMY  --- */}
        <section className="my-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative h-[650px] order-2 lg:order-1">
            <Image 
              src={region.gastronomie.image} 
              alt={`Gastronomie ${region.name}`} 
              fill 
              className="object-cover rounded-[3rem] shadow-2xl"
            />
            <div className="absolute -bottom-10 -right-10 bg-white p-10 shadow-2xl rounded-2xl max-w-xs hidden md:block border border-slate-50">
              <p className="text-sm font-medium text-slate-500 italic leading-relaxed">
                "Une explosion de saveurs authentiques, reflet du terroir unique de {region.name}."
              </p>
            </div>
          </div>

          <div className="space-y-10 order-1 lg:order-2">
            <div className="space-y-4">
              <span className="text-emerald-600 font-bold uppercase tracking-[0.4em] text-xs">Art de vivre</span>
              <h3 className="text-5xl font-black text-slate-900 leading-tight uppercase">
                {region.gastronomie.title.split('&').map((part, i) => (
                  <span key={i}>{part} {i === 0 && <br />}</span>
                ))}
              </h3>
            </div>
            <p className="text-slate-600 text-xl leading-relaxed">
              {region.gastronomie.description}
            </p>
            <ul className="grid grid-cols-1 gap-4 pt-6">
              {region.gastronomie.items.map((item, i) => (
                <li key={i} className="flex items-center gap-4 font-black uppercase tracking-[0.2em] text-xs text-slate-800 bg-slate-50 p-4 rounded-xl w-fit">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- SECTION 05 : NEXT ADVENTURE --- */}
        <section className="relative h-[500px] -mx-6 mb-0 overflow-hidden group cursor-pointer">
          <Image 
            src={nextRegion.image} 
            alt={nextRegion.name} 
            fill 
            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/50 group-hover:bg-slate-900/30 transition-colors duration-700" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-white/80 text-xs font-black uppercase tracking-[0.8em] mb-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
              Continuer l'exploration
            </span>
            <h3 className="text-white text-7xl md:text-[10rem] font-black uppercase tracking-tighter mb-12 opacity-90">
              {nextRegion.name}
            </h3>
            <div className="flex items-center gap-8 text-white">
              <span className="h-[1px] w-20 bg-white/50 transition-all duration-700 group-hover:w-32 group-hover:bg-white"></span>
              <p className="text-sm font-bold uppercase tracking-[0.3em]">Zone {nextRegion.zone}</p>
              <span className="h-[1px] w-20 bg-white/50 transition-all duration-700 group-hover:w-32 group-hover:bg-white"></span>
            </div>
          </div>

          <Link href={`/region/${nextRegion.slug}`} className="absolute inset-0 z-10">
            <span className="sr-only">Région suivante : {nextRegion.name}</span>
          </Link>
        </section>

      </main>
    </div>
  );
}