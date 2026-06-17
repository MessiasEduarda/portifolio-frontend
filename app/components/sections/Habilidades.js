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

const Grid = styled.div`
  column-count: 3;
  column-gap: 24px;

  @media (max-width: 1024px) { column-count: 2; column-gap: 20px; }
  @media (max-width: 600px)  { column-count: 1; }
`;

const CategoryItem = styled.div`
  break-inside: avoid;
  margin-bottom: 24px;
  padding: 32px;
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.06);
  transition: border-color 0.3s;
  &:hover { border-color: rgba(201,168,76,0.25); }

  @media (max-width: 768px) { padding: 24px; margin-bottom: 16px; }
  @media (max-width: 480px) { padding: 20px 16px; }
`;

const CategoryName = styled.p`
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #c9a84c;
  font-weight: 300;
  margin-bottom: 18px;

  @media (max-width: 480px) { font-size: 0.62rem; letter-spacing: 2px; margin-bottom: 14px; }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  @media (max-width: 480px) { gap: 8px; }
`;

const Tag = styled.span`
  font-size: 0.72rem;
  letter-spacing: 1px;
  color: #aaa;
  font-weight: 300;
  padding: 7px 14px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 2px;
  transition: border-color 0.3s, color 0.3s, transform 0.3s;
  &:hover { border-color: #c9a84c55; color: #fff; transform: translateY(-2px); }

  @media (max-width: 480px) { font-size: 0.65rem; padding: 6px 10px; }
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

const categories = [
  { name: 'Linguagens',        items: ['JavaScript (ES6+)', 'TypeScript'] },
  { name: 'Frameworks & Libs', items: ['React.js', 'Next.js', 'React Native', 'Angular', 'Vue.js', 'Redux', 'Context API', 'Expo'] },
  { name: 'Estilização',       items: ['HTML5', 'CSS3', 'Styled-Components', 'Tailwind CSS', 'Flexbox', 'Grid', 'Layout Responsivo'] },
  { name: 'Design & UI/UX',    items: ['Figma', 'Penpot', 'UI Design', 'UX Research', 'Prototipação', 'Wireframing', 'Design System'] },
  { name: 'Testes',            items: ['Jest', 'React Testing Library'] },
  { name: 'Ferramentas',       items: ['Git', 'GitHub', 'APIs REST', 'WebSockets', 'OAuth 2.0', 'Node.js', 'Docker'] },
  { name: 'Banco de Dados',    items: ['SQL', 'MySQL', 'PostgreSQL'] },
  { name: 'Metodologias',      items: ['Clean Code', 'Git Flow', 'Scrum', 'Kanban', 'Code Review'] },
  { name: 'Outros',            items: ['Storybook', 'Vitest', 'CI/CD', 'Acessibilidade Web (WCAG)'] },
];

export default function Habilidades() {
  return (
    <Section id="habilidades">
      <Inner>
        <FadeIn direction="up" duration={800}>
          <Header>
            <GoldRule />
            <Label>Competências</Label>
            <Title>Habilidades <strong>Técnicas</strong></Title>
          </Header>
        </FadeIn>
        <Grid>
          {categories.map((c, i) => (
            <StaggerIn key={i} delay={i * 60}>
              <CategoryItem>
                <CategoryName>{c.name}</CategoryName>
                <TagList>
                  {c.items.map((item, j) => <Tag key={j}>{item}</Tag>)}
                </TagList>
              </CategoryItem>
            </StaggerIn>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}