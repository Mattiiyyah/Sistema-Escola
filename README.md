# 🌻 Colmeia Girassol - Sistema de Gestão Escolar

> "De um espaço de brincar para uma escola de aprender."

![Status do Projeto](https://img.shields.io/badge/STATUS-CONCLUIDO-brightgreen)
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
* **Validação Robusta:** Feedback instantâneo de erros nos formulários (Frontend) e verificação de segurança no servidor (Backend).
* **Interface Responsiva:** Funciona bem em computadores e tablets para facilitar o uso no dia a dia da escola.

---

## � Galeria do Projeto

<div align="center">

  <h3>🏠 Página Inicial & Apresentação</h3>
  <img src="https://github.com/user-attachments/assets/1971faf8-a4a3-49f7-848c-381ce4bce873" style="border-radius: 15px; margin-bottom: 20px;" width="100%" alt="Tela Inicial">
  <p><em>Tela Inicial: Um convite visual ao ambiente escolar</em></p>

  <br>

  <img src="https://github.com/user-attachments/assets/2e2135a2-8a87-4b59-ac79-e26924b2909a" style="border-radius: 15px; margin-bottom: 20px;" width="100%" alt="Destaque">
  <p><em>Destaques do ambiente de aprendizado</em></p>

  <br>

  <div style="display: flex; justify-content: space-between; gap: 10px;">
    <img src="https://github.com/user-attachments/assets/cdf2ef51-a1ea-4ccf-b00b-e7852c6ac600" style="border-radius: 10px; width: 48%;" alt="Detalhe 1">
    <img src="https://github.com/user-attachments/assets/da0425f7-c84d-4289-8cfa-35702ac65232" style="border-radius: 10px; width: 48%;" alt="Detalhe 2">
  </div>
  <p><em>Metodologia e Valores da Escola</em></p>

  <br>
  <hr>
  <br>

  <h3>🔐 Segurança & Acesso</h3>
  <img src="https://github.com/user-attachments/assets/cf975f74-821a-440f-a856-b9eb24c59295" style="border-radius: 15px; margin-bottom: 20px;" width="100%" alt="Login e Cadastro">
  <p><em>Tela de Login e Cadastro de Administradores</em></p>

  <br>

  <img src="https://github.com/user-attachments/assets/2c9aacce-40de-44fc-aad9-13f73081db5d" style="border-radius: 15px; margin-bottom: 20px;" width="100%" alt="Redefinir Senha">
  <p><em>Sistema de Recuperação de Senha Seguro</em></p>

  <br>
  <hr>
  <br>

  <h3>⚙️ Sistema Interno (Dashboard)</h3>
  <img src="https://github.com/user-attachments/assets/5c6973ee-b52a-4835-92e8-6a4b4161dc53" style="border-radius: 15px; margin-bottom: 20px;" width="100%" alt="Painel Admin">
  <p><em>Painel Administrativo: Visão geral e atalhos rápidos</em></p>

  <br>

  <img src="https://github.com/user-attachments/assets/70a65003-6ccf-4fac-867c-8390bbabda00" style="border-radius: 15px; margin-bottom: 20px;" width="100%" alt="Lista de Alunos">
  <p><em>Listagem de Alunos com Filtros de Pagamento (Pago/Pendente)</em></p>

  <br>

  <img src="https://github.com/user-attachments/assets/6a75c455-4ab8-4c41-befe-ef49d5cf29e8" style="border-radius: 15px; margin-bottom: 20px;" width="100%" alt="Matrícula">
  <p><em>Formulário de Matrícula e Edição de Dados</em></p>

</div>

## �🚀 Tecnologias Utilizadas

O projeto foi desenvolvido seguindo o padrão de arquitetura **MVC (Model-View-Controller)**.

* **Back-end:** Node.js, Express.
* **Banco de Dados:** MongoDB (com Mongoose).
* **Front-end:** EJS (View Engine), Bootstrap 5, CSS.
* **Assets & Bundling:** Webpack (para gerenciamento de scripts modulares).
* **Segurança & Validação:**
    * `bcryptjs` (Criptografia de senhas).
    * `csurf` (Proteção contra CSRF).
    * `validator` (Validação de dados).
    * `express-session` & `connect-mongo` (Gestão de sessões).

---

## 🧩 Arquitetura Frontend

Para garantir um código limpo e manutenível, o Frontend foi organizado em módulos utilizando **JavaScript Moderno (ES6+)** e **Webpack**:

*   **Modularização:** Cada formulário possui seu próprio controlador JS (`Login.js`, `Aluno.js`) na pasta `frontend/modules`.
*   **Classes ES6:** Uso de Classes para encapsular a lógica de validação e eventos.
*   **Webpack:** Empacotamento de todo o JavaScript em um único arquivo otimizado (`bundle.js`) para alta performance.

---

## 💡 Desafios e Aprendizados

Este projeto foi fundamental para o meu crescimento como desenvolvedor.

* **O Desafio do CRUD:** Implementar toda a lógica de Criação, Leitura, Atualização e Exclusão foi o ponto alto do desenvolvimento. Garantir que os dados fossem salvos corretamente, validados antes de entrar no banco e recuperados para edição exigiu muito estudo e testes.
* **Validações Híbridas:** Aprendi a criar camadas de segurança duplas. No *Client-side* para uma experiência de usuário fluida, e no *Server-side* para garantir a integridade dos dados no banco.
* **Organização Modular:** Entendi como dividir responsabilidades no Front-end usando módulos e classes, saindo do "código espaguete" para uma estrutura profissional com Webpack.
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
$ git clone <https://github.com/Mattiiyyah/Sistema-Escola>

# Acesse a pasta do projeto no terminal/cmd
$ cd Sistema-Escola

# Instale as dependências
$ npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env na raiz e adicione sua CONNECTIONSTRING do MongoDB e SESSIONSECRET

# Execute a aplicação
$ npm start

# O servidor iniciará na porta:3000 - acesse http://localhost:3000

