import './globals.css';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

export const metadata = {
  title: 'LawBandit RAG',
  description: 'Next.js app for LawBandit RAG',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
