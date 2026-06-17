'use client';
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
  font-family: var(--font-cormorant), serif;
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 400;
  color: #fff;
  line-height: 1.2;
  letter-spacing: -0.5px;
  max-width: 760px;
  strong { font-weight: 700; color: #c9a84c; }
`;

const Sub = styled.p`
  font-size: clamp(0.9rem, 1.4vw, 1rem);
  color: #666;
  line-height: 1.95;
  font-weight: 300;
  max-width: 600px;
  margin-top: 28px;
`;

const Differentiators = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.04);
  margin-top: 64px;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; margin-top: 48px; }
`;

const Diff = styled.div`
  padding: 28px 24px;
  background: #0d1117;
  transition: background 0.4s;
  &:hover { background: #111620; }
`;

const DiffLabel = styled.p`
  font-size: 0.68rem;
  letter-spacing: 1px;
  color: #aaa;
  font-weight: 300;
  line-height: 1.6;
`;

const differentiators = [
  '100% personalizado para o seu negócio',
  'Comunicação direta, sem intermediários',
  'Código limpo, documentado e escalável',
  'Suporte real após a entrega',
];

export default function ServicosHero() {
  return (
    <Section id="servicos">
      <Inner>
        <FadeIn direction="up" duration={800}>
          <GoldRule />
          <Label>Serviços</Label>
          <Title>Sistemas e sites pensados para <strong>resolver problemas reais</strong></Title>
          <Sub>
            Do site institucional que apresenta sua empresa ao sistema multi-tenant que sustenta um SaaS inteiro — eu projeto e desenvolvo a solução certa para o estágio em que seu negócio está, sempre com código limpo e pensado para crescer.
          </Sub>
        </FadeIn>
        <FadeIn direction="up" delay={150} duration={800}>
          <Differentiators>
            {differentiators.map((d, i) => (
              <Diff key={i}><DiffLabel>{d}</DiffLabel></Diff>
            ))}
          </Differentiators>
        </FadeIn>
      </Inner>
    </Section>
  );
}