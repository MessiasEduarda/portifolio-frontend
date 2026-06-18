'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import styled from 'styled-components';
import FadeIn from '../../components/ui/FadeIn';
import Link from 'next/link';
import {
  Check, ArrowLeft, ArrowRight,
  LayoutDashboard, Activity, Filter,
  Shield, Wifi, Download,
  TrendingUp, TrendingDown,
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
   PROTÓTIPO — DASHBOARD (responsivo igual Sistemas de Gestão)
   ============================================================ */

const BuildLayout = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 32px;
  align-items: start;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 24px; }
`;

const BuildFrame = styled.div`
  background: #080a0d;
  border: 1px solid rgba(255,255,255,0.07);
  box-shadow: 0 20px 60px rgba(0,0,0,0.55);
  overflow: hidden;
`;

const BuildTopBar = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 16px;
  background: #060809;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  @media (max-width: 480px) { padding: 8px 12px; }
`;

const BuildUrl = styled.span`
  font-size: 0.6rem; letter-spacing: 2px; text-transform: uppercase;
  color: #333; font-weight: 300;
  @media (max-width: 480px) { font-size: 0.46rem; letter-spacing: 1px; }
  @media (max-width: 360px) { font-size: 0.38rem; }
`;

const BuildLiveTag = styled.span`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 0.58rem; letter-spacing: 2px; text-transform: uppercase;
  color: #c9a84c; font-weight: 300;
  @media (max-width: 480px) { font-size: 0.44rem; gap: 5px; letter-spacing: 1px; }
`;

const BuildLiveDot = styled.span`
  width: 6px; height: 6px; border-radius: 50%; background: #c9a84c;
  animation: dashPulse 1.6s ease-in-out infinite;
  @keyframes dashPulse { 0%,100%{opacity:1} 50%{opacity:.3} }
`;

const BuildCanvas = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  background: #06080b;
  background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 20px 20px;
  @media (max-width: 600px) { aspect-ratio: 16 / 13; background-size: 12px 12px; }
  @media (max-width: 420px)  { aspect-ratio: 4 / 3; }
`;

const BuildCursor = styled.div`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: 16px; height: 16px;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none; z-index: 50;
  transition: left .85s cubic-bezier(.65,0,.35,1),
              top  .85s cubic-bezier(.65,0,.35,1),
              opacity .3s;
  @media (max-width: 600px) { width: 11px; height: 11px; }
  @media (max-width: 420px)  { width: 8px;  height: 8px;  }
`;

const BuildCursorTag = styled.span`
  position: absolute; left: 14px; top: 10px;
  background: #c9a84c; color: #060809;
  font-size: 0.58rem; font-weight: 600; letter-spacing: .5px;
  padding: 2px 7px; white-space: nowrap;
  @media (max-width: 600px) { font-size: 0.36rem; padding: 1px 5px; left: 10px; top: 7px; }
  @media (max-width: 420px)  { display: none; }
`;

const BuildBlock = styled.div`
  position: absolute;
  left:   ${({ $left })   => $left}%;
  top:    ${({ $top })    => $top}%;
  width:  ${({ $width })  => $width}%;
  height: ${({ $height }) => $height}%;
`;

const BuildSketch = styled.div`
  position: absolute; inset: 0;
  border: 1.5px dashed rgba(201,168,76,.35);
  opacity: ${({ $active }) => $active ? 1 : 0};
  transform: scale(${({ $active }) => $active ? 1 : 0.04});
  transform-origin: top left;
  transition: transform .5s cubic-bezier(.2,.8,.2,1), opacity .2s;
`;

const BuildContent = styled.div`
  position: absolute; inset: 0; display: flex;
  opacity: ${({ $active }) => $active ? 1 : 0};
  transform: translateY(${({ $active }) => $active ? '0' : '5px'});
  transition: opacity .5s ease, transform .5s ease;
`;

/* --- sidebar --- */
const DashSidebar = styled.nav`
  width: 100%; height: 100%;
  background: #080a0d;
  border-right: 1px solid rgba(255,255,255,0.05);
  display: flex; flex-direction: column;
  padding: 8px 0; gap: 1px;
