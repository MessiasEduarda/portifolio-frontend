'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import styled from 'styled-components';
import FadeIn from '../../components/ui/FadeIn';
import Link from 'next/link';
import { Check, ArrowLeft, ArrowRight, Layers, Lock, CreditCard, Users, Rocket, GitBranch, KeyRound } from 'lucide-react';

const Page = styled.main`background: #080a0d; min-height: 100vh;`;
const Hero = styled.section`
  padding: 160px 48px 100px; background: #090c10; border-bottom: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 1024px) { padding: 140px 40px 80px; }
  @media (max-width: 768px)  { padding: 120px 24px 64px; }
  @media (max-width: 480px)  { padding: 100px 16px 48px; }
`;
const Inner = styled.div`max-width: 1200px; margin: 0 auto;`;
const BackLink = styled(Link)`display: inline-flex; align-items: center; gap: 8px; font-size: 0.62rem; letter-spacing: 3px; text-transform: uppercase; color: #444; font-weight: 300; margin-bottom: 48px; transition: color 0.3s; &:hover { color: #c9a84c; }`;
const GoldRule = styled.div`width: 32px; height: 1px; background: #c9a84c; margin-bottom: 20px;`;
const Label = styled.p`font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase; color: #c9a84c; font-weight: 300; margin-bottom: 16px;`;
const HeroTitle = styled.h1`font-family: var(--font-cormorant), serif; font-size: clamp(2.4rem, 5.5vw, 4.5rem); font-weight: 400; color: #fff; line-height: 1.15; letter-spacing: -0.5px; max-width: 820px; margin-bottom: 28px; strong { font-weight: 700; color: #c9a84c; }`;
const HeroSub = styled.p`font-size: clamp(0.9rem, 1.4vw, 1.05rem); color: #666; line-height: 1.95; font-weight: 300; max-width: 620px; margin-bottom: 48px;`;
const Tags = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;
const Tag = styled.span`font-size: 0.6rem; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c; border: 1px solid rgba(201,168,76,0.2); padding: 5px 14px; font-weight: 300;`;

/* ============================================================
   PROTÓTIPO — ADMIN MULTI-TENANT (responsivo igual Sistemas de Gestão)
   ============================================================ */
const BuildLayout = styled.div`
  display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px; align-items: start;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 24px; }
`;

const BuildFrame = styled.div`
  background: #faf7f0; border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 20px 60px rgba(0,0,0,0.25); overflow: hidden;
`;

const BuildTopBar = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 16px; background: #f2ede1; border-bottom: 1px solid rgba(0,0,0,0.08);
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
  animation: saasPulse 1.6s ease-in-out infinite;
  @keyframes saasPulse { 0%,100% { opacity: 1; } 50% { opacity: .3; } }
`;

const BuildCanvas = styled.div`
  position: relative; aspect-ratio: 16 / 10.5;
  background-image: radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px);
  background-size: 18px 18px;
  @media (max-width: 600px) { aspect-ratio: 16 / 13; background-size: 12px 12px; }
  @media (max-width: 420px)  { aspect-ratio: 4 / 3; }
`;

const BuildCursor = styled.div`
  position: absolute; left: ${({ $x }) => $x}%; top: ${({ $y }) => $y}%;
  width: 16px; height: 16px; opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none; z-index: 50;
  transition: left .85s cubic-bezier(.65,0,.35,1), top .85s cubic-bezier(.65,0,.35,1), opacity .3s;
  @media (max-width: 600px) { width: 11px; height: 11px; }
  @media (max-width: 420px)  { width: 8px;  height: 8px;  }
`;

const BuildCursorTag = styled.span`
  position: absolute; left: 14px; top: 10px; background: #c9a84c; color: #0d1117;
  font-size: 0.58rem; font-weight: 600; letter-spacing: .5px; padding: 2px 7px; white-space: nowrap;
  @media (max-width: 600px) { font-size: 0.36rem; padding: 1px 5px; left: 10px; top: 7px; }
  @media (max-width: 420px)  { display: none; }
`;

const BuildBlock = styled.div`
  position: absolute; left: ${({ $left }) => $left}%; top: ${({ $top }) => $top}%;
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

/* --- navbar com seletor de workspace --- */
const SaasNavRow = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; height: 100%; padding: 0 14px; background: rgba(8,7,6,0.88);
`;

const SaasNavMark = styled.div`display: flex; align-items: center; gap: 6px; color: #c9a84c;`;

