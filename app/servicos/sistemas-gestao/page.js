'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import styled from 'styled-components';
import FadeIn from '../../components/ui/FadeIn';
import Link from 'next/link';
import { Check, ArrowLeft, ArrowRight, ClipboardList, Users, Package, DollarSign, FileText, Bell, Search } from 'lucide-react';

const Page = styled.main`background: #080a0d; min-height: 100vh;`;
const Hero = styled.section`padding: 160px 48px 100px; background: #090c10; border-bottom: 1px solid rgba(255,255,255,0.04); @media (max-width: 1024px) { padding: 140px 40px 80px; } @media (max-width: 768px) { padding: 120px 24px 64px; } @media (max-width: 480px) { padding: 100px 16px 48px; }`;
const Inner = styled.div`max-width: 1200px; margin: 0 auto;`;
const BackLink = styled(Link)`display: inline-flex; align-items: center; gap: 8px; font-size: 0.62rem; letter-spacing: 3px; text-transform: uppercase; color: #444; font-weight: 300; margin-bottom: 48px; transition: color 0.3s; &:hover { color: #c9a84c; }`;
const GoldRule = styled.div`width: 32px; height: 1px; background: #c9a84c; margin-bottom: 20px;`;
const Label = styled.p`font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase; color: #c9a84c; font-weight: 300; margin-bottom: 16px;`;
const HeroTitle = styled.h1`font-family: var(--font-cormorant), serif; font-size: clamp(2.4rem, 5.5vw, 4.5rem); font-weight: 400; color: #fff; line-height: 1.15; letter-spacing: -0.5px; max-width: 820px; margin-bottom: 28px; strong { font-weight: 700; color: #c9a84c; }`;
const HeroSub = styled.p`font-size: clamp(0.9rem, 1.4vw, 1.05rem); color: #666; line-height: 1.95; font-weight: 300; max-width: 620px; margin-bottom: 48px;`;
const Tags = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;
const Tag = styled.span`font-size: 0.6rem; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c; border: 1px solid rgba(201,168,76,0.2); padding: 5px 14px; font-weight: 300;`;

/* ============================================================
   PROTÓTIPO — OPERAÇÃO DO SISTEMA
   ============================================================ */

/* layout wrapper */
const BuildLayout = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 32px;
  align-items: start;

  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 24px; }
`;

/* frame */
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
  animation: gestPulse 1.6s ease-in-out infinite;
  @keyframes gestPulse { 0%,100% { opacity: 1; } 50% { opacity: .3; } }
`;

/* canvas */
const BuildCanvas = styled.div`
  position: relative;
  aspect-ratio: 16 / 10.5;
  background-image: radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px);
  background-size: 18px 18px;

  @media (max-width: 600px) { aspect-ratio: 16 / 13; background-size: 12px 12px; }
  @media (max-width: 420px)  { aspect-ratio: 4 / 3; }
`;

/* cursor */
const BuildCursor = styled.div`
  position: absolute; left: ${({ $x }) => $x}%; top: ${({ $y }) => $y}%;
  width: 16px; height: 16px;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none; z-index: 50;
  transition: left .85s cubic-bezier(.65,0,.35,1), top .85s cubic-bezier(.65,0,.35,1), opacity .3s;

  @media (max-width: 600px) { width: 11px; height: 11px; }
  @media (max-width: 420px)  { width: 8px;  height: 8px;  }
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

/* sidebar */
const GestSidebar = styled.nav`
  width: 100%; height: 100%; background: #13110f;
  display: flex; flex-direction: column; padding: 8px 0; gap: 1px;
`;

const GestSideItem = styled.div`
  display: flex; align-items: center; gap: 5px; padding: 4px 8px;
  font-size: 0.46rem; letter-spacing: 1px; text-transform: uppercase;
  color: ${({ $active }) => $active ? '#c9a84c' : '#5a564c'};
  border-left: 2px solid ${({ $active }) => $active ? '#c9a84c' : 'transparent'};
  font-weight: 300;

  @media (max-width: 600px) { font-size: 0.32rem; padding: 3px 5px; }
  @media (max-width: 420px)  { font-size: 0px; padding: 6px 4px; justify-content: center; }
