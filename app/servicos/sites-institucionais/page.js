'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import styled from 'styled-components';
import FadeIn from '../../components/ui/FadeIn';
import Link from 'next/link';
import { Check, ArrowLeft, ArrowRight, Building2, Map, Mail, Globe, ShieldCheck, RefreshCw, MapPin } from 'lucide-react';

const Page = styled.main`background: #080a0d; min-height: 100vh;`;
const Hero = styled.section`
  padding: 160px 48px 100px; background: #090c10; border-bottom: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 1024px) { padding: 140px 40px 80px; }
  @media (max-width: 768px)  { padding: 120px 24px 64px; }
  @media (max-width: 480px)  { padding: 100px 16px 48px; }
`;
const Inner = styled.div`max-width: 1200px; margin: 0 auto;`;
const BackLink = styled(Link)`
  display: inline-flex; align-items: center; gap: 8px; font-size: 0.62rem;
  letter-spacing: 3px; text-transform: uppercase; color: #444; font-weight: 300;
  margin-bottom: 48px; transition: color 0.3s; &:hover { color: #c9a84c; }
`;
const GoldRule = styled.div`width: 32px; height: 1px; background: #c9a84c; margin-bottom: 20px;`;
const Label = styled.p`font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase; color: #c9a84c; font-weight: 300; margin-bottom: 16px;`;
const HeroTitle = styled.h1`
  font-family: var(--font-cormorant), serif; font-size: clamp(2.4rem, 5.5vw, 4.5rem);
  font-weight: 400; color: #fff; line-height: 1.15; letter-spacing: -0.5px;
  max-width: 820px; margin-bottom: 28px; strong { font-weight: 700; color: #c9a84c; }
`;
const HeroSub = styled.p`font-size: clamp(0.9rem, 1.4vw, 1.05rem); color: #666; line-height: 1.95; font-weight: 300; max-width: 620px; margin-bottom: 48px;`;
const Tags = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;
const Tag = styled.span`font-size: 0.6rem; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c; border: 1px solid rgba(201,168,76,0.2); padding: 5px 14px; font-weight: 300;`;

/* ============================================================
   PROTÓTIPO — SITE INSTITUCIONAL
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
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 16px;
  background: #f2ede1;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  @media (max-width: 480px) { padding: 8px 12px; }
`;

const BuildUrl = styled.span`
  font-size: 0.6rem; letter-spacing: 2px; text-transform: uppercase; color: #7a766c; font-weight: 300;
  @media (max-width: 480px) { font-size: 0.46rem; letter-spacing: 1px; }
  @media (max-width: 360px) { font-size: 0.38rem; }
`;

const BuildLiveTag = styled.span`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 0.58rem; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c; font-weight: 300;
  @media (max-width: 480px) { font-size: 0.44rem; gap: 5px; letter-spacing: 1px; }
`;

const BuildLiveDot = styled.span`
  width: 6px; height: 6px; border-radius: 50%; background: #c9a84c;
  animation: buildPulse 1.6s ease-in-out infinite;
  @keyframes buildPulse { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
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
  position: absolute; left: ${({ $x }) => $x}%; top: ${({ $y }) => $y}%;
  width: 16px; height: 16px;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none; z-index: 50;
  transition: left .85s cubic-bezier(.65,0,.35,1), top .85s cubic-bezier(.65,0,.35,1), opacity .3s;
  @media (max-width: 600px) { width: 11px; height: 11px; }
  @media (max-width: 420px)  { width: 8px;  height: 8px; }
`;

const BuildCursorTag = styled.span`
  position: absolute; left: 14px; top: 10px;
  background: #c9a84c; color: #0d1117;
  font-size: 0.58rem; font-weight: 600; letter-spacing: .5px; padding: 2px 7px; white-space: nowrap;
  @media (max-width: 600px) { font-size: 0.36rem; padding: 1px 5px; left: 10px; top: 7px; }
  @media (max-width: 420px)  { display: none; }
`;

const BuildBlock = styled.div`
  position: absolute;
  left: ${({ $left }) => $left}%; top: ${({ $top }) => $top}%;
  width: ${({ $width }) => $width}%; height: ${({ $height }) => $height}%;
`;

const BuildSketch = styled.div`
  position: absolute; inset: 0; border: 1.5px dashed rgba(201,168,76,.5);
  opacity: ${({ $active }) => $active ? 1 : 0};
  transform: scale(${({ $active }) => $active ? 1 : 0.04}); transform-origin: top left;
  transition: transform .5s cubic-bezier(.2,.8,.2,1), opacity .2s;
`;

const BuildContent = styled.div`
  position: absolute; inset: 0; display: flex;
  opacity: ${({ $active }) => $active ? 1 : 0};
  transform: translateY(${({ $active }) => $active ? '0' : '5px'});
  transition: opacity .5s ease, transform .5s ease;
`;

/* --- navbar --- */
const BuildNavRow = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; height: 100%; padding: 0 16px;
  background: rgba(8,7,6,0.86);