const SaasNavLabel = styled.span`
  font-size: 0.5rem; letter-spacing: 1.5px; text-transform: uppercase; color: #f1ede4; font-weight: 500;
  @media (max-width: 600px) { font-size: 0.34rem; letter-spacing: 1px; }
  @media (max-width: 420px)  { display: none; }
`;

const SaasTenantPill = styled.span`
  display: inline-flex; align-items: center; gap: 6px;
  border: 1px solid rgba(201,168,76,0.45); color: #c9a84c;
  font-size: 0.48rem; letter-spacing: 1px; padding: 4px 10px; text-transform: uppercase;
  @media (max-width: 600px) { font-size: 0.3rem; padding: 3px 6px; }
  @media (max-width: 420px)  { font-size: 0.24rem; padding: 2px 5px; }
`;

/* --- cards de plano --- */
const SaasPlanCard = styled.div`
  width: 100%; height: 100%; position: relative; background: #ffffff;
  border: 1.5px solid ${({ $highlight }) => $highlight ? '#c9a84c' : 'rgba(0,0,0,0.07)'};
  display: flex; flex-direction: column; gap: 4px; padding: 10px 12px; justify-content: center;
`;

const SaasPlanTag = styled.span`
  position: absolute; top: -1px; right: -1px; background: #c9a84c; color: #161412;
  font-size: 0.38rem; letter-spacing: 1px; text-transform: uppercase; padding: 2px 7px; font-weight: 600;
  @media (max-width: 600px) { font-size: 0.26rem; padding: 1px 4px; }
  @media (max-width: 420px)  { display: none; }
`;

const SaasPlanName = styled.span`
  font-size: 0.5rem; letter-spacing: 1.5px; text-transform: uppercase; color: #9a9488; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.32rem; letter-spacing: 1px; }
  @media (max-width: 420px)  { font-size: 0.26rem; }
`;

const SaasPlanPrice = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(0.7rem, 1.6vw, 1.1rem);
  font-weight: 700; color: ${({ $highlight }) => $highlight ? '#c9a84c' : '#161412'};
  @media (max-width: 420px) { font-size: 0.5rem; }
`;

const SaasPlanFeature = styled.span`
  font-size: 0.46rem; color: #6b6760; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.3rem; }
  @media (max-width: 420px)  { display: none; }
`;

/* --- chips de RBAC --- */
const SaasRbacBox = styled.div`
  width: 100%; height: 100%; background: #ffffff;
  border: 1px solid rgba(0,0,0,.07); display: flex; align-items: center;
  gap: 5px; padding: 0 10px; flex-wrap: wrap;
`;

const SaasRoleChip = styled.span`
  font-size: 0.46rem; letter-spacing: .5px; padding: 4px 8px;
  border: 1px solid ${({ $admin }) => $admin ? 'rgba(201,168,76,0.5)' : 'rgba(0,0,0,0.08)'};
  color: ${({ $admin }) => $admin ? '#8a6d1f' : '#6b6760'}; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.3rem; padding: 3px 5px; }
  @media (max-width: 420px)  { font-size: 0.24rem; padding: 2px 4px; }
`;

/* --- widget de MRR (escuro) --- */
const SaasMrrBox = styled.div`
  width: 100%; height: 100%; background: #1b1916;
  border: 1px solid rgba(255,255,255,.08); display: flex; flex-direction: column;
  align-items: flex-start; justify-content: center; gap: 5px; padding: 10px 14px;
`;

const SaasMrrNum = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(0.85rem, 2vw, 1.4rem);
  font-weight: 600; color: #c9a84c; line-height: 1;
  @media (max-width: 420px) { font-size: 0.7rem; }
`;

const SaasMrrRule = styled.div`width: 16px; height: 1px; background: #c9a84c;`;

const SaasMrrLabel = styled.span`
  font-size: 0.5rem; letter-spacing: 1px; text-transform: uppercase; color: #c9c4b8;
  @media (max-width: 600px) { font-size: 0.3rem; }
  @media (max-width: 420px)  { font-size: 0.24rem; }
`;

/* --- selo de isolamento --- */
const SaasIsoBox = styled.div`
  width: 100%; height: 100%; background: #ffffff;
  border: 1px solid rgba(0,0,0,.07); display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 5px; text-align: center; padding: 6px;
`;

