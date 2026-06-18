'use client';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FadeIn from '../ui/FadeIn';
import { Check } from 'lucide-react';

/* ============================================================
   LAYOUT DA SEÇÃO
   ============================================================ */
const Section = styled.section`
  padding: 100px 48px;
  background: #090c10;
  border-top: 1px solid rgba(255,255,255,0.04);

  @media (max-width: 1024px) { padding: 80px 40px; }
  @media (max-width: 768px)  { padding: 72px 24px; }
  @media (max-width: 480px)  { padding: 56px 16px; }
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

const SectionTitle = styled.h2`
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 300;
  color: #fff;
  letter-spacing: -0.5px;
  margin-bottom: 48px;
  strong { font-weight: 600; }
`;

/* ============================================================
   BUILD LAYOUT
   ============================================================ */
const BuildLayout = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 32px;
  align-items: start;

  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 24px; }
`;

const BuildFrame = styled.div`
  background: #080a0d;
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  overflow: hidden;
`;

const BuildTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #040506;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 480px) { padding: 8px 12px; }
`;

const BuildUrl = styled.span`
  font-size: 0.6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #2a2a2a;
  font-weight: 300;
  @media (max-width: 480px) { font-size: 0.46rem; letter-spacing: 1px; }
`;

const BuildLiveTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.58rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #c9a84c;
  font-weight: 300;
  @media (max-width: 480px) { font-size: 0.44rem; gap: 5px; }
`;

const BuildLiveDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #c9a84c;
  animation: buildPulse 1.6s ease-in-out infinite;
  @keyframes buildPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: .3; }
  }
`;

/* ============================================================
   CANVAS — replica o Hero exato
   ============================================================ */
const BuildCanvas = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  background: #080a0d;
  overflow: hidden;
  container-type: inline-size;
  container-name: protoCanvas;

  @media (max-width: 600px) { aspect-ratio: 16 / 11; }
`;

/* Cursor animado */
const BuildCursor = styled.div`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top:  ${({ $y }) => $y}%;
  width: 16px;
  height: 16px;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none;
  z-index: 50;
  transition: left .85s cubic-bezier(.65,0,.35,1), top .85s cubic-bezier(.65,0,.35,1), opacity .3s;

  @media (max-width: 600px) { width: 10px; height: 10px; }
`;

const BuildCursorTag = styled.span`
  position: absolute;
  left: 14px;
  top: 10px;
  background: #c9a84c;
  color: #0d1117;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: .5px;
  padding: 2px 7px;
  white-space: nowrap;
  @media (max-width: 600px) { font-size: 0.32rem; padding: 1px 5px; left: 9px; top: 7px; }
  @media (max-width: 420px) { display: none; }
`;

/* Bloco posicionado */
const BuildBlock = styled.div`
  position: absolute;
  left:   ${({ $left })   => $left}%;
  top:    ${({ $top })    => $top}%;
  width:  ${({ $width })  => $width}%;
  height: ${({ $height }) => $height}%;
`;

const BuildSketch = styled.div`
  position: absolute;
  inset: 0;
  border: 1.5px dashed rgba(201,168,76,.5);
  opacity:   ${({ $active }) => $active ? 1 : 0};
  transform: scale(${({ $active }) => $active ? 1 : 0.04});
  transform-origin: top left;
  transition: transform .5s cubic-bezier(.2,.8,.2,1), opacity .2s;
`;

const BuildContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  opacity:   ${({ $active }) => $active ? 1 : 0};
  transform: translateY(${({ $active }) => $active ? '0' : '5px'});
  transition: opacity .5s ease, transform .5s ease;
`;

/* ============================================================
   ELEMENTOS INTERNOS — réplica exata do Hero.js
   ============================================================ */

/* Foto de fundo com overlay igual ao BgPhoto do Hero */
const HeroPhoto = styled.div`
  position: absolute;
  inset: 0;
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

/* Navbar do site — grid 3 colunas: logo | links centralizados | botão */
const ProtoNavbar = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 4% 0 3%;
  height: 100%;
  background: rgba(8,10,13,0.0);
`;

/* LOGO — tamanho original, não escala */
const ProtoLogo = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  img {
    height: clamp(28px, 4vw, 48px);
    width: auto;
    display: block;
  }
`;

/* Links centralizados na coluna do meio */
const ProtoNavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.4cqw;
`;

const ProtoNavLink = styled.span`
  font-size: 1.6cqw;
  letter-spacing: 0.2cqw;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  font-weight: 300;
  white-space: nowrap;