`;

const BuildNavMark = styled.div`
  width: 16px; height: 16px; display: flex;
  align-items: center; justify-content: center; color: #c9a84c;
  svg { width: 12px; height: 12px; }
  @media (max-width: 600px) { svg { width: 9px; height: 9px; } }
`;

const BuildNavLinks = styled.div`display: flex; align-items: center; gap: 14px;`;

const BuildNavLinkText = styled.span`
  font-size: 0.5rem; letter-spacing: 1.5px; text-transform: uppercase;
  font-weight: 500; color: #f1ede4; white-space: nowrap;
  @media (max-width: 600px) { font-size: 0.32rem; letter-spacing: 0.8px; gap: 8px; }
  @media (max-width: 420px)  { font-size: 0.26rem; }
`;

/* --- headline / sub / cta --- */
const BuildHeadlineWrap = styled.div`display: flex; align-items: flex-start; width: 100%;`;

const BuildHeadlineText = styled.h3`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(0.75rem, 2.2vw, 1.5rem);
  font-weight: 400; color: #161412; line-height: 1.15; margin: 0;
  strong { color: #c9a84c; font-weight: 700; }
  @media (max-width: 600px) { font-size: clamp(0.55rem, 1.8vw, 1rem); }
`;

const BuildSubWrap = styled.div`display: flex; align-items: flex-start; width: 100%;`;

const BuildSubText = styled.p`
  font-size: 0.58rem; color: #3a3631; line-height: 1.55; font-weight: 300; margin: 0;
  @media (max-width: 600px) { font-size: 0.36rem; line-height: 1.4; }
  @media (max-width: 420px)  { font-size: 0.28rem; }
`;

const BuildCtaWrap = styled.div`display: flex; align-items: center; width: 100%;`;

const BuildCtaBox = styled.div`
  border: 1px solid #c9a84c; color: #c9a84c;
  font-size: 0.5rem; letter-spacing: 1.5px; text-transform: uppercase;
  padding: 7px 0; width: 100%; text-align: center;
  @media (max-width: 600px) { font-size: 0.32rem; padding: 5px 0; letter-spacing: 0.8px; }
  @media (max-width: 420px)  { font-size: 0.26rem; padding: 4px 0; }
`;

/* --- galeria / estrutura --- */
const BuildVisualBox = styled.div`
  width: 100%; height: 100%;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,.07);
  display: flex; flex-direction: column; gap: 8px; padding: 12px; overflow: hidden;
