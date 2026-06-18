'use client';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import styled from 'styled-components';
import FadeIn from '../../components/ui/FadeIn';
import Link from 'next/link';
import { Check, ArrowLeft, ArrowRight, Smartphone, Wifi, Key, Zap, Bell, Store } from 'lucide-react';

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
const BtnGold = styled(Link)`display: inline-flex; align-items: center; gap: 12px; padding: 16px 40px; background: transparent; border: 1px solid #c9a84c; color: #c9a84c; font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase; font-weight: 400; font-family: inherit; cursor: pointer; transition: all 0.4s; &:hover { background: #c9a84c; color: #0d1117; }`;

const pillars = [
  { icon: <Smartphone size={22} />, title: 'iOS e Android, Uma Base', desc: 'React Native com Expo: um único código funciona nas duas plataformas, reduzindo custo e tempo de desenvolvimento.' },
  { icon: <Wifi size={22} />, title: 'APIs e Wearables', desc: 'Integrações com APIs REST, serviços externos como Garmin, Strava e dispositivos IoT via WebSockets e Bluetooth.' },
  { icon: <Key size={22} />, title: 'Autenticação OAuth 2.0', desc: 'Login com Google, Apple, Strava e outros provedores — fluxo seguro com token refresh e sessão persistente.' },
  { icon: <Zap size={22} />, title: 'Performance Nativa', desc: 'Animações fluidas a 60fps, lazy loading de telas e otimização de bundle para carregamento rápido mesmo em redes lentas.' },
  { icon: <Bell size={22} />, title: 'Push Notifications', desc: 'Notificações em tempo real via Expo Notifications — avisos de treino, alertas de status e mensagens diretas.' },
  { icon: <Store size={22} />, title: 'Deploy nas Lojas', desc: 'Publicação na App Store e Google Play com todos os requisitos técnicos e documentação de aprovação inclusos.' },
];

const features = [
  'App iOS e Android com React Native', 'Expo Router para navegação declarativa',
  'Autenticação OAuth 2.0 (Google, Apple)', 'Push notifications',
  'Integração com APIs REST e WebSockets', 'Modo offline com sincronização',
  'Publicação nas lojas (App Store/Play)', 'TypeScript em toda a base de código',
];

const process = [
  { title: 'Definição de Escopo', desc: 'Definimos as telas, os fluxos principais e as integrações necessárias — priorizando o MVP que valida o produto mais rápido.' },
  { title: 'Prototipagem no Figma', desc: 'Protótipo navegável das telas principais para aprovação de fluxo e identidade visual antes de codificar.' },
  { title: 'Desenvolvimento por Telas', desc: 'Desenvolvimento em sprints com entregas por funcionalidade — você testa em device real ao longo do processo.' },
  { title: 'Integrações e Testes', desc: 'Integração com APIs externas, testes em dispositivos iOS e Android reais, e ajuste de performance e animações.' },
  { title: 'Deploy nas Lojas', desc: 'Configuração de conta de desenvolvedor, build de produção, submissão e acompanhamento da aprovação nas lojas.' },
];

export default function AppsMobile() {
  return (
    <>
      <Navbar />
      <Page>
        <Hero>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <BackLink href="/servicos"><ArrowLeft size={12} /> Voltar</BackLink>
              <GoldRule /><Label>Capacidade Técnica</Label>
              <HeroTitle>Apps <strong>Web & Mobile</strong></HeroTitle>
              <HeroSub>Aplicações multiplataforma com React Native e Expo, integrações com APIs externas, autenticação OAuth e funcionalidades em tempo real — da estrutura web ao app que vai no bolso do usuário.</HeroSub>
              <Tags>{['React Native', 'Expo', 'TypeScript', 'OAuth 2.0', 'WebSockets', 'iOS', 'Android'].map((t, i) => <Tag key={i}>{t}</Tag>)}</Tags>
            </FadeIn>
          </Inner>
        </Hero>
        <Section $alt><Inner><FadeIn direction="up" duration={800}><SectionTitle>O que entrega um app <strong>de verdade</strong></SectionTitle><Grid $alt>{pillars.map((p, i) => <Card $alt key={i}><CardIcon>{p.icon}</CardIcon><CardTitle>{p.title}</CardTitle><CardDesc>{p.desc}</CardDesc></Card>)}</Grid></FadeIn></Inner></Section>
        <Section><Inner><FadeIn direction="up" duration={800}><SectionTitle>O que está <strong>no escopo</strong></SectionTitle><FeatureList>{features.map((f, i) => <Feature key={i}><Check size={14} />{f}</Feature>)}</FeatureList></FadeIn></Inner></Section>
        <Section $alt><Inner><FadeIn direction="up" duration={800}><SectionTitle>Como <strong>funciona</strong> o processo</SectionTitle><ProcessList>{process.map((p, i) => <ProcessItem key={i}><ProcessNum>{String(i + 1).padStart(2, '0')}</ProcessNum><div><ProcessTitle>{p.title}</ProcessTitle><ProcessDesc>{p.desc}</ProcessDesc></div></ProcessItem>)}</ProcessList></FadeIn></Inner></Section>
        <CTA><Inner><FadeIn direction="up" duration={800}>
          <GoldRule style={{ margin: '0 auto 20px' }} /><Label>Vamos conversar?</Label>
          <CTATitle>Interessado em trabalhar <strong>juntos?</strong></CTATitle>
          <CTASub>Estou em busca de novos desafios e pronta para contribuir com times que constroem produtos mobile de verdade.</CTASub>
          <BtnGold href="/#contato">Entrar em contato <ArrowRight size={14} /></BtnGold>
        </FadeIn></Inner></CTA>
      </Page>
      <Footer />
    </>
  );
}