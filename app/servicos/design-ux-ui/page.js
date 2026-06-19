'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import styled from 'styled-components';
import FadeIn from '../../components/ui/FadeIn';
import Link from 'next/link';
import { Check, ArrowLeft, ArrowRight, Palette, Layers, Eye, MousePointer, Grid as GridIcon, Zap, X, ZoomIn } from 'lucide-react';

/* ============================================================
   BASE
   ============================================================ */
const Page = styled.main`background: #080a0d; min-height: 100vh;`;

const Hero = styled.section`
  padding: 160px 48px 100px;
  background: #090c10;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 1024px) { padding: 140px 40px 80px; }
  @media (max-width: 768px)  { padding: 120px 24px 64px; }
  @media (max-width: 480px)  { padding: 100px 16px 48px; }
`;

const Inner = styled.div`max-width: 1200px; margin: 0 auto;`;

const BackLink = styled(Link)`
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.62rem; letter-spacing: 3px; text-transform: uppercase;
  color: #444; font-weight: 300; margin-bottom: 48px; transition: color 0.3s;
  &:hover { color: #c9a84c; }
`;

const GoldRule = styled.div`width: 32px; height: 1px; background: #c9a84c; margin-bottom: 20px;`;

const Label = styled.p`
  font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase;
  color: #c9a84c; font-weight: 300; margin-bottom: 16px;
`;

const HeroTitle = styled.h1`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(2.4rem, 5.5vw, 4.5rem);
  font-weight: 400; color: #fff; line-height: 1.15;
  letter-spacing: -0.5px; max-width: 820px; margin-bottom: 28px;
  strong { font-weight: 700; color: #c9a84c; }
`;

const HeroSub = styled.p`
  font-size: clamp(0.9rem, 1.4vw, 1.05rem); color: #666;
  line-height: 1.95; font-weight: 300; max-width: 620px; margin-bottom: 48px;
`;

const HeroTags = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;

const HeroTag = styled.span`
  font-size: 0.6rem; letter-spacing: 2px; text-transform: uppercase;
  color: #c9a84c; border: 1px solid rgba(201,168,76,0.2);
  padding: 5px 14px; font-weight: 300;
`;

/* ============================================================
   SEÇÃO GENÉRICA
   ============================================================ */
const Section = styled.section`
  padding: 100px 48px;
  background: ${({ $alt }) => $alt ? '#0d1117' : '#090c10'};
  border-top: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 768px) { padding: 72px 24px; }
  @media (max-width: 480px) { padding: 56px 16px; }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 300; color: #fff;
  letter-spacing: -0.5px; margin-bottom: 48px;
  strong { font-weight: 600; }
`;

/* ============================================================
   GALERIA DE PROTÓTIPOS
   ============================================================ */
const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 700px) { grid-template-columns: 1fr; gap: 16px; }
`;

const GalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.25, 0, 0.35, 1);
    filter: brightness(0.82);
  }

  &:hover img {
    transform: scale(1.04);
    filter: brightness(1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(8,10,13,0.75) 0%, rgba(8,10,13,0) 55%);
    pointer-events: none;
  }

  &:hover .zoom-hint {
    opacity: 1;
  }
`;

const ZoomHint = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(8,10,13,0.75);
  border: 1px solid rgba(201,168,76,0.4);
  color: #c9a84c;
  font-size: 0.6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 10px 18px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
`;

const GalleryCaption = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 10;
  padding: 20px 24px;

  @media (max-width: 480px) { padding: 14px 16px; }
`;

const GalleryNum = styled.span`
  font-size: 0.58rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #c9a84c;
  font-weight: 300;
  display: block;
  margin-bottom: 4px;
`;

const GalleryName = styled.span`
  font-size: clamp(0.78rem, 1.3vw, 0.9rem);
  color: #ccc;
  font-weight: 300;
  letter-spacing: 0.3px;
  display: block;
`;

/* ============================================================
   LIGHTBOX
   ============================================================ */
const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(4, 5, 6, 0.96);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: ${({ $open }) => $open ? 1 : 0};
  pointer-events: ${({ $open }) => $open ? 'all' : 'none'};
  transition: opacity 0.3s ease;
  cursor: pointer;
`;

const LightboxImg = styled.img`
  max-width: 90vw;
  max-height: 88vh;
  object-fit: contain;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 40px 100px rgba(0,0,0,0.8);
  transform: ${({ $open }) => $open ? 'scale(1)' : 'scale(0.94)'};
  transition: transform 0.35s cubic-bezier(0.25, 0, 0.35, 1);
  cursor: default;