`;

/* Botão alinhado à direita na terceira coluna */
const ProtoNavBtn = styled.span`
  font-size: 1.4cqw;
  letter-spacing: 0.15cqw;
  text-transform: uppercase;
  color: #c9a84c;
  border: 1px solid #c9a84c;
  padding: 0.7cqw 1.6cqw;
  font-weight: 300;
  white-space: nowrap;
  justify-self: end;
`;

/* Camada de texto do Hero — igual ao TextLayer */
const ProtoTextLayer = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 10;
  padding: 0 5% 8%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ProtoNameLeft = styled.span`
  font-family: var(--font-italianno), cursive;
  font-size: clamp(2.8rem, 8vw, 7rem);
  font-weight: 400;
  color: #ffffff;
  letter-spacing: -1px;
  line-height: 0.85;
  display: block;
`;

const ProtoNameRight = styled.span`
  font-family: var(--font-italianno), cursive;
  font-size: clamp(2.8rem, 8vw, 7rem);
  font-weight: 400;
  color: #ffffff;
  letter-spacing: -1px;
  line-height: 0.85;
  display: block;
  text-align: right;
`;

const ProtoSub = styled.span`
  font-size: clamp(0.28rem, 0.65vw, 0.52rem);
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.38);
  font-weight: 300;
  line-height: 1.9;
  display: block;
  margin-top: clamp(2px, 0.5vw, 6px);
`;

const ProtoSubRight = styled(ProtoSub)`
  text-align: right;
`;

/* Shine */
const BuildShine = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(115deg, transparent 42%, rgba(201,168,76,.25) 50%, transparent 58%);
  transform: translateX(-130%);
  animation: ${({ $run }) => $run ? 'buildSweep 1.1s ease forwards' : 'none'};
  @keyframes buildSweep { to { transform: translateX(130%); } }
`;

/* ============================================================
   BADGE — idêntico ao da página Landing Pages:
   posicionado dentro da navbar (top: 10px, right: 10px),
   fundo claro #faf7f0, borda dourada, texto dourado escuro
   ============================================================ */
const BuildBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  background: #faf7f0;
  border: 1px solid #c9a84c;
  color: #8a6d1f;
  font-size: 0.52rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 10px;
  opacity: ${({ $show }) => $show ? 1 : 0};
  transition: opacity .4s;
  z-index: 30;
  svg { width: 10px; height: 10px; }
  @media (max-width: 480px) { font-size: 0.38rem; padding: 3px 7px; top: 7px; right: 7px; }
`;

/* ============================================================
   STEPS LATERAIS — idênticos ao das páginas de serviço
   ============================================================ */
const BuildSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.04);

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 640px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 380px) { grid-template-columns: 1fr; }
`;

const BuildStep = styled.div`
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 14px;
  padding: 18px 20px;
  background: #0d1117;
  @media (max-width: 1024px) { padding: 14px 16px; gap: 10px; }
  @media (max-width: 640px)  { grid-template-columns: 30px 1fr; gap: 8px; padding: 12px 14px; }
`;

const BuildStepNum = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1;
  color: ${({ $state }) => $state === 'idle' ? '#222' : '#c9a84c'};
  transition: color .3s;
  @media (max-width: 640px) { font-size: 1rem; }
`;

const BuildStepTitle = styled.h4`
  font-size: 0.76rem;
  font-weight: 400;
  letter-spacing: .3px;
  margin-bottom: 4px;
  color: ${({ $state }) => $state === 'idle' ? '#555' : '#ddd'};
  transition: color .3s;
  @media (max-width: 640px) { font-size: 0.64rem; margin-bottom: 2px; }
`;

const BuildStepDesc = styled.p`
  font-size: 0.66rem;
  color: #555;
  line-height: 1.6;
  font-weight: 300;
  margin: 0;
  @media (max-width: 640px) { font-size: 0.58rem; }
  @media (max-width: 420px) { display: none; }