`;

const DashSideItem = styled.div`
  display: flex; align-items: center; gap: 6px;
  padding: 4px 8px;
  font-size: 0.5rem; letter-spacing: 1px; text-transform: uppercase;
  color: ${({ $active }) => $active ? '#c9a84c' : '#2a2a2a'};
  border-left: 2px solid ${({ $active }) => $active ? '#c9a84c' : 'transparent'};
  font-weight: 300;
  @media (max-width: 600px) { font-size: 0.32rem; padding: 3px 5px; }
  @media (max-width: 420px)  { font-size: 0px; padding: 5px 4px; justify-content: center; }
`;

const DashSideDot = styled.span`
  width: 4px; height: 4px; border-radius: 50%; flex-shrink: 0;
  background: ${({ $active }) => $active ? '#c9a84c' : '#1a1a1a'};
`;

/* --- topbar do painel --- */
const DashTopRow = styled.div`
  width: 100%; height: 100%;
  background: #08090d;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  display: flex; align-items: center;
  justify-content: space-between; padding: 0 10px;
`;

const DashTopTitle = styled.span`
  font-size: 0.56rem; font-weight: 300; color: #555; letter-spacing: .5px;
  @media (max-width: 600px) { font-size: 0.34rem; }
  @media (max-width: 420px)  { font-size: 0.28rem; }
`;

const DashTopChip = styled.span`
  font-size: 0.46rem; letter-spacing: 1.5px; text-transform: uppercase;
  padding: 3px 6px; border: 1px solid rgba(201,168,76,0.22); color: #c9a84c; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.28rem; padding: 2px 4px; }
  @media (max-width: 420px)  { font-size: 0.22rem; padding: 1px 3px; }
`;

/* --- KPI card --- */
const DashKpi = styled.div`
  width: 100%; height: 100%;
  background: #0a0c10;
  border: 1px solid rgba(255,255,255,0.05);
  display: flex; flex-direction: column; justify-content: center;
  padding: 6px 10px; gap: 2px;
`;

const DashKpiLabel = styled.span`
  font-size: 0.46rem; letter-spacing: 1.5px; text-transform: uppercase;
  color: #333; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.28rem; letter-spacing: 1px; }
`;

const DashKpiValue = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(0.75rem, 1.8vw, 1.4rem);
  font-weight: 600; color: #c9a84c; line-height: 1;
  @media (max-width: 420px) { font-size: 0.65rem; }
`;

const DashKpiDelta = styled.span`
  font-size: 0.44rem; font-weight: 300; letter-spacing: .5px;
  color: ${({ $up }) => $up ? '#4caf8a' : '#c0554a'};
  display: flex; align-items: center; gap: 3px;
  svg { width: 9px; height: 9px; }
  @media (max-width: 600px) { font-size: 0.28rem; }
  @media (max-width: 420px)  { display: none; }
`;

/* --- gráfico de barras --- */
const DashChart = styled.div`
  width: 100%; height: 100%;
  background: #0a0c10;
  border: 1px solid rgba(255,255,255,0.05);
  display: flex; flex-direction: column;
  padding: 6px 10px 5px; gap: 4px;
`;

const DashChartTitle = styled.span`
  font-size: 0.46rem; letter-spacing: 1.5px; text-transform: uppercase;
  color: #444; font-weight: 300; flex-shrink: 0;
  @media (max-width: 600px) { font-size: 0.28rem; }
`;

const DashBarsWrap = styled.div`
  flex: 1; display: flex; align-items: flex-end; gap: 2px;
`;

const DashBar = styled.div`
  flex: 1;
  background: ${({ $gold }) =>
    $gold
      ? 'linear-gradient(180deg,#c9a84c 0%,#7a5c1e 100%)'
      : 'rgba(255,255,255,0.05)'};
  height: ${({ $h }) => $h}%;
  transition: height .7s cubic-bezier(.2,.8,.2,1);
`;

const DashBarLabels = styled.div`
  display: flex; gap: 2px; flex-shrink: 0;
`;

const DashBarLabel = styled.span`
  flex: 1; font-size: 0.4rem; text-align: center; color: #2a2a2a; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.24rem; }
  @media (max-width: 420px)  { display: none; }
`;

/* --- sparkline --- */
const DashSparkBox = styled.div`
  width: 100%; height: 100%;
  background: #0a0c10;
  border: 1px solid rgba(255,255,255,0.05);
  display: flex; flex-direction: column;
  padding: 6px 10px; gap: 4px;
`;

const DashSparkTitle = styled.span`
  font-size: 0.46rem; letter-spacing: 1.5px; text-transform: uppercase;
  color: #444; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.28rem; }
`;

