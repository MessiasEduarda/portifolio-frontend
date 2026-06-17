'use client';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import FadeIn from '../ui/FadeIn';

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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;

  @media (max-width: 1024px) { gap: 60px; }
  @media (max-width: 900px)  { grid-template-columns: 1fr; gap: 48px; }
`;

const Left = styled.div``;
const Right = styled.div``;

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
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: clamp(1.6rem, 3.5vw, 2.8rem);
  font-weight: 300;
  color: #fff;
  line-height: 1.2;
  letter-spacing: -0.5px;
  strong { font-weight: 600; }
`;

const Text = styled.p`
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: #666;
  line-height: 1.95;
  font-weight: 300;
  margin-bottom: 20px;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.04);
  margin-top: 48px;

  @media (max-width: 480px) { margin-top: 32px; }
`;

const Stat = styled.div`
  padding: 32px 28px;
  background: #0d1117;
  transition: background 0.4s;
  &:hover { background: #111620; }

  @media (max-width: 480px) { padding: 24px 20px; }
`;

const StatNum = styled.p`
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 300;
  color: #c9a84c;
  letter-spacing: -1px;
  margin-bottom: 6px;
`;

const StatLabel = styled.p`
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #444;
  font-weight: 300;

  @media (max-width: 480px) { font-size: 0.55rem; letter-spacing: 2px; }
`;

const StaggerIn = ({ children, delay = 0 }) => {
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
      transform: visible ? 'none' : 'translateY(20px)',
      transition: `opacity 600ms ease ${delay}ms, transform 600ms cubic-bezier(0.25,0,0.35,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

const stats = [
  { num: '3+',   label: 'Anos de Experiência' },
  { num: '20+',  label: 'Projetos Entregues'  },
  { num: '10+',  label: 'Clientes Atendidos'  },
  { num: '100%', label: 'Comprometimento'     },
];

const paragraphs = [
  'Sou desenvolvedora front-end com mais de 3 anos de experiência criando produtos digitais web e mobile. Minha trajetória começou com a curiosidade de entender como os sites funcionam e evoluiu para uma carreira sólida em desenvolvimento de interfaces modernas e escaláveis.',
  'Trabalho com React, Next.js, TypeScript e Styled-Components no dia a dia, além de desenvolver aplicações mobile com React Native e Expo. Tenho experiência estruturando integrações com APIs REST, WebSockets e autenticação OAuth 2.0, sempre com foco em performance, acessibilidade e experiência do usuário.',
  'Já colaborei diretamente com times de back-end, IA e infraestrutura em ambientes ágeis, e busco constantemente me atualizar com as melhores práticas do mercado, estudando novas tecnologias e aprimorando minha forma de transformar ideias complexas em interfaces simples e intuitivas.',
];

export default function Sobre() {
  return (
    <Section id="sobre">
      <Inner>
        <Left>
          <FadeIn direction="right" duration={800}>
            <GoldRule />
            <Label>Sobre Mim</Label>
            <Title>Criando experiências <strong>digitais precisas</strong></Title>
          </FadeIn>
          <Stats>
            {stats.map((s, i) => (
              <StaggerIn key={i} delay={i * 80}>
                <Stat>
                  <StatNum>{s.num}</StatNum>
                  <StatLabel>{s.label}</StatLabel>
                </Stat>
              </StaggerIn>
            ))}
          </Stats>
        </Left>
        <Right>
          {paragraphs.map((t, i) => (
            <FadeIn key={i} delay={i * 120} direction="left" duration={800}>
              <Text>{t}</Text>
            </FadeIn>
          ))}
        </Right>
      </Inner>
    </Section>
  );
}