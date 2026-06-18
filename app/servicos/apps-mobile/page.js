'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import styled, { keyframes } from 'styled-components';
import FadeIn from '../../components/ui/FadeIn';
import Link from 'next/link';
import {
  Check, ArrowLeft, ArrowRight,
  Smartphone, Wifi, Key, Zap, Bell, Store,
  Home, Search, Heart, User, ChevronRight,
  MapPin, Star,
} from 'lucide-react';

/* ============================================================
   BASE
   ============================================================ */
const Page = styled.main`background: #080a0d; min-height: 100vh;`;

const Hero = styled.section`
  padding: 160px 48px 100px;
  background: #090c10;
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

const Tags = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;

const Tag = styled.span`
  font-size: 0.6rem; letter-spacing: 2px; text-transform: uppercase;
  color: #c9a84c; border: 1px solid rgba(201,168,76,0.2);
  padding: 5px 14px; font-weight: 300;
`;

/* ============================================================
   PROTÓTIPO — APP MOBILE
   A ideia: dois telefones side-by-side sendo montados.
   Esquerdo = tela de login (OAuth).  Direito = feed principal do app.
   O cursor vai alternando entre os dois dispositivos.
   ============================================================ */

const BuildLayout = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 32px;
  align-items: start;
  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

/* frame externo escuro */
const BuildFrame = styled.div`
  background: #06080a;
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  overflow: hidden;
`;

const BuildTopBar = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 18px;
  background: #040506;
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
  animation: mobPulse 1.6s ease-in-out infinite;
  @keyframes mobPulse { 0%,100%{opacity:1} 50%{opacity:.3} }
`;

/* área do canvas com dois phones */
const BuildCanvas = styled.div`
  position: relative;
  aspect-ratio: 16 / 10.5;
  background: #050608;
  background-image: radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 22px 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5%;
  padding: 4% 5%;
  @media (max-width: 600px) { aspect-ratio: 16/14; }
`;

/* ---- moldura do phone ---- */
const PhoneShell = styled.div`
  position: relative;
  width: 38%;
  aspect-ratio: 9 / 18;
  background: #0a0c10;
  border: 1.5px solid rgba(255,255,255,0.1);
  border-radius: 18px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.04);
`;

/* notch */
const PhoneNotch = styled.div`
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 38%; height: 5%;
  background: #0a0c10;
  border-radius: 0 0 8px 8px;
  z-index: 10;
`;

/* tela dentro do phone */
const PhoneScreen = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ $bg }) => $bg || '#111'};
  overflow: hidden;
`;

/* ---- elementos da tela de Login ---- */
const LoginBg = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(160deg, #0f1114 0%, #080a0d 60%, #0d0a06 100%);
`;

const LoginMark = styled.div`
  position: absolute;
  top: 15%; left: 50%; transform: translateX(-50%);
  width: 18%; aspect-ratio: 1;
  border: 1.5px solid #c9a84c;
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  color: #c9a84c;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transform: translateX(-50%) scale(${({ $v }) => $v ? 1 : 0.5});
  transition: opacity .4s, transform .4s;
`;

const LoginTitle = styled.div`
  position: absolute;
  top: 32%; left: 10%; right: 10%;
  text-align: center;
  font-family: var(--font-cormorant), serif;
  font-size: clamp(0.5rem, 1.8vw, 0.85rem);
  font-weight: 400; color: #fff; line-height: 1.2;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transform: translateY(${({ $v }) => $v ? '0' : '6px'});
  transition: opacity .4s, transform .4s;
  strong { color: #c9a84c; font-weight: 700; }
`;

const LoginField = styled.div`
  position: absolute;
  left: 10%; right: 10%;
  top: ${({ $top }) => $top};
  height: 9%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  display: flex; align-items: center;
  padding: 0 8px;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transform: translateY(${({ $v }) => $v ? '0' : '4px'});
  transition: opacity .35s, transform .35s;
`;

