'use client';
import { useState } from 'react';
import styled from 'styled-components';
import FadeIn from '../ui/FadeIn';
import {
  Megaphone, Building2, Layers, ClipboardList, LayoutDashboard, Smartphone,
  Plus, Check,
} from 'lucide-react';

const Section = styled.section`
  padding: 120px 48px;
  background: #090c10;
  border-top: 1px solid rgba(255,255,255,0.04);

  @media (max-width: 1024px) { padding: 100px 40px; }
  @media (max-width: 768px)  { padding: 80px 24px; }
  @media (max-width: 480px)  { padding: 64px 16px; }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 72px;
  @media (max-width: 768px) { margin-bottom: 48px; }
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

const Title = styled.h2`
  font-size: clamp(1.6rem, 3.5vw, 2.8rem);
  font-weight: 300;
  color: #fff;
  letter-spacing: -0.5px;
  strong { font-weight: 600; }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.04);
`;

const Item = styled.div`
  background: #0d1117;
`;

const ItemHeader = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: 64px 44px 1fr 28px;
  align-items: center;
  gap: 28px;
  padding: 32px 36px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  color: inherit;
  transition: background 0.3s;
  &:hover { background: #111620; }

  @media (max-width: 700px) {
    grid-template-columns: 40px 36px 1fr 24px;
    gap: 16px;
    padding: 24px 24px;
  }
`;

const Num = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: 1.6rem;
  font-weight: 300;
  color: ${({ $active }) => ($active ? '#c9a84c' : '#333')};
  transition: color 0.3s;

  @media (max-width: 700px) { font-size: 1.3rem; }
`;

const IconWrap = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid ${({ $active }) => ($active ? '#c9a84c' : 'rgba(255,255,255,0.1)')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active }) => ($active ? '#c9a84c' : '#666')};
  transition: all 0.3s;
  flex-shrink: 0;

  @media (max-width: 700px) { width: 36px; height: 36px; }
`;

const HeaderText = styled.div`
  min-width: 0;
`;

const ItemTitle = styled.h3`
  font-size: clamp(0.95rem, 1.6vw, 1.15rem);
  font-weight: 400;
  color: ${({ $active }) => ($active ? '#fff' : '#ddd')};
  letter-spacing: 0.3px;
  transition: color 0.3s;
`;

const ItemTagline = styled.p`
  font-size: clamp(0.72rem, 1.1vw, 0.78rem);
  color: #555;
  font-weight: 300;
  margin-top: 6px;

  @media (max-width: 480px) { display: none; }
`;

const Toggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active }) => ($active ? '#c9a84c' : '#555')};
  transform: rotate(${({ $active }) => ($active ? '45deg' : '0deg')});
  transition: all 0.3s;
`;

/* CORREÇÃO: overflow: hidden no Body garante que nada vaze */
const Body = styled.div`
  display: grid;
  grid-template-rows: ${({ $active }) => ($active ? '1fr' : '0fr')};
  transition: grid-template-rows 0.5s cubic-bezier(0.25, 0, 0.35, 1);
  overflow: hidden;
`;

/* CORREÇÃO: BodyInner com min-height: 0 e padding zerado quando fechado.
   O truque é colocar o padding num wrapper interno que só tem altura
   quando o grid-template-rows permite expansão. */
const BodyInner = styled.div`
  min-height: 0;
  overflow: hidden;
`;

/* CORREÇÃO: PaddingWrapper carrega o padding real. Como está dentro de
   BodyInner (que tem min-height: 0), o overflow: hidden do Body o corta
   corretamente sem deixar espaço residual. */
const PaddingWrapper = styled.div`
  padding: 0 36px 36px 136px;

  @media (max-width: 700px) { padding: 0 24px 28px 80px; }
  @media (max-width: 480px) { padding: 0 20px 24px 20px; }
