'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Download, X, Menu } from 'lucide-react';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 48px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ $scrolled }) => $scrolled ? 'rgba(8,10,13,0.92)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(16px)' : 'none'};
  border-bottom: ${({ $scrolled }) => $scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none'};
  transition: background 0.5s ease, backdrop-filter 0.5s ease, border-bottom 0.5s ease;

  @media (max-width: 768px) { padding: 0 24px; }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  img {
    height: 60px;
    width: auto;
    display: block;
    @media (max-width: 480px) { height: 48px; }
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 40px;
  @media (max-width: 900px) { display: none; }
`;

const NavLink = styled.a`
  font-size: 0.62rem;
  letter-spacing: 3.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  font-weight: 300;
  cursor: pointer;
  transition: color 0.3s;
  &:hover { color: #c9a84c; }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CvButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border: 1px solid #c9a84c;
  color: #c9a84c;
  font-size: 0.62rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  &:hover { background: #c9a84c; color: #0d1117; }
  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.55rem;
    letter-spacing: 2px;
    gap: 6px;
    span { display: none; }
  }
`;

const HamburgerBtn = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  padding: 4px;
  transition: color 0.3s;
  &:hover { color: #c9a84c; }
  @media (max-width: 900px) { display: flex; align-items: center; }
`;

const MobileMenu = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 120px;
  gap: 32px;
  transform: ${({ $open }) => $open ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const MobileClose = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  padding: 4px;
  transition: color 0.3s;
  &:hover { color: #c9a84c; }
`;

const MobileLink = styled.a`
  font-size: 1.5rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  font-weight: 300;
  cursor: pointer;
  transition: color 0.3s;
  &:hover { color: #c9a84c; }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    letter-spacing: 4px;
  }
`;

const MobileCv = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border: 1px solid #c9a84c;
  color: #c9a84c;
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 16px;
  &:hover { background: #c9a84c; color: #0d1117; }
`;

const links = [
  { label: 'Sobre',      href: '#sobre' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Projetos',   href: '#projetos' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Serviços',   href: '#servicos' },
  { label: 'Contato',    href: '#contato' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const isHome = window.location.pathname === '/';
    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/' + href;
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const isHome = window.location.pathname === '/';
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/';
    }
  };

  return (
    <>
      <Nav $scrolled={scrolled}>
        <Logo href="/" onClick={handleLogoClick}>
          <img src="/logo.png" alt="Maria Messias" />
        </Logo>
        <NavLinks>
          {links.map(l => (
            <li key={l.href}>
              <NavLink href={l.href} onClick={(e) => handleNavClick(e, l.href)}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </NavLinks>
        <RightGroup>
          <CvButton href="/curriculo-maria-messias.pdf" download>
            <Download size={13} />
            <span>Download CV</span>
          </CvButton>
          <HamburgerBtn onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
            <Menu size={22} />
          </HamburgerBtn>
        </RightGroup>
      </Nav>

      <MobileMenu $open={menuOpen}>
        <MobileClose onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
          <X size={24} />
        </MobileClose>
        {links.map(l => (
          <MobileLink key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)}>
            {l.label}
          </MobileLink>
        ))}
        <MobileCv href="/curriculo-maria-messias.pdf" download onClick={() => setMenuOpen(false)}>
          <Download size={13} /> Download CV
        </MobileCv>
      </MobileMenu>
    </>
  );
}