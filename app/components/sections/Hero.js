'use client';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  position: relative;
  height: 100vh;
  min-height: 500px;
  overflow: hidden;
  background: #080a0d;
`;

const BgPhoto = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: #0d0f12;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    filter: grayscale(30%) brightness(0.6);
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(8,10,13,0.1) 0%,
      rgba(8,10,13,0.0) 35%,
      rgba(8,10,13,0.55) 72%,
      rgba(8,10,13,1) 100%
    );
  }
`;

const TextLayer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 0 80px 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 1024px) { padding: 0 48px 80px; }
  @media (max-width: 768px)  { padding: 0 24px 64px; }
  @media (max-width: 480px)  { padding: 0 16px 48px; }
`;

const NameBlock = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const NameLeft = styled.h1`
  font-family: var(--font-italianno), cursive;
  font-size: clamp(9rem, 20vw, 19rem);
  font-weight: 400;
  color: #ffffff;
  letter-spacing: -2px;
  line-height: 0.85;
  user-select: none;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    font-size: clamp(5rem, 22vw, 9rem);
    letter-spacing: -2px;
    line-height: 0.85;
  }
`;

const NameRight = styled.h1`
  font-family: var(--font-italianno), cursive;
  font-size: clamp(9rem, 20vw, 19rem);
  font-weight: 400;
  color: #ffffff;
  letter-spacing: -2px;
  line-height: 0.85;
  text-align: right;
  user-select: none;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    font-size: clamp(5rem, 22vw, 9rem);
    letter-spacing: -2px;
    line-height: 0.85;
    
  }
`;

const SubLeft = styled.p`
  font-family: var(--font-inter), sans-serif;
  font-size: 0.82rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.38);
  font-weight: 300;
  line-height: 1.9;
  margin-top: 10px;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    font-size: 0.6rem;
    letter-spacing: 2px;
    margin-top: 6px;
    line-height: 1.7;
  }
  @media (max-width: 480px) {
    font-size: 0.52rem;
    letter-spacing: 1.5px;
    margin-top: 4px;
  }
`;

const SubRight = styled.p`
  font-family: var(--font-inter), sans-serif;
  font-size: 0.82rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.38);
  font-weight: 300;
  line-height: 1.9;
  text-align: right;
  margin-top: 10px;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    font-size: 0.6rem;
    letter-spacing: 2px;
    margin-top: 6px;
    line-height: 1.7;
  }
  @media (max-width: 480px) {
    font-size: 0.52rem;
    letter-spacing: 1.5px;
    margin-top: 4px;
  }
`;

export default function Hero() {
  const subLeftRef   = useRef(null);
  const subRightRef  = useRef(null);
  const nameLeftRef  = useRef(null);
  const nameRightRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY  = window.scrollY;
      const vh       = window.innerHeight;
      const progress = Math.min(scrollY / (vh * 1.4), 1);
      const opacity  = Math.max(1 - progress * 1.6, 0);
      const isMobile = window.innerWidth < 768;
      const nameDist = isMobile ? 120 : 600;
      const subDist  = isMobile ? 80  : 400;

      if (nameLeftRef.current) {
        nameLeftRef.current.style.transform = `translateX(${-progress * nameDist}px)`;
        nameLeftRef.current.style.opacity   = opacity;
      }
      if (nameRightRef.current) {
        nameRightRef.current.style.transform = `translateX(${progress * nameDist}px)`;
        nameRightRef.current.style.opacity   = opacity;
      }
      if (subLeftRef.current) {
        subLeftRef.current.style.transform = `translateX(${-progress * subDist}px)`;
        subLeftRef.current.style.opacity   = opacity;
      }
      if (subRightRef.current) {
        subRightRef.current.style.transform = `translateX(${progress * subDist}px)`;
        subRightRef.current.style.opacity   = opacity;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Section id="hero">
      <BgPhoto>
        <img src="/fundo.jpg" alt="Maria Messias" />
      </BgPhoto>
      <TextLayer>
        <NameBlock>
          <NameLeft ref={nameLeftRef}>Maria</NameLeft>
          <SubLeft ref={subLeftRef}>
            Front-End Developer<br />
            React · Next.js · TypeScript
          </SubLeft>
        </NameBlock>
        <NameBlock>
          <NameRight ref={nameRightRef}>Messias</NameRight>
          <SubRight ref={subRightRef}>
            Web & Mobile<br />
            Disponível para novos projetos
          </SubRight>
        </NameBlock>
      </TextLayer>
    </Section>
  );
}