import Form from '../../../components/Form';

export default function FichaLocatarioPf() {
  return (
    <main className="page-container">
      <div className="card">
        <div className="breadcrumb">
          <a href="/">← Voltar ao início</a>
        </div>
        <h1>Ficha Cadastral Locatário PF</h1>
        <p>Preencha os dados abaixo para gerar a ficha cadastral do locatário pessoa física.</p>
        <Form tipo="locatario-pf" />
      </div>
    </main>
  );
}
