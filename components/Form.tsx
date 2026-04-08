'use client';

import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import SignatureCanvas from 'react-signature-canvas';
import { logoBase64 } from '../lib/logoBase64';

const initialValues = {
  nome: '',
  cpf: '',
  rg: '',
  orgaoExpedidor: '',
  dataEmissaoRg: '',
  dataNascimento: '',
  estadoCivil: '',
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
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  referenciasPessoais: '',
  nomeConjuge: '',
  cpfConjuge: '',
  rgConjuge: '',
  dataNascimentoConjuge: '',
  profissaoConjuge: '',
  empresaConjuge: '',
  telefoneEmpresaConjuge: '',
  remuneracaoConjuge: '',
  residenciaAtual: '',
  bensPropriosConjuge: '',
  codigoImovel: '',
  valorAluguel: '',
  finalidadeLocacao: '',
};

type FormValues = typeof initialValues;

const resumo: Array<{ key: keyof FormValues; label: string }> = [
  { key: 'nome', label: 'Nome' },
  { key: 'cpf', label: 'CPF' },
  { key: 'rg', label: 'RG' },
  { key: 'orgaoExpedidor', label: 'Órgão Expedidor' },
  { key: 'dataEmissaoRg', label: 'Data de emissão do RG' },
  { key: 'dataNascimento', label: 'Data de nascimento' },
  { key: 'estadoCivil', label: 'Estado civil' },
  { key: 'profissao', label: 'Profissão' },
  { key: 'nacionalidade', label: 'Nacionalidade' },
  { key: 'nomePai', label: 'Nome do pai' },
  { key: 'nomeMae', label: 'Nome da mãe' },
  { key: 'naturalDe', label: 'Natural de' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'rendaMensal', label: 'Renda mensal' },
  { key: 'localTrabalho', label: 'Local de trabalho' },
  { key: 'tempoTrabalho', label: 'Tempo no trabalho' },
  { key: 'email', label: 'E-mail' },
  { key: 'celular', label: 'Celular' },
  { key: 'telefone', label: 'Telefone' },
  { key: 'cep', label: 'CEP' },
  { key: 'logradouro', label: 'Logradouro' },
  { key: 'numero', label: 'Número' },
  { key: 'complemento', label: 'Complemento' },
  { key: 'bairro', label: 'Bairro' },
  { key: 'cidade', label: 'Cidade' },
  { key: 'estado', label: 'Estado' },
  { key: 'referenciasPessoais', label: 'Referências pessoais' },
  { key: 'nomeConjuge', label: 'Nome do cônjuge' },
  { key: 'cpfConjuge', label: 'CPF do cônjuge' },
  { key: 'rgConjuge', label: 'RG do cônjuge' },
  { key: 'dataNascimentoConjuge', label: 'Data de nascimento do cônjuge' },
  { key: 'profissaoConjuge', label: 'Profissão do cônjuge' },
  { key: 'empresaConjuge', label: 'Empresa do cônjuge' },
  { key: 'telefoneEmpresaConjuge', label: 'Telefone da empresa do cônjuge' },
  { key: 'remuneracaoConjuge', label: 'Remuneração do cônjuge' },
  { key: 'residenciaAtual', label: 'Residência atual' },
  { key: 'bensPropriosConjuge', label: 'Bens próprios do cônjuge' },
  { key: 'codigoImovel', label: 'Código do imóvel' },
  { key: 'valorAluguel', label: 'Valor do aluguel' },
  { key: 'finalidadeLocacao', label: 'Finalidade da locação' },
];