`;

const GestSideDot = styled.span`
  width: 4px; height: 4px; border-radius: 50%; flex-shrink: 0;
  background: ${({ $active }) => $active ? '#c9a84c' : '#3a372f'};
`;

/* top row */
const GestTopRow = styled.div`
  width: 100%; height: 100%; background: #f8f6f0;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  display: flex; align-items: center; justify-content: space-between; padding: 0 10px;
`;

const GestBreadcrumb = styled.span`
  font-size: 0.5rem; font-weight: 300; color: #6b6760; letter-spacing: .3px;
  @media (max-width: 600px) { font-size: 0.34rem; }
  @media (max-width: 420px)  { font-size: 0.28rem; }
`;

const GestSearchPill = styled.span`
  display: inline-flex; align-items: center; gap: 4px;
  background: #ffffff; border: 1px solid rgba(0,0,0,0.08);
  padding: 3px 8px; font-size: 0.44rem; color: #9a9488; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.3rem; padding: 2px 5px; }
  @media (max-width: 420px)  { display: none; }
`;

/* ficha do cliente */
const GestClientCard = styled.div`
  width: 100%; height: 100%; background: #ffffff;
  border: 1px solid rgba(0,0,0,.07); display: flex; flex-direction: column;
  gap: 8px; padding: 10px 12px; overflow: hidden;
  @media (max-width: 600px) { padding: 7px 9px; gap: 5px; }
`;

const GestClientHead = styled.div`display: flex; align-items: center; gap: 7px;`;

const GestAvatar = styled.div`
  width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, #c9a84c, #7a5c1e);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-cormorant), serif; font-weight: 700;
  font-size: 0.5rem; color: #161412;
  @media (max-width: 600px) { width: 20px; height: 20px; font-size: 0.36rem; }
  @media (max-width: 420px)  { width: 15px; height: 15px; font-size: 0.28rem; }
`;

const GestClientName = styled.span`
  font-size: 0.6rem; font-weight: 600; color: #161412;
  @media (max-width: 600px) { font-size: 0.42rem; }
  @media (max-width: 420px)  { font-size: 0.32rem; }
`;

const GestClientTag = styled.span`
  font-size: 0.4rem; color: #9a9488; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.28rem; }
  @media (max-width: 420px)  { display: none; }
`;

const GestClientStats = styled.div`
  display: flex; gap: 14px; margin-top: auto;
  @media (max-width: 420px) { gap: 8px; }
`;

const GestStatNum = styled.span`
  display: block; font-family: var(--font-cormorant), serif;
  font-size: 0.75rem; font-weight: 700; color: #c9a84c; line-height: 1;
  @media (max-width: 600px) { font-size: 0.54rem; }
  @media (max-width: 420px)  { font-size: 0.42rem; }
`;

const GestStatLabel = styled.span`
  font-size: 0.36rem; letter-spacing: .5px; text-transform: uppercase; color: #9a9488;
  @media (max-width: 600px) { font-size: 0.26rem; }
`;

/* estoque */
const GestStockBox = styled.div`
  width: 100%; height: 100%; background: #ffffff;
  border: 1px solid rgba(0,0,0,.07); display: flex; flex-direction: column;
  gap: 5px; padding: 10px 12px; overflow: hidden;
  @media (max-width: 600px) { padding: 7px 9px; gap: 4px; }
`;

const GestStockTitle = styled.span`
  font-size: 0.4rem; letter-spacing: 1.5px; text-transform: uppercase; color: #6b6760; font-weight: 300; margin-bottom: 1px;
  @media (max-width: 600px) { font-size: 0.28rem; }
