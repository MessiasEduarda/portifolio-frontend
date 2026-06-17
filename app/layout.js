import { Cormorant_Garamond, Inter, Italianno } from 'next/font/google';
import './globals.css';
import Preloader from './components/ui/Preloader';
import WhatsAppButton from './components/ui/WhatsAppButton';
import StyledComponentsRegistry from './lib/registry';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
});

const italianno = Italianno({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-italianno',
});

export const metadata = {
  title: 'Maria Messias | Desenvolvedora Front-End',
  description: 'Portfólio profissional',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${cormorant.variable} ${inter.variable} ${italianno.variable}`}>
        <StyledComponentsRegistry>
          <Preloader name="Maria Messias" />
          {children}
          <WhatsAppButton />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}