'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import styled from 'styled-components';
import FadeIn from '../../components/ui/FadeIn';
import Link from 'next/link';
import { Check, ArrowLeft, ArrowRight, Megaphone, Zap, Search, MousePointerClick, BarChart2, Smartphone, Hexagon, Image as ImageIcon } from 'lucide-react';

const Page = styled.main`
  background: #080a0d;
  min-height: 100vh;
`;

const Hero = styled.section`
  padding: 160px 48px 100px;
  background: #090c10;
  border-bottom: 1px solid rgba(255,255,255,0.04);

  @media (max-width: 1024px) { padding: 140px 40px 80px; }
  @media (max-width: 768px)  { padding: 120px 24px 64px; }
  @media (max-width: 480px)  { padding: 100px 16px 48px; }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.62rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #444;
  font-weight: 300;
  margin-bottom: 48px;
  transition: color 0.3s;
  &:hover { color: #c9a84c; }
`;

const GoldRule = styled.div`
  width: 32px;
  height: 1px;
  background: #c9a84c;
  margin-bottom: 20px;
`;

const Label = styled.p`
  font-size: 0.65rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #c9a84c;
  font-weight: 300;
  margin-bottom: 16px;
`;

const HeroTitle = styled.h1`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(2.4rem, 5.5vw, 4.5rem);
  font-weight: 400;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -0.5px;
  max-width: 820px;
  margin-bottom: 28px;
  strong { font-weight: 700; color: #c9a84c; }
`;

const HeroSub = styled.p`
  font-size: clamp(0.9rem, 1.4vw, 1.05rem);
  color: #666;
  line-height: 1.95;
  font-weight: 300;
  max-width: 620px;
  margin-bottom: 48px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 0.6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #c9a84c;
  border: 1px solid rgba(201,168,76,0.2);
  padding: 5px 14px;
  font-weight: 300;
`;

/* ============================================================
   PROTÓTIPO — LANDING PAGE (responsivo igual Sistemas de Gestão)
   ============================================================ */

const BuildLayout = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 32px;
  align-items: start;

  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 24px; }
`;

const BuildFrame = styled.div`
  background: #faf7f0;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  overflow: hidden;
`;

const BuildTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #f2ede1;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  @media (max-width: 480px) { padding: 8px 12px; }
`;

const BuildUrl = styled.span`
  font-size: 0.6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #7a766c;
  font-weight: 300;
  @media (max-width: 480px) { font-size: 0.46rem; letter-spacing: 1px; }
  @media (max-width: 360px) { font-size: 0.38rem; }
`;

const BuildLiveTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.58rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #c9a84c;
  font-weight: 300;
  @media (max-width: 480px) { font-size: 0.44rem; gap: 5px; letter-spacing: 1px; }
`;

const BuildLiveDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #c9a84c;
  animation: buildPulse 1.6s ease-in-out infinite;

  @keyframes buildPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: .3; }
  }
`;

const BuildCanvas = styled.div`
  position: relative;
  aspect-ratio: 16 / 10.5;
  background-image: radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px);
  background-size: 18px 18px;

  @media (max-width: 600px) { aspect-ratio: 16 / 13; background-size: 12px 12px; }
  @media (max-width: 420px)  { aspect-ratio: 4 / 3; }
`;

const BuildCursor = styled.div`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: 16px;
  height: 16px;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none;
  z-index: 50;
  transition: left .85s cubic-bezier(.65,0,.35,1), top .85s cubic-bezier(.65,0,.35,1), opacity .3s;

  @media (max-width: 600px) { width: 11px; height: 11px; }
  @media (max-width: 420px)  { width: 8px;  height: 8px;  }
`;

const BuildCursorTag = styled.span`
  position: absolute;
  left: 14px;
  top: 10px;
  background: #c9a84c;
  color: #0d1117;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: .5px;
  padding: 2px 7px;
  white-space: nowrap;

  @media (max-width: 600px) { font-size: 0.36rem; padding: 1px 5px; left: 10px; top: 7px; }
  @media (max-width: 420px)  { display: none; }
`;

const BuildBlock = styled.div`
  position: absolute;
  left: ${({ $left }) => $left}%;
  top: ${({ $top }) => $top}%;
  width: ${({ $width }) => $width}%;
  height: ${({ $height }) => $height}%;
`;

