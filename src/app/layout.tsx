import type { Metadata } from "next";
import { TripProvider } from '@/context/TripContext';
import "./globals.css";



export const metadata: Metadata = {
  title: "TSIDIKA | Joyaux Cachés de Madagascar",
  description: "Explorez les destinations les plus précieuses et authentiques de Madagascar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr"> 
      <body className={`font-sans antialiased`}>
        <TripProvider>
          {children}
        </TripProvider>
      </body>
    </html>
  );
}