const DashSparkSvg = styled.svg`
  flex: 1; width: 100%;
`;

/* --- tabela --- */
const DashTable = styled.div`
  width: 100%; height: 100%;
  background: #0a0c10;
  border: 1px solid rgba(255,255,255,0.05);
  display: flex; flex-direction: column; overflow: hidden;
`;

const DashTHead = styled.div`
  display: flex; padding: 3px 8px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  background: #08090d; gap: 6px;
`;

const DashTHCell = styled.span`
  flex: ${({ $f }) => $f || 1};
  font-size: 0.42rem; letter-spacing: 1px; text-transform: uppercase;
  color: #333; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.26rem; }
`;

const DashTRow = styled.div`
  display: flex; padding: 2px 8px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  gap: 6px; align-items: center;
`;

const DashTCell = styled.span`
  flex: ${({ $f }) => $f || 1};
  font-size: 0.44rem; color: #444; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.26rem; }
  @media (max-width: 420px)  { font-size: 0.2rem; }
`;

const DashBadge = styled.span`
  font-size: 0.4rem; padding: 1px 5px; border-radius: 2px;
  background: ${({ $t }) =>
    $t === 'ok'   ? 'rgba(76,175,138,0.1)'  :
    $t === 'warn' ? 'rgba(201,168,76,0.1)'  :
                    'rgba(192,85,74,0.1)'};
  color: ${({ $t }) =>
    $t === 'ok'   ? '#4caf8a' :
    $t === 'warn' ? '#c9a84c' : '#c0554a'};
  @media (max-width: 600px) { font-size: 0.24rem; padding: 1px 3px; }
`;

/* --- filtros --- */
const DashFilters = styled.div`
  width: 100%; height: 100%;
  background: #0a0c10;
  border: 1px solid rgba(255,255,255,0.05);
  display: flex; align-items: center;
  gap: 4px; padding: 0 10px; flex-wrap: wrap;
`;

const DashFilterChip = styled.span`
  font-size: 0.44rem; letter-spacing: 1px; text-transform: uppercase;
  padding: 3px 7px;
  border: 1px solid ${({ $a }) => $a ? 'rgba(201,168,76,0.45)' : 'rgba(255,255,255,0.06)'};
  color: ${({ $a }) => $a ? '#c9a84c' : '#2a2a2a'};
  font-weight: 300;
  @media (max-width: 600px) { font-size: 0.26rem; padding: 2px 4px; }
  @media (max-width: 420px)  { font-size: 0.2rem; padding: 1px 3px; }
`;

/* shine / badge */
const BuildShine = styled.div`
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(115deg,transparent 42%,rgba(201,168,76,.12) 50%,transparent 58%);
  transform: translateX(-130%);
  animation: ${({ $run }) => $run ? 'dashSweep 1.1s ease forwards' : 'none'};
  @keyframes dashSweep { to { transform: translateX(130%); } }
`;

const BuildBadge = styled.div`
  position: absolute; top: 10px; right: 10px;
  display: flex; align-items: center; gap: 5px;
  background: #080a0d; border: 1px solid #c9a84c;
  color: #c9a84c; font-size: 0.52rem; letter-spacing: 1px;
  text-transform: uppercase; padding: 4px 10px;
  opacity: ${({ $show }) => $show ? 1 : 0};
  transition: opacity .4s;
  svg { width: 10px; height: 10px; }
  @media (max-width: 480px) { font-size: 0.38rem; padding: 3px 7px; top: 7px; right: 7px; }
`;

/* steps lateral */
const BuildSteps = styled.div`
  display: flex; flex-direction: column;
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
  display: grid; grid-template-columns: 44px 1fr;
  gap: 14px; padding: 18px 20px; background: #0d1117;
  @media (max-width: 1024px) { padding: 14px 16px; gap: 10px; }
  @media (max-width: 640px)  { grid-template-columns: 30px 1fr; gap: 8px; padding: 12px 14px; }
`;

const BuildStepNum = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: 1.4rem; font-weight: 300; line-height: 1;
  color: ${({ $state }) => $state === 'idle' ? '#222' : '#c9a84c'};
  transition: color .3s;
  @media (max-width: 640px) { font-size: 1rem; }
