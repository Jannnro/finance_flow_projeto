# Finance Flow 💰

Aplicativo de controle financeiro moderno e elegante, desenvolvido para ajudar usuários a gerenciar suas receitas e despesas com facilidade.

![Finance Flow Preview](https://via.placeholder.com/800x400?text=Finance+Flow+Preview)

## ✨ Funcionalidades

- **Autenticação Simplificada**: Login rápido com Nome e Email (persistência local).
- **Dashboard Intuitivo**: Visão geral do Saldo, Receitas e Despesas.
- **Gestão de Transações**:
  - Adicionar Receitas e Despesas.
  - Categorização de gastos (Alimentação, Transporte, Lazer, etc.).
  - Seleção de método de pagamento (Pix ou Cartão).
- **Analytics**:
  - Gráfico de barras mostrando gastos por categoria.
  - Destaque automático para a categoria com maior consumo.
- **Design Premium**: Interface estilo *Glassmorphism* (efeito de vidro), totalmente responsiva e com animações fluidas.
- **Privacidade**: Todos os dados são salvos no navegador do usuário (`localStorage`), sem envio para servidores externos.

## 🛠️ Tecnologias Utilizadas

- **React** (Vite): Para uma aplicação rápida e reativa.
- **CSS Modules**: Estilização modular e organizada.
- **Phosphor Icons**: Ícones modernos e consistentes.
- **LocalStorage**: Para persistência de dados client-side.

## 🚀 Processo de Desenvolvimento

Este projeto foi construído com foco em **Experiência do Usuário (UX)** e **Design Visual**. O processo seguiu as seguintes etapas:

1.  **Planejamento**: Definição dos requisitos (controle de gastos, categorias, login simples) e escolha da stack tecnológica.
2.  **Design System**: Criação de uma paleta de cores "Dark Premium" e utilitários CSS para o efeito de vidro (*Glassmorphism*) antes de codificar os componentes.
3.  **Estrutura & Estado**: Implementação dos Contextos (`AuthContext` e `FinanceContext`) para gerenciar o estado global da aplicação de forma limpa.
4.  **Componentização**: Desenvolvimento modular de cada parte da interface (Cards, Listas, Formulários).
5.  **Polimento**: Adição de transições, validações e ajustes de responsividade para garantir o funcionamento em qualquer dispositivo.

## 📦 Como Rodar Localmente

1.  Clone o repositório:
    ```bash
    git clone https://github.com/Jannnro/finance_flow.git
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Rode o projeto:
    ```bash
    npm run dev
    ```
