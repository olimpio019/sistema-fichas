import Form from '../../../components/Form';

export default function FichaGeral() {
  return (
    <main className="page-container">
      <div className="card">
        <div className="breadcrumb">
          <a href="/">← Voltar ao início</a>
        </div>
        <h1>Ficha Cadastral Geral</h1>
        <p>Preencha os dados abaixo para qualquer tipo de locação e gere o PDF da ficha.</p>
        <Form tipo="geral" />
      </div>
    </main>
  );
}