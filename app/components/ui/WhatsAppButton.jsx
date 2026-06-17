'use client';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(201, 168, 76, 0.45); }
  70% { box-shadow: 0 0 0 14px rgba(201, 168, 76, 0); }
  100% { box-shadow: 0 0 0 0 rgba(201, 168, 76, 0); }
`;

const FloatingButton = styled.a`
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 999;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: rgba(8, 10, 13, 0.55);
  backdrop-filter: blur(6px);
  border: 1.5px solid #c9a84c;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  animation: ${pulse} 2.4s infinite;
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.08);
    background: rgba(201, 168, 76, 0.12);
    border-color: #e0c069;
  }

  svg {
    width: 26px;
    height: 26px;
    fill: #ffffff;
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 52px;
    height: 52px;

    svg {
      width: 23px;
      height: 23px;
    }
  }
`;

export default function WhatsAppButton() {
  const phoneNumber = '5511953311935'; // 55 (Brasil) + 11 (DDD) + 953311935
  const message = 'Olá Maria! Vi seu portfólio e gostaria de conversar sobre uma oportunidade como Front-End Developer.';
  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <FloatingButton
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.001 3C9.107 3 3.5 8.607 3.5 15.501c0 2.65.835 5.105 2.255 7.122L4 29l6.561-1.719a12.42 12.42 0 0 0 5.44 1.262h.005c6.893 0 12.5-5.607 12.5-12.501C28.506 8.607 22.899 3 16.001 3zm0 22.755h-.004a10.27 10.27 0 0 1-5.234-1.434l-.375-.223-3.892 1.02 1.04-3.793-.244-.39a10.214 10.214 0 0 1-1.566-5.434c0-5.654 4.6-10.254 10.28-10.254 2.747 0 5.328 1.07 7.27 3.012a10.218 10.218 0 0 1 3.011 7.27c0 5.655-4.601 10.226-10.286 10.226zm5.633-7.668c-.309-.155-1.826-.901-2.108-1.005-.282-.103-.488-.155-.694.155-.206.31-.797 1.005-.977 1.21-.18.207-.36.232-.668.078-.309-.155-1.302-.48-2.482-1.533-.917-.817-1.536-1.827-1.716-2.136-.18-.31-.019-.477.155-.633.155-.142.36-.367.541-.55.18-.182.24-.31.36-.516.12-.207.06-.387-.034-.542-.094-.155-.85-2.05-1.165-2.81-.21-.502-.42-.434-.578-.442-.15-.008-.32-.01-.49-.01-.171 0-.448.064-.687.31-.24.245-.917.895-.917 2.183 0 1.287.94 2.532 1.07 2.706.13.174 1.81 2.762 4.401 3.761 2.591.998 2.591.665 3.057.622.465-.043 1.508-.617 1.72-1.214.214-.598.214-1.11.15-1.214-.064-.103-.232-.155-.541-.31z" />
      </svg>
    </FloatingButton>
  );
}