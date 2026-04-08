import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ficha Cadastral Imobiliária',
  description: 'Formulário de cadastro e geração de PDF para clientes de imobiliária.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
