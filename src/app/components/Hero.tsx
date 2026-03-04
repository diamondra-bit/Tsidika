import Image from 'next/image';
import Button from './ui/Button';

export default function Hero() {
  return (
    <section className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-white">   
      {/* Background Map */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <Image 
          src="/Home/map.jpg" 
          alt="Carte de Madagascar" 
          fill
          className="object-contain opacity-13 scale-110" 
          priority
        />
      </div>

      {/* Main Section */}
      <div className="relative z-10 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Text in left */}
        <div className="space-y-10 self-start lg:mt-10">
          <h1 className="text-5xl md:text-[3rem] font-extrabold text-slate-900 leading-tight tracking-tight">
            Découvrez les <br />
            <span className="text-emerald-700 italic">Précieux Joyaux Cachés</span> <br />
            de Madagascar
          </h1>
          <p className="text-lg text-slate-600 max-w-lg">
            Explorez des destinations uniques et hors des sentiers battus, des Tsingy rouges aux plages secrètes de l'Est.
          </p>
          
          {/* Button */}
          <Button variant="primary" className="px-8 py-4 rounded-full text-lg shadow-lg shadow-emerald-200">
            Planifier votre voyage
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </div>
        
        {/* Image */}
        <div className="relative grid grid-cols-2 gap-5 md:gap-6">
          <div className="rounded-[2rem] overflow-hidden h-[28rem] shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-[1.03] lg:mt-12 bg-white">
            <Image 
              src="/Home/tsingy.jpg" 
              alt="Nosy Be" 
              width={400} 
              height={600} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="space-y-5 md:space-y-6">
            <div className="rounded-[1.75rem] overflow-hidden h-60 shadow-xl border-4 border-white transition-transform duration-500 hover:scale-[1.03] bg-white">
              <Image 
                src="/Home/baobab1.jpg" 
                alt="Baobabs" 
                width={300} 
                height={300} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="rounded-[1.75rem] overflow-hidden h-80 shadow-xl border-4 border-white transition-transform duration-500 hover:scale-[1.03] bg-white">
              <Image 
                src="/Home/lemurien1.jpg" 
                alt="Lémuriens" 
                width={300} 
                height={400} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}