`;

const GestStockRow = styled.div`display: flex; align-items: center; justify-content: space-between; gap: 6px;`;

const GestStockName = styled.span`
  font-size: 0.48rem; color: #3a3631; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.32rem; }
  @media (max-width: 420px)  { font-size: 0.24rem; }
`;

const GestStockBadge = styled.span`
  font-size: 0.36rem; padding: 1px 5px; flex-shrink: 0;
  background: ${({ $t }) => $t === 'ok' ? 'rgba(76,175,138,0.1)' : $t === 'warn' ? 'rgba(201,168,76,0.12)' : 'rgba(192,85,74,0.1)'};
  color: ${({ $t }) => $t === 'ok' ? '#3f9c78' : $t === 'warn' ? '#8a6d1f' : '#c0554a'};
  @media (max-width: 600px) { font-size: 0.26rem; padding: 1px 3px; }
`;

/* kanban */
const GestKanbanCol = styled.div`
  width: 100%; height: 100%; background: #ffffff;
  border: 1px solid rgba(0,0,0,.07); display: flex; flex-direction: column;
  gap: 6px; padding: 8px 10px; overflow: hidden;
  @media (max-width: 600px) { padding: 5px 7px; gap: 4px; }
`;

const GestKanbanHead = styled.span`
  font-size: 0.38rem; letter-spacing: 1px; text-transform: uppercase; color: #9a9488; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.26rem; }
`;

const GestTicket = styled.div`
  background: #f8f6f0; padding: 5px; display: flex; flex-direction: column; gap: 2px;
  border-left: 2px solid ${({ $color }) => $color};
`;

const GestTicketId = styled.span`
  font-family: var(--font-cormorant), serif; font-weight: 600;
  font-size: 0.56rem; color: #161412;
  @media (max-width: 600px) { font-size: 0.38rem; }
  @media (max-width: 420px)  { font-size: 0.3rem; }
`;

const GestTicketDesc = styled.span`
  font-size: 0.42rem; color: #6b6760; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.28rem; }
  @media (max-width: 420px)  { display: none; }
`;

const GestTicketBadge = styled.span`
  font-size: 0.34rem; letter-spacing: .5px; text-transform: uppercase; font-weight: 600;
  color: ${({ $color }) => $color}; display: inline-flex; align-items: center; gap: 2px; margin-top: 1px;
  svg { width: 8px; height: 8px; }
  @media (max-width: 600px) { font-size: 0.24rem; }
`;

/* toast */
const GestToast = styled.div`
  width: 100%; height: 100%; background: #1b1916;
  border: 1px solid rgba(201,168,76,0.25); display: flex; align-items: center;
  gap: 10px; padding: 0 14px;
  @media (max-width: 600px) { gap: 7px; padding: 0 10px; }
`;

const GestToastIcon = styled.div`
  color: #c9a84c; flex-shrink: 0;
  svg { width: 14px; height: 14px; }
  @media (max-width: 600px) { svg { width: 10px; height: 10px; } }
  @media (max-width: 420px)  { svg { width: 8px;  height: 8px; } }
`;

const GestToastTextWrap = styled.div`display: flex; flex-direction: column; gap: 1px;`;

const GestToastTitle = styled.span`
  font-size: 0.52rem; color: #f1ede4; font-weight: 400;
  @media (max-width: 600px) { font-size: 0.34rem; }
  @media (max-width: 420px)  { font-size: 0.28rem; }
`;

const GestToastSub = styled.span`
  font-size: 0.4rem; color: #8a8579; font-weight: 300; display: flex; align-items: center; gap: 4px;
  @media (max-width: 600px) { font-size: 0.28rem; }
  @media (max-width: 420px)  { display: none; }
`;

const GestToastDot = styled.span`
  width: 5px; height: 5px; border-radius: 50%; background: #c9a84c;
  animation: gestToastPulse 1.4s ease-in-out infinite;
  @keyframes gestToastPulse { 0%,100% { opacity: 1; } 50% { opacity: .3; } }
