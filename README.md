# Fichas Cadastrais Imobiliária

Sistema de formulário para preenchimento de fichas cadastrais sem banco de dados. O cliente preenche os dados e gera um PDF para download imediatamente.

## Como usar

1. Instale dependências:
   ```bash
   npm install
   ```
2. Rode em desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse `http://localhost:3000` no navegador.

## Adicionar a logo real

1. Coloque a imagem do logo (`logo.png` ou `logo.jpg`) na pasta `public/`.
2. Execute o script para converter para base64:
   ```bash
   node convert-logo.js
   ```
3. O script atualizará automaticamente o arquivo `lib/logoBase64.ts` com a imagem convertida.
4. Reinicie o servidor de desenvolvimento.
5. Ao gerar um PDF, a logo real aparecerá no cabeçalho.

**Nota:** Se nenhuma logo for adicionada, o PDF usará um desenho vetorial padrão.

## Deploy na Vercel

1. Faça login em Vercel e conecte o repositório.
2. A Vercel detecta automaticamente o app Next.js.
3. Use o comando de build padrão:
   ```bash
   npm run build
   ```

## O que foi criado

- `app/page.tsx`: página principal com o formulário.
- `components/Form.tsx`: lógica de captura dos dados e geração do PDF.
- `lib/logoBase64.ts`: armazena a logo em base64.
- `convert-logo.js`: script para converter PNG/JPG para base64.
- `public/`: pasta para arquivos estáticos (coloque logo aqui).
- `app/globals.css`: estilos básicos.
- `package.json`: dependências e scripts.

## Observação

Nenhum banco de dados é usado. Todos os dados permanecem no navegador até o PDF ser gerado.