`;

const BuildVisualImage = styled.div`
  width: 100%; flex: 1; min-height: 0;
  background: linear-gradient(135deg, #f1ece0, #ddd3ba);
  border: 1px solid rgba(0,0,0,.06);
  display: flex; align-items: center; justify-content: center; color: #b89a4e;
  svg { width: 18px; height: 18px; }
  @media (max-width: 600px) { svg { width: 12px; height: 12px; } }
`;

const BuildVisualTitle = styled.h4`
  font-family: var(--font-cormorant), serif;
  font-size: 0.75rem; font-weight: 600; color: #161412; margin: 0;
  @media (max-width: 600px) { font-size: 0.5rem; }
  @media (max-width: 420px)  { font-size: 0.38rem; }
`;

const BuildVisualDesc = styled.p`
  font-size: 0.52rem; color: #6b6760; font-weight: 300; line-height: 1.45; margin: 0;
  @media (max-width: 600px) { font-size: 0.34rem; }
  @media (max-width: 420px)  { display: none; }
`;

const BuildVisualDots = styled.div`display: flex; gap: 5px; margin-top: auto; flex-shrink: 0;`;

const BuildVisualDot = styled.span`
  width: 5px; height: 5px; border-radius: 50%;
  background: ${({ $gold }) => $gold ? '#c9a84c' : 'rgba(0,0,0,.18)'};
  @media (max-width: 420px) { width: 4px; height: 4px; }
`;

/* --- mapa --- */
const BuildMapBox = styled.div`
  width: 100%; height: 100%;
  background: #ffffff;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(0,0,0,0.05) 14px, rgba(0,0,0,0.05) 15px),
    repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(0,0,0,0.05) 14px, rgba(0,0,0,0.05) 15px);
  border: 1px solid rgba(0,0,0,.07);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 5px;
`;

const BuildMapPin = styled.div`
  color: #c9a84c;
  display: flex; align-items: center; justify-content: center;
  animation: mapPinPulse 1.8s ease-in-out infinite;
  svg { width: 14px; height: 14px; }
  @keyframes mapPinPulse { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(-3px); opacity: .75; } }
  @media (max-width: 600px) { svg { width: 10px; height: 10px; } }
`;

const BuildMapLabel = styled.span`
  font-size: 0.44rem; letter-spacing: .5px; color: #6b6760; font-weight: 300;
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.25);
  padding: 2px 7px;
  @media (max-width: 600px) { font-size: 0.3rem; padding: 1px 5px; }
  @media (max-width: 420px)  { font-size: 0.24rem; }
`;

/* --- formulário --- */
const BuildFormBox = styled.div`
  width: 100%; height: 100%;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,.07);
  display: flex; flex-direction: column; gap: 5px; padding: 10px 12px; overflow: hidden;
`;

const BuildFormTitle = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: 0.72rem; font-weight: 600; color: #161412; margin-bottom: 1px;
  @media (max-width: 600px) { font-size: 0.48rem; }
  @media (max-width: 420px)  { font-size: 0.38rem; }
`;

const BuildFormField = styled.div`display: flex; flex-direction: column; gap: 2px;`;

const BuildFormLabel = styled.span`
  font-size: 0.42rem; letter-spacing: 1px; text-transform: uppercase;
  color: #8a8579; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.28rem; }
`;

const BuildFormInputBar = styled.div`
  width: 100%; height: 8px;
  background: #f2ede1;
  border: 1px solid rgba(0,0,0,.06);
  @media (max-width: 420px) { height: 6px; }
`;

const BuildFormButton = styled.div`
  margin-top: auto;
  border: 1px solid #c9a84c; color: #8a6d1f;
  font-size: 0.44rem; letter-spacing: 1.5px; text-transform: uppercase;
  padding: 5px 0; text-align: center; font-weight: 400;
  @media (max-width: 600px) { font-size: 0.28rem; padding: 4px 0; letter-spacing: 0.8px; }
`;

/* --- selo de confiança / LGPD --- */
const BuildTrustBox = styled.div`
  width: 100%; height: 100%;
  background: #1b1916;
  border: 1px solid rgba(255,255,255,.08);
  display: flex; flex-direction: column;
  align-items: flex-start; justify-content: center;
  gap: 5px; padding: 12px 14px;
`;

