import Image from 'next/image';

export default function Newsletter() {
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto font-lato">
      <div className="relative h-[450px] rounded-[3.5rem] overflow-hidden shadow-2xl flex items-center justify-center text-center px-6">
        <Image 
          src="/Newsletter/newsletter-bg.jpg" 
          alt="Paysage Madagascar" 
          fill 
          unoptimized
          className="object-cover"
        />
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Newsletter Content */}
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Prêt à découvrir les <br /> Joyaux de Madagascar ?
          </h2>
          <p className="text-white/90 text-lg mb-10 font-medium">
            Inscrivez-vous pour recevoir nos guides secrets et récits d'aventure directement dans votre boîte mail.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto bg-white/10 p-2 rounded-3xl backdrop-blur-md border border-white/20">
            <input 
              type="email" 
              placeholder="Votre adresse email" 
              className="bg-white text-slate-900 px-6 py-4 rounded-2xl flex-grow focus:outline-none font-bold"
              required
            />
            <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg active:scale-95">
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}