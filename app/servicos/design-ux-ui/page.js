'use client';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import styled, { keyframes, css } from 'styled-components';
import FadeIn from '../../components/ui/FadeIn';
import Link from 'next/link';
import { Check, ArrowLeft, ArrowRight, Palette, Layers, Eye, MousePointer, Grid as GridIcon, Zap } from 'lucide-react';

/* ============================================================
   BASE
   ============================================================ */
const Page = styled.main`background: #080a0d; min-height: 100vh;`;

const Hero = styled.section`
  padding: 160px 48px 100px; background: #090c10;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 1024px) { padding: 140px 40px 80px; }
  @media (max-width: 768px)  { padding: 120px 24px 64px; }
  @media (max-width: 480px)  { padding: 100px 16px 48px; }
`;

const Inner = styled.div`max-width: 1200px; margin: 0 auto;`;

const BackLink = styled(Link)`
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.62rem; letter-spacing: 3px; text-transform: uppercase;
  color: #444; font-weight: 300; margin-bottom: 48px; transition: color 0.3s;
  &:hover { color: #c9a84c; }
`;

const GoldRule = styled.div`width: 32px; height: 1px; background: #c9a84c; margin-bottom: 20px;`;

const Label = styled.p`
  font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase;
  color: #c9a84c; font-weight: 300; margin-bottom: 16px;
`;

const HeroTitle = styled.h1`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(2.4rem, 5.5vw, 4.5rem);
  font-weight: 400; color: #fff; line-height: 1.15;
  letter-spacing: -0.5px; max-width: 820px; margin-bottom: 28px;
  strong { font-weight: 700; color: #c9a84c; }
`;

const HeroSub = styled.p`
  font-size: clamp(0.9rem, 1.4vw, 1.05rem); color: #666;
  line-height: 1.95; font-weight: 300; max-width: 620px; margin-bottom: 48px;
`;

const HeroTags = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;

const HeroTag = styled.span`
  font-size: 0.6rem; letter-spacing: 2px; text-transform: uppercase;
  color: #c9a84c; border: 1px solid rgba(201,168,76,0.2);
  padding: 5px 14px; font-weight: 300;
`;

/* ============================================================
   SEÇÃO GENÉRICA
   ============================================================ */
const Section = styled.section`
  padding: 100px 48px;
  background: ${({ $alt }) => $alt ? '#0d1117' : '#090c10'};
  border-top: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 768px) { padding: 72px 24px; }
  @media (max-width: 480px) { padding: 56px 16px; }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 300; color: #fff;
  letter-spacing: -0.5px; margin-bottom: 48px;
  strong { font-weight: 600; }
`;

/* ============================================================
   KEYFRAMES PARA ANIMAÇÕES DE BUILD
   ============================================================ */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-16px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.94); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const typeIn = keyframes`
  from { width: 0; }
  to   { width: 100%; }
`;

const checkPop = keyframes`
  0%   { transform: scale(0); opacity: 0; }
  70%  { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

/* ============================================================
   LAYOUT DO PROTÓTIPO AO VIVO
   ============================================================ */
const BuildLayout = styled.div`
  display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px; align-items: start;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 24px; }
`;

const BuildFrame = styled.div`
  background: #080a0d; border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 20px 60px rgba(0,0,0,0.6); overflow: hidden;
`;

const BuildTopBar = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 16px; background: #040506;
  border-bottom: 1px solid rgba(255,255,255,0.04);
`;

const BuildUrl = styled.span`
  font-size: 0.6rem; letter-spacing: 2px; text-transform: uppercase;
  color: #2a2a2a; font-weight: 300;
`;

const BuildLiveTag = styled.span`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 0.58rem; letter-spacing: 2px; text-transform: uppercase;
  color: #c9a84c; font-weight: 300;
`;

const BuildLiveDot = styled.span`
  width: 6px; height: 6px; border-radius: 50%; background: #c9a84c;
  animation: buildPulse 1.6s ease-in-out infinite;
  @keyframes buildPulse { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
`;

const BuildCanvas = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  container-type: inline-size;
  container-name: termosCanvas;
`;

/* ============================================================
   FUNDO DIVIDIDO — ANIMADO
   ============================================================ */
const TermosBg = styled.div`
  position: absolute; inset: 0;
  display: grid; grid-template-columns: 1fr 1fr;
