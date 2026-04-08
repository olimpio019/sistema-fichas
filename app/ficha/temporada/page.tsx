import Form from '../../../components/Form';

export default function FichaTemporada() {
  return (
    <main className="page-container">
      <div className="card">
        <div className="breadcrumb">
          <a href="/">← Voltar ao início</a>
        </div>
        <h1>Ficha Cadastral Temporada</h1>
        <p>Preencha os dados abaixo para aluguel de temporada e gere o PDF da ficha.</p>
        <Form tipo="temporada" />
      </div>
    </main>
  );
}