const LoginFieldText = styled.span`
  font-size: clamp(0.38rem, 1vw, 0.52rem); color: #333; font-weight: 300; letter-spacing: .5px;
`;

const LoginDivider = styled.div`
  position: absolute;
  top: 66%; left: 10%; right: 10%;
  display: flex; align-items: center; gap: 6px;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transition: opacity .35s;
`;

const LoginDivLine = styled.div`flex: 1; height: 1px; background: rgba(255,255,255,0.06);`;

const LoginDivText = styled.span`
  font-size: clamp(0.3rem, 0.8vw, 0.44rem); color: #2a2a2a; font-weight: 300; letter-spacing: 1px;
`;

const LoginOAuthBtn = styled.div`
  position: absolute;
  left: 10%; right: 10%;
  top: ${({ $top }) => $top};
  height: 9%;
  border: 1px solid ${({ $google }) => $google ? 'rgba(66,133,244,0.35)' : 'rgba(255,255,255,0.08)'};
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center; gap: 5px;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transform: scale(${({ $v }) => $v ? 1 : 0.96});
  transition: opacity .35s, transform .35s;
`;

const LoginOAuthText = styled.span`
  font-size: clamp(0.34rem, 0.9vw, 0.48rem);
  color: ${({ $google }) => $google ? '#4285f4' : '#888'};
  font-weight: 300; letter-spacing: .5px;
`;

/* ---- elementos da tela principal do app ---- */
const AppBg = styled.div`
  position: absolute; inset: 0;
  background: #f5f2eb;
`;

const AppStatusBar = styled.div`
  position: absolute; top: 0; left: 0; right: 0;
  height: 7%;
  background: #f0ece1;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 8px;
`;

const AppStatusTime = styled.span`
  font-size: clamp(0.3rem, 0.9vw, 0.5rem); color: #1a1a1a; font-weight: 500;
`;

const AppStatusSignal = styled.div`
  display: flex; align-items: center; gap: 2px;
`;

const AppBar = styled.div`
  width: ${({ $w }) => $w}px; height: 6px;
  background: ${({ $on }) => $on ? '#1a1a1a' : 'rgba(0,0,0,0.15)'}; border-radius: 1px;
`;

const AppHeader = styled.div`
  position: absolute;
  top: 7%; left: 0; right: 0;
  height: 12%;
  background: #f0ece1;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  display: flex; align-items: center;
  padding: 0 8px;
  justify-content: space-between;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transition: opacity .35s;
`;

const AppHeaderTitle = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(0.55rem, 1.6vw, 0.85rem);
  font-weight: 600; color: #1a1a1a;
`;

const AppHeaderSub = styled.span`
  font-size: clamp(0.3rem, 0.8vw, 0.44rem); color: #888; font-weight: 300;
`;

const AppSearchBar = styled.div`
  position: absolute;
  top: 21%; left: 6%; right: 6%;
  height: 8%;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.07);
  border-radius: 4px;
  display: flex; align-items: center;
  padding: 0 7px; gap: 5px;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transform: translateY(${({ $v }) => $v ? '0' : '4px'});
  transition: opacity .35s, transform .35s;
`;

const AppSearchText = styled.span`
  font-size: clamp(0.3rem, 0.85vw, 0.46rem); color: #bbb; font-weight: 300;
`;

const AppCard = styled.div`
  position: absolute;
  left: 6%; right: 6%;
  top: ${({ $top }) => $top};
  height: ${({ $h }) => $h || '14%'};
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transform: translateY(${({ $v }) => $v ? '0' : '5px'});
  transition: opacity .4s, transform .4s;