`;

const TermosBgLeft = styled.div`
  position: relative;
  overflow: hidden;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.6s ease;
  background: #c4a882;
  img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center top;
    display: block;
  }
`;

const TermosBgRight = styled.div`
  background: #1c1c1c;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 0 3cqw;
  gap: 0;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.6s ease 0.2s;
`;

/* Logo hexágono */
const TermosRightLogo = styled.div`
  width: 5.5cqw; height: 5.5cqw;
  border: 1.5px solid rgba(201,168,76,0.7);
  clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
  background: rgba(201,168,76,0.08);
  display: flex; align-items: center; justify-content: center;
  color: #c9a84c;
  font-size: 1.4cqw;
  font-family: sans-serif;
  font-weight: 600;
  letter-spacing: 0.05cqw;
  margin-bottom: 1.8cqw;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.5s ease 0.4s;
`;

const TermosRightTitle = styled.span`
  font-size: 2.4cqw; color: #fff; font-weight: 500; letter-spacing: 0.05cqw;
  margin-bottom: 0.3cqw;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.5s ease 0.5s;
`;

const TermosRightSub = styled.span`
  font-size: 1cqw; color: rgba(255,255,255,0.4); font-weight: 300; letter-spacing: 0.15cqw;
  margin-bottom: 2.2cqw;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.5s ease 0.6s;
`;

/* Input com label acima, fundo escuro arredondado — igual ao print */
const TermosInputWrap = styled.div`
  width: 86%;
  margin-bottom: 1cqw;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.4s ease ${({ $delay }) => $delay || '0.7s'};
`;

const TermosInputLabel = styled.div`
  font-size: 0.85cqw; color: rgba(255,255,255,0.85); font-weight: 400;
  margin-bottom: 0.45cqw; letter-spacing: 0.02cqw;
`;

const TermosInputField = styled.div`
  width: 100%; height: 3cqw;
  background: #2a2a2a;
  border: none;
  border-radius: 999px;
  display: flex; align-items: center;
  padding: 0 1.4cqw;
`;

const TermosInputPlaceholder = styled.span`
  font-size: 0.9cqw; color: rgba(255,255,255,0.2); font-weight: 300;
`;

const TermosLoginBtn = styled.div`
  width: 86%; height: 3.2cqw;
  background: #c4a882;
  border-radius: 999px;
  margin-top: 0.8cqw;
  display: flex; align-items: center; justify-content: center;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.4s ease 0.9s;
`;

const TermosLoginBtnText = styled.span`
  font-size: 1.1cqw; color: #1c1c1c; font-weight: 600; letter-spacing: 0.05cqw;
`;

/* ============================================================
   MODAL — ANIMADO
   ============================================================ */
const TermosModal = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  width: 52%;
  background: #fff;
  border-radius: 0.6cqw;
  overflow: hidden;
  box-shadow: 0 2cqw 6cqw rgba(0,0,0,0.5);
  z-index: 10;

  opacity: ${({ $visible }) => $visible ? 1 : 0};
  visibility: ${({ $visible }) => $visible ? 'visible' : 'hidden'};
  transform: ${({ $visible }) => $visible
    ? 'translate(-50%, -50%) scale(1)'
    : 'translate(-50%, -48%) scale(0.94)'};
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.25, 0, 0.35, 1), visibility 0s linear ${({ $visible }) => $visible ? '0s' : '0.5s'};
  pointer-events: ${({ $visible }) => $visible ? 'all' : 'none'};
`;

const TermosModalHeader = styled.div`
  background: #b5977a;
  padding: 2cqw 2.5cqw 1.5cqw;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.4s ease 0.1s;
`;

const TermosModalTitle = styled.div`
  font-size: 1.8cqw; color: #fff; font-weight: 600; margin-bottom: 0.3cqw;
`;

const TermosModalSubtitle = styled.div`
  font-size: 0.9cqw; color: rgba(255,255,255,0.75); font-weight: 300;
`;

const TermosTabBar = styled.div`
  display: flex; background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.4s ease 0.2s;
`;

