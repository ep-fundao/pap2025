

# 🤱 ClickToCare – Cuidando de Vidas desde o Início

ClickToCare é uma plataforma web responsiva com foco **mobile-first**, desenhada para acompanhar a jornada da mulher grávida e o desenvolvimento da criança desde o primeiro dia da gestação.

Nosso objetivo é **empoderar as mães** com informações, alertas e assistência personalizada através de uma interface intuitiva e acolhedora, com o suporte de um **assistente virtual inteligente disponível 24h por dia**.

---

## 🌟 Visão

Oferecer uma experiência completa de **saúde digital materno-infantil**, garantindo que nenhuma mulher enfrente a gestação ou a maternidade sozinha, especialmente em contextos com acesso limitado a cuidados presenciais.

---

## 📲 Principais Funcionalidades

### 📅 Agendamento de Consultas  
Marque, visualize e receba lembretes de consultas pré-natais e pediátricas.

### 🩺 Diário de Saúde Gestacional  
Registre sintomas, sentimentos e eventos importantes durante a gravidez.

### 🤖 Assistente Virtual Humanizado  
Um chatbot empático que responde dúvidas frequentes, orienta e fornece informações médicas verificadas.

### 🔔 Alertas Inteligentes  
Notificações automáticas sobre vacinas, exames e cuidados importantes com base na semana de gestação ou idade da criança.

### 👶 Linha do Tempo do Bebê  
Acompanhe marcos do desenvolvimento infantil mês a mês.

### 🌐 Plataforma Web PWA  
Pode ser usada como app em dispositivos móveis e no navegador com performance nativa.

---

## 🧑‍🤝‍🧑 Público-Alvo (Stakeholders)

- Mulheres grávidas em contextos urbanos e rurais, com foco em acesso via smartphones.
- Mães de recém-nascidos e crianças pequenas que buscam acompanhar o desenvolvimento infantil.
- Profissionais de saúde parceiros (versão futura).

---

## 🧠 Tecnologias e Arquitetura

- **Frontend:** ReactJS + TailwindCSS  
- **Backend:** Node.js  
- **Banco de Dados:** MongoDB (NoSQL escalável)  
- **IA/Assistente Virtual:** OpenAI API  
- **Autenticação:** Auth0  
- **Hospedagem:** Vercel

---

## ✨ Diferenciais

- Experiência totalmente **mobile-first** com visual clean e interações suaves.
- Foco emocional: linguagem empática e design acolhedor.
- Inclusividade: pensado para funcionar em áreas com baixa conectividade.
- Escalável para integração com clínicas e políticas públicas no futuro.

---

## 🛡️ Segurança e Privacidade

ClickToCare segue as melhores práticas de privacidade de dados, respeitando normas como o **RGPD**.  
Os dados sensíveis são criptografados e os usuários têm total controle sobre suas informações.

---

## 👩‍💻 Futuro

- Integração com sistemas de saúde pública.
- Módulo de telemedicina.
- Comunidade de apoio entre mães.
- Tradução e suporte multilíngue.

---

## 📦 Dependências do Projeto

Este projeto foi desenvolvido com **Next.js**, **React** e **Tailwind CSS**, além de várias bibliotecas complementares para autenticação, UI, análise e animações.

### 🚀 Principais Frameworks e Bibliotecas

| Pacote                 | Versão   | Descrição                                      |
|------------------------|----------|-----------------------------------------------|
| `next`                | 15.3.2   | Framework React para SSR e SSG                |
| `react` / `react-dom` | 19.1.0   | Biblioteca principal de UI                    |
| `typescript`          | 5.8.3    | Tipagem estática opcional para JavaScript     |
| `@auth0/nextjs-auth0` | 4.5.1    | Autenticação com Auth0 em apps Next.js        |

---

### 🎨 Estilização e Animações

| Pacote                    | Descrição                                               |
|---------------------------|----------------------------------------------------------|
| `tailwindcss`             | Framework CSS utilitário                                 |
| `@tailwindcss/typography` | Plugin de tipografia para Tailwind                       |
| `tailwindcss-animate`     | Integração de animações                                  |
| `tw-animate-css`          | Biblioteca de animações baseada em Tailwind              |
| `tailwind-merge`          | Remove classes Tailwind conflitantes                     |
| `postcss`, `autoprefixer` | Processadores de CSS                                     |

---

### 🧩 Componentes e UI (Radix UI)

Utiliza os componentes acessíveis e sem estilo visual da [Radix UI](https://www.radix-ui.com/).

| Pacote                   | Descrição                                       |
|--------------------------|--------------------------------------------------|
| `@radix-ui/react-*`     | Componentes acessíveis: diálogo, tabs, select... |

---

### 🧠 Utilitários

| Pacote                        | Descrição                                             |
|-------------------------------|--------------------------------------------------------|
| `clsx`, `class-variance-authority` | Manipulação condicional de classes CSS          |
| `lucide-react`                | Ícones SVG                                            |
| `next-themes`                | Suporte a tema escuro/claro                           |
| `react-markdown`             | Renderização de Markdown no React                     |
| `openai`                     | Integração com API da OpenAI                          |
| `sonner`                     | Notificações toast simples                            |

---

### 🧪 Tipagens e Linting

| Pacote                                      | Descrição                              |
|---------------------------------------------|----------------------------------------|
| `@types/node`, `@types/react`, `@types/react-dom` | Tipos TypeScript              |
| `eslint`, `eslint-config-next`, `@eslint/eslintrc` | Linting e boas práticas de código |

---

## 📥 Instalação

```bash
# Instalar todas as dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

## Licença

Este projeto está licenciado sob a Licença MIT.  
Consulte o ficheiro [LICENSE](./LICENSE) para mais informações.