`;

/* shine / badge */
const BuildShine = styled.div`
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(115deg, transparent 42%, rgba(201,168,76,.35) 50%, transparent 58%);
  transform: translateX(-130%);
  animation: ${({ $run }) => $run ? 'gestSweep 1.1s ease forwards' : 'none'};
  @keyframes gestSweep { to { transform: translateX(130%); } }
`;

const BuildBadge = styled.div`
  position: absolute; top: 10px; right: 10px; display: flex; align-items: center; gap: 5px;
  background: #faf7f0; border: 1px solid #c9a84c; color: #8a6d1f;
  font-size: 0.52rem; letter-spacing: 1px; text-transform: uppercase; padding: 4px 10px;
  opacity: ${({ $show }) => $show ? 1 : 0}; transition: opacity .4s;
  svg { width: 10px; height: 10px; }
  @media (max-width: 480px) { font-size: 0.38rem; padding: 3px 7px; top: 7px; right: 7px; }
`;

/* steps */
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
  @media (max-width: 420px) { display: none; }
`;

/* ============================================================
   SEÇÕES GENÉRICAS
   ============================================================ */
const Section = styled.section`padding: 100px 48px; background: ${({ $alt }) => $alt ? '#0d1117' : '#090c10'}; border-top: 1px solid rgba(255,255,255,0.04); @media (max-width: 768px) { padding: 72px 24px; } @media (max-width: 480px) { padding: 56px 16px; }`;
const SectionTitle = styled.h2`font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 300; color: #fff; letter-spacing: -0.5px; margin-bottom: 48px; strong { font-weight: 600; }`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.04); @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 540px) { grid-template-columns: 1fr; }`;
const Card = styled.div`background: ${({ $alt }) => $alt ? '#0d1117' : '#090c10'}; padding: 36px 32px; transition: background 0.3s; position: relative; &::before { content: ''; position: absolute; top: 0; left: 0; width: 2px; height: 0; background: #c9a84c; transition: height 0.4s; } &:hover { background: #111620; } &:hover::before { height: 100%; } @media (max-width: 480px) { padding: 28px 24px; }`;
const CardIcon = styled.div`color: #c9a84c; margin-bottom: 20px;`;
const CardTitle = styled.h3`font-size: clamp(0.9rem, 1.4vw, 1rem); font-weight: 400; color: #ddd; margin-bottom: 12px; letter-spacing: 0.3px;`;
const CardDesc = styled.p`font-size: 0.83rem; color: #555; line-height: 1.85; font-weight: 300;`;
const FeatureList = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 16px 40px; @media (max-width: 600px) { grid-template-columns: 1fr; }`;
const Feature = styled.div`display: flex; align-items: flex-start; gap: 12px; color: #888; font-size: 0.83rem; font-weight: 300; line-height: 1.6; svg { color: #c9a84c; flex-shrink: 0; margin-top: 3px; }`;
const ProcessList = styled.div`display: flex; flex-direction: column; gap: 1px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.04);`;
const ProcessItem = styled.div`display: grid; grid-template-columns: 80px 1fr; gap: 32px; padding: 36px; background: #090c10; transition: background 0.3s; &:hover { background: #0d1117; } @media (max-width: 600px) { grid-template-columns: 48px 1fr; gap: 20px; padding: 24px; }`;
const ProcessNum = styled.span`font-family: var(--font-cormorant), serif; font-size: 2rem; font-weight: 300; color: #222; line-height: 1;`;
const ProcessTitle = styled.h3`font-size: 0.95rem; font-weight: 400; color: #ddd; margin-bottom: 8px; letter-spacing: 0.3px;`;
const ProcessDesc = styled.p`font-size: 0.82rem; color: #555; line-height: 1.85; font-weight: 300;`;
const CTA = styled.section`padding: 100px 48px; background: #090c10; border-top: 1px solid rgba(255,255,255,0.04); text-align: center; @media (max-width: 768px) { padding: 72px 24px; }`;
const CTATitle = styled.h2`font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 300; color: #fff; margin-bottom: 16px; strong { font-weight: 600; }`;
const CTASub = styled.p`font-size: clamp(0.85rem, 1.3vw, 0.95rem); color: #555; line-height: 1.9; font-weight: 300; max-width: 520px; margin: 0 auto 40px;`;
const BtnGold = styled(Link)`display: inline-flex; align-items: center; gap: 12px; padding: 16px 40px; background: transparent; border: 1px solid #c9a84c; color: #c9a84c; font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase; font-weight: 400; font-family: inherit; cursor: pointer; transition: all 0.4s; &:hover { background: #c9a84c; color: #0d1117; }`;

const pillars = [
  { icon: <Users size={22} />, title: 'Gestão de Clientes', desc: 'Cadastro completo com histórico de atendimentos, compras, orçamentos e interações — tudo em um único perfil de cliente.' },
  { icon: <Package size={22} />, title: 'Controle de Estoque', desc: 'Entrada e saída de produtos em tempo real, alertas de estoque mínimo e rastreabilidade por lote ou número de série.' },
  { icon: <ClipboardList size={22} />, title: 'Ordens de Serviço', desc: 'Criação, acompanhamento e encerramento de OS com status em tempo real, histórico de peças e assinatura digital.' },
  { icon: <DollarSign size={22} />, title: 'Módulo Financeiro', desc: 'Contas a pagar e receber, fluxo de caixa, geração de boletos e relatórios de faturamento por período.' },
  { icon: <FileText size={22} />, title: 'Relatórios e Exportação', desc: 'Relatórios personalizáveis exportáveis em PDF e Excel — vendas, inadimplência, ticket médio e muito mais.' },
  { icon: <Bell size={22} />, title: 'Notificações Automáticas', desc: 'Avisos automáticos por e-mail ou WhatsApp para clientes: orçamento aprovado, OS pronta, vencimento de contrato.' },
];

const features = [
  'Cadastro e histórico completo de clientes', 'Controle de estoque em tempo real',
  'Ordens de serviço com status', 'Módulo financeiro completo',
  'Relatórios exportáveis (PDF/Excel)', 'Notificações automáticas',
  'Autenticação e controle de acesso', 'Dashboard com indicadores do negócio',
];

const process = [
  { title: 'Mapeamento de Processos', desc: 'Entendemos como sua operação funciona hoje — quais etapas são manuais, onde está o gargalo e o que precisa ser digitalizado primeiro.' },
  { title: 'Definição de Módulos', desc: 'Priorizamos os módulos por impacto: o que resolve mais problema no menor tempo possível para o seu negócio.' },
  { title: 'Desenvolvimento Modular', desc: 'Desenvolvemos por módulo com entregas parciais — você já pode usar partes do sistema antes da entrega total.' },
  { title: 'Migração de Dados', desc: 'Importamos seus dados atuais (planilhas, sistemas legados) para o novo sistema sem perda de histórico.' },
  { title: 'Treinamento e Suporte', desc: 'Treinamento da equipe para uso do sistema + 30 dias de suporte prioritário após o go-live.' },
];

/* ============================================================
   ANIMAÇÃO DO PROTÓTIPO
   ============================================================ */
const initialElStatus = {
  sidebar: 'idle', topRow: 'idle', clientCard: 'idle', stockBox: 'idle',
  kanbanAberta: 'idle', kanbanAndamento: 'idle', kanbanConcluida: 'idle', toast: 'idle',
};

const buildSequence = [
  { id: 'sidebar',        x: 1,  y: 8,  label: 'Sidebar.tsx',      step: 1 },
  { id: 'topRow',         x: 18, y: 3,  label: 'SearchBar.tsx',    step: 2 },
  { id: 'clientCard',     x: 18, y: 14, label: 'ClientCard.tsx',   step: 3 },
  { id: 'stockBox',       x: 58, y: 14, label: 'StockAlert.tsx',   step: 4 },
  { id: 'kanbanAberta',   x: 18, y: 46, label: 'KanbanCard.tsx',   step: 5 },
  { id: 'kanbanAndamento',x: 46, y: 46, label: 'KanbanCard.tsx',   step: 5 },
  { id: 'kanbanConcluida',x: 74, y: 46, label: 'KanbanCard.tsx',   step: 5 },
  { id: 'toast',          x: 58, y: 77, label: 'Notification.tsx', step: 6 },
];

const buildStepsMeta = [
  { num: 1, title: 'Estrutura de navegação', desc: 'Sidebar com os módulos do sistema.' },
  { num: 2, title: 'Busca e contexto',        desc: 'Localização rápida de registros.' },
  { num: 3, title: 'Ficha do cliente',        desc: 'Histórico e dados centralizados.' },
  { num: 4, title: 'Alertas de estoque',      desc: 'Aviso automático de itens críticos.' },
  { num: 5, title: 'Ordens de serviço',       desc: 'Fluxo visual por status, do início ao fim.' },
  { num: 6, title: 'Notificações',            desc: 'Eventos em tempo real para a equipe.' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function SistemasGestao() {
  const [elStatus, setElStatus] = useState(initialElStatus);
  const [cursor, setCursor] = useState({ x: 1, y: 8, label: 'Sidebar.tsx', visible: false });
  const [activeStep, setActiveStep] = useState(0);
  const [shine, setShine] = useState(false);
  const [badge, setBadge] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      while (!cancelled) {
        setElStatus(initialElStatus);
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
          await sleep(720);
          if (cancelled) return;
          setElStatus((prev) => ({ ...prev, [cfg.id]: 'sketching' }));
          await sleep(480);
          if (cancelled) return;
          setElStatus((prev) => ({ ...prev, [cfg.id]: 'filled' }));
          await sleep(400);
        }

        if (cancelled) return;
        setActiveStep(7);
        setCursor((c) => ({ ...c, visible: false }));
        await sleep(300);
        setShine(true);
        await sleep(700);
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
        <Hero>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <BackLink href="/servicos"><ArrowLeft size={12} /> Voltar</BackLink>
              <GoldRule /><Label>Capacidade Técnica</Label>
              <HeroTitle>Sistemas de <strong>Gestão Empresarial</strong></HeroTitle>
              <HeroSub>Substitua planilhas e processos manuais por um sistema que organiza clientes, estoque, ordens de serviço e financeiro em um único fluxo digital confiável.</HeroSub>
              <Tags>{['Next.js', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Prisma'].map((t, i) => <Tag key={i}>{t}</Tag>)}</Tags>
            </FadeIn>
          </Inner>
        </Hero>

        {/* PROTÓTIPO ANIMADO */}
        <Section>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Veja o sistema <strong>em ação</strong></SectionTitle>
              <BuildLayout>
                <BuildFrame>
                  <BuildTopBar>
                    <BuildUrl>app.suaempresa.com.br/gestao</BuildUrl>
                    <BuildLiveTag><BuildLiveDot /> operando ao vivo</BuildLiveTag>
                  </BuildTopBar>
                  <BuildCanvas>
                    <BuildCursor $x={cursor.x} $y={cursor.y} $visible={cursor.visible}>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M1 1 L1 13 L4.5 10.2 L7 15 L9 14 L6.5 9 L11 9 Z" fill="#111111" stroke="#faf7f0" strokeWidth={0.6} />
                      </svg>
                      <BuildCursorTag>{cursor.label}</BuildCursorTag>
                    </BuildCursor>

                    {/* SIDEBAR */}
                    <BuildBlock $left={0} $top={0} $width={16} $height={100}>
                      <BuildSketch $active={elStatus.sidebar === 'sketching'} />
                      <BuildContent $active={elStatus.sidebar === 'filled'}>
                        <GestSidebar>
                          {['Clientes', 'Estoque', 'Ordens de Serviço', 'Financeiro', 'Relatórios'].map((item, i) => (
                            <GestSideItem key={i} $active={i === 0}>
                              <GestSideDot $active={i === 0} />
                              {item}
                            </GestSideItem>
                          ))}
                        </GestSidebar>
                      </BuildContent>
                    </BuildBlock>

                    {/* BREADCRUMB + BUSCA */}
                    <BuildBlock $left={16} $top={0} $width={84} $height={10}>
                      <BuildSketch $active={elStatus.topRow === 'sketching'} />
                      <BuildContent $active={elStatus.topRow === 'filled'}>
                        <GestTopRow>
                          <GestBreadcrumb>Clientes → Ficha do cliente</GestBreadcrumb>
                          <GestSearchPill><Search size={10} /> Buscar cliente, OS ou produto...</GestSearchPill>
                        </GestTopRow>
                      </BuildContent>
                    </BuildBlock>

                    {/* FICHA DO CLIENTE */}
                    <BuildBlock $left={16} $top={11} $width={37} $height={30}>
                      <BuildSketch $active={elStatus.clientCard === 'sketching'} />
                      <BuildContent $active={elStatus.clientCard === 'filled'}>
                        <GestClientCard>
                          <GestClientHead>
                            <GestAvatar>AC</GestAvatar>
                            <div>
                              <GestClientName>Ana Costa</GestClientName>
                              <br />
                              <GestClientTag>Cliente desde 2021</GestClientTag>
                            </div>
                          </GestClientHead>
                          <GestClientStats>
                            <div>
                              <GestStatNum>12</GestStatNum>
                              <GestStatLabel>Compras</GestStatLabel>
                            </div>
                            <div>
                              <GestStatNum>R$ 340</GestStatNum>
                              <GestStatLabel>Ticket médio</GestStatLabel>
                            </div>
                          </GestClientStats>
                        </GestClientCard>
                      </BuildContent>
                    </BuildBlock>

                    {/* ALERTA DE ESTOQUE */}
                    <BuildBlock $left={55} $top={11} $width={45} $height={30}>
                      <BuildSketch $active={elStatus.stockBox === 'sketching'} />
                      <BuildContent $active={elStatus.stockBox === 'filled'}>
                        <GestStockBox>
                          <GestStockTitle>Estoque — atenção</GestStockTitle>
                          <GestStockRow>
                            <GestStockName>Filtro de óleo</GestStockName>
                            <GestStockBadge $t="warn">2 un</GestStockBadge>
                          </GestStockRow>
                          <GestStockRow>
                            <GestStockName>Correia dentada</GestStockName>
                            <GestStockBadge $t="err">0 un</GestStockBadge>
                          </GestStockRow>
                          <GestStockRow>
                            <GestStockName>Vela de ignição</GestStockName>
                            <GestStockBadge $t="ok">15 un</GestStockBadge>
                          </GestStockRow>
                        </GestStockBox>
                      </BuildContent>
                    </BuildBlock>

                    {/* KANBAN — ABERTA */}
                    <BuildBlock $left={16} $top={43} $width={27} $height={28}>
                      <BuildSketch $active={elStatus.kanbanAberta === 'sketching'} />
                      <BuildContent $active={elStatus.kanbanAberta === 'filled'}>
                        <GestKanbanCol>
                          <GestKanbanHead>Aberta · 1</GestKanbanHead>
                          <GestTicket $color="#9a9488">
                            <GestTicketId>#1042</GestTicketId>
                            <GestTicketDesc>Manutenção preventiva</GestTicketDesc>
                            <GestTicketBadge $color="#9a9488">Aguardando</GestTicketBadge>
                          </GestTicket>
                        </GestKanbanCol>
                      </BuildContent>
                    </BuildBlock>

                    {/* KANBAN — EM ANDAMENTO */}
                    <BuildBlock $left={44} $top={43} $width={27} $height={28}>
                      <BuildSketch $active={elStatus.kanbanAndamento === 'sketching'} />
                      <BuildContent $active={elStatus.kanbanAndamento === 'filled'}>
                        <GestKanbanCol>
                          <GestKanbanHead>Em andamento · 1</GestKanbanHead>
                          <GestTicket $color="#c9a84c">
                            <GestTicketId>#1039</GestTicketId>
                            <GestTicketDesc>Troca de peça</GestTicketDesc>
                            <GestTicketBadge $color="#c9a84c">Em execução</GestTicketBadge>
                          </GestTicket>
                        </GestKanbanCol>
                      </BuildContent>
                    </BuildBlock>

                    {/* KANBAN — CONCLUÍDA */}
                    <BuildBlock $left={72} $top={43} $width={27} $height={28}>
                      <BuildSketch $active={elStatus.kanbanConcluida === 'sketching'} />
                      <BuildContent $active={elStatus.kanbanConcluida === 'filled'}>
                        <GestKanbanCol>
                          <GestKanbanHead>Concluída · 1</GestKanbanHead>
                          <GestTicket $color="#4caf8a">
                            <GestTicketId>#1035</GestTicketId>
                            <GestTicketDesc>Instalação finalizada</GestTicketDesc>
                            <GestTicketBadge $color="#4caf8a"><Check size={9} /> Entregue</GestTicketBadge>
                          </GestTicket>
                        </GestKanbanCol>
                      </BuildContent>
                    </BuildBlock>

                    {/* NOTIFICAÇÃO */}
                    <BuildBlock $left={55} $top={74} $width={45} $height={20}>
                      <BuildSketch $active={elStatus.toast === 'sketching'} />
                      <BuildContent $active={elStatus.toast === 'filled'}>
                        <GestToast>
                          <GestToastIcon><Bell size={16} /></GestToastIcon>
                          <GestToastTextWrap>
                            <GestToastTitle>Nova OS criada — #1042</GestToastTitle>
                            <GestToastSub><GestToastDot /> agora mesmo</GestToastSub>
                          </GestToastTextWrap>
                        </GestToast>
                      </BuildContent>
                    </BuildBlock>

                    <BuildShine $run={shine} />
                    <BuildBadge $show={badge}><Check size={11} /> Sistema pronto</BuildBadge>
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

        <Section $alt><Inner><FadeIn direction="up" duration={800}><SectionTitle>Os <strong>6 módulos</strong> que transformam a operação</SectionTitle><Grid $alt>{pillars.map((p, i) => <Card $alt key={i}><CardIcon>{p.icon}</CardIcon><CardTitle>{p.title}</CardTitle><CardDesc>{p.desc}</CardDesc></Card>)}</Grid></FadeIn></Inner></Section>
        <Section><Inner><FadeIn direction="up" duration={800}><SectionTitle>O que está <strong>incluso</strong></SectionTitle><FeatureList>{features.map((f, i) => <Feature key={i}><Check size={14} />{f}</Feature>)}</FeatureList></FadeIn></Inner></Section>
        <Section $alt><Inner><FadeIn direction="up" duration={800}><SectionTitle>Como <strong>funciona</strong> o processo</SectionTitle><ProcessList>{process.map((p, i) => <ProcessItem key={i}><ProcessNum>{String(i + 1).padStart(2, '0')}</ProcessNum><div><ProcessTitle>{p.title}</ProcessTitle><ProcessDesc>{p.desc}</ProcessDesc></div></ProcessItem>)}</ProcessList></FadeIn></Inner></Section>
        <CTA><Inner><FadeIn direction="up" duration={800}>
          <GoldRule style={{ margin: '0 auto 20px' }} /><Label>Vamos conversar?</Label>
          <CTATitle>Interessado em trabalhar <strong>juntos?</strong></CTATitle>
          <CTASub>Estou em busca de novos desafios e pronta para contribuir com times que constroem produtos escaláveis e complexos.</CTASub>
          <BtnGold href="/#contato">Entrar em contato <ArrowRight size={14} /></BtnGold>
        </FadeIn></Inner></CTA>
      </Page>
      <Footer />
    </>
  );
}