const TermosTab = styled.div`
  flex: 1; padding: 1cqw 0; text-align: center;
  font-size: 0.9cqw; font-weight: ${({ $active }) => $active ? '500' : '300'};
  color: ${({ $active }) => $active ? '#1a1a1a' : '#999'};
  border-bottom: ${({ $active }) => $active ? '2px solid #b5977a' : '2px solid transparent'};
  cursor: pointer;
`;

const TermosModalBody = styled.div`
  padding: 1.5cqw 2.5cqw;
  background: #fff;
`;

/* Texto que aparece progressivamente */
const TermosText = styled.div`
  font-size: 0.85cqw; color: #4a7ccc; line-height: 1.7; margin-bottom: 0.8cqw;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transform: ${({ $visible }) => $visible ? 'translateY(0)' : 'translateY(6px)'};
  transition: opacity 0.35s ease ${({ $delay }) => $delay || '0s'},
              transform 0.35s ease ${({ $delay }) => $delay || '0s'};
`;

const TermosBullet = styled.div`
  font-size: 0.8cqw; color: #4a7ccc; line-height: 1.6; margin-bottom: 0.2cqw;
  padding-left: 0.5cqw;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transform: ${({ $visible }) => $visible ? 'translateX(0)' : 'translateX(-8px)'};
  transition: opacity 0.3s ease ${({ $delay }) => $delay || '0s'},
              transform 0.3s ease ${({ $delay }) => $delay || '0s'};
`;

const TermosWarning = styled.div`
  font-size: 0.8cqw; color: #4a7ccc; line-height: 1.6; margin-top: 0.6cqw;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.4s ease ${({ $delay }) => $delay || '0s'};
`;

const TermosCheckRow = styled.div`
  display: flex; align-items: center; gap: 0.6cqw; margin: 1.2cqw 0 0.8cqw;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.4s ease ${({ $delay }) => $delay || '0s'};
`;

const TermosCheckBox = styled.div`
  width: 1.2cqw; height: 1.2cqw; border: 1px solid #bbb; border-radius: 0.2cqw; flex-shrink: 0;
`;

const TermosCheckLabel = styled.span`
  font-size: 0.78cqw; color: #4a7ccc;
`;

const TermosAcceptBtn = styled.div`
  width: 100%; padding: 0.9cqw 0; text-align: center;
  background: #e0e0e0; border-radius: 0.4cqw;
  font-size: 0.9cqw; color: #aaa; font-weight: 400;
  margin-bottom: 0.5cqw;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.4s ease ${({ $delay }) => $delay || '0s'};
`;

const TermosPagination = styled.div`
  position: absolute; bottom: 1.5cqw; left: 50%; transform: translateX(-50%);
  background: #2a2a2a; color: #fff; font-size: 0.75cqw;
  padding: 0.3cqw 0.8cqw; border-radius: 0.3cqw; z-index: 20;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.4s ease ${({ $delay }) => $delay || '0s'};
`;

/* ============================================================
   INDICADOR DE PROGRESSO DO BUILD
   ============================================================ */
const BuildProgressBar = styled.div`
  height: 2px; background: rgba(255,255,255,0.05);
  position: relative; overflow: hidden;
`;

const BuildProgressFill = styled.div`
  height: 100%; background: #c9a84c;
  width: ${({ $pct }) => $pct}%;
  transition: width 0.4s ease;
`;

const BuildStatusBar = styled.div`
  display: flex; align-items: center; gap: 8px;
  padding: 6px 16px; background: #040506;
  border-top: 1px solid rgba(255,255,255,0.03);
`;

const BuildStatusDot = styled.span`
  width: 5px; height: 5px; border-radius: 50%;
  background: ${({ $done }) => $done ? '#c9a84c' : '#2a2a2a'};
  transition: background 0.3s ease;
`;

const BuildStatusText = styled.span`
  font-size: 0.55rem; letter-spacing: 2px; text-transform: uppercase;
  color: #333; font-weight: 300;
`;

const BuildStatusStep = styled.span`
  font-size: 0.55rem; letter-spacing: 1px; text-transform: uppercase;
  color: ${({ $active }) => $active ? '#c9a84c' : '#222'};
  font-weight: ${({ $active }) => $active ? '400' : '300'};
  margin-left: auto;
  transition: color 0.3s ease;
`;

/* ============================================================
   STEPS LATERAIS
   ============================================================ */