`;

const AppCardImg = styled.div`
  width: 30%; flex-shrink: 0;
  background: linear-gradient(135deg,#ddd3ba,#c9b99a);
  display: flex; align-items: center; justify-content: center;
  color: rgba(0,0,0,0.2);
`;

const AppCardBody = styled.div`
  flex: 1; padding: 5px 7px;
  display: flex; flex-direction: column; justify-content: center; gap: 2px;
`;

const AppCardTitle = styled.span`
  font-size: clamp(0.32rem, 0.9vw, 0.5rem); font-weight: 600; color: #1a1a1a;
`;

const AppCardSub = styled.span`
  font-size: clamp(0.28rem, 0.75vw, 0.42rem); color: #888; font-weight: 300;
  display: flex; align-items: center; gap: 2px;
`;

const AppCardPrice = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(0.38rem, 1vw, 0.55rem); font-weight: 700; color: #c9a84c;
`;

const AppStars = styled.div`
  display: flex; align-items: center; gap: 1px; color: #c9a84c;
`;

const AppNotifDot = styled.div`
  position: absolute;
  top: 8%; right: 6%;
  width: 12px; height: 12px;
  background: #c9a84c;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.36rem; color: #060809; font-weight: 700;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transition: opacity .35s;
`;

const AppTabBar = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 12%;
  background: #f0ece1;
  border-top: 1px solid rgba(0,0,0,0.07);
  display: flex;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transition: opacity .35s;
`;

const AppTabItem = styled.div`
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 2px;
  color: ${({ $active }) => $active ? '#c9a84c' : 'rgba(0,0,0,0.25)'};
`;

const AppTabLabel = styled.span`
  font-size: clamp(0.28rem, 0.7vw, 0.4rem); font-weight: 300; letter-spacing: .5px;
`;

/* ---- cursor flutuando entre os dois phones ---- */
const BuildCursor = styled.div`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: 16px; height: 16px;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none; z-index: 100;
  transition: left .85s cubic-bezier(.65,0,.35,1),
              top  .85s cubic-bezier(.65,0,.35,1),
              opacity .3s;
`;

const BuildCursorTag = styled.span`
  position: absolute; left: 18px; top: 13px;
  background: #c9a84c; color: #06080a;
  font-size: 0.58rem; font-weight: 600; letter-spacing: .5px;
  padding: 2px 7px; white-space: nowrap;
`;

/* shine e badge */
const BuildShine = styled.div`
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(115deg,transparent 42%,rgba(201,168,76,.1) 50%,transparent 58%);
  transform: translateX(-130%);
  animation: ${({ $run }) => $run ? 'mobSweep 1.1s ease forwards' : 'none'};
  @keyframes mobSweep { to { transform: translateX(130%); } }
`;

const BuildBadge = styled.div`
  position: absolute; top: 14px; right: 14px;
  display: flex; align-items: center; gap: 6px;
  background: #06080a; border: 1px solid #c9a84c;
  color: #c9a84c; font-size: 0.58rem; letter-spacing: 1px;
  text-transform: uppercase; padding: 5px 11px;
  opacity: ${({ $show }) => $show ? 1 : 0};
  transition: opacity .4s;
`;

/* steps */
const BuildSteps = styled.div`
  display: flex; flex-direction: column; gap: 1px;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.04);
`;

const BuildStep = styled.div`
  display: grid; grid-template-columns: 52px 1fr;
  gap: 18px; padding: 18px 22px; background: #0d1117;
`;

const BuildStepNum = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: 1.5rem; font-weight: 300; line-height: 1;
  color: ${({ $state }) => $state === 'idle' ? '#222' : '#c9a84c'};
  transition: color .3s;
`;

const BuildStepTitle = styled.h4`
  font-size: 0.78rem; font-weight: 400; letter-spacing: .3px; margin-bottom: 4px;
  color: ${({ $state }) => $state === 'idle' ? '#555' : '#ddd'};
  transition: color .3s;
`;

const BuildStepDesc = styled.p`
  font-size: 0.68rem; color: #555; line-height: 1.6; font-weight: 300; margin: 0;
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
  font-size: clamp(1.4rem,3vw,2.2rem); font-weight: 300; color: #fff;
  letter-spacing: -0.5px; margin-bottom: 48px;
  strong { font-weight: 600; }
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 1px; background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 900px) { grid-template-columns: repeat(2,1fr); }
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`;

