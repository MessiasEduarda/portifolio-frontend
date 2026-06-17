'use client';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(-32px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const fadeLeft = keyframes`
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const fadeRight = keyframes`
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const fadeNone = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const animationMap = { up: fadeUp, down: fadeDown, left: fadeLeft, right: fadeRight, none: fadeNone };

const Wrapper = styled.div`
  opacity: 0;
  &.visible {
    ${({ $direction, $delay, $duration }) => css`
      animation: ${animationMap[$direction] || fadeUp}
        ${$duration || 900}ms
        cubic-bezier(0.16, 1, 0.3, 1)
        forwards;
      animation-delay: ${$delay || 0}ms;
    `}
  }
  &.hidden {
    opacity: 0;
    transition: opacity 400ms ease;
  }
`;

export default function FadeIn({ children, delay = 0, direction = 'up', duration = 900, reverse = false }) {
  const ref = useRef(null);
  const [state, setState] = useState('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('visible');
        } else if (reverse && state === 'visible') {
          setState('hidden');
          setTimeout(() => setState('idle'), 400);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reverse, state]);

  return (
    <Wrapper
      ref={ref}
      className={state === 'visible' ? 'visible' : state === 'hidden' ? 'hidden' : ''}
      $delay={delay}
      $direction={direction}
      $duration={duration}
    >
      {children}
    </Wrapper>
  );
}