const BuildSteps = styled.div`
  display: flex; flex-direction: column; gap: 1px;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.04);
  @media (max-width: 1024px) { display: grid; grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 640px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 380px) { grid-template-columns: 1fr; }
`;

const BuildStep = styled.div`
  display: grid; grid-template-columns: 44px 1fr; gap: 14px;
  padding: 18px 20px;
  background: ${({ $active }) => $active ? '#131820' : '#0d1117'};
  border-left: ${({ $active }) => $active ? '2px solid #c9a84c' : '2px solid transparent'};
  transition: background 0.4s ease, border-color 0.4s ease;
  @media (max-width: 1024px) { padding: 14px 16px; gap: 10px; }
  @media (max-width: 640px)  { grid-template-columns: 30px 1fr; gap: 8px; padding: 12px 14px; }
`;

const BuildStepNum = styled.span`
  font-family: var(--font-cormorant), serif; font-size: 1.4rem; font-weight: 300; line-height: 1;
  color: ${({ $active }) => $active ? '#c9a84c' : '#2a2a2a'};
  transition: color 0.4s ease;
  @media (max-width: 640px) { font-size: 1rem; }
`;

const BuildStepTitle = styled.h4`
  font-size: 0.76rem; font-weight: 400; letter-spacing: .3px; margin-bottom: 4px;
  color: ${({ $active }) => $active ? '#ddd' : '#444'};
  transition: color 0.4s ease;
  @media (max-width: 640px) { font-size: 0.64rem; margin-bottom: 2px; }
`;

const BuildStepDesc = styled.p`
  font-size: 0.66rem; color: #555; line-height: 1.6; font-weight: 300; margin: 0;
  @media (max-width: 640px) { font-size: 0.58rem; }
  @media (max-width: 420px) { display: none; }
`;

const buildStepsMeta = [
  { num: 1, title: 'Wireframe',        desc: 'Estrutura e fluxo antes do visual.' },
  { num: 2, title: 'Layout dividido',  desc: 'Fundo bege + escuro com logo da clínica.' },
  { num: 3, title: 'Modal de termos',  desc: 'Header colorido, abas e conteúdo.' },
  { num: 4, title: 'Tipografia',       desc: 'Hierarquia, pesos e espaçamento.' },
  { num: 5, title: 'Interações',       desc: 'Checkbox, botão e paginação.' },
  { num: 6, title: 'Handoff',          desc: 'Specs exportadas para dev.' },
];

/* ============================================================
   PILARES
   ============================================================ */
const PillarsGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 900px) { grid-template-columns: repeat(2,1fr); }
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`;

const PillarCard = styled.div`
  background: #090c10; padding: 40px 36px; transition: background 0.4s;
  &:hover { background: #0f1318; }
  @media (max-width: 768px) { padding: 32px 28px; }
  @media (max-width: 480px) { padding: 24px 20px; }
`;

const PillarIcon = styled.div`color: #c9a84c; margin-bottom: 20px;`;
const PillarTitle = styled.h3`font-size: clamp(0.88rem, 1.4vw, 1rem); font-weight: 400; color: #ddd; letter-spacing: 0.3px; margin-bottom: 12px;`;
const PillarDesc = styled.p`font-size: clamp(0.78rem, 1.1vw, 0.84rem); color: #555; line-height: 1.85; font-weight: 300;`;

/* ============================================================
   FEATURES
   ============================================================ */
const FeatureList = styled.div`
  display: flex; flex-direction: column; gap: 1px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.04);
`;

const FeatureItem = styled.div`
  display: flex; align-items: center; gap: 14px; padding: 20px 28px; background: #090c10;
  font-size: clamp(0.82rem, 1.2vw, 0.88rem); color: #888; font-weight: 300; line-height: 1.6;
  transition: background 0.3s; &:hover { background: #0d1117; }
  svg { color: #c9a84c; flex-shrink: 0; }
  @media (max-width: 480px) { padding: 16px 20px; }
`;

/* ============================================================
   PROCESSO
   ============================================================ */
const ProcessList = styled.div`
  display: flex; flex-direction: column; gap: 1px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.04);
`;

const ProcessItem = styled.div`
  display: grid; grid-template-columns: 80px 1fr;
  gap: 32px; padding: 36px 36px; background: #0d1117; align-items: start;
  transition: background 0.3s; &:hover { background: #0f1318; }
  @media (max-width: 700px) { grid-template-columns: 56px 1fr; gap: 20px; padding: 28px 24px; }
  @media (max-width: 480px) { padding: 24px 20px; }
`;

const ProcessNum = styled.span`
  font-family: var(--font-cormorant), serif; font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 300; color: #c9a84c; line-height: 1;
`;

const ProcessTitle = styled.h4`font-size: clamp(0.9rem, 1.4vw, 1rem); font-weight: 400; color: #ddd; letter-spacing: 0.3px; margin-bottom: 8px;`;
const ProcessDesc = styled.p`font-size: clamp(0.8rem, 1.2vw, 0.85rem); color: #555; line-height: 1.85; font-weight: 300;`;

/* ============================================================
   CTA
   ============================================================ */
const CTA = styled.section`
  padding: 120px 48px; background: #090c10;
  border-top: 1px solid rgba(255,255,255,0.04); text-align: center;
  @media (max-width: 768px) { padding: 80px 24px; }
  @media (max-width: 480px) { padding: 64px 16px; }
`;

const CTAInner = styled.div`
  max-width: 640px; margin: 0 auto; display: flex; flex-direction: column; align-items: center;
`;

const CTATitle = styled.h2`
  font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 300; color: #fff;
  letter-spacing: -0.5px; margin-bottom: 20px; strong { font-weight: 600; }
`;

const CTASub = styled.p`
  font-size: clamp(0.85rem, 1.3vw, 0.95rem); color: #555;
  line-height: 1.9; font-weight: 300; margin-bottom: 40px;
`;

const BtnGold = styled(Link)`
  display: inline-flex; align-items: center; gap: 12px;
  padding: 16px 40px; border: 1px solid #c9a84c; color: #c9a84c;
  font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase;
  font-weight: 400; font-family: inherit; transition: all 0.4s;
  &:hover { background: #c9a84c; color: #0d1117; }
`;

/* ============================================================
   DADOS
   ============================================================ */
const pillars = [
  { icon: <Eye size={22} strokeWidth={1.5} />,         title: 'Hierarquia Visual',  desc: 'Cada elemento tem um peso intencional — o olhar do usuário é guiado sem esforço pelo conteúdo mais importante.' },
  { icon: <MousePointer size={22} strokeWidth={1.5} />, title: 'Usabilidade',        desc: 'Fluxos pensados para minimizar cliques e eliminar atritos, garantindo que o usuário chegue onde precisa sem fricção.' },
  { icon: <GridIcon size={22} strokeWidth={1.5} />,     title: 'Design System',      desc: 'Biblioteca de componentes consistente que acelera o handoff e garante coerência visual em todas as telas.' },
  { icon: <Layers size={22} strokeWidth={1.5} />,       title: 'Alta Fidelidade',    desc: 'Protótipos navegáveis que simulam a experiência real — testáveis antes de escrever uma única linha de código.' },
  { icon: <Zap size={22} strokeWidth={1.5} />,          title: 'Handoff Organizado', desc: 'Arquivos estruturados com especificações de espaçamento, cores e tipografia prontos para os desenvolvedores.' },
  { icon: <Palette size={22} strokeWidth={1.5} />,      title: 'UX Research',        desc: 'Fluxos de usuário mapeados antes de qualquer pixel — wireframes validam a lógica antes do design de alta fidelidade.' },
];

const features = [
  'Wireframes e mapeamento de fluxos de usuário',
  'Protótipos navegáveis de alta fidelidade em Figma ou Penpot',
  'Design system com tokens de cor, tipografia e espaçamento',
  'Biblioteca de componentes reutilizáveis',
  'Handoff documentado para desenvolvimento',
  'Revisão de usabilidade e consistência visual',
  'Versões mobile e desktop de cada tela',
  'Iterações baseadas em feedback',
];

const processos = [
  { title: 'Discovery',       desc: 'Entendimento do produto, objetivos de negócio e necessidades dos usuários. Mapeamento de personas e fluxos de uso.' },
  { title: 'Wireframes',      desc: 'Esqueleto das telas em baixa fidelidade — estrutura e lógica de navegação sem interferência visual.' },
  { title: 'Design de Telas', desc: 'Alta fidelidade com cores, tipografia, ícones e componentes do design system aplicados.' },
  { title: 'Protótipo',       desc: 'Ligação das telas criando um protótipo navegável que simula a experiência real.' },
  { title: 'Handoff',         desc: 'Entrega do arquivo organizado com especificações completas e assets exportados para desenvolvimento.' },
];

/* ============================================================
   BUILD SEQUENCE — define quando cada elemento aparece
   Cada step tem um timestamp (em ms) de quando "liga"
   ============================================================ */
const BUILD_STEPS = [
  // step 1: Wireframe (fundo aparece)
  { at: 400,  key: 'bg' },
  // step 2: Layout dividido (logo + form right side)
  { at: 1200, key: 'rightPanel' },
  { at: 1600, key: 'logo' },
  { at: 2000, key: 'inputs' },
  // step 3: Modal surge
  { at: 2600, key: 'modal' },
  { at: 2900, key: 'modalHeader' },
  { at: 3100, key: 'tabs' },
  // step 4: Tipografia (textos do modal)
  { at: 3500, key: 'text1' },
  { at: 3800, key: 'text2' },
  { at: 4100, key: 'bullet1' },
  { at: 4300, key: 'bullet2' },
  { at: 4500, key: 'bullet3' },
  { at: 4700, key: 'bullet4' },
  { at: 4900, key: 'bullet5' },
  { at: 5200, key: 'warning' },
  // step 5: Interações
  { at: 5700, key: 'checkbox' },
  { at: 6000, key: 'button' },
  { at: 6300, key: 'pagination' },
];

const STEP_TO_SIDEBAR = {
  bg: 1, rightPanel: 2, logo: 2, inputs: 2,
  modal: 3, modalHeader: 3, tabs: 3,
  text1: 4, text2: 4, bullet1: 4, bullet2: 4, bullet3: 4, bullet4: 4, bullet5: 4, warning: 4,
  checkbox: 5, button: 5, pagination: 5,
};

const TOTAL_DURATION = 6800;

/* ============================================================
   COMPONENTE
   ============================================================ */
export default function DesignUxUiPage() {
  const [visible, setVisible] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [building, setBuilding] = useState(false);
  const [done, setDone] = useState(false);
  const sectionRef = useRef(null);
  const timers = useRef([]);
  const loopRef = useRef(null);
  const isInView = useRef(false);

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (loopRef.current) { clearTimeout(loopRef.current); loopRef.current = null; }
  };

  const runBuild = () => {
    // Reset visual
    setVisible({});
    setActiveStep(1);
    setProgress(0);
    setDone(false);
    setBuilding(true);

    // Agenda cada elemento
    BUILD_STEPS.forEach(({ at, key }) => {
      const t = setTimeout(() => {
        setVisible(prev => ({ ...prev, [key]: true }));
        setActiveStep(STEP_TO_SIDEBAR[key] || 0);
        setProgress(Math.round((at / TOTAL_DURATION) * 100));
      }, at);
      timers.current.push(t);
    });

    // Finaliza e agenda próximo loop
    const tDone = setTimeout(() => {
      setProgress(100);
      setDone(true);
      setBuilding(false);
      setActiveStep(6);

      // Pausa de 2s mostrando completo, depois reinicia
      if (isInView.current) {
        loopRef.current = setTimeout(() => {
          if (isInView.current) runBuild();
        }, 2000);
      }
    }, TOTAL_DURATION);
    timers.current.push(tDone);
  };

  // Observer para iniciar/parar com viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          runBuild();
        } else {
          clearAll();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearAll();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Page>

        {/* HERO */}
        <Hero>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <BackLink href="/#projetos">
                <ArrowLeft size={12} /> Voltar aos projetos
              </BackLink>
              <GoldRule />
              <Label>Design de Interfaces</Label>
              <HeroTitle>
                Da ideia ao protótipo navegável, <strong>antes de escrever uma linha de código</strong>
              </HeroTitle>
              <HeroSub>
                Design de interfaces de alta fidelidade com foco em usabilidade e hierarquia visual — desde wireframes e fluxos de usuário até protótipos navegáveis e design systems prontos para desenvolvimento.
              </HeroSub>
              <HeroTags>
                {['Figma', 'Penpot', 'UI Design', 'UX Research', 'Prototipação', 'Design System'].map((t, i) => (
                  <HeroTag key={i}>{t}</HeroTag>
                ))}
              </HeroTags>
            </FadeIn>
          </Inner>
        </Hero>

        {/* PROTÓTIPO AO VIVO */}
        <Section $alt ref={sectionRef}>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Veja o protótipo <strong>sendo construído</strong></SectionTitle>
              <BuildLayout>
                <BuildFrame>
                  <BuildTopBar>
                    <BuildUrl>protótipo navegável</BuildUrl>
                    <BuildLiveTag>
                      <BuildLiveDot />
                      {done ? 'construção concluída' : building ? 'construindo ao vivo' : 'aguardando...'}
                    </BuildLiveTag>
                  </BuildTopBar>

                  <BuildProgressBar>
                    <BuildProgressFill $pct={progress} />
                  </BuildProgressBar>

                  <BuildCanvas>

                    {/* FUNDO DIVIDIDO */}
                    <TermosBg>
                      <TermosBgLeft $visible={!!visible.bg}>
                        <img src="/fundoui.jpg" alt="" />
                      </TermosBgLeft>
                      <TermosBgRight $visible={!!visible.bg}>
                        <TermosRightLogo $visible={!!visible.logo}>CJL</TermosRightLogo>
                        <TermosRightTitle $visible={!!visible.logo}>Clínica Estética</TermosRightTitle>
                        <TermosRightSub $visible={!!visible.logo}>Sistema de Gestão</TermosRightSub>
                        <TermosInputWrap $visible={!!visible.inputs} $delay="0s">
                          <TermosInputLabel>E-mail</TermosInputLabel>
                          <TermosInputField>
                            <TermosInputPlaceholder>Digite seu e-mail</TermosInputPlaceholder>
                          </TermosInputField>
                        </TermosInputWrap>
                        <TermosInputWrap $visible={!!visible.inputs} $delay="0.2s">
                          <TermosInputLabel>Senha</TermosInputLabel>
                          <TermosInputField>
                            <TermosInputPlaceholder>Digite sua senha</TermosInputPlaceholder>
                          </TermosInputField>
                        </TermosInputWrap>
                        <TermosLoginBtn $visible={!!visible.inputs}>
                          <TermosLoginBtnText>Entrar</TermosLoginBtnText>
                        </TermosLoginBtn>
                      </TermosBgRight>
                    </TermosBg>

                    {/* MODAL DE TERMOS */}
                    <TermosModal $visible={!!visible.modal}>
                      <TermosModalHeader $visible={!!visible.modalHeader}>
                        <TermosModalTitle>Termos de Uso e Privacidade</TermosModalTitle>
                        <TermosModalSubtitle>Leia e aceite para continuar usando o sistema</TermosModalSubtitle>
                      </TermosModalHeader>

                      <TermosTabBar $visible={!!visible.tabs}>
                        <TermosTab $active>Termos de Uso</TermosTab>
                        <TermosTab>Política de Privacidade</TermosTab>
                      </TermosTabBar>

                      <TermosModalBody>
                        <TermosText $visible={!!visible.text1} $delay="0s">
                          Bem-vindo ao sistema de gestão da Clínica Estética.
                        </TermosText>
                        <TermosText $visible={!!visible.text2} $delay="0s">
                          Ao utilizar esta plataforma, você concorda em:
                        </TermosText>
                        <TermosBullet $visible={!!visible.bullet1} $delay="0s">• Manter a confidencialidade das informações dos pacientes.</TermosBullet>
                        <TermosBullet $visible={!!visible.bullet2} $delay="0s">• Utilizar o sistema apenas para finalidades profissionais autorizadas.</TermosBullet>
                        <TermosBullet $visible={!!visible.bullet3} $delay="0s">• Não compartilhar suas credenciais de acesso com terceiros.</TermosBullet>
                        <TermosBullet $visible={!!visible.bullet4} $delay="0s">• Reportar qualquer acesso não autorizado ou suspeita de violação de segurança.</TermosBullet>
                        <TermosBullet $visible={!!visible.bullet5} $delay="0s">• Cumprir as normas internas da clínica e a legislação vigente (LGPD).</TermosBullet>
                        <TermosWarning $visible={!!visible.warning} $delay="0s">
                          O uso indevido do sistema poderá resultar em medidas disciplinares e/ou legais.
                        </TermosWarning>

                        <TermosCheckRow $visible={!!visible.checkbox} $delay="0s">
                          <TermosCheckBox />
                          <TermosCheckLabel>Li e aceito os Termos de Uso e a Política de Privacidade</TermosCheckLabel>
                        </TermosCheckRow>
                        <TermosAcceptBtn $visible={!!visible.button} $delay="0s">
                          Aceitar e continuar
                        </TermosAcceptBtn>
                      </TermosModalBody>
                    </TermosModal>

                    {/* PAGINAÇÃO */}
                    <TermosPagination $visible={!!visible.pagination} $delay="0s">2 / 4</TermosPagination>

                  </BuildCanvas>

                  {/* STATUS BAR */}
                  <BuildStatusBar>
                    {[1,2,3,4,5,6].map(n => (
                      <BuildStatusDot key={n} $done={activeStep >= n} />
                    ))}
                    <BuildStatusText>etapa</BuildStatusText>
                    <BuildStatusStep $active>
                      {done ? 'handoff completo' : buildStepsMeta[(activeStep - 1)]?.title || '—'}
                    </BuildStatusStep>
                  </BuildStatusBar>
                </BuildFrame>

                {/* STEPS LATERAIS */}
                <BuildSteps>
                  {buildStepsMeta.map((s) => (
                    <BuildStep key={s.num} $active={activeStep === s.num || (done && s.num === 6)}>
                      <BuildStepNum $active={activeStep === s.num || (done && s.num === 6)}>
                        {String(s.num).padStart(2, '0')}
                      </BuildStepNum>
                      <div>
                        <BuildStepTitle $active={activeStep === s.num || (done && s.num === 6)}>
                          {s.title}
                        </BuildStepTitle>
                        <BuildStepDesc>{s.desc}</BuildStepDesc>
                      </div>
                    </BuildStep>
                  ))}
                </BuildSteps>
              </BuildLayout>
            </FadeIn>
          </Inner>
        </Section>

        {/* PILARES */}
        <Section>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>O que define um design <strong>de verdade</strong></SectionTitle>
              <PillarsGrid>
                {pillars.map((p, i) => (
                  <PillarCard key={i}>
                    <PillarIcon>{p.icon}</PillarIcon>
                    <PillarTitle>{p.title}</PillarTitle>
                    <PillarDesc>{p.desc}</PillarDesc>
                  </PillarCard>
                ))}
              </PillarsGrid>
            </FadeIn>
          </Inner>
        </Section>

        {/* O QUE ESTÁ INCLUSO */}
        <Section $alt>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>O que está <strong>incluso</strong></SectionTitle>
              <FeatureList>
                {features.map((f, i) => (
                  <FeatureItem key={i}><Check size={14} />{f}</FeatureItem>
                ))}
              </FeatureList>
            </FadeIn>
          </Inner>
        </Section>

        {/* PROCESSO */}
        <Section>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Como <strong>funciona</strong> o processo</SectionTitle>
              <ProcessList>
                {processos.map((p, i) => (
                  <ProcessItem key={i}>
                    <ProcessNum>{String(i + 1).padStart(2, '0')}</ProcessNum>
                    <div>
                      <ProcessTitle>{p.title}</ProcessTitle>
                      <ProcessDesc>{p.desc}</ProcessDesc>
                    </div>
                  </ProcessItem>
                ))}
              </ProcessList>
            </FadeIn>
          </Inner>
        </Section>

        {/* CTA */}
        <CTA>
          <CTAInner>
            <FadeIn direction="up" duration={800}>
              <GoldRule style={{ margin: '0 auto 20px' }} />
              <Label>Vamos conversar?</Label>
              <CTATitle>Interessado em trabalhar <strong>juntos?</strong></CTATitle>
              <CTASub>
                Estou disponível para projetos de design UI/UX, desde wireframes até protótipos navegáveis prontos para desenvolvimento.
              </CTASub>
              <BtnGold href="/#contato">
                Entrar em contato <ArrowRight size={14} />
              </BtnGold>
            </FadeIn>
          </CTAInner>
        </CTA>

      </Page>
      <Footer />
    </>
  );
}