const SaasIsoTenant = styled.span`
  font-size: 0.62rem; color: #161412; font-weight: 600;
  @media (max-width: 600px) { font-size: 0.4rem; }
  @media (max-width: 420px)  { font-size: 0.32rem; }
`;

const SaasIsoCheck = styled.span`
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 0.44rem; color: #3f9c78; letter-spacing: .5px; text-transform: uppercase; font-weight: 600;
  svg { width: 9px; height: 9px; }
  @media (max-width: 600px) { font-size: 0.28rem; }
  @media (max-width: 420px)  { font-size: 0.22rem; }
`;

/* --- caixa de API key (estilo terminal) --- */
const SaasApiBox = styled.div`
  width: 100%; height: 100%; background: #0d0d0d;
  border: 1px solid rgba(255,255,255,.08); display: flex; flex-direction: column;
  gap: 6px; padding: 10px 12px;
`;

const SaasApiHead = styled.div`display: flex; align-items: center; justify-content: space-between;`;

const SaasApiLabel = styled.span`
  font-size: 0.44rem; letter-spacing: 1px; text-transform: uppercase; color: #6b6760; font-weight: 300;
  @media (max-width: 600px) { font-size: 0.28rem; }
`;

const SaasApiRegen = styled.span`
  font-size: 0.4rem; letter-spacing: .5px; text-transform: uppercase; color: #c9a84c;
  border: 1px solid rgba(201,168,76,0.4); padding: 2px 6px;
  @media (max-width: 600px) { font-size: 0.26rem; padding: 1px 4px; }
  @media (max-width: 420px)  { display: none; }
`;

const SaasApiKey = styled.span`
  font-family: 'Courier New', monospace;
  font-size: 0.56rem; color: #c9a84c; letter-spacing: .5px;
  @media (max-width: 600px) { font-size: 0.34rem; }
  @media (max-width: 420px)  { font-size: 0.28rem; }
`;

/* --- brilho / selo final --- */
const BuildShine = styled.div`
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(115deg, transparent 42%, rgba(201,168,76,.35) 50%, transparent 58%);
  transform: translateX(-130%);
  animation: ${({ $run }) => $run ? 'saasSweep 1.1s ease forwards' : 'none'};
  @keyframes saasSweep { to { transform: translateX(130%); } }
`;

const BuildBadge = styled.div`
  position: absolute; top: 10px; right: 10px; display: flex; align-items: center; gap: 5px;
  background: #faf7f0; border: 1px solid #c9a84c; color: #8a6d1f;
  font-size: 0.52rem; letter-spacing: 1px; text-transform: uppercase; padding: 4px 10px;
  opacity: ${({ $show }) => $show ? 1 : 0}; transition: opacity .4s;
  svg { width: 10px; height: 10px; }
  @media (max-width: 480px) { font-size: 0.38rem; padding: 3px 7px; top: 7px; right: 7px; }
`;

/* --- steps lateral --- */
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
  { icon: <Lock size={22} />, title: 'Isolamento Total de Dados', desc: 'Cada cliente (tenant) tem seus dados completamente isolados. Nenhum dado vaza entre contas — seja por banco, schema ou lógica de aplicação.' },
  { icon: <CreditCard size={22} />, title: 'Planos e Cobrança Recorrente', desc: 'Integração com Stripe ou Pix para assinaturas mensais/anuais, controle de planos e gestão de inadimplência automatizada.' },
  { icon: <Users size={22} />, title: 'Controle de Acesso (RBAC)', desc: 'Permissões granulares por perfil: admin, gerente, operador, visualizador — cada usuário vê e faz apenas o que deve.' },
  { icon: <Rocket size={22} />, title: 'Onboarding Automatizado', desc: 'Novos clientes se cadastram, pagam e já acessam o sistema — sem intervenção manual. Fluxo completo de self-service.' },
  { icon: <Layers size={22} />, title: 'Arquitetura Escalável', desc: 'Estrutura preparada para crescer: de 10 para 10.000 clientes sem reescrever o sistema, com infraestrutura cloud-ready.' },
  { icon: <GitBranch size={22} />, title: 'API e Integrações', desc: 'API REST documentada para integrações externas, webhooks para eventos críticos e suporte a sistemas legados.' },
];

