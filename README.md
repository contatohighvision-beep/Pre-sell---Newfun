# Construtor de Pre-Sell +18 Profissional

Uma ferramenta completa e interativa de **Pré-venda (Pre-Sell)** com **Aviso de Maioridade (Portão de 18+)** altamente otimizada para taxas de conversão (CRO) em nichos restritos (Adulto, Cassinos, Apostas, Produtos Sensoriais, Bebidas Finas, etc.).

Este projeto foi construído para funcionar de duas formas principais:
1. **Aplicativo Construtor:** Onde você pode testar ao vivo, alternar temas, alterar textos de aviso, configurar links de afiliado e definir métodos de verificação (clique único ou inserção de data de nascimento).
2. **Código Pronto:** Permite exportar e copiar o código completo de uma página única (Single-File `index.html` com Tailwind via CDN) pronta para ser publicada em qualquer servidor.

---

## 🚀 Como Publicar no GitHub e Vercel (Passo a Passo)

Como este é um projeto estático em React + Vite, a publicação na **Vercel** ou no **GitHub Pages** é extremamente simples, rápida e 100% gratuita!

### 1. Exportando o Projeto do Google AI Studio
1. No canto superior direito ou no menu de configurações do Google AI Studio, clique em **Export** (Exportar).
2. Selecione **Export to GitHub** (para criar um repositório diretamente no seu perfil do GitHub) ou baixe como **ZIP** e extraia no seu computador.

### 2. Publicando no GitHub (Caso tenha baixado em ZIP)
1. Crie um novo repositório vazio no seu [GitHub](https://github.com/).
2. Abra o terminal na pasta do projeto e execute os seguintes comandos:
   ```bash
   git init
   git add .
   git commit -m "feat: pre-sell 18+ generator setup"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```

### 3. Publicando na Vercel (O jeito mais rápido - 1 Minuto)
Uma vez que o projeto está no seu GitHub:
1. Acesse o painel da [Vercel](https://vercel.com/) e faça login com sua conta do GitHub.
2. Clique no botão **"Add New..."** e selecione **"Project"**.
3. Importe o repositório que você acabou de criar.
4. A Vercel detectará automaticamente o **Vite** como framework do projeto.
5. Deixe as configurações padrão e clique em **"Deploy"**.
6. **Pronto!** Em menos de 30 segundos, seu site de Pre-Sell estará online com um link seguro HTTPS gratuito (ex: `sua-pre-sell.vercel.app`).

---

## 🛠️ Tecnologias Utilizadas

- **React 19** com **Vite**
- **Tailwind CSS** para estilização moderna de alto contraste
- **Motion** (antigo Framer Motion) para animações fluidas de transição e micro-interações
- **Lucide React** para ícones modernos e minimalistas
- **Single-File Export Engine:** Gerador dinâmico de código HTML puro autocontido para portabilidade instantânea.

---

## 🎨 Temas Inclusos

- 🔞 **Adulto VIP (Luxo Negro & Vermelho):** Design sofisticado com tons escuros e destaques rubi, ideal para infoprodutos ou plataformas adultas.
- 🎰 **Cassino Esmeralda:** Cores inspiradas em mesas de jogos, ideal para sites de bets, roletas e slots.
- 🔮 **VIP Púrpura Imperial:** Atmosfera premium e exclusiva, ideal para comunidades secretas e fóruns.
- 💧 **Clássico Azul Oceano:** Design corporativo, limpo e profissional para produtos sensíveis de saúde e bem-estar.
- 🌹 **Rose Sensual:** Uma estética romântica e elegante para sex shops e produtos de autocuidado íntimo.
