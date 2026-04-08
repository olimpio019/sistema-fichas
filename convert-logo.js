#!/usr/bin/env node

// Script para converter logo.png para base64
// Uso: node convert-logo.js

const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, 'public', 'logo.png');

if (!fs.existsSync(logoPath)) {
  console.error(`❌ Erro: Arquivo logo.png não encontrado em: ${logoPath}`);
  console.log('\n📁 Coloque a imagem do logo em: public/logo.png');
  process.exit(1);
}

try {
  const imageBuffer = fs.readFileSync(logoPath);
  const base64String = imageBuffer.toString('base64');
  const base64DataUrl = `data:image/png;base64,${base64String}`;

  const outputPath = path.join(__dirname, 'lib', 'logoBase64.ts');
  const content = `// Logo convertido automaticamente para base64
// Gerado em: ${new Date().toLocaleString()}

export const logoBase64 = '${base64DataUrl}';
`;

  fs.writeFileSync(outputPath, content, 'utf8');
  console.log('✅ Logo convertido com sucesso!');
  console.log(`📝 Arquivo atualizado: ${outputPath}`);
  console.log('\n🚀 Agora é só aguardar o reload do projeto dev e gerar um PDF para testar!');
} catch (error) {
  console.error('❌ Erro ao converter logo:', error.message);
  process.exit(1);
}