const Card = styled.div`
  background: ${({ $alt }) => $alt ? '#0d1117' : '#090c10'};
  padding: 36px 32px; transition: background 0.3s; position: relative;
  &::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 2px; height: 0; background: #c9a84c; transition: height 0.4s;
  }
  &:hover { background: #111620; }
  &:hover::before { height: 100%; }
  @media (max-width: 480px) { padding: 28px 24px; }
`;

const CardIcon  = styled.div`color: #c9a84c; margin-bottom: 20px;`;
const CardTitle = styled.h3`font-size: clamp(0.9rem,1.4vw,1rem); font-weight: 400; color: #ddd; margin-bottom: 12px; letter-spacing: 0.3px;`;
const CardDesc  = styled.p`font-size: 0.83rem; color: #555; line-height: 1.85; font-weight: 300;`;

const FeatureList = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px 40px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const Feature = styled.div`
  display: flex; align-items: flex-start; gap: 12px;
  color: #888; font-size: 0.83rem; font-weight: 300; line-height: 1.6;
  svg { color: #c9a84c; flex-shrink: 0; margin-top: 3px; }
`;

const ProcessList = styled.div`
  display: flex; flex-direction: column; gap: 1px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.04);
`;

const ProcessItem = styled.div`
  display: grid; grid-template-columns: 80px 1fr;
  gap: 32px; padding: 36px; background: #090c10;
  transition: background 0.3s; &:hover { background: #0d1117; }
  @media (max-width: 600px) { grid-template-columns: 48px 1fr; gap: 20px; padding: 24px; }
`;

const ProcessNum  = styled.span`font-family: var(--font-cormorant), serif; font-size: 2rem; font-weight: 300; color: #222; line-height: 1;`;
const ProcessTitle = styled.h3`font-size: 0.95rem; font-weight: 400; color: #ddd; margin-bottom: 8px; letter-spacing: 0.3px;`;
const ProcessDesc  = styled.p`font-size: 0.82rem; color: #555; line-height: 1.85; font-weight: 300;`;

const CTA = styled.section`
  padding: 100px 48px; background: #090c10;
  border-top: 1px solid rgba(255,255,255,0.04); text-align: center;
  @media (max-width: 768px) { padding: 72px 24px; }
`;

const CTATitle = styled.h2`font-size: clamp(1.6rem,3.5vw,2.6rem); font-weight: 300; color: #fff; margin-bottom: 16px; strong { font-weight: 600; }`;
const CTASub   = styled.p`font-size: clamp(0.85rem,1.3vw,0.95rem); color: #555; line-height: 1.9; font-weight: 300; max-width: 520px; margin: 0 auto 40px;`;

const BtnGold = styled(Link)`
  display: inline-flex; align-items: center; gap: 12px;
  padding: 16px 40px; background: transparent; border: 1px solid #c9a84c;
  color: #c9a84c; font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase;
  font-weight: 400; font-family: inherit; cursor: pointer; transition: all 0.4s;
  &:hover { background: #c9a84c; color: #0d1117; }
`;

/* ============================================================
   DADOS ESTÁTICOS
   ============================================================ */