`;

const LightboxClose = styled.button`
  position: fixed;
  top: 20px; right: 24px;
  z-index: 1010;
  display: flex; align-items: center; justify-content: center;
  width: 44px; height: 44px;
  background: rgba(8,10,13,0.8);
  border: 1px solid rgba(255,255,255,0.1);
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  &:hover { color: #c9a84c; border-color: #c9a84c; }
`;

const LightboxCaption = styled.div`
  position: fixed;
  bottom: 24px; left: 50%;
  transform: translateX(-50%);
  z-index: 1010;
  text-align: center;
`;

const LightboxNum = styled.span`
  font-size: 0.58rem; letter-spacing: 3px; text-transform: uppercase;
  color: #c9a84c; font-weight: 300; display: block; margin-bottom: 4px;
`;

const LightboxName = styled.span`
  font-size: 0.82rem; color: #888; font-weight: 300; display: block;
`;

/* ============================================================
   VÍDEO
   ============================================================ */
const VideoFrame = styled.div`
  background: #080a0d;
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  overflow: hidden;
`;

const VideoTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #040506;
  border-bottom: 1px solid rgba(255,255,255,0.04);
`;

const VideoUrl = styled.span`
  font-size: 0.6rem; letter-spacing: 2px; text-transform: uppercase;
  color: #2a2a2a; font-weight: 300;
`;

const VideoLiveTag = styled.span`
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 0.58rem; letter-spacing: 2px; text-transform: uppercase;
  color: #c9a84c; font-weight: 300;
`;

const VideoLiveDot = styled.span`
  width: 6px; height: 6px; border-radius: 50%; background: #c9a84c;
  animation: videoPulse 1.6s ease-in-out infinite;
  @keyframes videoPulse { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
`;

const VideoWrap = styled.div`
  position: relative; width: 100%;
  background: #080a0d;
  video { width: 100%; height: auto; display: block; object-fit: contain; }
`;

/* ============================================================
   PILARES
   ============================================================ */
const PillarsGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1px; background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 900px) { grid-template-columns: repeat(2,1fr); }
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`;

const PillarCard = styled.div`
  background: #090c10; padding: 40px 36px;
  transition: background 0.4s;
  &:hover { background: #0f1318; }
  @media (max-width: 768px) { padding: 32px 28px; }
  @media (max-width: 480px) { padding: 24px 20px; }
`;

const PillarIcon = styled.div`color: #c9a84c; margin-bottom: 20px;`;

const PillarTitle = styled.h3`
  font-size: clamp(0.88rem, 1.4vw, 1rem); font-weight: 400; color: #ddd;
  letter-spacing: 0.3px; margin-bottom: 12px;
`;

const PillarDesc = styled.p`
  font-size: clamp(0.78rem, 1.1vw, 0.84rem); color: #555; line-height: 1.85; font-weight: 300;
`;

/* ============================================================
   FEATURES
   ============================================================ */
const FeatureList = styled.div`
  display: flex; flex-direction: column; gap: 1px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.04);
`;

const FeatureItem = styled.div`
  display: flex; align-items: center; gap: 14px;
  padding: 20px 28px; background: #090c10;
  font-size: clamp(0.82rem, 1.2vw, 0.88rem); color: #888; font-weight: 300; line-height: 1.6;
  transition: background 0.3s;
  &:hover { background: #0d1117; }
  svg { color: #c9a84c; flex-shrink: 0; }
  @media (max-width: 480px) { padding: 16px 20px; }
`;

/* ============================================================
   PROCESSO
   ============================================================ */
const ProcessList = styled.div`
  display: flex; flex-direction: column; gap: 1px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.04);
`;

const ProcessItem = styled.div`
  display: grid; grid-template-columns: 80px 1fr;
  gap: 32px; padding: 36px 36px; background: #0d1117;
  align-items: start; transition: background 0.3s;
  &:hover { background: #0f1318; }
  @media (max-width: 700px) { grid-template-columns: 56px 1fr; gap: 20px; padding: 28px 24px; }
  @media (max-width: 480px) { padding: 24px 20px; }
`;

const ProcessNum = styled.span`
  font-family: var(--font-cormorant), serif;
  font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 300; color: #c9a84c; line-height: 1;
`;

const ProcessTitle = styled.h4`
  font-size: clamp(0.9rem, 1.4vw, 1rem); font-weight: 400; color: #ddd;
  letter-spacing: 0.3px; margin-bottom: 8px;
`;

const ProcessDesc = styled.p`
  font-size: clamp(0.8rem, 1.2vw, 0.85rem); color: #555; line-height: 1.85; font-weight: 300;
`;

/* ============================================================
   CTA
   ============================================================ */
const CTA = styled.section`
  padding: 120px 48px; background: #090c10;
  border-top: 1px solid rgba(255,255,255,0.04); text-align: center;
  @media (max-width: 768px) { padding: 80px 24px; }
  @media (max-width: 480px) { padding: 64px 16px; }
`;

const CTAInner = styled.div`
  max-width: 640px; margin: 0 auto;
  display: flex; flex-direction: column; align-items: center;
`;

const CTATitle = styled.h2`
  font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 300; color: #fff;
  letter-spacing: -0.5px; margin-bottom: 20px;
  strong { font-weight: 600; }
`;

const CTASub = styled.p`
  font-size: clamp(0.85rem, 1.3vw, 0.95rem); color: #555;
  line-height: 1.9; font-weight: 300; margin-bottom: 40px;
`;

const BtnGold = styled(Link)`
  display: inline-flex; align-items: center; gap: 12px;
  padding: 16px 40px; border: 1px solid #c9a84c; color: #c9a84c;
  font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase;
  font-weight: 400; font-family: inherit; transition: all 0.4s;
  &:hover { background: #c9a84c; color: #0d1117; }
`;

/* ============================================================
   DADOS
   ============================================================ */
const prototypes = [
  { num: '01', name: 'Login — Autenticação e acesso ao sistema',     src: '/login.png'    },
  { num: '02', name: 'Termos — Aceite de uso e privacidade',         src: '/termos.png'   },
  { num: '03', name: 'Políticas — Termos de uso detalhados',         src: '/politicas.png'},
  { num: '04', name: 'Dashboard — Painel administrativo do sistema', src: '/dash.png'     },
];

const pillars = [
  { icon: <Eye size={22} strokeWidth={1.5} />,         title: 'Hierarquia Visual',  desc: 'Cada elemento tem um peso intencional — o olhar do usuário é guiado sem esforço pelo conteúdo mais importante.' },
  { icon: <MousePointer size={22} strokeWidth={1.5} />, title: 'Usabilidade',        desc: 'Fluxos pensados para minimizar cliques e eliminar atritos, garantindo que o usuário chegue onde precisa sem fricção.' },
  { icon: <GridIcon size={22} strokeWidth={1.5} />,     title: 'Design System',      desc: 'Biblioteca de componentes consistente que acelera o handoff e garante coerência visual em todas as telas.' },
  { icon: <Layers size={22} strokeWidth={1.5} />,       title: 'Alta Fidelidade',    desc: 'Protótipos navegáveis que simulam a experiência real — testáveis antes de escrever uma única linha de código.' },
  { icon: <Zap size={22} strokeWidth={1.5} />,          title: 'Handoff Organizado', desc: 'Arquivos estruturados com especificações de espaçamento, cores e tipografia prontos para os desenvolvedores.' },
  { icon: <Palette size={22} strokeWidth={1.5} />,      title: 'UX Research',        desc: 'Fluxos de usuário mapeados antes de qualquer pixel — wireframes validam a lógica antes do design de alta fidelidade.' },
];

const features = [
  'Wireframes e mapeamento de fluxos de usuário',
  'Protótipos navegáveis de alta fidelidade em Figma ou Penpot',
  'Design system com tokens de cor, tipografia e espaçamento',
  'Biblioteca de componentes reutilizáveis',
  'Handoff documentado para desenvolvimento',
  'Revisão de usabilidade e consistência visual',
  'Versões mobile e desktop de cada tela',
  'Iterações baseadas em feedback',
];

const processos = [
  { title: 'Discovery',       desc: 'Entendimento do produto, objetivos de negócio e necessidades dos usuários. Mapeamento de personas e fluxos de uso.' },
  { title: 'Wireframes',      desc: 'Esqueleto das telas em baixa fidelidade — estrutura e lógica de navegação sem interferência visual.' },
  { title: 'Design de Telas', desc: 'Alta fidelidade com cores, tipografia, ícones e componentes do design system aplicados.' },
  { title: 'Protótipo',       desc: 'Ligação das telas criando um protótipo navegável que simula a experiência real.' },
  { title: 'Handoff',         desc: 'Entrega do arquivo organizado com especificações completas e assets exportados para desenvolvimento.' },
];

/* ============================================================
   COMPONENTE
   ============================================================ */
export default function DesignUxUiPage() {
  const [lightbox, setLightbox] = useState(null); // { src, num, name }

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  const openLightbox  = (item) => setLightbox(item);
  const closeLightbox = ()     => setLightbox(null);

  return (
    <>
      <Navbar />
      <Page>

        {/* HERO */}
        <Hero>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <BackLink href="/#projetos">
                <ArrowLeft size={12} /> Voltar aos projetos
              </BackLink>
              <GoldRule />
              <Label>Design de Interfaces</Label>
              <HeroTitle>
                Da ideia ao protótipo navegável, <strong>antes de escrever uma linha de código</strong>
              </HeroTitle>
              <HeroSub>
                Design de interfaces de alta fidelidade com foco em usabilidade e hierarquia visual — desde wireframes e fluxos de usuário até protótipos navegáveis e design systems prontos para desenvolvimento.
              </HeroSub>
              <HeroTags>
                {['Figma', 'Penpot', 'UI Design', 'UX Research', 'Prototipação', 'Design System'].map((t, i) => (
                  <HeroTag key={i}>{t}</HeroTag>
                ))}
              </HeroTags>
            </FadeIn>
          </Inner>
        </Hero>

        {/* GALERIA DE PROTÓTIPOS */}
        <Section>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Protótipos em <strong>alta fidelidade</strong></SectionTitle>
              <GalleryGrid>
                {prototypes.map((p, i) => (
                  <GalleryItem key={i} onClick={() => openLightbox(p)}>
                    <img src={p.src} alt={p.name} />
                    <ZoomHint className="zoom-hint">
                      <ZoomIn size={13} /> Ampliar
                    </ZoomHint>
                    <GalleryCaption>
                      <GalleryNum>{p.num}</GalleryNum>
                      <GalleryName>{p.name}</GalleryName>
                    </GalleryCaption>
                  </GalleryItem>
                ))}
              </GalleryGrid>
            </FadeIn>
          </Inner>
        </Section>

        {/* LIGHTBOX */}
        <LightboxOverlay $open={!!lightbox} onClick={closeLightbox}>
          <LightboxClose onClick={closeLightbox}>
            <X size={18} />
          </LightboxClose>
          {lightbox && (
            <>
              <LightboxImg
                $open={!!lightbox}
                src={lightbox.src}
                alt={lightbox.name}
                onClick={(e) => e.stopPropagation()}
              />
              <LightboxCaption>
                <LightboxNum>{lightbox.num}</LightboxNum>
                <LightboxName>{lightbox.name}</LightboxName>
              </LightboxCaption>
            </>
          )}
        </LightboxOverlay>

        {/* VÍDEO */}
        <Section $alt>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Veja o protótipo <strong>em ação</strong></SectionTitle>
              <VideoFrame>
                <VideoTopBar>
                  <VideoUrl>protótipo navegável</VideoUrl>
                  <VideoLiveTag><VideoLiveDot /> gravação ao vivo</VideoLiveTag>
                </VideoTopBar>
                <VideoWrap>
                  <video
                    src="/demo.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                </VideoWrap>
              </VideoFrame>
            </FadeIn>
          </Inner>
        </Section>

        {/* PILARES */}
        <Section>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>O que define um design <strong>de verdade</strong></SectionTitle>
              <PillarsGrid>
                {pillars.map((p, i) => (
                  <PillarCard key={i}>
                    <PillarIcon>{p.icon}</PillarIcon>
                    <PillarTitle>{p.title}</PillarTitle>
                    <PillarDesc>{p.desc}</PillarDesc>
                  </PillarCard>
                ))}
              </PillarsGrid>
            </FadeIn>
          </Inner>
        </Section>

        {/* O QUE ESTÁ INCLUSO */}
        <Section $alt>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>O que está <strong>incluso</strong></SectionTitle>
              <FeatureList>
                {features.map((f, i) => (
                  <FeatureItem key={i}><Check size={14} />{f}</FeatureItem>
                ))}
              </FeatureList>
            </FadeIn>
          </Inner>
        </Section>

        {/* PROCESSO */}
        <Section>
          <Inner>
            <FadeIn direction="up" duration={800}>
              <SectionTitle>Como <strong>funciona</strong> o processo</SectionTitle>
              <ProcessList>
                {processos.map((p, i) => (
                  <ProcessItem key={i}>
                    <ProcessNum>{String(i + 1).padStart(2, '0')}</ProcessNum>
                    <div>
                      <ProcessTitle>{p.title}</ProcessTitle>
                      <ProcessDesc>{p.desc}</ProcessDesc>
                    </div>
                  </ProcessItem>
                ))}
              </ProcessList>
            </FadeIn>
          </Inner>
        </Section>

        {/* CTA */}
        <CTA>
          <CTAInner>
            <FadeIn direction="up" duration={800}>
              <GoldRule style={{ margin: '0 auto 20px' }} />
              <Label>Vamos conversar?</Label>
              <CTATitle>Interessado em trabalhar <strong>juntos?</strong></CTATitle>
              <CTASub>
                Estou disponível para projetos de design UI/UX, desde wireframes até protótipos navegáveis prontos para desenvolvimento.
              </CTASub>
              <BtnGold href="/#contato">
                Entrar em contato <ArrowRight size={14} />
              </BtnGold>
            </FadeIn>
          </CTAInner>
        </CTA>

      </Page>
      <Footer />
    </>
  );
}