export default function Form() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const signatureRef = useRef<SignatureCanvas>(null);

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
        <input
          id={key}
          type={type}
          value={value}
          onChange={(event) => updateField(key, event.target.value)}
        />
      </div>
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    let y = 50;

    const logoTop = y - 8;
    const iconX = margin;

    // Se houver uma logo em base64, adiciona ao PDF
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', iconX, logoTop, 90, 42);
    } else {
      // Caso contrário, desenha o logo vetorial
      doc.setFillColor(14, 55, 102);
      doc.triangle(iconX, logoTop + 28, iconX + 22, logoTop, iconX + 44, logoTop + 28, 'F');
      doc.setFillColor(153, 31, 57);
      doc.triangle(iconX + 20, logoTop + 28, iconX + 40, logoTop, iconX + 60, logoTop + 28, 'F');
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('FICHA CADASTRAL - FIADOR PESSOA FÍSICA', pageWidth / 2, y + 48, {
      align: 'center',
    });

    y += 70;
    doc.setDrawColor(0);
    doc.setLineWidth(1.4);
    doc.line(margin, y, pageWidth - margin, y);
    y += 28;

    function renderSection(title: string, fields: Array<[string, string]>) {
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
      let lineHeight = 16;
      let currentColumn = 0;
      let sectionY = y;

      fields.forEach(([label, value]) => {
        const columnX = currentColumn === 0 ? leftX : rightX;
        const text = `${label}: ${value}`;
        const splitText = doc.splitTextToSize(text, columnWidth);
        doc.text(splitText, columnX, sectionY);
        sectionY += splitText.length * lineHeight;

        if (currentColumn === 1) {
          currentColumn = 0;
          y = Math.max(y, sectionY) + 8;
          sectionY = y;
        } else {
          currentColumn = 1;
        }
      });

      if (currentColumn === 1) {
        y = Math.max(y, sectionY) + 8;
      }

      y += 10;
    }

    renderSection('Dados Pessoais', [
      ['Nome', values.nome || '-'],
      ['CPF', values.cpf || '-'],
      ['RG', values.rg || '-'],
      ['Órgão Expedidor', values.orgaoExpedidor || '-'],
      ['Data Emissão', values.dataEmissaoRg || '-'],
      ['Data Nascimento', values.dataNascimento || '-'],
      ['Estado Civil', values.estadoCivil || '-'],
      ['Profissão', values.profissao || '-'],
      ['Nacionalidade', values.nacionalidade || '-'],
      ['Natural de', values.naturalDe || '-'],
      ['Nome do Pai', values.nomePai || '-'],
      ['Nome da Mãe', values.nomeMae || '-'],
    ]);

    renderSection('Contato', [
      ['E-mail', values.email || '-'],
      ['Celular', values.celular || '-'],
      ['Telefone', values.telefone || '-'],
      ['Instagram', values.instagram || '-'],
      ['CEP', values.cep || '-'],
      ['Endereço', `${values.logradouro || '-'} ${values.numero || ''}`.trim() || '-'],
      ['Bairro', values.bairro || '-'],
      ['Cidade', values.cidade || '-'],
      ['Estado', values.estado || '-'],
      ['Complemento', values.complemento || '-'],
    ]);

    renderSection('Informações Profissionais', [
      ['Local de Trabalho', values.localTrabalho || '-'],
      ['Tempo de Trabalho', values.tempoTrabalho || '-'],
      ['Renda Mensal', values.rendaMensal || '-'],
      ['Código do Imóvel', values.codigoImovel || '-'],
      ['Valor do Aluguel', values.valorAluguel || '-'],
      ['Finalidade da Locação', values.finalidadeLocacao || '-'],
    ]);

    if (y > 720) {
      doc.addPage();
      y = margin;
    }

    // Adicionar seção de assinatura
    y += 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Assinatura do Declarante', margin, y);
    y += 10;
    doc.setDrawColor(0);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 20;

    // Capturar e adicionar assinatura ao PDF
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const signatureImage = signatureRef.current.toDataURL('image/png');
      doc.addImage(signatureImage, 'PNG', margin, y, 100, 40);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Sem assinatura', margin, y + 15);
    }

    const filename = `ficha-cadastral-${values.nome ? values.nome.replace(/\s+/g, '-') : 'cliente'}.pdf`;
    doc.save(filename);
  }

  return (
    <form onSubmit={handleSubmit}>
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

      <div className="field-group">
        <label htmlFor="referenciasPessoais">Referências pessoais</label>
        <textarea
          id="referenciasPessoais"
          value={values.referenciasPessoais}
          onChange={(event) => updateField('referenciasPessoais', event.target.value)}
        />
      </div>

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

      <div className="form-row">
        {buildField('residenciaAtual', 'Residência atual')}
        {buildField('bensPropriosConjuge', 'Bens próprios do cônjuge')}
      </div>

      <h2>Informações do imóvel</h2>
      <div className="form-row-3 form-row">
        {buildField('codigoImovel', 'Código do imóvel')}
        {buildField('valorAluguel', 'Valor do aluguel')}
        {buildField('finalidadeLocacao', 'Finalidade da locação', 'text', [
          'Residencial',
          'Comercial',
          'Temporada',
          'Outros',
        ])}
      </div>

      <h2>Assinatura</h2>
      <div className="field-group">
        <label>Assine abaixo</label>
        <SignatureCanvas 
          ref={signatureRef}
          canvasProps={{
            className: 'signature-canvas',
            width: 500,
            height: 150,
            style: {
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              cursor: 'crosshair',
            },
          }}
        />
        <button 
          type="button" 
          onClick={() => signatureRef.current?.clear()}
          style={{ marginTop: '8px', width: 'auto', padding: '8px 16px' }}
        >
          Limpar assinatura
        </button>
      </div>

      <button type="submit">Gerar PDF</button>
    </form>
  );
}
