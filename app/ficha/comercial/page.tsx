import Form from '../../../components/Form';

export default function FichaComercial() {
  return (
    <main className="page-container">
      <div className="card">
        <div className="breadcrumb">
          <a href="/">← Voltar ao início</a>
        </div>
        <h1>Ficha Cadastral Comercial</h1>
        <p>Preencha os dados abaixo para locação de imóvel comercial e gere o PDF da ficha.</p>
        <Form tipo="comercial" />
      </div>
    </main>
  );
}