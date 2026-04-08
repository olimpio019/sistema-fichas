import Form from '../components/Form';

export default function Home() {
  return (
    <main className="page-container">
      <div className="card">
        <h1>Ficha Cadastral - Imobiliária</h1>
        <p>Preencha os dados abaixo e gere o PDF da ficha para baixar.</p>
        <Form />
      </div>
    </main>
  );
}