const pillars = [
  { icon: <Smartphone size={22}/>, title: 'iOS e Android, Uma Base',  desc: 'React Native com Expo: um único código funciona nas duas plataformas, reduzindo custo e tempo de desenvolvimento.' },
  { icon: <Wifi size={22}/>,       title: 'APIs e Wearables',          desc: 'Integrações com APIs REST, serviços externos como Garmin, Strava e dispositivos IoT via WebSockets e Bluetooth.' },
  { icon: <Key size={22}/>,        title: 'Autenticação OAuth 2.0',    desc: 'Login com Google, Apple, Strava e outros provedores — fluxo seguro com token refresh e sessão persistente.' },
  { icon: <Zap size={22}/>,        title: 'Performance Nativa',        desc: 'Animações fluidas a 60fps, lazy loading de telas e otimização de bundle para carregamento rápido em redes lentas.' },
  { icon: <Bell size={22}/>,       title: 'Push Notifications',        desc: 'Notificações em tempo real via Expo Notifications — avisos de treino, alertas de status e mensagens diretas.' },
  { icon: <Store size={22}/>,      title: 'Deploy nas Lojas',          desc: 'Publicação na App Store e Google Play com todos os requisitos técnicos e documentação de aprovação inclusos.' },
];

const features = [
  'App iOS e Android com React Native',
  'Expo Router para navegação declarativa',
  'Autenticação OAuth 2.0 (Google, Apple)',
  'Push notifications',
  'Integração com APIs REST e WebSockets',
  'Modo offline com sincronização',
  'Publicação nas lojas (App Store/Play)',
  'TypeScript em toda a base de código',
];

const process = [
  { title: 'Definição de Escopo',      desc: 'Definimos as telas, os fluxos principais e as integrações necessárias — priorizando o MVP que valida o produto mais rápido.' },
  { title: 'Prototipagem no Figma',     desc: 'Protótipo navegável das telas principais para aprovação de fluxo e identidade visual antes de codificar.' },
  { title: 'Desenvolvimento por Telas', desc: 'Desenvolvimento em sprints com entregas por funcionalidade — você testa em device real ao longo do processo.' },
  { title: 'Integrações e Testes',      desc: 'Integração com APIs externas, testes em dispositivos iOS e Android reais, e ajuste de performance e animações.' },
  { title: 'Deploy nas Lojas',          desc: 'Configuração de conta de desenvolvedor, build de produção, submissão e acompanhamento da aprovação nas lojas.' },
];

/* ============================================================
   SEQUÊNCIA DE ANIMAÇÃO
   cursor alterna entre phone esquerdo (~22%) e direito (~64%)
   ============================================================ */
