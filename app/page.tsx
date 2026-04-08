import Link from 'next/link';

export default function Home() {
  return (
    <main className="page-container home-page">
      <header className="home-header">
        <div className="home-brand">
          <img src="/logo-DhQCR-93.png" alt="Lanza Imóveis" className="home-header-logo" />
          <span>Lanza Imóveis</span>
        </div>
        <nav className="home-nav">
          <a href="#">Painel</a>
          <a href="#">Login</a>
        </nav>
      </header>

      <section className="home-hero">
        <img src="/logo-DhQCR-93.png" alt="Lanza" className="hero-logo" />
        <div className="hero-copy">
          <h1>Sistema de Inteligência Imobiliária</h1>
          <p>Preencha os formulários abaixo para cadastro em nosso sistema.</p>
        </div>
      </section>

      <section className="cards-grid">
        <Link href="/ficha/residencial" className="service-card">
          <div className="card-icon">🏠</div>
          <h3>Ficha Cadastral - Locatário PF</h3>
          <p>Formulário para cadastro de locatários pessoa física.</p>
          <span>Acessar Formulário</span>
        </Link>

        <Link href="/ficha/comercial" className="service-card">
          <div className="card-icon">🏢</div>
          <h3>Ficha Cadastral - Locatária PJ</h3>
          <p>Formulário para cadastro de locatários pessoa jurídica.</p>
          <span>Acessar Formulário</span>
        </Link>

        <Link href="/ficha/geral" className="service-card">
          <div className="card-icon">🏘️</div>
          <h3>Cadastro de Imóvel</h3>
          <p>Formulário para cadastro de imóveis disponíveis.</p>
          <span>Acessar Formulário</span>
        </Link>

        <Link href="/ficha/residencial" className="service-card">
          <div className="card-icon">👤</div>
          <h3>Ficha Cadastral - Fiador PF</h3>
          <p>Formulário para cadastro de fiadores pessoa física.</p>
          <span>Acessar Formulário</span>
        </Link>

        <Link href="/ficha/geral" className="service-card">
          <div className="card-icon">🛒</div>
          <h3>Proposta de Compra</h3>
          <p>Formulário de proposta para compra de imóvel.</p>
          <span>Acessar Formulário</span>
        </Link>

        <Link href="/ficha/comercial" className="service-card">
          <div className="card-icon">🔑</div>
          <h3>Proposta para Locação</h3>
          <p>Formulário de proposta para locação de imóvel.</p>
          <span>Acessar Formulário</span>
        </Link>
      </section>
    </main>
  );
}
