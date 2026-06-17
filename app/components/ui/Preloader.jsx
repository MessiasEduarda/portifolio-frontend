'use client';

import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const expandTrack = keyframes`
  0% { width: 0px; }
  100% { width: 220px; }
`;

const slideRight = keyframes`
  0%   { transform: translateX(-25px); opacity: 1; }
  85%  { opacity: 1; }
  100% { transform: translateX(245px); opacity: 0; }
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: ${({ $opening }) => ($opening ? 'none' : 'auto')};
`;

const Panel = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  height: 50vh;
  background: #070a0d;
  transition: transform 1.1s cubic-bezier(0.83, 0, 0.17, 1);
`;

const TopPanel = styled(Panel)`
  top: 0;
  transform: translateY(${({ $opening }) => ($opening ? '-100%' : '0')});
`;

const BottomPanel = styled(Panel)`
  bottom: 0;
  transform: translateY(${({ $opening }) => ($opening ? '100%' : '0')});
`;

const Content = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  opacity: ${({ $hide }) => ($hide ? 0 : 1)};
  transition: opacity 0.4s ease;
  pointer-events: none;
`;

const ProgressTrack = styled.div`
  width: 0px;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
  animation: ${expandTrack} 0.9s cubic-bezier(0.25, 0, 0.35, 1) forwards;
`;

const ProgressFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 73px;
  height: 100%;
  background: #ffffff;
  animation: ${slideRight} 1s linear infinite;
  animation-delay: 0.9s;
  opacity: 0;
`;

const NameText = styled.p`
  font-family: var(--font-italianno), cursive;
  font-size: 2.6rem;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 0px;
`;

export default function Preloader({
  name = 'Dra. Juliana Matias',
  duration = 1800,
}) {
  const [opening, setOpening] = useState(false);
  const [done, setDone] = useState(false);
  const ran = useRef(false);

  // Garante que a página SEMPRE comece do topo, mesmo em reload/F5,
  // navegação de volta ou refresh com scroll salvo pelo navegador.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Desativa a restauração automática de scroll do navegador
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Força o topo imediatamente
    window.scrollTo(0, 0);

    // Garante novamente após o layout/paint (cobre casos de fontes/imagens
    // carregando e empurrando o layout, ou navegação por hash)
    requestAnimationFrame(() => window.scrollTo(0, 0));

    // E mais uma vez quando a página terminar de carregar tudo (imagens, etc.)
    const handleLoad = () => window.scrollTo(0, 0);
    window.addEventListener('load', handleLoad);

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setOpening(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (!opening) return;

    document.body.style.overflow = '';

    const timeout = setTimeout(() => {
      setDone(true);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [opening]);

  if (done) return null;

  return (
    <Wrapper $opening={opening}>
      <TopPanel $opening={opening} />
      <BottomPanel $opening={opening} />

      <Content $hide={opening}>
        <ProgressTrack>
          <ProgressFill />
        </ProgressTrack>

        <NameText>{name}</NameText>
      </Content>
    </Wrapper>
  );
}