const buildStepsMeta = [
  { num: 1, title: 'Estrutura de navegação',  desc: 'Tab bar e rotas entre telas.' },
  { num: 2, title: 'Tela de autenticação',    desc: 'Login com e-mail e OAuth social.' },
  { num: 3, title: 'Campos e validação',      desc: 'Inputs com feedback em tempo real.' },
  { num: 4, title: 'Header e busca',          desc: 'Navegação principal do app.' },
  { num: 5, title: 'Cards de conteúdo',       desc: 'Feed com imagem, rating e preço.' },
  { num: 6, title: 'Push & notificações',     desc: 'Badge e disparo de notificações.' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ============================================================
   COMPONENTE
   ============================================================ */
export default function AppsMobile() {

  /* ---- estado da tela de LOGIN ---- */
  const [loginMark,    setLoginMark]    = useState(false);
  const [loginTitle,   setLoginTitle]   = useState(false);
  const [loginField1,  setLoginField1]  = useState(false);
  const [loginField2,  setLoginField2]  = useState(false);
  const [loginDivider, setLoginDivider] = useState(false);
  const [loginGoogle,  setLoginGoogle]  = useState(false);
  const [loginApple,   setLoginApple]   = useState(false);

  /* ---- estado da tela FEED ---- */
  const [feedHeader,  setFeedHeader]  = useState(false);
  const [feedSearch,  setFeedSearch]  = useState(false);
  const [feedCard1,   setFeedCard1]   = useState(false);
  const [feedCard2,   setFeedCard2]   = useState(false);
  const [feedNotif,   setFeedNotif]   = useState(false);
  const [feedTabBar,  setFeedTabBar]  = useState(false);

  /* ---- cursor ---- */
  const [cursor,    setCursor]    = useState({ x: 22, y: 50, label: '', visible: false });
  const [activeStep, setActiveStep] = useState(0);
  const [shine,  setShine]  = useState(false);
  const [badge,  setBadge]  = useState(false);

  const resetAll = () => {
    setLoginMark(false); setLoginTitle(false); setLoginField1(false);
    setLoginField2(false); setLoginDivider(false); setLoginGoogle(false);
    setLoginApple(false);
    setFeedHeader(false); setFeedSearch(false); setFeedCard1(false);
    setFeedCard2(false); setFeedNotif(false); setFeedTabBar(false);
    setShine(false); setBadge(false); setActiveStep(0);
  };

  useEffect(() => {
    let cancelled = false;

    async function run() {
      while (!cancelled) {
        resetAll();
        setCursor({ x: 22, y: 50, label: '', visible: false });
        await sleep(400);
        if (cancelled) return;

        /* -------- PASSO 1: tab bar (phone direito) -------- */
        setActiveStep(1);
        setCursor({ x: 64, y: 85, label: 'TabNavigator.tsx', visible: true });
        await sleep(700); if (cancelled) return;
        setFeedTabBar(true);
        await sleep(500); if (cancelled) return;

        /* -------- PASSO 2: tela de login — marca -------- */
        setActiveStep(2);
        setCursor({ x: 22, y: 20, label: 'LoginScreen.tsx', visible: true });
        await sleep(700); if (cancelled) return;
        setLoginMark(true);
        await sleep(300); if (cancelled) return;
        setLoginTitle(true);
        await sleep(400); if (cancelled) return;

        /* -------- PASSO 3: campos -------- */
        setActiveStep(3);
        setCursor({ x: 22, y: 48, label: 'AuthForm.tsx', visible: true });
        await sleep(650); if (cancelled) return;
        setLoginField1(true);
        await sleep(350); if (cancelled) return;
        setLoginField2(true);
        await sleep(350); if (cancelled) return;
        setLoginDivider(true);
        await sleep(350); if (cancelled) return;
        setLoginGoogle(true);
        await sleep(300); if (cancelled) return;
        setLoginApple(true);
        await sleep(400); if (cancelled) return;

        /* -------- PASSO 4: header + busca (phone direito) -------- */
        setActiveStep(4);
        setCursor({ x: 64, y: 18, label: 'HomeHeader.tsx', visible: true });
        await sleep(700); if (cancelled) return;
        setFeedHeader(true);
        await sleep(350); if (cancelled) return;
        setFeedSearch(true);
        await sleep(500); if (cancelled) return;

        /* -------- PASSO 5: cards -------- */
        setActiveStep(5);
        setCursor({ x: 64, y: 42, label: 'FeedCard.tsx', visible: true });
        await sleep(700); if (cancelled) return;
        setFeedCard1(true);
        await sleep(420); if (cancelled) return;
        setFeedCard2(true);
        await sleep(500); if (cancelled) return;

        /* -------- PASSO 6: notif badge -------- */
        setActiveStep(6);
        setCursor({ x: 80, y: 10, label: 'PushBadge.tsx', visible: true });
        await sleep(700); if (cancelled) return;
        setFeedNotif(true);
        await sleep(600); if (cancelled) return;

        /* -------- finalização -------- */
        setCursor((c) => ({ ...c, visible: false }));
        await sleep(300); if (cancelled) return;
        setShine(true);
        await sleep(700); if (cancelled) return;
        setBadge(true);
        await sleep(2800);
      }
    }

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <Navbar />
      <Page>

        {/* HERO */}
        <Hero>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <BackLink href="/servicos"><ArrowLeft size={12} /> Voltar</BackLink>
              <GoldRule />
              <Label>Capacidade Técnica</Label>
              <HeroTitle>Apps <strong>Web &amp; Mobile</strong></HeroTitle>
              <HeroSub>
                Aplicações multiplataforma com React Native e Expo, integrações com APIs
                externas, autenticação OAuth e funcionalidades em tempo real — da estrutura web
                ao app que vai no bolso do usuário.
              </HeroSub>
              <Tags>
                {['React Native','Expo','TypeScript','OAuth 2.0','WebSockets','iOS','Android'].map((t, i) => (
                  <Tag key={i}>{t}</Tag>
                ))}
              </Tags>
            </FadeIn>
          </Inner>
        </Hero>

        {/* PROTÓTIPO ANIMADO */}
        <Section>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Dois dispositivos, <strong>um código</strong></SectionTitle>
              <BuildLayout>

                <BuildFrame>
                  <BuildTopBar>
                    <BuildUrl>expo run:ios / android</BuildUrl>
                    <BuildLiveTag><BuildLiveDot /> compilando ao vivo</BuildLiveTag>
                  </BuildTopBar>

                  <BuildCanvas>

                    {/* cursor flutuante */}
                    <BuildCursor $x={cursor.x} $y={cursor.y} $visible={cursor.visible}>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M1 1 L1 13 L4.5 10.2 L7 15 L9 14 L6.5 9 L11 9 Z"
                          fill="#111" stroke="#f5f2eb" strokeWidth={0.6} />
                      </svg>
                      <BuildCursorTag>{cursor.label}</BuildCursorTag>
                    </BuildCursor>

                    {/* ====== PHONE ESQUERDO — Login ====== */}
                    <PhoneShell style={{ marginLeft: '0' }}>
                      <PhoneNotch />
                      <PhoneScreen>
                        <LoginBg />

                        {/* logo mark */}
                        <LoginMark $v={loginMark}>
                          <Smartphone size={10} strokeWidth={1.5}/>
                        </LoginMark>

                        {/* título */}
                        <LoginTitle $v={loginTitle}>
                          Bem-vindo de<br/>volta à <strong>sua conta</strong>
                        </LoginTitle>

                        {/* campo email */}
                        <LoginField $top="44%" $v={loginField1}>
                          <LoginFieldText>E-mail</LoginFieldText>
                        </LoginField>

                        {/* campo senha */}
                        <LoginField $top="55%" $v={loginField2}>
                          <LoginFieldText>••••••••</LoginFieldText>
                        </LoginField>

                        {/* divisor ou */}
                        <LoginDivider $v={loginDivider}>
                          <LoginDivLine/>
                          <LoginDivText>ou entre com</LoginDivText>
                          <LoginDivLine/>
                        </LoginDivider>

                        {/* Google */}
                        <LoginOAuthBtn $top="70%" $google $v={loginGoogle}>
                          <LoginOAuthText $google>G  Continuar com Google</LoginOAuthText>
                        </LoginOAuthBtn>

                        {/* Apple */}
                        <LoginOAuthBtn $top="81%" $v={loginApple}>
                          <LoginOAuthText>  Continuar com Apple</LoginOAuthText>
                        </LoginOAuthBtn>

                      </PhoneScreen>
                    </PhoneShell>

                    {/* ====== PHONE DIREITO — Feed ====== */}
                    <PhoneShell>
                      <PhoneNotch />
                      <PhoneScreen $bg="#f5f2eb">
                        {/* status bar estática */}
                        <AppStatusBar>
                          <AppStatusTime>9:41</AppStatusTime>
                          <AppStatusSignal>
                            <AppBar $w={3}  $on />
                            <AppBar $w={3}  $on />
                            <AppBar $w={3}  $on />
                            <AppBar $w={3} />
                          </AppStatusSignal>
                        </AppStatusBar>

                        {/* header */}
                        <AppHeader $v={feedHeader}>
                          <div>
                            <AppHeaderTitle>Explorar</AppHeaderTitle>
                          </div>
                          <AppHeaderSub>São Paulo, SP</AppHeaderSub>
                        </AppHeader>

                        {/* badge de notificação */}
                        <AppNotifDot $v={feedNotif}>3</AppNotifDot>

                        {/* busca */}
                        <AppSearchBar $v={feedSearch}>
                          <Search size={8} color="#bbb" strokeWidth={2}/>
                          <AppSearchText>Buscar experiências...</AppSearchText>
                        </AppSearchBar>

                        {/* card 1 */}
                        <AppCard $top="31%" $h="17%" $v={feedCard1}>
                          <AppCardImg><MapPin size={10} strokeWidth={1.5}/></AppCardImg>
                          <AppCardBody>
                            <AppCardTitle>Jardins — Degustação</AppCardTitle>
                            <AppCardSub>
                              <AppStars>
                                <Star size={6} fill="#c9a84c" strokeWidth={0}/>
                                <Star size={6} fill="#c9a84c" strokeWidth={0}/>
                                <Star size={6} fill="#c9a84c" strokeWidth={0}/>
                              </AppStars>
                              4.9 (120)
                            </AppCardSub>
                            <AppCardPrice>R$ 249,00</AppCardPrice>
                          </AppCardBody>
                        </AppCard>

                        {/* card 2 */}
                        <AppCard $top="51%" $h="17%" $v={feedCard2}>
                          <AppCardImg><MapPin size={10} strokeWidth={1.5}/></AppCardImg>
                          <AppCardBody>
                            <AppCardTitle>Itaim — Chef Reservado</AppCardTitle>
                            <AppCardSub>
                              <AppStars>
                                <Star size={6} fill="#c9a84c" strokeWidth={0}/>
                                <Star size={6} fill="#c9a84c" strokeWidth={0}/>
                              </AppStars>
                              4.7 (88)
                            </AppCardSub>
                            <AppCardPrice>R$ 380,00</AppCardPrice>
                          </AppCardBody>
                        </AppCard>

                        {/* tab bar */}
                        <AppTabBar $v={feedTabBar}>
                          {[
                            { icon: <Home      size={10} strokeWidth={1.5}/>, label: 'Início',   active: true  },
                            { icon: <Search    size={10} strokeWidth={1.5}/>, label: 'Buscar',   active: false },
                            { icon: <Heart     size={10} strokeWidth={1.5}/>, label: 'Salvos',   active: false },
                            { icon: <User      size={10} strokeWidth={1.5}/>, label: 'Perfil',   active: false },
                          ].map((tab, i) => (
                            <AppTabItem key={i} $active={tab.active}>
                              {tab.icon}
                              <AppTabLabel>{tab.label}</AppTabLabel>
                            </AppTabItem>
                          ))}
                        </AppTabBar>

                      </PhoneScreen>
                    </PhoneShell>

                    <BuildShine $run={shine} />
                    <BuildBadge $show={badge}><Check size={11} /> App pronto</BuildBadge>
                  </BuildCanvas>
                </BuildFrame>

                {/* steps */}
                <BuildSteps>
                  {buildStepsMeta.map((s) => {
                    const state =
                      activeStep === s.num ? 'active' :
                      activeStep  > s.num ? 'done'   : 'idle';
                    return (
                      <BuildStep key={s.num}>
                        <BuildStepNum $state={state}>{String(s.num).padStart(2,'0')}</BuildStepNum>
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

        {/* PILARES */}
        <Section $alt>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>O que entrega um app <strong>de verdade</strong></SectionTitle>
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

        {/* ESCOPO */}
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

        {/* PROCESSO */}
        <Section $alt>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Como <strong>funciona</strong> o processo</SectionTitle>
              <ProcessList>
                {process.map((p, i) => (
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
          <Inner>
            <FadeIn direction="up" duration={800}>
              <GoldRule style={{ margin: '0 auto 20px' }} />
              <Label>Vamos conversar?</Label>
              <CTATitle>Interessado em trabalhar <strong>juntos?</strong></CTATitle>
              <CTASub>
                Estou em busca de novos desafios e pronta para contribuir com times que
                constroem produtos mobile de verdade.
              </CTASub>
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