const features = [
  'Multi-tenant com dados isolados por schema', 'Autenticação JWT com refresh token',
  'Planos de assinatura (mensal/anual)', 'Painel admin por tenant',
  'Onboarding self-service completo', 'Relatórios e métricas por tenant',
  'API REST documentada (Swagger)', 'Deploy em cloud (Railway/Render/AWS)',
];

const process = [
  { title: 'Mapeamento do Produto', desc: 'Entendemos o modelo de negócio, os perfis de cliente, os módulos do sistema e os fluxos críticos antes de qualquer linha de código.' },
  { title: 'Arquitetura e Modelagem', desc: 'Definimos a estratégia de isolamento (schema-per-tenant ou row-level), o modelo de dados, as entidades e os fluxos de autenticação.' },
  { title: 'Desenvolvimento por Módulos', desc: 'Desenvolvemos em sprints: autenticação e multi-tenant primeiro, depois os módulos de negócio, cobrança e painel admin.' },
  { title: 'Testes e Segurança', desc: 'Testes de isolamento entre tenants, testes de carga, revisão de segurança e validação dos fluxos de cobrança antes do go-live.' },
  { title: 'Deploy e Monitoramento', desc: 'Deploy em produção com CI/CD, monitoramento de erros (Sentry), logs estruturados e documentação técnica completa.' },
];

/* ============================================================
   ANIMAÇÃO DO PROTÓTIPO
   ============================================================ */
const initialElStatus = {
  navbar: 'idle', plan1: 'idle', plan2: 'idle', plan3: 'idle',
  rbac: 'idle', mrr: 'idle', isolation: 'idle', apikey: 'idle',
};

const buildSequence = [
  { id: 'navbar',    x: 2,  y: 3,  label: 'TenantSwitcher.tsx', step: 1 },
  { id: 'plan1',    x: 6,  y: 18, label: 'PlanCard.tsx',        step: 2 },
  { id: 'plan2',    x: 38, y: 18, label: 'PlanCard.tsx',        step: 2 },
  { id: 'plan3',    x: 70, y: 18, label: 'PlanCard.tsx',        step: 2 },
  { id: 'rbac',     x: 6,  y: 50, label: 'RoleBadges.tsx',      step: 3 },
  { id: 'mrr',      x: 6,  y: 64, label: 'MrrWidget.tsx',       step: 4 },
  { id: 'isolation',x: 38, y: 64, label: 'IsolationCheck.tsx',  step: 5 },
  { id: 'apikey',   x: 70, y: 64, label: 'ApiKeyBox.tsx',       step: 6 },
];