const BuildTrustNum = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(0.85rem, 1.8vw, 1.4rem);
  font-weight: 600; color: #c9a84c; line-height: 1;
  @media (max-width: 600px) { font-size: clamp(0.6rem, 2.5vw, 1rem); }
`;

const BuildTrustRule = styled.div`width: 16px; height: 1px; background: #c9a84c;`;

const BuildTrustLabel = styled.span`
  font-size: 0.44rem; letter-spacing: 1px; text-transform: uppercase; color: #c9c4b8;
  @media (max-width: 600px) { font-size: 0.28rem; letter-spacing: 0.5px; }
  @media (max-width: 420px)  { font-size: 0.22rem; }
`;

/* --- brilho / selo final --- */
const BuildShine = styled.div`
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(115deg, transparent 42%, rgba(201,168,76,.35) 50%, transparent 58%);
  transform: translateX(-130%);
  animation: ${({ $run }) => $run ? 'buildSweep 1.1s ease forwards' : 'none'};
  @keyframes buildSweep { to { transform: translateX(130%); } }
`;

const BuildBadge = styled.div`
  position: absolute; top: 10px; right: 10px;
  display: flex; align-items: center; gap: 5px;
  background: #faf7f0; border: 1px solid #c9a84c;
  color: #8a6d1f; font-size: 0.52rem; letter-spacing: 1px;
  text-transform: uppercase; padding: 4px 10px;
  opacity: ${({ $show }) => $show ? 1 : 0};
  transition: opacity .4s;
  svg { width: 10px; height: 10px; }
  @media (max-width: 480px) { font-size: 0.38rem; padding: 3px 7px; top: 7px; right: 7px; }
`;

/* --- steps --- */
const BuildSteps = styled.div`
  display: flex; flex-direction: column; gap: 1px;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.04);

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
  display: grid; grid-template-columns: 44px 1fr; gap: 14px; padding: 18px 20px;
  background: #0d1117;
  @media (max-width: 1024px) { padding: 14px 16px; gap: 10px; }
  @media (max-width: 640px)  { grid-template-columns: 30px 1fr; gap: 8px; padding: 12px 14px; }
`;

const BuildStepNum = styled.span`
  font-family: var(--font-cormorant), serif; font-size: 1.4rem; font-weight: 300; line-height: 1;
  color: ${({ $state }) => $state === 'idle' ? '#222' : '#c9a84c'}; transition: color .3s;
  @media (max-width: 640px) { font-size: 1rem; }
`;

const BuildStepTitle = styled.h4`
  font-size: 0.76rem; font-weight: 400; letter-spacing: .3px; margin-bottom: 4px;
  color: ${({ $state }) => $state === 'idle' ? '#555' : '#ddd'}; transition: color .3s;
  @media (max-width: 640px) { font-size: 0.64rem; margin-bottom: 2px; }
`;

const BuildStepDesc = styled.p`
  font-size: 0.66rem; color: #555; line-height: 1.6; font-weight: 300; margin: 0;
  @media (max-width: 640px) { font-size: 0.58rem; line-height: 1.5; }
  @media (max-width: 420px)  { display: none; }
`;

/* ============================================================
   SEÇÕES GENÉRICAS
   ============================================================ */