const BuildSketch = styled.div`
  position: absolute;
  inset: 0;
  border: 1.5px dashed rgba(201,168,76,.5);
  opacity: ${({ $active }) => $active ? 1 : 0};
  transform: scale(${({ $active }) => $active ? 1 : 0.04});
  transform-origin: top left;
  transition: transform .5s cubic-bezier(.2,.8,.2,1), opacity .2s;
`;

const BuildContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  opacity: ${({ $active }) => $active ? 1 : 0};
  transform: translateY(${({ $active }) => $active ? '0' : '5px'});
  transition: opacity .5s ease, transform .5s ease;
`;

const BuildNavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 16px;
  background: rgba(8,7,6,0.86);
`;

const BuildNavMark = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c9a84c;
`;

const BuildNavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const BuildNavLinkText = styled.span`
  font-size: 0.52rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 500;
  color: #f1ede4;
  white-space: nowrap;
  @media (max-width: 600px) { font-size: 0.34rem; letter-spacing: 1px; gap: 8px; }
  @media (max-width: 420px)  { font-size: 0.26rem; }
`;

const BuildHeadlineWrap = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const BuildHeadlineText = styled.h3`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(0.7rem, 2.2vw, 1.5rem);
  font-weight: 400;
  color: #161412;
  line-height: 1.15;
  margin: 0;
  strong { color: #c9a84c; font-weight: 700; }
  @media (max-width: 420px) { font-size: 0.6rem; }
`;

const BuildSubWrap = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const BuildSubText = styled.p`
  font-size: 0.62rem;
  color: #3a3631;
  line-height: 1.6;
  font-weight: 300;
  margin: 0;
  @media (max-width: 600px) { font-size: 0.4rem; }
  @media (max-width: 420px)  { font-size: 0.32rem; }
`;

const BuildCtaWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const BuildCtaBox = styled.div`
  border: 1px solid #c9a84c;
  color: #c9a84c;
  font-size: 0.55rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 8px 0;
  width: 100%;
  text-align: center;
  @media (max-width: 600px) { font-size: 0.34rem; padding: 6px 0; }
  @media (max-width: 420px)  { font-size: 0.28rem; padding: 5px 0; }
`;

const BuildVisualBox = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,.07);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
`;

const BuildVisualImage = styled.div`
  width: 100%;
  flex: 1;
  background: linear-gradient(135deg, #f1ece0, #ddd3ba);
  border: 1px solid rgba(0,0,0,.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b89a4e;
`;

const BuildVisualTitle = styled.h4`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(0.6rem, 1.4vw, 0.85rem);
  font-weight: 600;
  color: #161412;
  margin: 0;
`;

const BuildVisualDesc = styled.p`
  font-size: 0.6rem;
  color: #6b6760;
  font-weight: 300;
  line-height: 1.5;
  margin: 0;
  @media (max-width: 600px) { font-size: 0.36rem; }
  @media (max-width: 420px)  { display: none; }
`;

const BuildVisualPrice = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(0.6rem, 1.2vw, 0.8rem);
  font-weight: 700;
  color: #c9a84c;
`;

const BuildVisualDots = styled.div`
  display: flex;
  gap: 5px;
`;

const BuildVisualDot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${({ $gold }) => $gold ? '#c9a84c' : 'rgba(0,0,0,.18)'};
`;

const BuildStatBox = styled.div`
  width: 100%;
  height: 100%;
  background: #1b1916;
  border: 1px solid rgba(255,255,255,.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
  padding: 10px 14px;
`;

const BuildStatNum = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(0.85rem, 2vw, 1.5rem);
  font-weight: 600;
  color: #c9a84c;
  line-height: 1;
  @media (max-width: 420px) { font-size: 0.7rem; }
`;

const BuildStatRule = styled.div`
  width: 16px;
  height: 1px;
  background: #c9a84c;
`;

const BuildStatLabel = styled.span`
  font-size: 0.56rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #c9c4b8;
  @media (max-width: 600px) { font-size: 0.3rem; letter-spacing: 1px; }
  @media (max-width: 420px)  { font-size: 0.24rem; }
`;

const BuildShine = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(115deg, transparent 42%, rgba(201,168,76,.35) 50%, transparent 58%);
  transform: translateX(-130%);
  animation: ${({ $run }) => $run ? 'buildSweep 1.1s ease forwards' : 'none'};

  @keyframes buildSweep { to { transform: translateX(130%); } }
`;

const BuildBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  background: #faf7f0;
  border: 1px solid #c9a84c;
  color: #8a6d1f;
  font-size: 0.52rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 10px;
  opacity: ${({ $show }) => $show ? 1 : 0};
  transition: opacity .4s;
  svg { width: 10px; height: 10px; }
  @media (max-width: 480px) { font-size: 0.38rem; padding: 3px 7px; top: 7px; right: 7px; }
`;

/* --- steps lateral --- */
const BuildSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.04);

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 380px) {
    grid-template-columns: 1fr;
  }
`;

const BuildStep = styled.div`
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 14px;
  padding: 18px 20px;
  background: #0d1117;
  @media (max-width: 1024px) { padding: 14px 16px; gap: 10px; }
  @media (max-width: 640px)  { grid-template-columns: 30px 1fr; gap: 8px; padding: 12px 14px; }
`;

const BuildStepNum = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1;
  color: ${({ $state }) => $state === 'idle' ? '#222' : '#c9a84c'};
  transition: color .3s;
  @media (max-width: 640px) { font-size: 1rem; }
`;

const BuildStepTitle = styled.h4`
  font-size: 0.76rem;
  font-weight: 400;
  letter-spacing: .3px;
  margin-bottom: 4px;
  color: ${({ $state }) => $state === 'idle' ? '#555' : '#ddd'};
  transition: color .3s;
  @media (max-width: 640px) { font-size: 0.64rem; margin-bottom: 2px; }
`;

const BuildStepDesc = styled.p`
  font-size: 0.66rem;
  color: #555;
  line-height: 1.6;
  font-weight: 300;
  margin: 0;
  @media (max-width: 640px) { font-size: 0.58rem; line-height: 1.5; }
  @media (max-width: 420px) { display: none; }
`;

/* ============================================================
   SEÇÕES GENÉRICAS
   ============================================================ */
const Section = styled.section`
  padding: 100px 48px;
  background: ${({ $alt }) => $alt ? '#0d1117' : '#090c10'};
  border-top: 1px solid rgba(255,255,255,0.04);

  @media (max-width: 768px) { padding: 72px 24px; }
  @media (max-width: 480px) { padding: 56px 16px; }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 300;
  color: #fff;
  letter-spacing: -0.5px;
  margin-bottom: 48px;
  strong { font-weight: 600; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.04);

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`;

const Card = styled.div`
  background: ${({ $alt }) => $alt ? '#0d1117' : '#090c10'};
  padding: 36px 32px;
  transition: background 0.3s;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 2px; height: 0;
    background: #c9a84c;
    transition: height 0.4s;
  }
  &:hover { background: #111620; }
  &:hover::before { height: 100%; }

  @media (max-width: 480px) { padding: 28px 24px; }
`;

const CardIcon = styled.div`
  color: #c9a84c;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: clamp(0.9rem, 1.4vw, 1rem);
  font-weight: 400;
  color: #ddd;
  margin-bottom: 12px;
  letter-spacing: 0.3px;
`;

const CardDesc = styled.p`
  font-size: 0.83rem;
  color: #555;
  line-height: 1.85;
  font-weight: 300;
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 40px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const Feature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #888;
  font-size: 0.83rem;
  font-weight: 300;
  line-height: 1.6;

  svg { color: #c9a84c; flex-shrink: 0; margin-top: 3px; }
`;

const ProcessList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.04);
`;

const ProcessItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 32px;
  padding: 36px;
  background: #090c10;
  transition: background 0.3s;
  &:hover { background: #0d1117; }

  @media (max-width: 600px) { grid-template-columns: 48px 1fr; gap: 20px; padding: 24px; }
`;

const ProcessNum = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: 2rem;
  font-weight: 300;
  color: #222;
  line-height: 1;
`;

const ProcessContent = styled.div``;

const ProcessTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 400;
  color: #ddd;
  margin-bottom: 8px;
  letter-spacing: 0.3px;
`;

const ProcessDesc = styled.p`
  font-size: 0.82rem;
  color: #555;
  line-height: 1.85;
  font-weight: 300;
`;

const CTA = styled.section`
  padding: 100px 48px;
  background: #090c10;
  border-top: 1px solid rgba(255,255,255,0.04);
  text-align: center;

  @media (max-width: 768px) { padding: 72px 24px; }
`;

const CTATitle = styled.h2`
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  font-weight: 300;
  color: #fff;
  margin-bottom: 16px;
  strong { font-weight: 600; }
`;

const CTASub = styled.p`
  font-size: clamp(0.85rem, 1.3vw, 0.95rem);
  color: #555;
  line-height: 1.9;
  font-weight: 300;
  max-width: 520px;
  margin: 0 auto 40px;
`;

const BtnGold = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  background: transparent;
  border: 1px solid #c9a84c;
  color: #c9a84c;
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 400;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.4s;
  &:hover { background: #c9a84c; color: #0d1117; }
`;

const pillars = [
  { icon: <Zap size={22} />, title: 'Performance Técnica', desc: 'Código otimizado para pontuação máxima no Google PageSpeed — LCP, CLS e FID dentro dos padrões Core Web Vitals.' },
  { icon: <Search size={22} />, title: 'SEO desde o Código', desc: 'Estrutura semântica com HTML5, meta tags corretas, Open Graph e Schema.org para aparecer nos resultados certos.' },
  { icon: <MousePointerClick size={22} />, title: 'Conversão no Centro', desc: 'Cada seção, cada CTA e cada microcopy pensado para conduzir o visitante até a ação que importa para o negócio.' },
  { icon: <BarChart2 size={22} />, title: 'Analytics Integrado', desc: 'Configuração de Google Analytics 4, eventos personalizados e rastreamento de conversões para medir o que realmente importa.' },
  { icon: <Smartphone size={22} />, title: 'Mobile First', desc: 'Design e desenvolvimento começam pelo mobile — garantindo experiência perfeita em qualquer tamanho de tela.' },
  { icon: <Megaphone size={22} />, title: 'Integração com Tráfego', desc: 'Pronta para campanhas de Google Ads e Meta Ads — com pixels de rastreamento, UTMs e páginas de obrigado configuradas.' },
];

const features = [
  'Carregamento abaixo de 2 segundos',
  'Score 90+ no Google PageSpeed',
  'Formulário com validação e envio real',
  'Integração com WhatsApp Business',
  'Open Graph para redes sociais',
  'Proteção contra spam (honeypot/reCAPTCHA)',
  'URL amigável e canônica configurada',
  'Hospedagem otimizada via Vercel/Netlify',
];

const process = [
  { title: 'Briefing e Estratégia', desc: 'Entendo o objetivo da página, o público-alvo, a proposta de valor e onde ela será divulgada. Com isso, definimos juntos a estrutura narrativa ideal.' },
  { title: 'Wireframe e Aprovação', desc: 'Esboço o fluxo de seções antes de codificar. Você aprova a estrutura antes de qualquer linha de código ser escrita.' },
  { title: 'Desenvolvimento', desc: 'Código em Next.js com TypeScript, estilização com Styled-Components, responsividade total e integração dos recursos técnicos (formulário, analytics, pixels).' },
  { title: 'Testes e Ajustes', desc: 'Testo em múltiplos dispositivos e navegadores. Rodo o PageSpeed, ajusto o que for necessário e aplico as correções de conteúdo.' },
  { title: 'Entrega e Suporte', desc: 'Deploy em produção com domínio configurado. Disponível por 30 dias após a entrega para ajustes e dúvidas.' },
];

const initialElStatus = {
  nav: 'idle', headline: 'idle', sub: 'idle', cta: 'idle',
  visual: 'idle', stat1: 'idle', stat2: 'idle', stat3: 'idle',
};

const buildSequence = [
  { id: 'nav',      x: 2,  y: 3,  label: 'Navbar.tsx',    step: 1 },
  { id: 'headline', x: 4,  y: 22, label: 'Headline.tsx',  step: 2 },
  { id: 'sub',      x: 4,  y: 44, label: 'Subtitle.tsx',  step: 2 },
  { id: 'cta',      x: 4,  y: 60, label: 'CtaButton.tsx', step: 3 },
  { id: 'visual',   x: 62, y: 18, label: 'HeroVisual.tsx',step: 4 },
  { id: 'stat1',    x: 4,  y: 74, label: 'Metrics.tsx',   step: 5 },
  { id: 'stat2',    x: 34, y: 74, label: 'Metrics.tsx',   step: 5 },
  { id: 'stat3',    x: 64, y: 74, label: 'Metrics.tsx',   step: 5 },
];

const buildStepsMeta = [
  { num: 1, title: 'Estrutura',           desc: 'Grade base e navegação.' },
  { num: 2, title: 'Mensagem principal',  desc: 'Headline e subtítulo que comunicam a proposta de valor.' },
  { num: 3, title: 'Chamada para ação',   desc: 'O botão que conduz à conversão.' },
  { num: 4, title: 'Composição visual',   desc: 'Elementos gráficos de apoio à narrativa.' },
  { num: 5, title: 'Prova de resultado',  desc: 'Métricas reais de performance e SEO.' },
  { num: 6, title: 'Revisão final',       desc: 'Ajustes finos antes da entrega.' },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function LandingPages() {
  const [elStatus, setElStatus] = useState(initialElStatus);
  const [cursor, setCursor] = useState({ x: 2, y: 3, label: 'Navbar.tsx', visible: false });
  const [activeStep, setActiveStep] = useState(0);
  const [shine, setShine] = useState(false);
  const [badge, setBadge] = useState(false);
  const [counts, setCounts] = useState({ stat1: 0, stat2: 0, stat3: 0 });

  useEffect(() => {
    let cancelled = false;
    const rafIds = [];

    function animateCount(key, target) {
      const start = performance.now();
      const duration = 850;
      function frame(now) {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setCounts((prev) => ({ ...prev, [key]: Math.round(target * eased) }));
        if (t < 1) rafIds.push(requestAnimationFrame(frame));
      }
      rafIds.push(requestAnimationFrame(frame));
    }

    async function run() {
      while (!cancelled) {
        setElStatus(initialElStatus);
        setCounts({ stat1: 0, stat2: 0, stat3: 0 });
        setShine(false);
        setBadge(false);
        setActiveStep(0);
        setCursor((c) => ({ ...c, visible: false }));
        await sleep(450);
        if (cancelled) return;
        setCursor((c) => ({ ...c, visible: true }));

        for (const cfg of buildSequence) {
          if (cancelled) return;
          setActiveStep(cfg.step);
          setCursor({ x: cfg.x, y: cfg.y, label: cfg.label, visible: true });
          await sleep(750);
          if (cancelled) return;
          setElStatus((prev) => ({ ...prev, [cfg.id]: 'sketching' }));
          await sleep(520);
          if (cancelled) return;
          setElStatus((prev) => ({ ...prev, [cfg.id]: 'filled' }));
          if (cfg.id === 'stat1') animateCount('stat1', 98);
          if (cfg.id === 'stat2') animateCount('stat2', 100);
          if (cfg.id === 'stat3') animateCount('stat3', 140);
          await sleep(420);
        }

        if (cancelled) return;
        setActiveStep(6);
        setCursor((c) => ({ ...c, visible: false }));
        await sleep(300);
        if (cancelled) return;
        setShine(true);
        await sleep(700);
        if (cancelled) return;
        setBadge(true);
        setActiveStep(7);
        await sleep(2800);
      }
    }

    run();

    return () => {
      cancelled = true;
      rafIds.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  return (
    <>
      <Navbar />
      <Page>
        <Hero>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <BackLink href="/servicos"><ArrowLeft size={12} /> Voltar</BackLink>
              <GoldRule />
              <Label>Capacidade Técnica</Label>
              <HeroTitle>Landing Pages de <strong>Alta Conversão</strong></HeroTitle>
              <HeroSub>
                Páginas únicas construídas para transformar visitantes em leads, clientes ou agendamentos — com performance técnica, SEO real e narrativa visual estratégica.
              </HeroSub>
              <Tags>
                {['Next.js', 'React', 'TypeScript', 'SEO', 'Core Web Vitals', 'Analytics'].map((t, i) => <Tag key={i}>{t}</Tag>)}
              </Tags>
            </FadeIn>
          </Inner>
        </Hero>

        <Section>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Veja o processo <strong>ganhar forma</strong></SectionTitle>
              <BuildLayout>
                <BuildFrame>
                  <BuildTopBar>
                    <BuildUrl>suamarca.com.br/lancamento</BuildUrl>
                    <BuildLiveTag><BuildLiveDot /> construindo ao vivo</BuildLiveTag>
                  </BuildTopBar>
                  <BuildCanvas>
                    <BuildCursor $x={cursor.x} $y={cursor.y} $visible={cursor.visible}>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M1 1 L1 13 L4.5 10.2 L7 15 L9 14 L6.5 9 L11 9 Z" fill="#111111" stroke="#faf7f0" strokeWidth={0.6} />
                      </svg>
                      <BuildCursorTag>{cursor.label}</BuildCursorTag>
                    </BuildCursor>

                    <BuildBlock $left={0} $top={0} $width={100} $height={11}>
                      <BuildSketch $active={elStatus.nav === 'sketching'} />
                      <BuildContent $active={elStatus.nav === 'filled'}>
                        <BuildNavRow>
                          <BuildNavMark><Hexagon size={14} strokeWidth={2} /></BuildNavMark>
                          <BuildNavLinks>
                            <BuildNavLinkText>Início</BuildNavLinkText>
                            <BuildNavLinkText>Sobre</BuildNavLinkText>
                            <BuildNavLinkText>Serviços</BuildNavLinkText>
                          </BuildNavLinks>
                        </BuildNavRow>
                      </BuildContent>
                    </BuildBlock>

                    <BuildBlock $left={4} $top={22} $width={56} $height={20}>
                      <BuildSketch $active={elStatus.headline === 'sketching'} />
                      <BuildContent $active={elStatus.headline === 'filled'}>
                        <BuildHeadlineWrap>
                          <BuildHeadlineText>Sua Marca, <strong>Mais Visível</strong></BuildHeadlineText>
                        </BuildHeadlineWrap>
                      </BuildContent>
                    </BuildBlock>

                    <BuildBlock $left={4} $top={44} $width={50} $height={14}>
                      <BuildSketch $active={elStatus.sub === 'sketching'} />
                      <BuildContent $active={elStatus.sub === 'filled'}>
                        <BuildSubWrap>
                          <BuildSubText>Uma experiência sob medida para apresentar seu produto, gerar confiança e converter visitantes em clientes.</BuildSubText>
                        </BuildSubWrap>
                      </BuildContent>
                    </BuildBlock>

                    <BuildBlock $left={4} $top={60} $width={24} $height={9}>
                      <BuildSketch $active={elStatus.cta === 'sketching'} />
                      <BuildContent $active={elStatus.cta === 'filled'}>
                        <BuildCtaWrap>
                          <BuildCtaBox>Quero Começar</BuildCtaBox>
                        </BuildCtaWrap>
                      </BuildContent>
                    </BuildBlock>

                    <BuildBlock $left={62} $top={18} $width={34} $height={50}>
                      <BuildSketch $active={elStatus.visual === 'sketching'} />
                      <BuildContent $active={elStatus.visual === 'filled'}>
                        <BuildVisualBox>
                          <BuildVisualImage><ImageIcon size={20} strokeWidth={1.5} /></BuildVisualImage>
                          <BuildVisualTitle>Coleção Outono</BuildVisualTitle>
                          <BuildVisualDesc>Peças exclusivas, edição limitada, entrega em até 5 dias.</BuildVisualDesc>
                          <BuildVisualPrice>R$ 249,90</BuildVisualPrice>
                          <BuildVisualDots>
                            <BuildVisualDot />
                            <BuildVisualDot $gold />
                            <BuildVisualDot />
                            <BuildVisualDot />
                            <BuildVisualDot $gold />
                            <BuildVisualDot />
                          </BuildVisualDots>
                        </BuildVisualBox>
                      </BuildContent>
                    </BuildBlock>

                    <BuildBlock $left={4} $top={74} $width={27} $height={19}>
                      <BuildSketch $active={elStatus.stat1 === 'sketching'} />
                      <BuildContent $active={elStatus.stat1 === 'filled'}>
                        <BuildStatBox>
                          <BuildStatNum>{counts.stat1}</BuildStatNum>
                          <BuildStatRule />
                          <BuildStatLabel>Core Web Vitals</BuildStatLabel>
                        </BuildStatBox>
                      </BuildContent>
                    </BuildBlock>

                    <BuildBlock $left={34} $top={74} $width={27} $height={19}>
                      <BuildSketch $active={elStatus.stat2 === 'sketching'} />
                      <BuildContent $active={elStatus.stat2 === 'filled'}>
                        <BuildStatBox>
                          <BuildStatNum>{counts.stat2}</BuildStatNum>
                          <BuildStatRule />
                          <BuildStatLabel>SEO Score</BuildStatLabel>
                        </BuildStatBox>
                      </BuildContent>
                    </BuildBlock>

                    <BuildBlock $left={64} $top={74} $width={27} $height={19}>
                      <BuildSketch $active={elStatus.stat3 === 'sketching'} />
                      <BuildContent $active={elStatus.stat3 === 'filled'}>
                        <BuildStatBox>
                          <BuildStatNum>+{counts.stat3}%</BuildStatNum>
                          <BuildStatRule />
                          <BuildStatLabel>Em conversão</BuildStatLabel>
                        </BuildStatBox>
                      </BuildContent>
                    </BuildBlock>

                    <BuildShine $run={shine} />
                    <BuildBadge $show={badge}><Check size={11} /> Protótipo pronto</BuildBadge>
                  </BuildCanvas>
                </BuildFrame>

                <BuildSteps>
                  {buildStepsMeta.map((s) => {
                    const state = activeStep === s.num ? 'active' : activeStep > s.num ? 'done' : 'idle';
                    return (
                      <BuildStep key={s.num}>
                        <BuildStepNum $state={state}>{String(s.num).padStart(2, '0')}</BuildStepNum>
                        <div>
                          <BuildStepTitle $state={state}>{s.title}</BuildStepTitle>
                          <BuildStepDesc>{s.desc}</BuildStepDesc>
                        </div>
                      </BuildStep>
                    );
                  })}
                </BuildSteps>
              </BuildLayout>
            </FadeIn>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Os <strong>6 pilares</strong> de uma landing page que converte</SectionTitle>
              <Grid $alt>
                {pillars.map((p, i) => (
                  <Card $alt key={i}>
                    <CardIcon>{p.icon}</CardIcon>
                    <CardTitle>{p.title}</CardTitle>
                    <CardDesc>{p.desc}</CardDesc>
                  </Card>
                ))}
              </Grid>
            </FadeIn>
          </Inner>
        </Section>

        <Section>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>O que está <strong>no escopo</strong></SectionTitle>
              <FeatureList>
                {features.map((f, i) => (
                  <Feature key={i}><Check size={14} />{f}</Feature>
                ))}
              </FeatureList>
            </FadeIn>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Como <strong>funciona</strong> o processo</SectionTitle>
              <ProcessList>
                {process.map((p, i) => (
                  <ProcessItem key={i}>
                    <ProcessNum>{String(i + 1).padStart(2, '0')}</ProcessNum>
                    <ProcessContent>
                      <ProcessTitle>{p.title}</ProcessTitle>
                      <ProcessDesc>{p.desc}</ProcessDesc>
                    </ProcessContent>
                  </ProcessItem>
                ))}
              </ProcessList>
            </FadeIn>
          </Inner>
        </Section>

        <CTA>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <GoldRule style={{ margin: '0 auto 20px' }} />
              <Label>Vamos conversar?</Label>
              <CTATitle>Interessado em trabalhar <strong>juntos?</strong></CTATitle>
              <CTASub>Estou em busca de novos desafios e pronta para contribuir com times que precisam de front-end de alto nível.</CTASub>
              <BtnGold href="/#contato">
                Entrar em contato <ArrowRight size={14} />
              </BtnGold>
            </FadeIn>
          </Inner>
        </CTA>
      </Page>
      <Footer />
    </>
  );
}