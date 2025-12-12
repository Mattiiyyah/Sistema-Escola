# 🌻 Comeia Girassol - Sistema de Gestão Escolar

> "De um espaço de brincar para uma escola de aprender."

![Status do Projeto](https://img.shields.io/badge/STATUS-EM_DESENVOLVIMENTO-yellow)
![License](https://img.shields.io/badge/LICENSE-MIT-green)

## 📖 Sobre o Projeto

Este projeto nasceu de uma motivação muito especial e de um problema real.

Minha mãe administra um espaço de recreação infantil que, em 2026, se transformará oficialmente na **Escola Comeia Girassol**. Observando a rotina dela, notei que um dos maiores gargalos era a gestão financeira: todo o controle de pagamentos e mensalidades dos alunos era feito manualmente em **papel**, o que dificultava a visualização de quem já tinha pago ou quem estava pendente.

Decidi então unir o meu objetivo de consolidar meus conhecimentos em **Desenvolvimento Web** com a vontade de ajudar o negócio da família. Assim nasceu este sistema: uma plataforma para gerenciar matrículas e controlar o fluxo de pagamentos de forma simples e digital.

---

## ⚙️ Funcionalidades

O sistema conta com uma área administrativa segura onde é possível:

* **Autenticação:** Sistema de Login/Cadastro para administradores com proteção de rotas.
* **Gestão de Alunos (CRUD Completo):**
    * **C**riar novas matrículas.
    * **R**ecuperar e listar alunos.
    * **U**pdate (Atualizar) dados cadastrais e financeiros.
    * **D**elete (Remover) registros.
* **Controle Financeiro:** Filtros rápidos para visualizar alunos com mensalidade **Paga** ou **Pendente**.
* **Interface Responsiva:** Funciona bem em computadores e tablets para facilitar o uso no dia a dia da escola.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido seguindo o padrão de arquitetura **MVC (Model-View-Controller)**.

* **Back-end:** Node.js, Express.
* **Banco de Dados:** MongoDB (com Mongoose).
* **Front-end:** EJS (View Engine), Bootstrap 5, CSS.
* **Segurança:**
    * `bcryptjs` (Criptografia de senhas).
    * `csurf` (Proteção contra CSRF).
    * `express-session` & `connect-mongo` (Gestão de sessões).

---

## 💡 Desafios e Aprendizados

Este projeto foi fundamental para o meu crescimento como desenvolvedor.

* **O Desafio do CRUD:** Implementar toda a lógica de Criação, Leitura, Atualização e Exclusão foi o ponto alto do desenvolvimento. Garantir que os dados fossem salvos corretamente, validados antes de entrar no banco e recuperados para edição exigiu muito estudo e testes.
* **Validações:** Aprendi a criar camadas de segurança, garantindo que o sistema não aceite dados incompletos ou formatos inválidos.
* **Filtros Dinâmicos:** Implementar a lógica para filtrar alunos por status de pagamento (Pago/Pendente) manipulando as queries do banco de dados.

---

## 🤖 Uso de Inteligência Artificial

A transparência faz parte do processo de aprendizado. Para este projeto, utilizei ferramentas de IA de forma estratégica:

1.  **Front-end com Gemini:** Embora eu tenha conhecimento em HTML/CSS, utilizei o **Google Gemini** para agilizar a criação e estilização das telas (Views). Isso permitiu-me focar a maior parte do meu tempo na lógica do Back-end, que era o meu principal objeto de estudo, garantindo ao mesmo tempo uma interface visualmente agradável e moderna.
2.  **Imagens Ilustrativas:** Como a escola física ainda está em fase de planejamento para 2026, as fotos utilizadas no site são baseadas em ambientes reais, mas foram geradas ou modificadas por IA para representar a visão futura da escola.

---

## 📦 Como rodar o projeto

```bash
# Clone este repositório
$ git clone <link-do-seu-repositorio>

# Acesse a pasta do projeto no terminal/cmd
$ cd nome-do-projeto

# Instale as dependências
$ npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env na raiz e adicione sua CONNECTIONSTRING do MongoDB e SESSIONSECRET

# Execute a aplicação
$ npm start

# O servidor iniciará na porta:3000 - acesse http://localhost:3000

***