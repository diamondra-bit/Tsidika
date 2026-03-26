import Link from 'next/link';

interface ExploreLinkProps {
  href: string;
  label?: string; 
  className?: string;
}

const ExploreLink = ({ href, label = "Découvrir l'expérience", className = "" }: ExploreLinkProps) => {
  return (
    <Link 
      href={href}
      className={`mt-6 text-[10px] uppercase font-black tracking-widest border-b border-slate-900 w-fit pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-all inline-block ${className}`}
    >
      {label}
    </Link>
  );
};

export default ExploreLink;