`;

const BuildStepTitle = styled.h4`
  font-size: 0.76rem; font-weight: 400; letter-spacing: .3px; margin-bottom: 4px;
  color: ${({ $state }) => $state === 'idle' ? '#555' : '#ddd'};
  transition: color .3s;
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

const CardIcon = styled.div`color: #c9a84c; margin-bottom: 20px;`;
const CardTitle = styled.h3`
  font-size: clamp(0.9rem,1.4vw,1rem); font-weight: 400; color: #ddd;
  margin-bottom: 12px; letter-spacing: 0.3px;
`;
const CardDesc = styled.p`font-size: 0.83rem; color: #555; line-height: 1.85; font-weight: 300;`;

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

const ProcessNum = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: 2rem; font-weight: 300; color: #222; line-height: 1;
`;

const ProcessTitle = styled.h3`font-size: 0.95rem; font-weight: 400; color: #ddd; margin-bottom: 8px; letter-spacing: 0.3px;`;
const ProcessDesc  = styled.p`font-size: 0.82rem; color: #555; line-height: 1.85; font-weight: 300;`;

const CTA = styled.section`
  padding: 100px 48px; background: #090c10;
  border-top: 1px solid rgba(255,255,255,0.04); text-align: center;
  @media (max-width: 768px) { padding: 72px 24px; }
`;

const CTATitle = styled.h2`
  font-size: clamp(1.6rem,3.5vw,2.6rem); font-weight: 300; color: #fff;
  margin-bottom: 16px; strong { font-weight: 600; }
`;

const CTASub = styled.p`
  font-size: clamp(0.85rem,1.3vw,0.95rem); color: #555; line-height: 1.9;
  font-weight: 300; max-width: 520px; margin: 0 auto 40px;
`;

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
  { icon: <Activity size={22}/>, title: 'Dados em Tempo Real',    desc: 'WebSockets e polling inteligente para atualização automática dos indicadores — sem precisar recarregar a página.' },
  { icon: <Filter size={22}/>,   title: 'Filtros e Segmentação',  desc: 'Filtros por período, equipe, produto, região ou qualquer dimensão relevante para o negócio, com aplicação instantânea.' },
  { icon: <LayoutDashboard size={22}/>, title: 'KPIs Visuais',   desc: 'Gráficos de linha, barras, pizza e funis construídos com Recharts — elegantes, responsivos e com drill-down por clique.' },
  { icon: <Shield size={22}/>,   title: 'Controle de Permissões', desc: 'Cada perfil de usuário vê apenas os dados e ações que lhe cabem — sem risco de acesso indevido a informações sensíveis.' },
  { icon: <Wifi size={22}/>,     title: 'Integração com APIs',    desc: 'Conexão com qualquer fonte de dados via API REST, banco de dados ou webhooks — integramos com o que a empresa já usa.' },
  { icon: <Download size={22}/>, title: 'Exportação de Relatórios', desc: 'Exportação em PDF e Excel com um clique — formatados para apresentação, não para análise técnica.' },
];

const features = [
  'Gráficos em tempo real com WebSockets',
  'Filtros dinâmicos por múltiplas dimensões',
  'KPIs customizados por negócio',
  'Exportação PDF e Excel',
  'Controle de acesso por perfil',
  'Integração com APIs externas',
  'Responsivo para tablet e desktop',
  'Histórico e comparativo de períodos',
];

const process = [
  { title: 'Levantamento de Métricas',  desc: 'Identificamos quais KPIs realmente importam para as decisões do negócio — evitando dashboards bonitos mas inúteis.' },
  { title: 'Mapeamento de Fontes',       desc: 'Mapeamos de onde vêm os dados: banco próprio, API externa, planilha ou integração com sistema legado.' },
  { title: 'Protótipo Visual',           desc: 'Criamos um wireframe do dashboard para aprovação antes de desenvolver — garantindo que os dados estão no lugar certo.' },
  { title: 'Desenvolvimento e Integração', desc: 'Desenvolvimento front-end com React/Next.js, integração com as APIs de dados e configuração dos WebSockets onde necessário.' },
  { title: 'Validação com o Time',       desc: 'Sessão de validação com os usuários reais do dashboard — ajustamos filtros, gráficos e permissões com base no uso real.' },
];

/* ============================================================
   ANIMAÇÃO DO PROTÓTIPO
   ============================================================ */
