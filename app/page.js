'use client';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import Hero from './components/sections/Hero';
import BuildAoVivo from './components/sections/BuildAoVivo';
import Sobre from './components/sections/Sobre';
import Habilidades from './components/sections/Habilidades';
import Projetos from './components/sections/Projetos';
import ServicosHero from './components/sections/ServicosHero';
import ServicosList from './components/sections/ServicosList';
import ServicosCTA from './components/sections/ServicosCTA';
import Experiencia from './components/sections/Experiencia';
import Contato from './components/sections/Contato';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BuildAoVivo />
        <Sobre />
        <Habilidades />
        <Projetos />
        <Experiencia />
        <ServicosHero />
        <ServicosList />
        <ServicosCTA />
        <Contato />
      </main>
      <Footer />
    </>
  );
}