`;

/* ============================================================
   DADOS
   ============================================================ */
const buildStepsMeta = [
  { num: 1, title: 'Foto de fundo',     desc: 'Imagem com filtro e overlay gradiente.' },
  { num: 2, title: 'Navbar',            desc: 'Logo, links e botão de CV.' },
  { num: 3, title: 'Nome — Maria',      desc: 'Tipografia Italianno em tamanho máximo.' },
  { num: 4, title: 'Nome — Messias',    desc: 'Espelhado à direita, mesma escala.' },
  { num: 5, title: 'Subtítulos',        desc: 'Stack e disponibilidade em uppercase.' },
  { num: 6, title: 'Revisão final',     desc: 'Ajustes e deploy em produção.' },
];

const buildSequence = [
  { id: 'photo',     x: 40, y: 40, label: 'fundo.jpg',    step: 1 },
  { id: 'navbar',    x: 60, y: 5,  label: 'Navbar.tsx',   step: 2 },
  { id: 'nameLeft',  x: 3,  y: 55, label: 'Hero.tsx',     step: 3 },
  { id: 'nameRight', x: 55, y: 55, label: 'Hero.tsx',     step: 4 },
  { id: 'subs',      x: 3,  y: 82, label: 'SubTexts.tsx', step: 5 },
];

const initialStatus = {
  photo: 'idle', navbar: 'idle',
  nameLeft: 'idle', nameRight: 'idle', subs: 'idle',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ============================================================
   COMPONENTE
   ============================================================ */
export default function BuildAoVivo() {
  const [status, setStatus]         = useState(initialStatus);
  const [cursor, setCursor]         = useState({ x: 40, y: 40, label: 'fundo.jpg', visible: false });
  const [activeStep, setActiveStep] = useState(0);
  const [shine, setShine]           = useState(false);
  const [badge, setBadge]           = useState(false);

  const canvasRef  = useRef(null);
  const visibleRef = useRef(false);
  const canceledRef = useRef(false);

  useEffect(() => {
    canceledRef.current = false;

    /* IntersectionObserver: rastreia se o canvas está na viewport */
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.25 }
    );
    if (canvasRef.current) observer.observe(canvasRef.current);

    /* Dorme `ms`, pausando enquanto o componente estiver fora da tela */
    function waitVisible(ms) {
      return new Promise((resolve, reject) => {
        const deadline = Date.now() + ms;
        function tick() {
          if (canceledRef.current) return reject();
          if (!visibleRef.current) { setTimeout(tick, 200); return; }
          const remaining = deadline - Date.now();
          if (remaining <= 0) return resolve();
          setTimeout(tick, Math.min(remaining, 100));
        }
        tick();
      });
    }

    /* Espera o canvas aparecer na tela antes de continuar */
    function waitForVisible() {
      return new Promise((resolve) => {
        function check() {
          if (canceledRef.current) return;
          if (visibleRef.current) return resolve();
          setTimeout(check, 200);
        }
        check();
      });
    }

    async function run() {
      await waitForVisible(); // aguarda rolar até o componente

      while (!canceledRef.current) {
        if (!visibleRef.current) await waitForVisible();
        if (canceledRef.current) return;

        setStatus(initialStatus);
        setShine(false);
        setBadge(false);
        setActiveStep(0);
        setCursor((c) => ({ ...c, visible: false }));

        try {
          await waitVisible(500);
          setCursor((c) => ({ ...c, visible: true }));

          for (const cfg of buildSequence) {
            setActiveStep(cfg.step);
            setCursor({ x: cfg.x, y: cfg.y, label: cfg.label, visible: true });
            await waitVisible(800);
            setStatus((prev) => ({ ...prev, [cfg.id]: 'sketching' }));
            await waitVisible(550);
            setStatus((prev) => ({ ...prev, [cfg.id]: 'filled' }));
            await waitVisible(450);
          }

          setActiveStep(6);
          setCursor((c) => ({ ...c, visible: false }));
          await waitVisible(300);
          setShine(true);
          await waitVisible(700);
          setBadge(true);
          setActiveStep(7);
          await waitVisible(3000);
        } catch {
          // saiu da viewport ou cancelado — reinicia o ciclo no próximo loop
        }
      }
    }

    run();
    return () => {
      canceledRef.current = true;
      observer.disconnect();
    };
  }, []);

  return (
    <Section>
      <Inner>
        <FadeIn direction="up" duration={800}>
          <GoldRule />
          <Label>Processo de desenvolvimento</Label>
          <SectionTitle>Veja o portfólio <strong>ganhar forma</strong></SectionTitle>

          <BuildLayout>

            {/* ===== PROTÓTIPO ===== */}
            <BuildFrame>
              <BuildTopBar>
                <BuildUrl>mariamessias.dev</BuildUrl>
                <BuildLiveTag><BuildLiveDot /> construindo ao vivo</BuildLiveTag>
              </BuildTopBar>

              <BuildCanvas ref={canvasRef}>

                {/* Cursor */}
                <BuildCursor $x={cursor.x} $y={cursor.y} $visible={cursor.visible}>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M1 1 L1 13 L4.5 10.2 L7 15 L9 14 L6.5 9 L11 9 Z"
                      fill="#080a0d" stroke="#c9a84c" strokeWidth={0.8} />
                  </svg>
                  <BuildCursorTag>{cursor.label}</BuildCursorTag>
                </BuildCursor>

                {/* 1 — Foto de fundo */}
                <BuildBlock $left={0} $top={0} $width={100} $height={100}>
                  <BuildSketch $active={status.photo === 'sketching'} />
                  <BuildContent $active={status.photo === 'filled'}>
                    <HeroPhoto>
                      <img src="/fundo.jpg" alt="Maria Messias" />
                    </HeroPhoto>
                  </BuildContent>
                </BuildBlock>

                {/* 2 — Navbar */}
                <BuildBlock $left={0} $top={0} $width={100} $height={14}>
                  <BuildSketch $active={status.navbar === 'sketching'} />
                  <BuildContent $active={status.navbar === 'filled'}>
                    <ProtoNavbar>
                      <ProtoLogo>
                        <img src="/logo.png" alt="Maria Messias" />
                      </ProtoLogo>
                      <ProtoNavLinks>
                        <ProtoNavLink>Sobre</ProtoNavLink>
                        <ProtoNavLink>Habilidades</ProtoNavLink>
                        <ProtoNavLink>Projetos</ProtoNavLink>
                        <ProtoNavLink>Serviços</ProtoNavLink>
                        <ProtoNavLink>Contato</ProtoNavLink>
                      </ProtoNavLinks>
                      <ProtoNavBtn>Download CV</ProtoNavBtn>
                    </ProtoNavbar>
                  </BuildContent>
                </BuildBlock>

                {/* 3 — Nome esquerdo "Maria" */}
                <BuildBlock $left={0} $top={52} $width={50} $height={35}>
                  <BuildSketch $active={status.nameLeft === 'sketching'} />
                  <BuildContent $active={status.nameLeft === 'filled'}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 5% 8%', width: '100%' }}>
                      <ProtoNameLeft>Maria</ProtoNameLeft>
                    </div>
                  </BuildContent>
                </BuildBlock>

                {/* 4 — Nome direito "Messias" */}
                <BuildBlock $left={50} $top={52} $width={50} $height={35}>
                  <BuildSketch $active={status.nameRight === 'sketching'} />
                  <BuildContent $active={status.nameRight === 'filled'}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', padding: '0 5% 8%', width: '100%' }}>
                      <ProtoNameRight>Messias</ProtoNameRight>
                    </div>
                  </BuildContent>
                </BuildBlock>

                {/* 5 — Subtítulos */}
                <BuildBlock $left={0} $top={82} $width={100} $height={14}>
                  <BuildSketch $active={status.subs === 'sketching'} />
                  <BuildContent $active={status.subs === 'filled'}>
                    <ProtoTextLayer style={{ position: 'relative', width: '100%', padding: '0 5%', alignItems: 'flex-start' }}>
                      <div>
                        <ProtoSub>Front-End Developer</ProtoSub>
                        <ProtoSub>React · Next.js · TypeScript</ProtoSub>
                      </div>
                      <div>
                        <ProtoSubRight>Web &amp; Mobile</ProtoSubRight>
                        <ProtoSubRight>Disponível para novos projetos</ProtoSubRight>
                      </div>
                    </ProtoTextLayer>
                  </BuildContent>
                </BuildBlock>

                {/* Shine e badge */}
                <BuildShine $run={shine} />
                <BuildBadge $show={badge}><Check size={10} /> Protótipo pronto</BuildBadge>

              </BuildCanvas>
            </BuildFrame>

            {/* ===== STEPS LATERAIS ===== */}
            <BuildSteps>
              {buildStepsMeta.map((s) => {
                const state =
                  activeStep === s.num ? 'active' :
                  activeStep >  s.num ? 'done'   : 'idle';
                return (
                  <BuildStep key={s.num}>
                    <BuildStepNum $state={state}>{String(s.num).padStart(2, '0')}</BuildStepNum>
                    <div>
                      <BuildStepTitle $state={state}>{s.title}</BuildStepTitle>
                      <BuildStepDesc>{s.desc}</BuildStepDesc>
                    </div>
                  </BuildStep>
                );
              })}
            </BuildSteps>

          </BuildLayout>
        </FadeIn>
      </Inner>
    </Section>
  );
}