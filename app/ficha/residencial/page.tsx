import Form from '../../../components/Form';

export default function FichaResidencial() {
  return (
    <main className="page-container">
      <div className="card">
        <div className="breadcrumb">
          <a href="/">← Voltar ao início</a>
        </div>
        <h1>Ficha Cadastral Residencial</h1>
        <p>Preencha os dados abaixo para locação de imóvel residencial e gere o PDF da ficha.</p>
        <Form tipo="residencial" />
      </div>
    </main>
  );
}