const buildSequence = [
  { id: 'sidebar',   x: 1,  y: 8,  label: 'Sidebar.tsx',      step: 1 },
  { id: 'topbar',    x: 16, y: 3,  label: 'Topbar.tsx',       step: 2 },
  { id: 'filters',   x: 16, y: 11, label: 'FilterBar.tsx',    step: 3 },
  { id: 'kpi1',      x: 16, y: 19, label: 'KpiCard.tsx',      step: 4 },
  { id: 'kpi2',      x: 40, y: 19, label: 'KpiCard.tsx',      step: 4 },
  { id: 'kpi3',      x: 64, y: 19, label: 'KpiCard.tsx',      step: 4 },
  { id: 'chart',     x: 16, y: 40, label: 'BarChart.tsx',     step: 5 },
  { id: 'spark',     x: 64, y: 40, label: 'Sparkline.tsx',    step: 5 },
  { id: 'table',     x: 16, y: 70, label: 'DataTable.tsx',    step: 6 },
];

const buildStepsMeta = [
  { num: 1, title: 'Estrutura de navegação', desc: 'Sidebar com rotas e controle de acesso.' },
  { num: 2, title: 'Cabeçalho do painel',    desc: 'Contexto, período ativo e ações rápidas.' },
  { num: 3, title: 'Barra de filtros',       desc: 'Segmentação dinâmica sem recarregar.' },
  { num: 4, title: 'Cards de KPI',           desc: 'Métricas principais com variação em tempo real.' },
  { num: 5, title: 'Visualizações',          desc: 'Barras, linhas e tendências históricas.' },
  { num: 6, title: 'Tabela de dados',        desc: 'Registros detalhados com status e ações.' },
];

