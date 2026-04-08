# Guia de Deploy na Vercel

## Passo 1: Criar conta no GitHub (se não tiver)

1. Acesse [github.com](https://github.com)
2. Clique em "Sign up"
3. Complete o cadastro

## Passo 2: Criar um repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: `fichas-cadastrais` (ou outro nome que desejar)
3. Deixe como **Public** (para Vercel acessar)
4. Clique em **Create repository**
5. Copie o comando para conectar seu repositório local

## Passo 3: Fazer Push para GitHub

No terminal do seu projeto, execute os comandos que GitHub forneceu. Exemplo:

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/fichas-cadastrais.git
git push -u origin main
```

Substitua `SEU_USUARIO` pelo seu username do GitHub.

## Passo 4: Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **Sign up** e escolha **Continue with GitHub**
3. Autorize a Vercel a acessar seus repositórios
4. Clique em **Import Project**
5. Procure por `fichas-cadastrais` (seu repositório)
6. Clique **Import**
7. Configure:
   - Framework Preset: **Next.js** (já selecionado automaticamente)
   - Root Directory: `.`
   - Build Command: `npm run build`
8. Clique em **Deploy**

## Passo 5: Pronto!

Após o deploy, você receberá um URL como:
```
https://fichas-cadastrais-abc123.vercel.app
```

Compartilhe este link para seus clientes usarem!

## Atualizações futuras

Toda vez que você fizer mudanças e fazer push para GitHub:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

A Vercel automaticamente detectará as mudanças e fará o redeploy.

## Variáveis de Ambiente (se necessário)

Se precisar adicionar variáveis no futuro:

1. Na Vercel, vá para **Settings** > **Environment Variables**
2. Adicione as variáveis necessárias
3. A Vercel automaticamente fará redeploy

---

**Dúvidas?** A Vercel tem documentação completa em [vercel.com/docs](https://vercel.com/docs)
