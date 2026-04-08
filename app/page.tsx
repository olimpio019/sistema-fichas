import Link from 'next/link';

export default function Home() {
  return (
    <main className="page-container">
      <div className="card">
        <h1>Sistema de Fichas Cadastrais</h1>
        <p>Escolha o tipo de ficha que deseja preencher:</p>

        <div className="model-selection">
          <Link href="/ficha/residencial" className="model-card">
            <div className="model-icon">🏠</div>
            <h3>Ficha Residencial</h3>
            <p>Para locação de imóveis residenciais</p>
          </Link>

          <Link href="/ficha/comercial" className="model-card">
            <div className="model-icon">🏢</div>
            <h3>Ficha Comercial</h3>
            <p>Para locação de imóveis comerciais</p>
          </Link>

          <Link href="/ficha/temporada" className="model-card">
            <div className="model-icon">🏖️</div>
            <h3>Ficha Temporada</h3>
            <p>Para aluguel de temporada</p>
          </Link>

          <Link href="/ficha/geral" className="model-card">
            <div className="model-icon">📋</div>
            <h3>Ficha Geral</h3>
            <p>Modelo completo para qualquer finalidade</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