const buildStepsMeta = [
  { num: 1, title: 'Estrutura multi-tenant', desc: 'Navbar com seletor de workspace ativo.' },
  { num: 2, title: 'Planos e cobrança',      desc: 'Estrutura de assinatura por tenant.' },
  { num: 3, title: 'Controle de acesso',     desc: 'Permissões por papel (RBAC).' },
  { num: 4, title: 'Métricas de receita',    desc: 'Acompanhamento de MRR em tempo real.' },
  { num: 5, title: 'Isolamento de dados',    desc: 'Verificação automática por tenant.' },
  { num: 6, title: 'Chaves de API',          desc: 'Acesso programático seguro e auditável.' },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function SaaS() {
  const [elStatus, setElStatus] = useState(initialElStatus);
  const [cursor, setCursor] = useState({ x: 2, y: 3, label: 'TenantSwitcher.tsx', visible: false });
  const [activeStep, setActiveStep] = useState(0);
  const [shine, setShine] = useState(false);
  const [badge, setBadge] = useState(false);
  const [mrr, setMrr] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const rafIds = [];

    function animateMrr(target) {
      const start = performance.now();
      const duration = 850;
      function frame(now) {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setMrr(Math.round(target * eased));
        if (t < 1) rafIds.push(requestAnimationFrame(frame));
      }
      rafIds.push(requestAnimationFrame(frame));
    }

    async function run() {
      while (!cancelled) {
        setElStatus(initialElStatus);
        setMrr(0);
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
          if (cfg.id === 'mrr') animateMrr(128);
          await sleep(420);
        }

        if (cancelled) return;
        setActiveStep(7);
        setCursor((c) => ({ ...c, visible: false }));
        await sleep(300);
        if (cancelled) return;
        setShine(true);
        await sleep(700);
        if (cancelled) return;
        setBadge(true);
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
              <GoldRule /><Label>Capacidade Técnica</Label>
              <HeroTitle>Sistemas <strong>Multi-Tenant (SaaS)</strong></HeroTitle>
              <HeroSub>Uma plataforma, vários clientes, dados 100% isolados. A arquitetura certa para escalar o mesmo sistema para múltiplas empresas — construída para crescer desde o primeiro dia.</HeroSub>
              <Tags>{['Next.js', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Stripe'].map((t, i) => <Tag key={i}>{t}</Tag>)}</Tags>
            </FadeIn>
          </Inner>
        </Hero>

        {/* PROTÓTIPO ANIMADO */}
        <Section>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Veja a arquitetura <strong>em ação</strong></SectionTitle>
              <BuildLayout>
                <BuildFrame>
                  <BuildTopBar>
                    <BuildUrl>app.suaplataforma.com/admin</BuildUrl>
                    <BuildLiveTag><BuildLiveDot /> multi-tenant ao vivo</BuildLiveTag>
                  </BuildTopBar>
                  <BuildCanvas>
                    <BuildCursor $x={cursor.x} $y={cursor.y} $visible={cursor.visible}>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M1 1 L1 13 L4.5 10.2 L7 15 L9 14 L6.5 9 L11 9 Z" fill="#111111" stroke="#faf7f0" strokeWidth={0.6} />
                      </svg>
                      <BuildCursorTag>{cursor.label}</BuildCursorTag>
                    </BuildCursor>

                    {/* NAVBAR + SELETOR DE WORKSPACE */}
                    <BuildBlock $left={0} $top={0} $width={100} $height={11}>
                      <BuildSketch $active={elStatus.navbar === 'sketching'} />
                      <BuildContent $active={elStatus.navbar === 'filled'}>
                        <SaasNavRow>
                          <SaasNavMark>
                            <Layers size={14} strokeWidth={2} />
                            <SaasNavLabel>Plataforma</SaasNavLabel>
                          </SaasNavMark>
                          <SaasTenantPill>Empresa Alfa ▾</SaasTenantPill>
                        </SaasNavRow>
                      </BuildContent>
                    </BuildBlock>

                    {/* PLANO — STARTER */}
                    <BuildBlock $left={3} $top={16} $width={30} $height={28}>
                      <BuildSketch $active={elStatus.plan1 === 'sketching'} />
                      <BuildContent $active={elStatus.plan1 === 'filled'}>
                        <SaasPlanCard>
                          <SaasPlanName>Starter</SaasPlanName>
                          <SaasPlanPrice>R$ 97/mês</SaasPlanPrice>
                          <SaasPlanFeature>Até 3 usuários</SaasPlanFeature>
                        </SaasPlanCard>
                      </BuildContent>
                    </BuildBlock>

                    {/* PLANO — PRO (destaque) */}
                    <BuildBlock $left={35} $top={16} $width={30} $height={28}>
                      <BuildSketch $active={elStatus.plan2 === 'sketching'} />
                      <BuildContent $active={elStatus.plan2 === 'filled'}>
                        <SaasPlanCard $highlight>
                          <SaasPlanTag>Mais popular</SaasPlanTag>
                          <SaasPlanName>Pro</SaasPlanName>
                          <SaasPlanPrice $highlight>R$ 297/mês</SaasPlanPrice>
                          <SaasPlanFeature>Usuários ilimitados</SaasPlanFeature>
                        </SaasPlanCard>
                      </BuildContent>
                    </BuildBlock>

                    {/* PLANO — ENTERPRISE */}
                    <BuildBlock $left={67} $top={16} $width={30} $height={28}>
                      <BuildSketch $active={elStatus.plan3 === 'sketching'} />
                      <BuildContent $active={elStatus.plan3 === 'filled'}>
                        <SaasPlanCard>
                          <SaasPlanName>Enterprise</SaasPlanName>
                          <SaasPlanPrice>Sob consulta</SaasPlanPrice>
                          <SaasPlanFeature>SLA dedicado</SaasPlanFeature>
                        </SaasPlanCard>
                      </BuildContent>
                    </BuildBlock>

                    {/* RBAC */}
                    <BuildBlock $left={3} $top={48} $width={94} $height={10}>
                      <BuildSketch $active={elStatus.rbac === 'sketching'} />
                      <BuildContent $active={elStatus.rbac === 'filled'}>
                        <SaasRbacBox>
                          <SaasRoleChip $admin>Admin · 12 permissões</SaasRoleChip>
                          <SaasRoleChip>Gerente · 8</SaasRoleChip>
                          <SaasRoleChip>Operador · 4</SaasRoleChip>
                          <SaasRoleChip>Visualizador · 2</SaasRoleChip>
                        </SaasRbacBox>
                      </BuildContent>
                    </BuildBlock>

                    {/* MRR */}
                    <BuildBlock $left={3} $top={62} $width={30} $height={24}>
                      <BuildSketch $active={elStatus.mrr === 'sketching'} />
                      <BuildContent $active={elStatus.mrr === 'filled'}>
                        <SaasMrrBox>
                          <SaasMrrNum>R$ {mrr}k</SaasMrrNum>
                          <SaasMrrRule />
                          <SaasMrrLabel>MRR total · +18% este mês</SaasMrrLabel>
                        </SaasMrrBox>
                      </BuildContent>
                    </BuildBlock>

                    {/* ISOLAMENTO */}
                    <BuildBlock $left={35} $top={62} $width={30} $height={24}>
                      <BuildSketch $active={elStatus.isolation === 'sketching'} />
                      <BuildContent $active={elStatus.isolation === 'filled'}>
                        <SaasIsoBox>
                          <Lock size={14} color="#c9a84c" strokeWidth={1.8} />
                          <SaasIsoTenant>Empresa Alfa</SaasIsoTenant>
                          <SaasIsoCheck><Check size={9} /> Dados isolados</SaasIsoCheck>
                        </SaasIsoBox>
                      </BuildContent>
                    </BuildBlock>

                    {/* API KEY */}
                    <BuildBlock $left={67} $top={62} $width={30} $height={24}>
                      <BuildSketch $active={elStatus.apikey === 'sketching'} />
                      <BuildContent $active={elStatus.apikey === 'filled'}>
                        <SaasApiBox>
                          <SaasApiHead>
                            <SaasApiLabel><KeyRound size={9} style={{ marginRight: 4, verticalAlign: 'middle' }} />Chave de API</SaasApiLabel>
                            <SaasApiRegen>Regenerar</SaasApiRegen>
                          </SaasApiHead>
                          <SaasApiKey>sk_live_••••••••3f2a</SaasApiKey>
                        </SaasApiBox>
                      </BuildContent>
                    </BuildBlock>

                    <BuildShine $run={shine} />
                    <BuildBadge $show={badge}><Check size={11} /> Plataforma pronta</BuildBadge>
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
          <Inner><FadeIn direction="up" duration={800}><SectionTitle>Os <strong>6 pilares</strong> de um SaaS bem construído</SectionTitle><Grid $alt>{pillars.map((p, i) => <Card $alt key={i}><CardIcon>{p.icon}</CardIcon><CardTitle>{p.title}</CardTitle><CardDesc>{p.desc}</CardDesc></Card>)}</Grid></FadeIn></Inner>
        </Section>
        <Section>
          <Inner><FadeIn direction="up" duration={800}><SectionTitle>O que está <strong>no escopo</strong></SectionTitle><FeatureList>{features.map((f, i) => <Feature key={i}><Check size={14} />{f}</Feature>)}</FeatureList></FadeIn></Inner>
        </Section>
        <Section $alt>
          <Inner><FadeIn direction="up" duration={800}><SectionTitle>Como <strong>funciona</strong> o processo</SectionTitle><ProcessList>{process.map((p, i) => <ProcessItem key={i}><ProcessNum>{String(i + 1).padStart(2, '0')}</ProcessNum><div><ProcessTitle>{p.title}</ProcessTitle><ProcessDesc>{p.desc}</ProcessDesc></div></ProcessItem>)}</ProcessList></FadeIn></Inner>
        </Section>
        <CTA>
          <Inner><FadeIn direction="up" duration={800}>
            <GoldRule style={{ margin: '0 auto 20px' }} /><Label>Vamos conversar?</Label>
            <CTATitle>Interessado em trabalhar <strong>juntos?</strong></CTATitle>
            <CTASub>Estou em busca de novos desafios e pronta para contribuir com times que constroem produtos escaláveis e complexos.</CTASub>
            <BtnGold href="/#contato">Entrar em contato <ArrowRight size={14} /></BtnGold>
          </FadeIn></Inner>
        </CTA>
      </Page>
      <Footer />
    </>
  );
}