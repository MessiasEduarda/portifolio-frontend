'use client';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import ServicosHero from '../components/sections/ServicosHero';
import ServicosList from '../components/sections/ServicosList';
import ServicosCTA from '../components/sections/ServicosCTA';

export default function Servicos() {
  return (
    <>
      <Navbar />
      <main>
        <ServicosHero />
        <ServicosList />
        <ServicosCTA />
      </main>
      <Footer />
    </>
  );
}