import Image from 'next/image';

export default function LatestStories() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto font-lato">
      <h2 className="text-4xl font-black text-slate-900 mb-12">Récits de Voyage</h2>
      
      <div className="grid lg:grid-cols-12 gap-20">
        {/* Main Article */}
        <div className="lg:col-span-7 group cursor-pointer">
          <div className="relative h-[500px] rounded-[3rem] overflow-hidden mb-6 shadow-lg">
            <Image 
              src="/LatestStories/tsingy1.jpg" 
              alt="Aventure dans les Tsingy" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block">AVENTURE</span>
              <h3 className="text-3xl font-bold text-white leading-tight">
                Guide ultime : Traverser les Tsingy de Bemaraha sans encombre.
              </h3>
            </div>
          </div>
        </div>

        {/* Secondary Articles */}
        <div className="lg:col-span-5 space-y-6">
           {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-6 group cursor-pointer items-center border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                {/* Image */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-[1.8rem] overflow-hidden shadow-sm transition-transform duration-500 group-hover:scale-105">
                    <Image 
                        src={`/LatestStories/story-${i}.jpg`} 
                        alt="Récit de voyage" 
                        fill 
                        unoptimized 
                        className="object-cover" 
                    />
                </div>

                <div className="flex flex-col">
                    {/* Dynamic categories*/}
                    <span className="text-emerald-700 text-[10px] font-black mb-1 uppercase tracking-[0.2em]">
                    {i === 1 ? "Culture" : i === 2 ? "Gastronomie" : "Faune & Flore"}
                    </span>
                    
                    <h4 className="text-md md:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    {i === 1 && "L'art du Zafimaniry : un patrimoine mondial"}
                    {i === 2 && "Top 5 des saveurs à goûter à Antsirabe"}
                    {i === 3 && "À la rencontre de l'Indri-Indri à Andasibe"}
                    </h4>
                    
                    <p className="text-slate-500 text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed">
                    {i === 1 && "Plongez dans l'histoire fascinante de ce peuple sculpteur des Hautes Terres."}
                    {i === 2 && "Du riz rouge au 'Vary amin'anana', découvrez les délices de la Ville d'Eau."}
                    {i === 3 && "Écoutez le chant mystique du plus grand lémurien de Madagascar en forêt vierge."}
                    </p>
                </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}