'use client';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import styled from 'styled-components';
import FadeIn from '../../components/ui/FadeIn';
import Link from 'next/link';
import { Check, ArrowLeft, ArrowRight, ClipboardList, Users, Package, DollarSign, FileText, Bell } from 'lucide-react';

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
const BtnGold = styled.a`display: inline-flex; align-items: center; gap: 12px; padding: 16px 40px; background: transparent; border: 1px solid #c9a84c; color: #c9a84c; font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase; font-weight: 400; font-family: inherit; cursor: pointer; transition: all 0.4s; &:hover { background: #c9a84c; color: #0d1117; }`;

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

const WHATSAPP = `https://wa.me/5511953311935?text=${encodeURIComponent('Olá! Tenho interesse em um Sistema de Gestão Empresarial. Pode me passar mais informações?')}`;

export default function SistemasGestao() {
  return (
    <>
      <Navbar />
      <Page>
        <Hero>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <BackLink href="/servicos"><ArrowLeft size={12} /> Voltar aos Serviços</BackLink>
              <GoldRule /><Label>Serviço</Label>
              <HeroTitle>Sistemas de <strong>Gestão Empresarial</strong></HeroTitle>
              <HeroSub>Substitua planilhas e processos manuais por um sistema que organiza clientes, estoque, ordens de serviço e financeiro em um único fluxo digital confiável.</HeroSub>
              <Tags>{['Next.js', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Prisma'].map((t, i) => <Tag key={i}>{t}</Tag>)}</Tags>
            </FadeIn>
          </Inner>
        </Hero>
        <Section $alt><Inner><FadeIn direction="up" duration={800}><SectionTitle>Os <strong>6 módulos</strong> que transformam a operação</SectionTitle><Grid $alt>{pillars.map((p, i) => <Card $alt key={i}><CardIcon>{p.icon}</CardIcon><CardTitle>{p.title}</CardTitle><CardDesc>{p.desc}</CardDesc></Card>)}</Grid></FadeIn></Inner></Section>
        <Section><Inner><FadeIn direction="up" duration={800}><SectionTitle>O que está <strong>incluso</strong></SectionTitle><FeatureList>{features.map((f, i) => <Feature key={i}><Check size={14} />{f}</Feature>)}</FeatureList></FadeIn></Inner></Section>
        <Section $alt><Inner><FadeIn direction="up" duration={800}><SectionTitle>Como <strong>funciona</strong> o processo</SectionTitle><ProcessList>{process.map((p, i) => <ProcessItem key={i}><ProcessNum>{String(i + 1).padStart(2, '0')}</ProcessNum><div><ProcessTitle>{p.title}</ProcessTitle><ProcessDesc>{p.desc}</ProcessDesc></div></ProcessItem>)}</ProcessList></FadeIn></Inner></Section>
        <CTA><Inner><FadeIn direction="up" duration={800}>
          <GoldRule style={{ margin: '0 auto 20px' }} /><Label>Vamos começar?</Label>
          <CTATitle>Pronto para <strong>digitalizar sua operação?</strong></CTATitle>
          <CTASub>Me conta como funciona seu negócio hoje e eu te apresento o sistema ideal.</CTASub>
          <BtnGold href={WHATSAPP} target="_blank" rel="noopener noreferrer">Solicitar orçamento <ArrowRight size={14} /></BtnGold>
        </FadeIn></Inner></CTA>
      </Page>
      <Footer />
    </>
  );
}