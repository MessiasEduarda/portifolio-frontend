'use client';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import FadeIn from '../ui/FadeIn';

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

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.04);
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  padding: 40px 36px;
  background: #090c10;
  transition: background 0.3s;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0; top: 0;
    width: 1px;
    height: 0;
    background: #c9a84c;
    transition: height 0.4s;
  }
  &:hover { background: #0d1117; }
  &:hover::before { height: 100%; }

  @media (max-width: 900px) { grid-template-columns: 160px 1fr; gap: 24px; padding: 32px 28px; }
  @media (max-width: 700px) { grid-template-columns: 1fr; gap: 12px; padding: 28px 24px; }
  @media (max-width: 480px) { padding: 24px 16px; }
`;

const Period = styled.p`
  font-size: 0.65rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #444;
  font-weight: 300;
  padding-top: 4px;

  @media (max-width: 700px) { padding-top: 0; }
  @media (max-width: 480px) { font-size: 0.6rem; }
`;

const Right = styled.div``;

const JobTitle = styled.h3`
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  font-weight: 400;
  color: #ddd;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

const Company = styled.p`
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #c9a84c;
  font-weight: 300;
  margin-bottom: 16px;

  @media (max-width: 480px) { font-size: 0.62rem; margin-bottom: 12px; }
`;

const Desc = styled.p`
  font-size: clamp(0.8rem, 1.2vw, 0.85rem);
  color: #555;
  line-height: 1.85;
  font-weight: 300;
`;

const LineReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateX(-24px)',
      transition: `opacity 600ms ease ${delay}ms, transform 600ms cubic-bezier(0.25,0,0.35,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

const experiences = [
  { period: 'Jan 2026 — Jun 2026', title: 'Desenvolvedora Front-End (Freelance)', company: 'Racewell', desc: 'Atuação na estruturação do front-end de plataforma de coaching esportivo com inteligência artificial, desenvolvendo funcionalidades web e mobile com React Native, Expo, TypeScript e Expo Router. Estruturei integrações com APIs REST, WebSockets e serviços externos como Garmin Connect e Strava via OAuth 2.0, além de fluxos críticos como autenticação, análise de performance e acompanhamento de treinos em tempo real, traduzindo protótipos Figma em interfaces funcionais. Participei também do processo de deploy e revisão de pull requests em colaboração com o time de infraestrutura.' },
  { period: 'Set 2025 — Dez 2025', title: 'Desenvolvedora Front-End', company: 'Mestres da Web', desc: 'Desenvolvimento de interfaces responsivas alinhadas ao design system da empresa, transformando protótipos Figma em aplicações funcionais. Criação de componentes reutilizáveis em React.js e Next.js com TypeScript e Styled-Components, aplicando SSR e otimizações de renderização. Garantia de compatibilidade e consistência visual em múltiplos dispositivos por meio de técnicas avançadas de layout responsivo com CSS3, Flexbox e Grid.' },
  { period: 'Jan 2023 — Jul 2025', title: 'Desenvolvedora Front-End (PJ)', company: 'Consultoria CJL', desc: 'Desenvolvimento de interfaces para sistemas corporativos utilizando Vue.js e Angular, com foco em escalabilidade, padronização visual e integração com APIs REST. Estruturação de componentes reutilizáveis e fluxos de interface voltados à manutenibilidade e performance. Contribuição na integração entre front-end e back-end, participando da automação de processos internos com JavaScript, MySQL e APIs integradas ao back-end Java, mantendo padrões de qualidade com Git Flow e metodologias ágeis (Scrum e Kanban).' },
];

export default function Experiencia() {
  return (
    <Section id="experiencia">
      <Inner>
        <FadeIn direction="up" duration={800}>
          <Header>
            <GoldRule />
            <Label>Trajetória</Label>
            <Title>Experiência <strong>Profissional</strong></Title>
          </Header>
        </FadeIn>
        <Items>
          {experiences.map((e, i) => (
            <LineReveal key={i} delay={i * 100}>
              <Item>
                <Period>{e.period}</Period>
                <Right>
                  <JobTitle>{e.title}</JobTitle>
                  <Company>{e.company}</Company>
                  <Desc>{e.desc}</Desc>
                </Right>
              </Item>
            </LineReveal>
          ))}
        </Items>
      </Inner>
    </Section>
  );
}