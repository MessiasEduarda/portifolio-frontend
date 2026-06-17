'use client';
import { useState } from 'react';
import styled from 'styled-components';
import FadeIn from '../ui/FadeIn';
import Modal from '../ui/Modal';
import { Mail, Link as LinkedinLink, GitBranch, ArrowRight, Send, Copy, Check } from 'lucide-react';

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

const Left  = styled.div``;
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
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: clamp(1.6rem, 3.5vw, 2.8rem);
  font-weight: 300;
  color: #fff;
  letter-spacing: -0.5px;
  margin-bottom: 24px;
  strong { font-weight: 600; }
`;

const Sub = styled.p`
  font-size: clamp(0.85rem, 1.3vw, 0.9rem);
  color: #555;
  line-height: 1.9;
  font-weight: 300;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.04);
  margin-bottom: 32px;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 24px 28px;
  background: #0d1117;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  gap: 16px;
  font-family: inherit;
  text-align: left;
  color: inherit;
  &:hover { background: #0f1318; }
  &:hover svg.arrow { color: #c9a84c; transform: translateX(4px); }

  @media (max-width: 768px) { padding: 20px 20px; gap: 12px; }
  @media (max-width: 480px) { padding: 16px 14px; gap: 10px; }
`;

const ContactLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;

  @media (max-width: 480px) { gap: 10px; }
`;

const IconWrap = styled.div`
  color: #c9a84c;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const ContactInfo = styled.div`
  min-width: 0;
`;

const ContactType = styled.p`
  font-size: 0.6rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #444;
  font-weight: 300;
  margin-bottom: 4px;
`;

const ContactValue = styled.p`
  font-size: clamp(0.72rem, 1.2vw, 0.85rem);
  color: #aaa;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) { font-size: 0.7rem; }
`;

const ArrowIcon = styled(ArrowRight)`
  color: #333;
  transition: all 0.3s;
  flex-shrink: 0;
`;

const BtnGold = styled.button`
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
  font-family: inherit;
  cursor: pointer;
  transition: all 0.4s;
  &:hover { background: #c9a84c; color: #0d1117; }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 14px 24px;
    font-size: 0.65rem;
  }
`;

const ModalSub = styled(Sub)`
  margin-bottom: 32px;
`;

const EMAIL      = 'mariaeduardamessias2001@gmail.com';
const GMAIL_LINK = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent('Contato pelo portfólio')}`;

export default function Contato() {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied,    setCopied]    = useState(false);

  const closeModal   = () => { setModalOpen(false); setCopied(false); };
  const handleCopy   = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) { console.error(err); }
  };

  return (
    <Section id="contato">
      <Inner>
        <FadeIn direction="right" duration={800}>
          <Left>
            <GoldRule />
            <Label>Contato</Label>
            <Title>Vamos <strong>trabalhar juntos?</strong></Title>
            <Sub>
              Estou disponível para oportunidades de emprego, projetos freelance e colaborações. Se você tem um projeto interessante ou uma vaga que combina com meu perfil, me chame.
            </Sub>
          </Left>
        </FadeIn>
        <FadeIn direction="left" delay={150} duration={800}>
          <Right>
            <ContactList>
              <ContactItem href="mailto:mariaeduardamessias2001@gmail.com">
                <ContactLeft>
                  <IconWrap><Mail size={16} /></IconWrap>
                  <ContactInfo>
                    <ContactType>E-mail</ContactType>
                    <ContactValue>{EMAIL}</ContactValue>
                  </ContactInfo>
                </ContactLeft>
                <ArrowIcon size={14} className="arrow" />
              </ContactItem>
              <ContactItem href="https://www.linkedin.com/in/maria-eduarda-messias" target="_blank">
                <ContactLeft>
                  <IconWrap><LinkedinLink size={16} /></IconWrap>
                  <ContactInfo>
                    <ContactType>LinkedIn</ContactType>
                    <ContactValue>linkedin.com/in/maria-eduarda-messias</ContactValue>
                  </ContactInfo>
                </ContactLeft>
                <ArrowIcon size={14} className="arrow" />
              </ContactItem>
              <ContactItem href="https://github.com/MessiasEduarda" target="_blank">
                <ContactLeft>
                  <IconWrap><GitBranch size={16} /></IconWrap>
                  <ContactInfo>
                    <ContactType>GitHub</ContactType>
                    <ContactValue>github.com/MessiasEduarda</ContactValue>
                  </ContactInfo>
                </ContactLeft>
                <ArrowIcon size={14} className="arrow" />
              </ContactItem>
            </ContactList>
            <BtnGold type="button" onClick={() => setModalOpen(true)}>
              <Mail size={14} /> Enviar Mensagem
            </BtnGold>
          </Right>
        </FadeIn>
      </Inner>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <GoldRule />
        <Label>Contato</Label>
        <Title>Enviar <strong>mensagem</strong></Title>
        <ModalSub>Escolha a forma mais prática de me enviar sua mensagem.</ModalSub>
        <ContactList style={{ marginBottom: 0 }}>
          <ContactItem href={GMAIL_LINK} target="_blank" rel="noopener noreferrer">
            <ContactLeft>
              <IconWrap><Send size={16} /></IconWrap>
              <ContactInfo>
                <ContactType>Abrir no Gmail</ContactType>
                <ContactValue>{EMAIL}</ContactValue>
              </ContactInfo>
            </ContactLeft>
            <ArrowIcon size={14} className="arrow" />
          </ContactItem>
          <ContactItem as="button" type="button" onClick={handleCopy}>
            <ContactLeft>
              <IconWrap>{copied ? <Check size={16} /> : <Copy size={16} />}</IconWrap>
              <ContactInfo>
                <ContactType>{copied ? 'E-mail copiado!' : 'Copiar e-mail'}</ContactType>
                <ContactValue>{EMAIL}</ContactValue>
              </ContactInfo>
            </ContactLeft>
            <ArrowIcon size={14} className="arrow" />
          </ContactItem>
        </ContactList>
      </Modal>
    </Section>
  );
}