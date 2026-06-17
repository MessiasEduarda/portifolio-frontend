import { Cormorant_Garamond, Inter, Italianno } from 'next/font/google';
import './globals.css';
import Preloader from './components/ui/Preloader';
import WhatsAppButton from './components/ui/WhatsAppButton';

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${cormorant.variable} ${inter.variable} ${italianno.variable}`}>
        <Preloader name="Maria Messias" />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}