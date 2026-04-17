import Image from 'next/image';
import Link from 'next/link';

type HomeItem = {
  title: string;
  description: string;
  href: string;
  icon: 'document' | 'building' | 'home' | 'user' | 'cart' | 'key';
};

const items: HomeItem[] = [
  {
    title: 'Ficha Cadastral - Fiador PF',
    description: 'Formulário para cadastro de fiadores pessoa física',
    href: '/ficha/residencial',
    icon: 'document',
  },
  {
    title: 'Ficha Cadastral - Locatária PJ',
    description: 'Formulário para cadastro de locatários pessoa jurídica',
    href: '/ficha/comercial',
    icon: 'building',
  },
  {
    title: 'Cadastro de Imóvel',
    description: 'Formulário para cadastro de imóveis disponíveis',
    href: '/ficha/geral',
    icon: 'home',
  },
  {
    title: 'Ficha Cadastral - Locatário PF',
    description: 'Formulário para cadastro de locatários pessoa física',
    href: '/ficha/locatario-pf',
    icon: 'user',
  },
  {
    title: 'Proposta de Compra',
    description: 'Formulário de proposta para compra de imóvel',
    href: '/ficha/geral',
    icon: 'cart',
  },
  {
    title: 'Proposta para Locação',
    description: 'Formulário de proposta para locação de imóvel',
    href: '/ficha/comercial',
    icon: 'key',
  },
];

function CardIcon({ icon }: { icon: HomeItem['icon'] }) {
  switch (icon) {
    case 'document':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 3.75h5.5L18.25 8.5V19A2.25 2.25 0 0 1 16 21.25H8A2.25 2.25 0 0 1 5.75 19V6A2.25 2.25 0 0 1 8 3.75Z" />
          <path d="M13.25 3.75V8.5h4.75" />
          <path d="M8.75 12h6.5" />
          <path d="M8.75 15.5h6.5" />
        </svg>
      );
    case 'building':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.75 21.25V5.75A2 2 0 0 1 9.75 3.75h4.5a2 2 0 0 1 2 2v15.5" />
          <path d="M4.75 21.25h14.5" />
          <path d="M10 7.75h.01" />
          <path d="M14 7.75h.01" />
          <path d="M10 11.25h.01" />
          <path d="M14 11.25h.01" />
          <path d="M10 14.75h.01" />
          <path d="M14 14.75h.01" />
          <path d="M11 21.25v-3.5h2v3.5" />
        </svg>
      );
    case 'home':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.75 10.25 12 4.75l7.25 5.5V19A2.25 2.25 0 0 1 17 21.25H7A2.25 2.25 0 0 1 4.75 19v-8.75Z" />
          <path d="M9.5 21.25v-5h5v5" />
        </svg>
      );
    case 'user':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 11.25a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
          <path d="M5.75 20.25a6.25 6.25 0 0 1 12.5 0" />
        </svg>
      );
    case 'cart':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.75 5.75h2l1.8 8.5h8.9l2.05-6.5H8.1" />
          <path d="M10 18.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
          <path d="M17 18.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
        </svg>
      );
    case 'key':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.25 9.75a4.5 4.5 0 1 1-8.05 2.75 4.5 4.5 0 0 1 8.05-2.75Z" />
          <path d="m14.75 13.25 4.5-4.5" />
          <path d="M17.25 6.25h2v2" />
          <path d="M15.75 7.75l2.5 2.5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  return (
    <main className="home-shell">
      <div className="home-top-line" />

      <header className="home-header">
        <Link href="/" className="home-brand" aria-label="Página inicial da Lanza Imóveis">
          <Image src="/logo-DhQCR-93.png" alt="Lanza Imóveis" width={140} height={42} priority />
        </Link>
      </header>

      <section className="home-hero">
        <div className="home-hero-logo">
          <Image src="/logo-DhQCR-93.png" alt="Lanza Imóveis" width={250} height={74} priority />
        </div>
        <h1>Sistema de Inteligência Imobiliária</h1>
        <p>Preencha os formulários abaixo para cadastro em nosso sistema</p>
      </section>

      <section className="home-grid" aria-label="Lista de formulários">
        {items.map((item) => (
          <article key={item.title} className="home-grid-card">
            <div className="home-grid-icon">
              <CardIcon icon={item.icon} />
            </div>

            <div className="home-grid-copy">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>Clique para acessar o formulário e preencher suas informações</p>
            </div>

            <Link href={item.href} className="home-grid-button">
              Acessar Formulário
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