const Section = styled.section`
  padding: 100px 48px; background: ${({ $alt }) => $alt ? '#0d1117' : '#090c10'}; border-top: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 768px) { padding: 72px 24px; }
  @media (max-width: 480px) { padding: 56px 16px; }
`;
const SectionTitle = styled.h2`font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 300; color: #fff; letter-spacing: -0.5px; margin-bottom: 48px; strong { font-weight: 600; }`;
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`;
const Card = styled.div`
  background: ${({ $alt }) => $alt ? '#0d1117' : '#090c10'}; padding: 36px 32px;
  transition: background 0.3s; position: relative;
  &::before { content: ''; position: absolute; top: 0; left: 0; width: 2px; height: 0; background: #c9a84c; transition: height 0.4s; }
  &:hover { background: #111620; } &:hover::before { height: 100%; }
  @media (max-width: 480px) { padding: 28px 24px; }
`;
const CardIcon = styled.div`color: #c9a84c; margin-bottom: 20px;`;
const CardTitle = styled.h3`font-size: clamp(0.9rem, 1.4vw, 1rem); font-weight: 400; color: #ddd; margin-bottom: 12px; letter-spacing: 0.3px;`;
const CardDesc = styled.p`font-size: 0.83rem; color: #555; line-height: 1.85; font-weight: 300;`;
const FeatureList = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px 40px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;
const Feature = styled.div`
  display: flex; align-items: flex-start; gap: 12px; color: #888; font-size: 0.83rem; font-weight: 300; line-height: 1.6;
  svg { color: #c9a84c; flex-shrink: 0; margin-top: 3px; }
`;
const ProcessList = styled.div`display: flex; flex-direction: column; gap: 1px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.04);`;
const ProcessItem = styled.div`
  display: grid; grid-template-columns: 80px 1fr; gap: 32px; padding: 36px;
  background: #090c10; transition: background 0.3s; &:hover { background: #0d1117; }
  @media (max-width: 600px) { grid-template-columns: 48px 1fr; gap: 20px; padding: 24px; }
`;
const ProcessNum = styled.span`font-family: var(--font-cormorant), serif; font-size: 2rem; font-weight: 300; color: #222; line-height: 1;`;
const ProcessTitle = styled.h3`font-size: 0.95rem; font-weight: 400; color: #ddd; margin-bottom: 8px; letter-spacing: 0.3px;`;
const ProcessDesc = styled.p`font-size: 0.82rem; color: #555; line-height: 1.85; font-weight: 300;`;
const CTA = styled.section`
  padding: 100px 48px; background: #090c10; border-top: 1px solid rgba(255,255,255,0.04); text-align: center;
  @media (max-width: 768px) { padding: 72px 24px; }
`;
const CTATitle = styled.h2`font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 300; color: #fff; margin-bottom: 16px; strong { font-weight: 600; }`;
const CTASub = styled.p`font-size: clamp(0.85rem, 1.3vw, 0.95rem); color: #555; line-height: 1.9; font-weight: 300; max-width: 520px; margin: 0 auto 40px;`;
const BtnGold = styled(Link)`
  display: inline-flex; align-items: center; gap: 12px; padding: 16px 40px;
  background: transparent; border: 1px solid #c9a84c; color: #c9a84c; font-size: 0.7rem;
  letter-spacing: 3px; text-transform: uppercase; font-weight: 400; font-family: inherit;
  cursor: pointer; transition: all 0.4s; &:hover { background: #c9a84c; color: #0d1117; }
`;

/* ============================================================
   DADOS ESTÁTICOS
   ============================================================ */
const pillars = [
  { icon: <Building2 size={22} />, title: 'Identidade e Credibilidade', desc: 'Estrutura visual coerente com a marca, transmitindo profissionalismo e confiança desde a primeira visita.' },
  { icon: <Mail size={22} />, title: 'Formulário com Back-End Real', desc: 'Formulário de contato integrado a um servidor — nada de soluções de terceiros. Mensagens chegam direto no seu e-mail.' },
  { icon: <Map size={22} />, title: 'Mapa Interativo', desc: 'Integração com Google Maps para exibir o endereço físico da empresa de forma visual e clicável.' },
  { icon: <Globe size={22} />, title: 'SEO Local Estruturado', desc: 'Schema.org com dados da empresa, otimização para buscas locais e configuração de Google Business integrada.' },
  { icon: <ShieldCheck size={22} />, title: 'Segurança e LGPD', desc: 'Política de privacidade, banner de cookies e formulários com proteção contra spam e ataques de bot.' },
  { icon: <RefreshCw size={22} />, title: 'Painel de Atualização', desc: 'Sistema simples para você mesmo atualizar textos, imagens e conteúdos sem precisar de um desenvolvedor.' },
];

const features = [
  'Design responsivo em qualquer dispositivo', 'Formulário de contato com back-end',
  'Mapa interativo integrado', 'Otimização para SEO local',
  'Galeria de fotos ou portfólio', 'Seção de depoimentos e avaliações',
  'Integração com WhatsApp Business', 'Velocidade otimizada (Core Web Vitals)',
];

const process = [
  { title: 'Levantamento de Informações', desc: 'Coletamos tudo: história da empresa, serviços, público-alvo, identidade visual e o que precisa estar no site.' },
  { title: 'Proposta de Estrutura', desc: 'Apresentamos a arquitetura de seções e o fluxo de navegação para aprovação antes de iniciar o desenvolvimento.' },
  { title: 'Desenvolvimento Full Stack', desc: 'Front-end em Next.js com TypeScript + back-end para formulário e integrações, banco de dados e APIs configuradas.' },
  { title: 'Revisão de Conteúdo', desc: 'Você revisa textos, imagens e posicionamento. Fazemos rodadas de ajuste até o site estar exatamente como você imaginou.' },
  { title: 'Entrega e Configuração', desc: 'Deploy em produção com domínio, DNS e certificado SSL configurados. Treinamento para uso do painel de atualização.' },
];

/* ============================================================
   ANIMAÇÃO DO PROTÓTIPO
   ============================================================ */
const initialElStatus = {
  nav: 'idle', headline: 'idle', sub: 'idle', cta: 'idle',
  visual: 'idle', map: 'idle', form: 'idle', trust: 'idle',
};

const buildSequence = [
  { id: 'nav',      x: 2,  y: 3,  label: 'Navbar.tsx',      step: 1 },
  { id: 'headline', x: 4,  y: 20, label: 'Headline.tsx',    step: 2 },
  { id: 'sub',      x: 4,  y: 40, label: 'Subtitle.tsx',    step: 2 },
  { id: 'cta',      x: 4,  y: 56, label: 'CtaButton.tsx',   step: 3 },
  { id: 'visual',   x: 62, y: 16, label: 'Gallery.tsx',     step: 4 },
  { id: 'map',      x: 4,  y: 72, label: 'MapBlock.tsx',    step: 5 },
  { id: 'form',     x: 34, y: 72, label: 'ContactForm.tsx', step: 5 },
  { id: 'trust',    x: 67, y: 72, label: 'TrustBadge.tsx',  step: 5 },
];

const buildStepsMeta = [
  { num: 1, title: 'Estrutura',              desc: 'Navbar e identidade visual da empresa.' },
  { num: 2, title: 'Mensagem institucional', desc: 'Headline e texto que comunicam a proposta da empresa.' },
  { num: 3, title: 'Chamada para ação',      desc: 'Botão que direciona para contato direto.' },
  { num: 4, title: 'Composição visual',      desc: 'Fotos e elementos que reforçam a credibilidade.' },
  { num: 5, title: 'Confiança e contato',    desc: 'Mapa, formulário e selos de segurança.' },
  { num: 6, title: 'Revisão final',          desc: 'Ajustes finos antes da entrega.' },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function SitesInstitucionais() {
  const [elStatus, setElStatus] = useState(initialElStatus);
  const [cursor, setCursor] = useState({ x: 2, y: 3, label: 'Navbar.tsx', visible: false });
  const [activeStep, setActiveStep] = useState(0);
  const [shine, setShine] = useState(false);
  const [badge, setBadge] = useState(false);
  const [trustCount, setTrustCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const rafIds = [];

    function animateTrust(target) {
      const start = performance.now();
      const duration = 850;
      function frame(now) {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setTrustCount(Math.round(target * eased));
        if (t < 1) rafIds.push(requestAnimationFrame(frame));
      }
      rafIds.push(requestAnimationFrame(frame));
    }

    async function run() {
      while (!cancelled) {
        setElStatus(initialElStatus);
        setTrustCount(0);
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
          if (cfg.id === 'trust') animateTrust(100);
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
              <HeroTitle>Sites <strong>Institucionais</strong></HeroTitle>
              <HeroSub>Presença digital sólida para empresas e profissionais que precisam de credibilidade, visibilidade e um canal de contato funcional com seus clientes.</HeroSub>
              <Tags>
                {['React', 'Next.js', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'SEO Local'].map((t, i) => <Tag key={i}>{t}</Tag>)}
              </Tags>
            </FadeIn>
          </Inner>
        </Hero>

        {/* PROTÓTIPO ANIMADO */}
        <Section>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Veja o site <strong>ganhar vida</strong></SectionTitle>
              <BuildLayout>
                <BuildFrame>
                  <BuildTopBar>
                    <BuildUrl>suaempresa.com.br</BuildUrl>
                    <BuildLiveTag><BuildLiveDot /> construindo ao vivo</BuildLiveTag>
                  </BuildTopBar>
                  <BuildCanvas>
                    <BuildCursor $x={cursor.x} $y={cursor.y} $visible={cursor.visible}>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M1 1 L1 13 L4.5 10.2 L7 15 L9 14 L6.5 9 L11 9 Z" fill="#111111" stroke="#faf7f0" strokeWidth={0.6} />
                      </svg>
                      <BuildCursorTag>{cursor.label}</BuildCursorTag>
                    </BuildCursor>

                    {/* NAVBAR */}
                    <BuildBlock $left={0} $top={0} $width={100} $height={11}>
                      <BuildSketch $active={elStatus.nav === 'sketching'} />
                      <BuildContent $active={elStatus.nav === 'filled'}>
                        <BuildNavRow>
                          <BuildNavMark><Building2 size={14} strokeWidth={2} /></BuildNavMark>
                          <BuildNavLinks>
                            <BuildNavLinkText>Início</BuildNavLinkText>
                            <BuildNavLinkText>Sobre</BuildNavLinkText>
                            <BuildNavLinkText>Contato</BuildNavLinkText>
                          </BuildNavLinks>
                        </BuildNavRow>
                      </BuildContent>
                    </BuildBlock>

                    {/* HEADLINE */}
                    <BuildBlock $left={4} $top={20} $width={56} $height={18}>
                      <BuildSketch $active={elStatus.headline === 'sketching'} />
                      <BuildContent $active={elStatus.headline === 'filled'}>
                        <BuildHeadlineWrap>
                          <BuildHeadlineText>Sua Empresa, <strong>Presença Sólida</strong></BuildHeadlineText>
                        </BuildHeadlineWrap>
                      </BuildContent>
                    </BuildBlock>

                    {/* SUBTÍTULO */}
                    <BuildBlock $left={4} $top={40} $width={50} $height={14}>
                      <BuildSketch $active={elStatus.sub === 'sketching'} />
                      <BuildContent $active={elStatus.sub === 'filled'}>
                        <BuildSubWrap>
                          <BuildSubText>Apresentamos sua empresa com credibilidade — história, serviços e contato direto em um só lugar.</BuildSubText>
                        </BuildSubWrap>
                      </BuildContent>
                    </BuildBlock>

                    {/* CTA */}
                    <BuildBlock $left={4} $top={56} $width={24} $height={9}>
                      <BuildSketch $active={elStatus.cta === 'sketching'} />
                      <BuildContent $active={elStatus.cta === 'filled'}>
                        <BuildCtaWrap>
                          <BuildCtaBox>Fale Conosco</BuildCtaBox>
                        </BuildCtaWrap>
                      </BuildContent>
                    </BuildBlock>

                    {/* GALERIA / ESTRUTURA */}
                    <BuildBlock $left={62} $top={16} $width={34} $height={50}>
                      <BuildSketch $active={elStatus.visual === 'sketching'} />
                      <BuildContent $active={elStatus.visual === 'filled'}>
                        <BuildVisualBox>
                          <BuildVisualImage><Building2 size={22} strokeWidth={1.5} /></BuildVisualImage>
                          <BuildVisualTitle>Nossa Estrutura</BuildVisualTitle>
                          <BuildVisualDesc>Instalações próprias, equipe especializada e atendimento personalizado.</BuildVisualDesc>
                          <BuildVisualDots>
                            <BuildVisualDot />
                            <BuildVisualDot $gold />
                            <BuildVisualDot />
                            <BuildVisualDot />
                            <BuildVisualDot $gold />
                          </BuildVisualDots>
                        </BuildVisualBox>
                      </BuildContent>
                    </BuildBlock>

                    {/* MAPA */}
                    <BuildBlock $left={4} $top={72} $width={27} $height={22}>
                      <BuildSketch $active={elStatus.map === 'sketching'} />
                      <BuildContent $active={elStatus.map === 'filled'}>
                        <BuildMapBox>
                          <BuildMapPin><MapPin size={16} strokeWidth={2} /></BuildMapPin>
                          <BuildMapLabel>Av. Paulista, 1374</BuildMapLabel>
                        </BuildMapBox>
                      </BuildContent>
                    </BuildBlock>

                    {/* FORMULÁRIO */}
                    <BuildBlock $left={34} $top={72} $width={30} $height={22}>
                      <BuildSketch $active={elStatus.form === 'sketching'} />
                      <BuildContent $active={elStatus.form === 'filled'}>
                        <BuildFormBox>
                          <BuildFormTitle>Fale com a gente</BuildFormTitle>
                          <BuildFormField>
                            <BuildFormLabel>Nome</BuildFormLabel>
                            <BuildFormInputBar />
                          </BuildFormField>
                          <BuildFormField>
                            <BuildFormLabel>E-mail</BuildFormLabel>
                            <BuildFormInputBar />
                          </BuildFormField>
                          <BuildFormButton>Enviar mensagem</BuildFormButton>
                        </BuildFormBox>
                      </BuildContent>
                    </BuildBlock>

                    {/* SELO DE CONFIANÇA */}
                    <BuildBlock $left={67} $top={72} $width={29} $height={22}>
                      <BuildSketch $active={elStatus.trust === 'sketching'} />
                      <BuildContent $active={elStatus.trust === 'filled'}>
                        <BuildTrustBox>
                          <BuildTrustNum>{trustCount}%</BuildTrustNum>
                          <BuildTrustRule />
                          <BuildTrustLabel>LGPD + SSL Seguro</BuildTrustLabel>
                        </BuildTrustBox>
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
              <SectionTitle>O que faz um site institucional <strong>realmente funcionar</strong></SectionTitle>
              <Grid $alt>
                {pillars.map((p, i) => (
                  <Card $alt key={i}><CardIcon>{p.icon}</CardIcon><CardTitle>{p.title}</CardTitle><CardDesc>{p.desc}</CardDesc></Card>
                ))}
              </Grid>
            </FadeIn>
          </Inner>
        </Section>

        <Section>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>O que está <strong>incluso</strong></SectionTitle>
              <FeatureList>
                {features.map((f, i) => <Feature key={i}><Check size={14} />{f}</Feature>)}
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
                    <div><ProcessTitle>{p.title}</ProcessTitle><ProcessDesc>{p.desc}</ProcessDesc></div>
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
              <CTASub>Estou em busca de novos desafios e pronta para contribuir com times que constroem produtos de qualidade.</CTASub>
              <BtnGold href="/#contato">Entrar em contato <ArrowRight size={14} /></BtnGold>
            </FadeIn>
          </Inner>
        </CTA>
      </Page>
      <Footer />
    </>
  );
}