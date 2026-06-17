'use client';
import styled from 'styled-components';
import { Mail, Link as LinkedinIcon, GitBranch, ArrowUp } from 'lucide-react';

const Foot = styled.footer`
  background: #090c10;
  border-top: 1px solid rgba(255,255,255,0.04);
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 48px 40px;

  @media (max-width: 1024px) { padding: 64px 40px 32px; }
  @media (max-width: 768px)  { padding: 56px 24px 28px; }
  @media (max-width: 480px)  { padding: 48px 16px 24px; }
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 64px;
  padding-bottom: 56px;

  @media (max-width: 1024px) { gap: 40px; }
  @media (max-width: 900px)  { grid-template-columns: 1fr 1fr; gap: 40px; padding-bottom: 40px; }
  @media (max-width: 600px)  { grid-template-columns: 1fr; gap: 32px; padding-bottom: 32px; }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 900px) { grid-column: 1 / -1; }
`;

const LogoImg = styled.img`
  width: 75px;
  height: auto;
  object-fit: contain;
  display: block;
  margin-bottom: 0px;
  margin-left: -15px;

  @media (max-width: 480px) { width: 60px; margin-left: -10px; }
`;

const BrandText = styled.p`
  font-size: clamp(0.8rem, 1.2vw, 0.85rem);
  color: #555;
  line-height: 1.9;
  font-weight: 300;
  max-width: 320px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnLabel = styled.p`
  font-size: 0.62rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #c9a84c;
  font-weight: 300;
  margin-bottom: 24px;
  @media (max-width: 480px) { margin-bottom: 16px; }
`;

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  @media (max-width: 480px) { gap: 10px; }
`;

const FootLink = styled.a`
  font-size: clamp(0.75rem, 1.2vw, 0.82rem);
  color: #888;
  font-weight: 300;
  transition: color 0.3s;
  cursor: pointer;
  word-break: break-all;
  &:hover { color: #c9a84c; }
`;

const PlainText = styled.p`
  font-size: clamp(0.75rem, 1.2vw, 0.82rem);
  color: #888;
  font-weight: 300;
`;

const Availability = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: clamp(0.72rem, 1.1vw, 0.82rem);
  color: #4caf77;
  font-weight: 300;
  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4caf77;
    box-shadow: 0 0 6px #4caf7788;
    display: inline-block;
    flex-shrink: 0;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  @media (max-width: 480px) { margin-top: 16px; }
`;

const SocialIcon = styled.a`
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  transition: all 0.3s;
  flex-shrink: 0;
  &:hover { border-color: #c9a84c; color: #c9a84c; }

  @media (max-width: 480px) { width: 34px; height: 34px; }
`;

const Bottom = styled.div`
  position: relative;
  border-top: 1px solid rgba(255,255,255,0.04);
  padding-top: 28px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
    gap: 12px;
    padding-top: 20px;
  }
`;

const Copy = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.65rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #2a2a2a;
  font-weight: 300;
  text-align: center;
  white-space: nowrap;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    font-size: 0.58rem;
    letter-spacing: 1.5px;
    white-space: normal;
  }
`;

const BackToTop = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 0.62rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #555;
  font-weight: 300;
  cursor: pointer;
  transition: color 0.3s;
  &:hover { color: #c9a84c; }
`;

const navLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Contato', href: '#contato' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Foot>
      <Inner>
        <Top>
          <Brand>
            <LogoImg src="/logo.png" alt="Maria Messias" />
            <BrandText>
              Desenvolvedora Front-End focada em criar interfaces elegantes, rápidas e funcionais com React, Next.js e TypeScript.
            </BrandText>
          </Brand>

          <Column>
            <ColumnLabel>Navegação</ColumnLabel>
            <LinkList>
              {navLinks.map(l => (
                <li key={l.href}><FootLink href={l.href}>{l.label}</FootLink></li>
              ))}
            </LinkList>
          </Column>

          <Column>
            <ColumnLabel>Contato</ColumnLabel>
            <LinkList>
              <li><FootLink href="mailto:mariaeduardamessias2001@gmail.com">mariaeduardamessias2001@gmail.com</FootLink></li>
              <li><PlainText>São Paulo, Brasil</PlainText></li>
              <li><Availability><span />Disponível para novos projetos</Availability></li>
            </LinkList>
            <SocialRow>
              <SocialIcon href="https://www.linkedin.com/in/maria-eduarda-messias" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon size={16} />
              </SocialIcon>
              <SocialIcon href="https://github.com/MessiasEduarda" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitBranch size={16} />
              </SocialIcon>
              <SocialIcon href="mailto:mariaeduardamessias2001@gmail.com" aria-label="E-mail">
                <Mail size={16} />
              </SocialIcon>
            </SocialRow>
          </Column>
        </Top>

        <Bottom>
          <Copy>© {new Date().getFullYear()} Maria Messias — Todos os direitos reservados</Copy>
          <BackToTop onClick={scrollToTop}>
          </BackToTop>
        </Bottom>
      </Inner>
    </Foot>
  );
}