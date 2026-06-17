'use client';
import styled from 'styled-components';
import FadeIn from '../ui/FadeIn';
import { ArrowRight, GitBranch } from 'lucide-react';

const Section = styled.section`
  padding: 120px 48px;
  background: #0d1117;
  border-top: 1px solid rgba(255,255,255,0.04);
  text-align: center;

  @media (max-width: 1024px) { padding: 100px 40px; }
  @media (max-width: 768px)  { padding: 80px 24px; }
  @media (max-width: 480px)  { padding: 64px 16px; }
`;

const Inner = styled.div`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  font-weight: 300;
  color: #fff;
  letter-spacing: -0.5px;
  margin-bottom: 20px;
  strong { font-weight: 600; }
`;

const Sub = styled.p`
  font-size: clamp(0.85rem, 1.3vw, 0.95rem);
  color: #666;
  line-height: 1.9;
  font-weight: 300;
  margin-bottom: 44px;
  max-width: 560px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
  justify-content: center;
`;

const BtnGold = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 36px;
  background: transparent;
  border: 1px solid #c9a84c;
  color: #c9a84c;
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.4s;
  &:hover { background: #c9a84c; color: #0d1117; }
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

const WHATSAPP_NUMBER = '5511999999999'; // ← troque pelo seu número com DDI+DDD, sem espaços ou símbolos
const WHATSAPP_MSG    = encodeURIComponent(
  'Olá! Vim pelo seu portfólio e gostaria de solicitar um orçamento. Pode me ajudar?'
);
const WHATSAPP_LINK   = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

export default function ServicosCTA() {
  return (
    <Section id="servicos-cta">
      <Inner>
        <FadeIn direction="up" duration={800}>
          <GoldRule />
          <Label>Vamos conversar</Label>
          <Title>Tem um projeto <strong>em mente?</strong></Title>
          <Sub>
            Me conta o que você precisa e eu te digo, com clareza, qual é o caminho técnico mais sensato — sem enrolação e sem vender solução maior do que o necessário.
          </Sub>
          <Actions>
            <BtnGold href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Solicitar orçamento <ArrowRight size={14} />
            </BtnGold>
            <LinkBtn href="#projetos">
              <GitBranch size={12} /> Ver projetos reais
            </LinkBtn>
          </Actions>
        </FadeIn>
      </Inner>
    </Section>
  );
}