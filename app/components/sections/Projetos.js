'use client';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import FadeIn from '../ui/FadeIn';
import Link from 'next/link';
import { GitBranch, ArrowRight } from 'lucide-react';

const Section = styled.section`
  padding: 120px 48px;
  background: #0d1117;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.04);

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: 1fr; }

  & > div { height: 100%; }
`;

const Card = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #0d1117;
  padding: 40px 36px;
  position: relative;
  transition: background 0.4s;
  cursor: default;
  opacity: ${({ $comingSoon }) => $comingSoon ? '0.7' : '1'};
  &:hover { background: #0f1318; }
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 2px;
    height: 0;
    background: ${({ $comingSoon }) => $comingSoon ? 'rgba(201,168,76,0.35)' : '#c9a84c'};
    transition: height 0.4s;
  }
  &:hover::before { height: 100%; }

  @media (max-width: 768px) { padding: 32px 28px; }
  @media (max-width: 480px) { padding: 24px 20px; }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const CardNum = styled.p`
  font-size: 0.65rem;
  letter-spacing: 3px;
  color: #333;
  font-weight: 300;
`;

const ComingSoonBadge = styled.span`
  font-size: 0.55rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(201,168,76,0.5);
  border: 1px solid rgba(201,168,76,0.2);
  padding: 3px 10px;
  font-weight: 300;
`;

const CardTitle = styled.h3`
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-weight: 400;
  color: #ddd;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
`;

const CardDesc = styled.p`
  font-size: clamp(0.8rem, 1.2vw, 0.85rem);
  color: #555;
  line-height: 1.85;
  font-weight: 300;
  margin-bottom: 28px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
`;

const Tag = styled.span`
  font-size: 0.6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #c9a84c;
  border: 1px solid rgba(201,168,76,0.2);
  padding: 4px 12px;
  font-weight: 300;

  @media (max-width: 480px) { font-size: 0.55rem; padding: 3px 8px; }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: auto;
`;

const LinkBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.65rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #555;
  font-weight: 300;
  cursor: pointer;
  transition: color 0.3s;
  &:hover { color: #c9a84c; }
`;

const ComingSoonLink = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.65rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #333;
  font-weight: 300;
  cursor: default;
`;

const ScaleIn = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(32px) scale(0.97)',
      transition: `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(0.25,0,0.35,1) ${delay}ms`,
      height: '100%',
    }}>
      {children}
    </div>
  );
};

const projects = [
  {
    title: 'Concessionária Digital',
    desc: 'Plataforma arquitetada com React e Next.js no Front-End, utilizando TypeScript e Hooks para controle de estado e comportamentos interativos. Integrada a um Back-End em Java com Spring Boot e banco de dados PostgreSQL, formando uma stack robusta e preparada para crescimento.',
    tags: ['React', 'Next.js', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL'],
    code: 'https://github.com/MessiasEduarda/concessionaria-digital',
    href: null,
    comingSoon: false,
  },
  {
    title: 'Gestão de Livraria',
    desc: 'Sistema de gestão de livraria com cadastro de acervo, controle de estoque e operações do dia a dia. Front-End em Next.js com TypeScript e Hooks, Back-End em Java com Spring Boot e persistência em PostgreSQL.',
    tags: ['Next.js', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL'],
    code: 'https://github.com/MessiasEduarda/gestao-livraria',
    href: null,
    comingSoon: false,
  },
  {
    title: 'Clínica de Estética',
    desc: 'Sistema multi-tenant para gestão de clínicas de estética, construído sobre a mesma base arquitetural do sistema de livraria, porém com funcionalidades mais completas para o segmento. Front-End em Next.js com TypeScript e Hooks, Back-End em Java com Spring Boot e banco PostgreSQL.',
    tags: ['Next.js', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Multi-Tenant'],
    code: 'https://github.com/MessiasEduarda/clinica-de-estetica/tree/develop',
    href: null,
    comingSoon: false,
  },
  {
    title: 'Gestão de Orçamentos (SaaS)',
    desc: 'SaaS multi-tenant de orçamentos automáticos para 7 segmentos. Calcula o orçamento automaticamente com preview em tempo real, gera PDF com código único de rastreio e envia direto pelo WhatsApp. Conta com planos de assinatura, pagamento via Pix/cartão e controle de acesso por perfis.',
    tags: ['React', 'Next.js', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'SaaS'],
    code: 'https://github.com/MessiasEduarda/gestao-de-orcamentos',
    href: null,
    comingSoon: false,
  },
  {
    title: 'Assistência Técnica',
    desc: 'Sistema de gestão completo para assistências técnicas: clientes, equipamentos, ordens de serviço com histórico e acompanhamento de status em tempo real, e módulo financeiro. Autenticação via JWT com suporte a multi-tenant.',
    tags: ['Next.js 14', 'TypeScript', 'Styled-Components', 'Node.js', 'Prisma', 'PostgreSQL'],
    code: 'https://github.com/MessiasEduarda/assistencia-tecnica',
    href: null,
    comingSoon: false,
  },
  {
    title: 'Institucional',
    desc: 'Site institucional desenvolvido com React e Next.js (App Router), TypeScript e Hooks para controle de estado e interatividade. Back-End em Java com Spring Boot e PostgreSQL, com mapa interativo integrado e formulário de contato funcional.',
    tags: ['React', 'Next.js', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL'],
    code: 'https://github.com/MessiasEduarda/institucional',
    href: null,
    comingSoon: false,
  },
  {
    title: 'Design de Interfaces',
    desc: 'Prototipação e design de interfaces de alta fidelidade — desde wireframes e fluxos de usuário até design systems completos, com foco em usabilidade, hierarquia visual e consistência entre telas. Trabalhos realizados em Figma e Penpot.',
    tags: ['Figma', 'Penpot', 'UI Design', 'UX Research', 'Prototipação', 'Design System'],
    code: null,
    href: '/servicos/design-ux-ui',
    comingSoon: false,
  },
];

export default function Projetos() {
  return (
    <Section id="projetos">
      <Inner>
        <FadeIn direction="up" duration={800}>
          <Header>
            <GoldRule />
            <Label>Trabalhos</Label>
            <Title>Projetos em <strong>Destaque</strong></Title>
          </Header>
        </FadeIn>
        <Grid>
          {projects.map((p, i) => (
            <ScaleIn key={i} delay={i * 80}>
              <Card $comingSoon={p.comingSoon}>
                <CardTop>
                  <CardNum>0{i + 1}</CardNum>
                  {p.comingSoon && <ComingSoonBadge>Em breve</ComingSoonBadge>}
                </CardTop>
                <CardTitle>{p.title}</CardTitle>
                <CardDesc>{p.desc}</CardDesc>
                <Tags>{p.tags.map((t, j) => <Tag key={j}>{t}</Tag>)}</Tags>
                <Links>
                  {p.comingSoon ? (
                    <ComingSoonLink>
                      <GitBranch size={12} /> Portfólio em construção
                    </ComingSoonLink>
                  ) : p.href ? (
                    <LinkBtn as={Link} href={p.href}>
                      <ArrowRight size={12} /> Ver detalhes
                    </LinkBtn>
                  ) : (
                    <LinkBtn href={p.code} target="_blank" rel="noopener noreferrer">
                      <GitBranch size={12} /> Código
                    </LinkBtn>
                  )}
                </Links>
              </Card>
            </ScaleIn>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}