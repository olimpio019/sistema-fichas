import Form from '../../../components/Form';

export default function FichaResidencial() {
  return (
    <main className="page-container">
      <div className="card">
        <div className="breadcrumb">
          <a href="/">← Voltar ao início</a>
        </div>
        <h1>Ficha Cadastral Fiador PF</h1>
        <p>Preencha os dados abaixo para gerar a ficha cadastral do fiador pessoa física.</p>
        <Form tipo="residencial" />
      </div>
    </main>
  );
}