`;

const Desc = styled.p`
  font-size: clamp(0.82rem, 1.2vw, 0.88rem);
  color: #777;
  line-height: 1.9;
  font-weight: 300;
  max-width: 700px;
  margin-bottom: 28px;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 32px;
  margin-bottom: 28px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const Feature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #888;
  font-size: 0.8rem;
  font-weight: 300;
  line-height: 1.6;

  svg { color: #c9a84c; flex-shrink: 0; margin-top: 3px; }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  font-size: 0.6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #c9a84c;
  border: 1px solid rgba(201,168,76,0.2);
  padding: 4px 12px;
  font-weight: 300;
`;

const Example = styled.p`
  font-size: 0.72rem;
  color: #444;
  font-weight: 300;
  font-style: italic;
`;

const services = [
  {
    icon: Megaphone,
    title: 'Landing Pages de Alta Conversão',
    tagline: 'Sua primeira impressão, otimizada para converter',
    desc: 'Páginas únicas focadas em um objetivo claro: captar leads, vender um serviço ou apresentar um profissional. Construídas com foco em performance, SEO técnico e uma narrativa visual que guia o visitante até a ação — formulário, WhatsApp ou agendamento.',
    features: [
      'Carregamento otimizado (Core Web Vitals)',
      'SEO técnico desde a estrutura do código',
      'Integração com WhatsApp, formulários e analytics',
      'Design responsivo em qualquer dispositivo',
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'SEO'],
    example: 'Base do mesmo padrão usado neste portfólio',
  },
  {
    icon: Building2,
    title: 'Sites Institucionais',
    tagline: 'Presença digital sólida para empresas e profissionais',
    desc: 'Sites com múltiplas seções que apresentam a história, os serviços e os diferenciais de uma empresa, com formulário de contato funcional, mapa interativo e integração real com back-end — pensados para quem precisa de credibilidade e visibilidade online.',
    features: [
      'Formulário de contato funcional com back-end',
      'Mapa interativo integrado',
      'Estrutura pensada para SEO local',
      'Painel de fácil atualização de conteúdo',
    ],
    tags: ['React', 'Next.js', 'Java', 'Spring Boot', 'PostgreSQL'],
    example: 'Como no projeto Institucional',
  },
  {
    icon: Layers,
    title: 'Sistemas Multi-Tenant (SaaS)',
    tagline: 'Uma plataforma, vários clientes, dados 100% isolados',
    desc: 'Multi-tenant é a arquitetura em que uma única aplicação atende vários clientes (tenants) ao mesmo tempo, cada um com seus próprios dados, usuários e configurações totalmente isolados entre si — o mesmo modelo usado por SaaS como Shopify ou Notion. É a base ideal para quem quer vender o mesmo sistema para várias empresas (clínicas, assistências técnicas, escritórios) sem manter uma versão separada para cada uma.',
    features: [
      'Isolamento total de dados por cliente',
      'Planos de assinatura e cobrança recorrente',
      'Controle de acesso por perfil (RBAC)',
      'Onboarding automatizado de novos clientes',
    ],
    tags: ['Next.js', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'JWT'],
    example: 'Clínica de Estética, Assistência Técnica, Gestão de Orçamentos',
  },
  {
    icon: ClipboardList,
    title: 'Sistemas de Gestão Empresarial',
    tagline: 'Controle de estoque, clientes e operações em um só lugar',
    desc: 'Sistemas internos que organizam cadastro de clientes, controle de estoque, ordens de serviço e financeiro em um único fluxo digital, substituindo planilhas e processos manuais por uma operação confiável e rastreável.',
    features: [
      'Cadastro e histórico completo de clientes',
      'Controle de estoque em tempo real',
      'Módulo financeiro com relatórios',
      'Acompanhamento de status por ordem de serviço',
    ],
    tags: ['Next.js', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Prisma'],
    example: 'Gestão de Livraria, Assistência Técnica',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboards & Painéis Administrativos',
    tagline: 'Dados visuais para decisões mais rápidas',
    desc: 'Painéis que centralizam métricas, indicadores e ações operacionais em interfaces visuais claras — pensados para gestores, equipes internas ou administradores de uma plataforma que precisam decidir rápido com base em dados reais, não em planilhas espalhadas.',
    features: [
      'Visualização de dados em tempo real',
      'Filtros e relatórios personalizáveis',
      'Controle de permissões por usuário',
      'Atualização via WebSockets',
    ],
    tags: ['React', 'TypeScript', 'APIs REST', 'WebSockets'],
    example: 'Módulos internos de SaaS e sistemas de gestão',
  },
  {
    icon: Smartphone,
    title: 'Apps Web & Mobile',
    tagline: 'Mesma experiência em qualquer tela',
    desc: 'Aplicações multiplataforma com React Native e Expo, com integrações a APIs externas, autenticação OAuth e funcionalidades em tempo real — da estrutura web ao app que vai no bolso do usuário, com uma única base de código.',
    features: [
      'Apps iOS e Android com uma única base de código',
      'Integrações com APIs externas e wearables',
      'Autenticação OAuth 2.0',
      'Deploy e atualização via Expo',
    ],
    tags: ['React Native', 'Expo', 'TypeScript', 'OAuth 2.0'],
    example: 'Plataforma de coaching esportivo com IA (Racewell)',
  },
];

export default function ServicosList() {
  const [active, setActive] = useState(0);

  const toggle = (i) => setActive((prev) => (prev === i ? null : i));

  return (
    <Section id="lista-servicos">
      <Inner>
        <FadeIn direction="up" duration={800}>
          <Header>
            <GoldRule />
            <Label>O que eu desenvolvo</Label>
            <Title>Soluções para cada <strong>etapa do seu negócio</strong></Title>
          </Header>
        </FadeIn>
        <List>
          {services.map((s, i) => {
            const Icon = s.icon;
            const isActive = active === i;
            return (
              <Item key={s.title}>
                <ItemHeader onClick={() => toggle(i)} aria-expanded={isActive}>
                  <Num $active={isActive}>{String(i + 1).padStart(2, '0')}</Num>
                  <IconWrap $active={isActive}><Icon size={18} /></IconWrap>
                  <HeaderText>
                    <ItemTitle $active={isActive}>{s.title}</ItemTitle>
                    <ItemTagline>{s.tagline}</ItemTagline>
                  </HeaderText>
                  <Toggle $active={isActive}><Plus size={18} /></Toggle>
                </ItemHeader>
                <Body $active={isActive}>
                  <BodyInner>
                    <PaddingWrapper>
                      <Desc>{s.desc}</Desc>
                      <FeatureGrid>
                        {s.features.map((f, j) => (
                          <Feature key={j}><Check size={14} />{f}</Feature>
                        ))}
                      </FeatureGrid>
                      <Tags>
                        {s.tags.map((t, j) => <Tag key={j}>{t}</Tag>)}
                      </Tags>
                      <Example>{s.example}</Example>
                    </PaddingWrapper>
                  </BodyInner>
                </Body>
              </Item>
            );
          })}
        </List>
      </Inner>
    </Section>
  );
}