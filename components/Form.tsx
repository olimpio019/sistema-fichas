'use client';

import { useEffect, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import SignatureCanvas from 'react-signature-canvas';
import { logoBase64 } from '../lib/logoBase64';

const initialValues = {
  nome: '',
  nomeSocial: '',
  cpf: '',
  rg: '',
  orgaoExpedidor: '',
  dataEmissaoRg: '',
  dataNascimento: '',
  estadoCivil: '',
  regimeCasamento: '',
  profissao: '',
  nacionalidade: 'Brasileira',
  nomePai: '',
  nomeMae: '',
  naturalDe: '',
  instagram: '',
  rendaMensal: '',
  localTrabalho: '',
  tempoTrabalho: '',
  email: '',
  celular: '',
  telefone: '',
  cargo: '',
  remuneracao: '',
  empresa: '',
  telefoneEmpresa: '',
  tempoEmpresa: '',
  enderecoEmpresa: '',
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  referenciasPessoaisEmpresa: '',
  outrasRendas: '',
  referenciasPessoais: '',
  referenciasBancarias: '',
  nomeConjuge: '',
  cpfConjuge: '',
  rgConjuge: '',
  dataNascimentoConjuge: '',
  profissaoConjuge: '',
  empresaConjuge: '',
  telefoneEmpresaConjuge: '',
  remuneracaoConjuge: '',
  bensPropriosConjuge: '',
  razaoSocial: '',
  nomeFantasia: '',
  cnpj: '',
  inscricaoEstadual: '',
  dataFundacao: '',
  ramoAtividade: '',
  representanteLegal: '',
  cpfRepresentante: '',
  cargoRepresentante: '',
  socioNome: '',
  socioCpf: '',
  socioRg: '',
  socioDataNascimento: '',
  socioProfissao: '',
  socioEmail: '',
  socioCelular: '',
  socioInstagram: '',
  socioNomePai: '',
  socioNomeMae: '',
  socioCep: '',
  socioLogradouro: '',
  socioNumero: '',
  socioComplemento: '',
  socioBairro: '',
  socioCidade: '',
  socioEstado: '',
  socioReferenciasComerciais: '',
  socioReferenciasBancarias: '',
  socioBensProprios: '',
  socioIndicacao: '',
  codigoImovel: '',
  valorAluguel: '',
  finalidadeLocacao: '',
};

type FormValues = typeof initialValues;

interface FormProps {
  tipo?: 'residencial' | 'comercial' | 'temporada' | 'geral' | 'locatario-pf';
}

export default function Form({ tipo = 'geral' }: FormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [canvasWidth, setCanvasWidth] = useState(500);
  const signatureRef = useRef<SignatureCanvas>(null);

  useEffect(() => {
    function updateCanvasWidth() {
      const maxWidth = Math.min(500, window.innerWidth - 40);
      setCanvasWidth(maxWidth);
    }

    updateCanvasWidth();
    window.addEventListener('resize', updateCanvasWidth);
    return () => window.removeEventListener('resize', updateCanvasWidth);
  }, []);

  function updateField(key: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function buildField(key: keyof FormValues, label: string, type = 'text', options?: string[]) {
    const value = values[key];

    if (options) {
      return (
        <div className="field-group" key={key}>
          <label htmlFor={key}>{label}</label>
          <select id={key} value={value} onChange={(event) => updateField(key, event.target.value)}>
            <option value="">Selecione</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className="field-group" key={key}>
        <label htmlFor={key}>{label}</label>
        <input id={key} type={type} value={value} onChange={(event) => updateField(key, event.target.value)} />
      </div>
    );
  }

  function buildTextarea(key: keyof FormValues, label: string) {
    return (
      <div className="field-group" key={key}>
        <label htmlFor={key}>{label}</label>
        <textarea id={key} value={values[key]} onChange={(event) => updateField(key, event.target.value)} />
      </div>
    );
  }

  function addPdfHeader(doc: jsPDF, pageWidth: number, margin: number, title: string) {
    let y = 50;
    const logoTop = y - 8;
    const iconX = margin;

    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', iconX, logoTop, 90, 42);
    } else {
      doc.setFillColor(14, 55, 102);
      doc.triangle(iconX, logoTop + 28, iconX + 22, logoTop, iconX + 44, logoTop + 28, 'F');
      doc.setFillColor(153, 31, 57);
      doc.triangle(iconX + 20, logoTop + 28, iconX + 40, logoTop, iconX + 60, logoTop + 28, 'F');
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(title, pageWidth / 2, y + 48, { align: 'center' });

    y += 70;
    doc.setDrawColor(0);
    doc.setLineWidth(1.4);
    doc.line(margin, y, pageWidth - margin, y);
    return y + 28;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    let y = addPdfHeader(
      doc,
      pageWidth,
      margin,
      tipo === 'comercial'
        ? 'FICHA CADASTRAL - LOCATARIO PESSOA JURIDICA'
        : tipo === 'locatario-pf'
          ? 'FICHA CADASTRAL - LOCATARIO PF'
          : 'FICHA CADASTRAL - FIADOR PF',
    );

    function ensurePageSpace(minHeight = 80) {
      if (y + minHeight > pageHeight - 80) {
        doc.addPage();
        y = margin;
      }
    }

    function renderSection(title: string, fields: Array<[string, string]>) {
      ensurePageSpace(90);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(title, margin, y);
      y += 10;
      doc.setDrawColor(0);
      doc.setLineWidth(0.8);
      doc.line(margin, y, pageWidth - margin, y);
      y += 18;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const columnWidth = (pageWidth - margin * 2) / 2 - 10;
      const leftX = margin;
      const rightX = margin + columnWidth + 20;
      const lineHeight = 16;
      let currentColumn = 0;
      let sectionY = y;

      fields.forEach(([label, value], index) => {
        const columnX = currentColumn === 0 ? leftX : rightX;
        const text = `${label}: ${value || '-'}`;
        const splitText = doc.splitTextToSize(text, columnWidth);
        doc.text(splitText, columnX, sectionY);
        sectionY += splitText.length * lineHeight;

        if (currentColumn === 1 || index === fields.length - 1) {
          currentColumn = 0;
          y = Math.max(y, sectionY) + 8;
          sectionY = y;
        } else {
          currentColumn = 1;
        }
      });

      y += 10;
    }

    if (tipo === 'comercial') {
      renderSection('Dados da Empresa', [
        ['Razao Social', values.razaoSocial],
        ['Nome Fantasia', values.nomeFantasia],
        ['CNPJ', values.cnpj],
        ['Inscricao Estadual', values.inscricaoEstadual],
        ['Data de Fundacao', values.dataFundacao],
        ['Ramo de Atividade', values.ramoAtividade],
      ]);

      renderSection('Representante Legal', [
        ['Representante Legal', values.representanteLegal],
        ['CPF do Representante', values.cpfRepresentante],
        ['Cargo do Representante', values.cargoRepresentante],
        ['E-mail', values.email],
        ['Celular', values.celular],
        ['Telefone', values.telefone],
      ]);

      renderSection('Endereco da Empresa', [
        ['CEP', values.cep],
        ['Logradouro', values.logradouro],
        ['Numero', values.numero],
        ['Complemento', values.complemento],
        ['Bairro', values.bairro],
        ['Cidade', values.cidade],
        ['Estado', values.estado],
      ]);

      renderSection('Socio Responsavel', [
        ['Nome do Socio', values.socioNome],
        ['CPF do Socio', values.socioCpf],
        ['RG do Socio', values.socioRg],
        ['Data de Nascimento', values.socioDataNascimento],
        ['Profissao', values.socioProfissao],
        ['E-mail', values.socioEmail],
        ['Celular', values.socioCelular],
        ['Instagram', values.socioInstagram],
        ['Nome do Pai', values.socioNomePai],
        ['Nome da Mae', values.socioNomeMae],
      ]);

      renderSection('Endereco do Socio', [
        ['CEP', values.socioCep],
        ['Logradouro', values.socioLogradouro],
        ['Numero', values.socioNumero],
        ['Complemento', values.socioComplemento],
        ['Bairro', values.socioBairro],
        ['Cidade', values.socioCidade],
        ['Estado', values.socioEstado],
      ]);

      renderSection('Referencias e Imovel', [
        ['Referencias Comerciais', values.socioReferenciasComerciais],
        ['Referencias Bancarias', values.socioReferenciasBancarias],
        ['Bens Proprios', values.socioBensProprios],
        ['Indicacao', values.socioIndicacao],
        ['Codigo do Imovel', values.codigoImovel],
        ['Valor do Aluguel', values.valorAluguel],
        ['Finalidade da Locacao', values.finalidadeLocacao],
      ]);
    } else if (tipo === 'residencial') {
      renderSection('Dados Pessoais', [
        ['Nome', values.nome],
        ['Nome Social', values.nomeSocial],
        ['CPF', values.cpf],
        ['RG', values.rg],
        ['Orgao Expedidor', values.orgaoExpedidor],
        ['Data Emissao', values.dataEmissaoRg],
        ['Data Nascimento', values.dataNascimento],
        ['Estado Civil', values.estadoCivil],
        ['Regime de Casamento', values.regimeCasamento],
        ['Profissao', values.profissao],
        ['Nacionalidade', values.nacionalidade],
        ['Natural de', values.naturalDe],
        ['Nome do Pai', values.nomePai],
        ['Nome da Mae', values.nomeMae],
      ]);

      renderSection('Contato e Endereco', [
        ['E-mail', values.email],
        ['Celular', values.celular],
        ['Telefone', values.telefone],
        ['Instagram', values.instagram],
        ['CEP', values.cep],
        ['Logradouro', values.logradouro],
        ['Numero', values.numero],
        ['Complemento', values.complemento],
        ['Bairro', values.bairro],
        ['Cidade', values.cidade],
        ['Estado', values.estado],
      ]);

      renderSection('Informacoes Profissionais e Financeiras', [
        ['Cargo', values.cargo],
        ['Remuneracao', values.remuneracao],
        ['Empresa', values.empresa],
        ['Telefone da Empresa', values.telefoneEmpresa],
        ['Tempo de Empresa', values.tempoEmpresa],
        ['Endereco da Empresa', values.enderecoEmpresa],
        ['Referencias Pessoais da Empresa', values.referenciasPessoaisEmpresa],
        ['Outras Rendas', values.outrasRendas],
        ['Referencias Pessoais', values.referenciasPessoais],
        ['Referencias Bancarias', values.referenciasBancarias],
      ]);

      renderSection('Dados do Conjuge e Imovel', [
        ['Nome do Conjuge', values.nomeConjuge],
        ['CPF do Conjuge', values.cpfConjuge],
        ['RG do Conjuge', values.rgConjuge],
        ['Data de Nascimento do Conjuge', values.dataNascimentoConjuge],
        ['Profissao do Conjuge', values.profissaoConjuge],
        ['Empresa do Conjuge', values.empresaConjuge],
        ['Telefone da Empresa do Conjuge', values.telefoneEmpresaConjuge],
        ['Remuneracao do Conjuge', values.remuneracaoConjuge],
        ['Bens Proprios do Conjuge', values.bensPropriosConjuge],
        ['Codigo do Imovel', values.codigoImovel],
        ['Valor do Aluguel', values.valorAluguel],
      ]);
    } else {
      renderSection('Dados Pessoais', [
        ['Nome', values.nome],
        ['CPF', values.cpf],
        ['RG', values.rg],
        ['Orgao Expedidor', values.orgaoExpedidor],
        ['Data Emissao', values.dataEmissaoRg],
        ['Data Nascimento', values.dataNascimento],
        ['Estado Civil', values.estadoCivil],
        ['Profissao', values.profissao],
        ['Nacionalidade', values.nacionalidade],
        ['Natural de', values.naturalDe],
        ['Nome do Pai', values.nomePai],
        ['Nome da Mae', values.nomeMae],
      ]);

      renderSection('Contato', [
        ['E-mail', values.email],
        ['Celular', values.celular],
        ['Telefone', values.telefone],
        ['Instagram', values.instagram],
        ['CEP', values.cep],
        ['Endereco', `${values.logradouro || '-'} ${values.numero || ''}`.trim()],
        ['Bairro', values.bairro],
        ['Cidade', values.cidade],
        ['Estado', values.estado],
        ['Complemento', values.complemento],
      ]);

      renderSection('Informacoes Profissionais', [
        ['Local de Trabalho', values.localTrabalho],
        ['Tempo de Trabalho', values.tempoTrabalho],
        ['Renda Mensal', values.rendaMensal],
        ['Codigo do Imovel', values.codigoImovel],
        ['Valor do Aluguel', values.valorAluguel],
        ['Finalidade da Locacao', values.finalidadeLocacao],
      ]);
    }

    ensurePageSpace(120);
    y += 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Assinatura do Declarante', margin, y);
    y += 10;
    doc.setDrawColor(0);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 20;

    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const signatureImage = signatureRef.current.toDataURL('image/png');
      doc.addImage(signatureImage, 'PNG', margin, y, 100, 40);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Sem assinatura', margin, y + 15);
    }

    const identifier = tipo === 'comercial' ? values.razaoSocial : values.nome;
    const filename = `ficha-cadastral-${tipo}-${identifier ? identifier.replace(/\s+/g, '-') : 'cliente'}.pdf`;
    doc.save(filename);
  }

  return (
    <form onSubmit={handleSubmit}>
      {tipo === 'comercial' ? (
        <>
          <h2>Dados da empresa</h2>
          <div className="form-row">
            {buildField('razaoSocial', 'Razão social')}
            {buildField('nomeFantasia', 'Nome fantasia')}
          </div>

          <div className="form-row">
            {buildField('cnpj', 'CNPJ')}
            {buildField('inscricaoEstadual', 'Inscrição estadual')}
          </div>

          <div className="form-row">
            {buildField('dataFundacao', 'Data de fundação', 'date')}
            {buildField('ramoAtividade', 'Ramo de atividade')}
          </div>

          <h2>Representante legal</h2>
          <div className="form-row">
            {buildField('representanteLegal', 'Representante legal')}
            {buildField('cpfRepresentante', 'CPF do representante')}
          </div>

          <div className="form-row">
            {buildField('cargoRepresentante', 'Cargo do representante')}
            {buildField('email', 'E-mail', 'email')}
          </div>

          <div className="form-row">
            {buildField('celular', 'Celular', 'tel')}
            {buildField('telefone', 'Telefone', 'tel')}
          </div>

          <h2>Endereço da empresa</h2>
          <div className="form-row">
            {buildField('cep', 'CEP')}
            {buildField('logradouro', 'Logradouro')}
          </div>

          <div className="form-row">
            {buildField('numero', 'Número')}
            {buildField('complemento', 'Complemento')}
          </div>

          <div className="form-row">
            {buildField('bairro', 'Bairro')}
            {buildField('cidade', 'Cidade')}
          </div>

          <div className="form-row">
            {buildField('estado', 'Estado')}
            {buildField('codigoImovel', 'Código do imóvel')}
          </div>

          <div className="form-row">
            {buildField('valorAluguel', 'Valor do aluguel')}
            {buildField('finalidadeLocacao', 'Finalidade da locação')}
          </div>

          <h2>Dados do sócio</h2>
          <div className="form-row">
            {buildField('socioNome', 'Nome do sócio')}
            {buildField('socioCpf', 'CPF do sócio')}
          </div>

          <div className="form-row">
            {buildField('socioRg', 'RG do sócio')}
            {buildField('socioDataNascimento', 'Data de nascimento', 'date')}
          </div>

          <div className="form-row">
            {buildField('socioProfissao', 'Profissão')}
            {buildField('socioEmail', 'E-mail', 'email')}
          </div>

          <div className="form-row">
            {buildField('socioCelular', 'Celular', 'tel')}
            {buildField('socioInstagram', 'Instagram')}
          </div>

          <div className="form-row">
            {buildField('socioNomePai', 'Nome do pai')}
            {buildField('socioNomeMae', 'Nome da mãe')}
          </div>

          <h2>Endereço do sócio</h2>
          <div className="form-row">
            {buildField('socioCep', 'CEP')}
            {buildField('socioLogradouro', 'Logradouro')}
          </div>

          <div className="form-row">
            {buildField('socioNumero', 'Número')}
            {buildField('socioComplemento', 'Complemento')}
          </div>

          <div className="form-row">
            {buildField('socioBairro', 'Bairro')}
            {buildField('socioCidade', 'Cidade')}
          </div>

          <div className="form-row">
            {buildField('socioEstado', 'Estado')}
            {buildField('socioIndicacao', 'Indicação')}
          </div>

          <h2>Referências e patrimônio</h2>
          {buildTextarea('socioReferenciasComerciais', 'Referências comerciais')}
          {buildTextarea('socioReferenciasBancarias', 'Referências bancárias')}
          {buildTextarea('socioBensProprios', 'Bens próprios')}
        </>
      ) : tipo === 'residencial' ? (
        <>
          <h2>Dados pessoais</h2>
          <div className="form-row">
            {buildField('nome', 'Nome')}
            {buildField('nomeSocial', 'Nome social')}
          </div>

          <div className="form-row">
            {buildField('cpf', 'CPF')}
            {buildField('rg', 'RG')}
          </div>

          <div className="form-row">
            {buildField('orgaoExpedidor', 'Órgão expedidor')}
            {buildField('dataEmissaoRg', 'Data emissão do RG', 'date')}
          </div>

          <div className="form-row">
            {buildField('dataNascimento', 'Data de nascimento', 'date')}
            {buildField('estadoCivil', 'Estado civil', 'text', [
              'Solteiro(a)',
              'Casado(a)',
              'Divorciado(a)',
              'Viúvo(a)',
              'União Estável',
            ])}
          </div>

          <div className="form-row">
            {buildField('regimeCasamento', 'Regime de casamento')}
            {buildField('profissao', 'Profissão')}
          </div>

          <div className="form-row">
            {buildField('nomePai', 'Nome do pai')}
            {buildField('nomeMae', 'Nome da mãe')}
          </div>

          <div className="form-row">
            {buildField('naturalDe', 'Natural de')}
            {buildField('nacionalidade', 'Nacionalidade')}
          </div>

          <h2>Contato</h2>
          <div className="form-row">
            {buildField('email', 'E-mail', 'email')}
            {buildField('celular', 'Celular', 'tel')}
          </div>

          <div className="form-row">
            {buildField('telefone', 'Telefone', 'tel')}
            {buildField('instagram', 'Instagram')}
          </div>

          <h2>Dados profissionais</h2>
          <div className="form-row">
            {buildField('cargo', 'Cargo')}
            {buildField('remuneracao', 'Remuneração')}
          </div>

          <div className="form-row">
            {buildField('empresa', 'Empresa')}
            {buildField('telefoneEmpresa', 'Telefone da empresa', 'tel')}
          </div>

          <div className="form-row">
            {buildField('tempoEmpresa', 'Tempo de empresa')}
            {buildField('enderecoEmpresa', 'Endereço da empresa')}
          </div>

          <h2>Endereço residencial</h2>
          <div className="form-row">
            {buildField('cep', 'CEP')}
            {buildField('logradouro', 'Logradouro')}
          </div>

          <div className="form-row">
            {buildField('numero', 'Número')}
            {buildField('complemento', 'Complemento')}
          </div>

          <div className="form-row">
            {buildField('bairro', 'Bairro')}
            {buildField('cidade', 'Cidade')}
          </div>

          <div className="form-row">
            {buildField('estado', 'Estado')}
            {buildField('codigoImovel', 'Código do imóvel')}
          </div>

          <div className="form-row">
            {buildField('valorAluguel', 'Valor do aluguel')}
            {buildField('outrasRendas', 'Outras rendas')}
          </div>

          <h2>Referências</h2>
          {buildTextarea('referenciasPessoaisEmpresa', 'Referências pessoais / empresa')}
          {buildTextarea('referenciasPessoais', 'Referências pessoais')}
          {buildTextarea('referenciasBancarias', 'Referências bancárias')}

          <h2>Dados do cônjuge</h2>
          <div className="form-row">
            {buildField('nomeConjuge', 'Nome do cônjuge')}
            {buildField('cpfConjuge', 'CPF do cônjuge')}
          </div>

          <div className="form-row">
            {buildField('rgConjuge', 'RG do cônjuge')}
            {buildField('dataNascimentoConjuge', 'Data de nascimento do cônjuge', 'date')}
          </div>

          <div className="form-row">
            {buildField('profissaoConjuge', 'Profissão do cônjuge')}
            {buildField('empresaConjuge', 'Empresa do cônjuge')}
          </div>

          <div className="form-row">
            {buildField('telefoneEmpresaConjuge', 'Telefone da empresa do cônjuge', 'tel')}
            {buildField('remuneracaoConjuge', 'Remuneração do cônjuge')}
          </div>

          {buildTextarea('bensPropriosConjuge', 'Bens próprios do cônjuge')}
        </>
      ) : (
        <>
          <div className="form-row">
            {buildField('nome', 'Nome')}
            {buildField('cpf', 'CPF')}
          </div>

          <div className="form-row">
            {buildField('rg', 'RG')}
            {buildField('orgaoExpedidor', 'Órgão expedidor')}
          </div>

          <div className="form-row">
            {buildField('dataEmissaoRg', 'Data emissão do RG', 'date')}
            {buildField('dataNascimento', 'Data de nascimento', 'date')}
          </div>

          <div className="form-row">
            {buildField('estadoCivil', 'Estado civil', 'text', [
              'Solteiro(a)',
              'Casado(a)',
              'Divorciado(a)',
              'Viúvo(a)',
              'União Estável',
            ])}
            {buildField('profissao', 'Profissão')}
          </div>

          <div className="form-row">
            {buildField('nacionalidade', 'Nacionalidade')}
            {buildField('nomePai', 'Nome do pai')}
          </div>

          <div className="form-row">
            {buildField('nomeMae', 'Nome da mãe')}
            {buildField('naturalDe', 'Natural de')}
          </div>

          <div className="form-row">
            {buildField('instagram', 'Instagram')}
            {buildField('rendaMensal', 'Renda mensal')}
          </div>

          <div className="form-row">
            {buildField('localTrabalho', 'Local de trabalho')}
            {buildField('tempoTrabalho', 'Tempo de trabalho')}
          </div>

          <div className="form-row">
            {buildField('email', 'E-mail', 'email')}
            {buildField('celular', 'Celular', 'tel')}
          </div>

          <div className="form-row">
            {buildField('telefone', 'Telefone', 'tel')}
            {buildField('cep', 'CEP')}
          </div>

          <div className="form-row">
            {buildField('logradouro', 'Logradouro')}
            {buildField('numero', 'Número')}
          </div>

          <div className="form-row">
            {buildField('complemento', 'Complemento')}
            {buildField('bairro', 'Bairro')}
          </div>

          <div className="form-row">
            {buildField('cidade', 'Cidade')}
            {buildField('estado', 'Estado')}
          </div>

          {buildTextarea('referenciasPessoais', 'Referências pessoais')}

          <h2>Dados do cônjuge</h2>
          <div className="form-row">
            {buildField('nomeConjuge', 'Nome do cônjuge')}
            {buildField('cpfConjuge', 'CPF do cônjuge')}
          </div>

          <div className="form-row">
            {buildField('rgConjuge', 'RG do cônjuge')}
            {buildField('dataNascimentoConjuge', 'Data de nascimento do cônjuge', 'date')}
          </div>

          <div className="form-row">
            {buildField('profissaoConjuge', 'Profissão do cônjuge')}
            {buildField('empresaConjuge', 'Empresa do cônjuge')}
          </div>

          <div className="form-row">
            {buildField('telefoneEmpresaConjuge', 'Telefone da empresa do cônjuge', 'tel')}
            {buildField('remuneracaoConjuge', 'Remuneração do cônjuge')}
          </div>

          {buildTextarea('bensPropriosConjuge', 'Bens próprios do cônjuge')}

          <h2>Informações do imóvel</h2>
          <div className="form-row form-row-3">
            {buildField('codigoImovel', 'Código do imóvel')}
            {buildField('valorAluguel', 'Valor do aluguel')}
            {buildField('finalidadeLocacao', 'Finalidade da locação', 'text', [
              'Residencial',
              'Comercial',
              'Temporada',
              'Outros',
            ])}
          </div>
        </>
      )}

      <h2>Assinatura</h2>
      <div className="field-group">
        <label>Assine abaixo</label>
        <div className="signature-container">
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{
              className: 'signature-canvas',
              width: canvasWidth,
              height: 150,
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => signatureRef.current?.clear()}
          style={{ marginTop: '12px', width: 'auto', padding: '10px 20px', fontSize: '0.9rem' }}
        >
          Limpar assinatura
        </button>
      </div>

      <button type="submit">Gerar PDF</button>
    </form>
  );
}