const initialElStatus = {
  sidebar: 'idle', topbar: 'idle', filters: 'idle',
  kpi1: 'idle', kpi2: 'idle', kpi3: 'idle',
  chart: 'idle', spark: 'idle', table: 'idle',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const BAR_HEIGHTS = [38, 55, 42, 70, 58, 88, 62, 75, 50, 92, 68, 80];

const sparkPoints = [10,22,18,35,28,42,38,55,48,60,52,72];
function toPolyline(pts, w = 100, h = 36) {
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const range = max - min || 1;
  return pts
    .map((v, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(' ');
}

export default function Dashboards() {
  const [elStatus, setElStatus] = useState(initialElStatus);
  const [cursor, setCursor] = useState({ x: 1, y: 8, label: 'Sidebar.tsx', visible: false });
  const [activeStep, setActiveStep] = useState(0);
  const [shine, setShine] = useState(false);
  const [badge, setBadge] = useState(false);
  const [barHeights, setBarHeights] = useState(BAR_HEIGHTS.map(() => 0));
  const [sparkVisible, setSparkVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      while (!cancelled) {
        setElStatus(initialElStatus);
        setBarHeights(BAR_HEIGHTS.map(() => 0));
        setSparkVisible(false);
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
          await sleep(700);
          if (cancelled) return;

          setElStatus((prev) => ({ ...prev, [cfg.id]: 'sketching' }));
          await sleep(480);
          if (cancelled) return;

          setElStatus((prev) => ({ ...prev, [cfg.id]: 'filled' }));

          if (cfg.id === 'chart') setBarHeights(BAR_HEIGHTS);
          if (cfg.id === 'spark') setSparkVisible(true);

          await sleep(380);
        }

        if (cancelled) return;
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
              <GoldRule />
              <Label>Capacidade Técnica</Label>
              <HeroTitle>Dashboards &amp; <strong>Painéis Administrativos</strong></HeroTitle>
              <HeroSub>
                Dados visuais e centralizados para decisões mais rápidas — painéis com KPIs em
                tempo real, filtros inteligentes e integração com qualquer fonte de dados.
              </HeroSub>
              <Tags>
                {['React', 'TypeScript', 'Recharts', 'APIs REST', 'WebSockets', 'Next.js'].map((t, i) => (
                  <Tag key={i}>{t}</Tag>
                ))}
              </Tags>
            </FadeIn>
          </Inner>
        </Hero>

        <Section>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Veja um painel <strong>ganhando vida</strong></SectionTitle>
              <BuildLayout>

                <BuildFrame>
                  <BuildTopBar>
                    <BuildUrl>app.empresa.com.br/dashboard</BuildUrl>
                    <BuildLiveTag><BuildLiveDot /> atualizando ao vivo</BuildLiveTag>
                  </BuildTopBar>

                  <BuildCanvas>
                    <BuildCursor $x={cursor.x} $y={cursor.y} $visible={cursor.visible}>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M1 1 L1 13 L4.5 10.2 L7 15 L9 14 L6.5 9 L11 9 Z"
                          fill="#111" stroke="#faf7f0" strokeWidth={0.6} />
                      </svg>
                      <BuildCursorTag>{cursor.label}</BuildCursorTag>
                    </BuildCursor>

                    {/* SIDEBAR */}
                    <BuildBlock $left={0} $top={0} $width={14} $height={100}>
                      <BuildSketch $active={elStatus.sidebar === 'sketching'} />
                      <BuildContent $active={elStatus.sidebar === 'filled'}>
                        <DashSidebar>
                          {['Overview','Vendas','Equipe','Produtos','Relatórios','Config'].map((item, i) => (
                            <DashSideItem key={i} $active={i === 0}>
                              <DashSideDot $active={i === 0} />
                              {item}
                            </DashSideItem>
                          ))}
                        </DashSidebar>
                      </BuildContent>
                    </BuildBlock>

                    {/* TOPBAR */}
                    <BuildBlock $left={14} $top={0} $width={86} $height={9}>
                      <BuildSketch $active={elStatus.topbar === 'sketching'} />
                      <BuildContent $active={elStatus.topbar === 'filled'}>
                        <DashTopRow>
                          <DashTopTitle>Overview — Junho 2025</DashTopTitle>
                          <div style={{ display:'flex', gap: 5 }}>
                            <DashTopChip>7 dias</DashTopChip>
                            <DashTopChip>30 dias</DashTopChip>
                            <DashTopChip style={{ borderColor:'rgba(201,168,76,0.5)', color:'#c9a84c' }}>
                              Este mês ▾
                            </DashTopChip>
                          </div>
                        </DashTopRow>
                      </BuildContent>
                    </BuildBlock>

                    {/* FILTROS */}
                    <BuildBlock $left={14} $top={10} $width={86} $height={8}>
                      <BuildSketch $active={elStatus.filters === 'sketching'} />
                      <BuildContent $active={elStatus.filters === 'filled'}>
                        <DashFilters>
                          {['Todos','Marketing','Vendas','Suporte','Produto'].map((f, i) => (
                            <DashFilterChip key={i} $a={i === 0}>{f}</DashFilterChip>
                          ))}
                        </DashFilters>
                      </BuildContent>
                    </BuildBlock>

                    {/* KPI 1 */}
                    <BuildBlock $left={14} $top={19} $width={24} $height={18}>
                      <BuildSketch $active={elStatus.kpi1 === 'sketching'} />
                      <BuildContent $active={elStatus.kpi1 === 'filled'}>
                        <DashKpi>
                          <DashKpiLabel>Receita total</DashKpiLabel>
                          <DashKpiValue>R$ 84.320</DashKpiValue>
                          <DashKpiDelta $up>
                            <TrendingUp size={9}/> +12,4% vs mês anterior
                          </DashKpiDelta>
                        </DashKpi>
                      </BuildContent>
                    </BuildBlock>

                    {/* KPI 2 */}
                    <BuildBlock $left={40} $top={19} $width={24} $height={18}>
                      <BuildSketch $active={elStatus.kpi2 === 'sketching'} />
                      <BuildContent $active={elStatus.kpi2 === 'filled'}>
                        <DashKpi>
                          <DashKpiLabel>Novos clientes</DashKpiLabel>
                          <DashKpiValue>348</DashKpiValue>
                          <DashKpiDelta $up>
                            <TrendingUp size={9}/> +8,1% vs mês anterior
                          </DashKpiDelta>
                        </DashKpi>
                      </BuildContent>
                    </BuildBlock>

                    {/* KPI 3 */}
                    <BuildBlock $left={64} $top={19} $width={36} $height={18}>
                      <BuildSketch $active={elStatus.kpi3 === 'sketching'} />
                      <BuildContent $active={elStatus.kpi3 === 'filled'}>
                        <DashKpi>
                          <DashKpiLabel>Taxa de conversão</DashKpiLabel>
                          <DashKpiValue>3,87%</DashKpiValue>
                          <DashKpiDelta>
                            <TrendingDown size={9}/> -0,3% vs mês anterior
                          </DashKpiDelta>
                        </DashKpi>
                      </BuildContent>
                    </BuildBlock>

                    {/* GRÁFICO BARRAS */}
                    <BuildBlock $left={14} $top={39} $width={48} $height={28}>
                      <BuildSketch $active={elStatus.chart === 'sketching'} />
                      <BuildContent $active={elStatus.chart === 'filled'}>
                        <DashChart>
                          <DashChartTitle>Receita por semana</DashChartTitle>
                          <DashBarsWrap>
                            {barHeights.map((h, i) => (
                              <DashBar key={i} $h={h} $gold={i === 11} />
                            ))}
                          </DashBarsWrap>
                          <DashBarLabels>
                            {['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'].map((m, i) => (
                              <DashBarLabel key={i}>{m}</DashBarLabel>
                            ))}
                          </DashBarLabels>
                        </DashChart>
                      </BuildContent>
                    </BuildBlock>

                    {/* SPARKLINE */}
                    <BuildBlock $left={64} $top={39} $width={36} $height={28}>
                      <BuildSketch $active={elStatus.spark === 'sketching'} />
                      <BuildContent $active={elStatus.spark === 'filled'}>
                        <DashSparkBox>
                          <DashSparkTitle>Tendência — 12 meses</DashSparkTitle>
                          <DashSparkSvg viewBox="0 0 100 36" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="spGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.25"/>
                                <stop offset="100%" stopColor="#c9a84c" stopOpacity="0"/>
                              </linearGradient>
                            </defs>
                            {sparkVisible && (
                              <>
                                <polygon
                                  points={`0,36 ${toPolyline(sparkPoints)} 100,36`}
                                  fill="url(#spGrad)"
                                />
                                <polyline
                                  points={toPolyline(sparkPoints)}
                                  fill="none"
                                  stroke="#c9a84c"
                                  strokeWidth="1.5"
                                  strokeLinejoin="round"
                                  strokeLinecap="round"
                                />
                              </>
                            )}
                          </DashSparkSvg>
                        </DashSparkBox>
                      </BuildContent>
                    </BuildBlock>

                    {/* TABELA */}
                    <BuildBlock $left={14} $top={69} $width={86} $height={29}>
                      <BuildSketch $active={elStatus.table === 'sketching'} />
                      <BuildContent $active={elStatus.table === 'filled'}>
                        <DashTable>
                          <DashTHead>
                            <DashTHCell $f={2}>Cliente</DashTHCell>
                            <DashTHCell>Valor</DashTHCell>
                            <DashTHCell>Canal</DashTHCell>
                            <DashTHCell>Status</DashTHCell>
                          </DashTHead>
                          {[
                            ['Empresa Alfa Ltda',   'R$ 12.400', 'Inbound',  'ok'],
                            ['Beta Soluções',       'R$  8.750', 'Outbound', 'warn'],
                            ['Gamma Tech',          'R$ 21.000', 'Indicação', 'ok'],
                            ['Delta Varejo',        'R$  4.320', 'Ads',      'err'],
                            ['Epsilon Corp',        'R$ 16.900', 'Parceiro', 'ok'],
                          ].map(([nome, val, canal, tipo], i) => (
                            <DashTRow key={i}>
                              <DashTCell $f={2}>{nome}</DashTCell>
                              <DashTCell>{val}</DashTCell>
                              <DashTCell>{canal}</DashTCell>
                              <DashTCell>
                                <DashBadge $t={tipo}>
                                  {tipo === 'ok' ? 'Fechado' : tipo === 'warn' ? 'Em andamento' : 'Perdido'}
                                </DashBadge>
                              </DashTCell>
                            </DashTRow>
                          ))}
                        </DashTable>
                      </BuildContent>
                    </BuildBlock>

                    <BuildShine $run={shine} />
                    <BuildBadge $show={badge}><Check size={11} /> Painel pronto</BuildBadge>
                  </BuildCanvas>
                </BuildFrame>

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

        <Section $alt>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>O que faz um dashboard <strong>realmente útil</strong></SectionTitle>
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

        <CTA>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <GoldRule style={{ margin: '0 auto 20px' }} />
              <Label>Vamos conversar?</Label>
              <CTATitle>Interessado em trabalhar <strong>juntos?</strong></CTATitle>
              <CTASub>
                Estou em busca de novos desafios e pronta para contribuir com times que
                trabalham com dados e produtos complexos.
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