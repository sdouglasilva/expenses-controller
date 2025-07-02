<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
# API de Controle de Despesas

API REST para gerenciamento de despesas pessoais, desenvolvida com NestJS como parte de um case técnico. O projeto inclui um sistema de autenticação de usuários e controle de acesso baseado em posse.

## Principais Funcionalidades

- **Autenticação de Usuário:** Sistema de cadastro e login com autenticação via JWT.
- **CRUD de Despesas:** Operações completas de Criar, Ler, Atualizar e Deletar despesas.
- **Controle de Acesso:** As rotas são protegidas para garantir que um usuário possa apenas acessar e manipular suas próprias despesas.
- **Validação de Dados:** Validação de dados de entrada utilizando `class-validator`, incluindo regras de negócio customizadas (ex: a data da despesa não pode ser futura).
- **Notificações por E-mail:** Envio de e-mail de confirmação ao usuário no momento do cadastro de uma nova despesa.
- **Tratamento de Exceções:** Respostas de erro padronizadas para toda a aplicação através de um `HttpExceptionFilter` global.
- **Testes Unitários:** Testes unitários para os serviços principais, garantindo a lógica de negócio e o tratamento de exceções.

## Tecnologias

- **Backend:** NestJS, TypeScript
- **Banco de Dados:** PostgreSQL, TypeORM
- **Autenticação:** Passport.js (Estratégia JWT)
- **Validação:** class-validator
- **E-mail:** Nodemailer
- **Testes:** Jest
- **Ambiente:** Docker, Docker Compose

## Configuração e Execução

Para configurar e executar a aplicação localmente, siga os passos abaixo.

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker Desktop
- Um cliente de API (Postman, Insomnia, Thunder Client, etc.)

### Instruções

**1. Clonar o Repositório**

```bash
git clone [https://github.com/seu-usuario/expenses-controller.git](https://github.com/seu-usuario/expenses-controller.git)
cd expenses-controller
```

**2. Instalar Dependências**

```bash
npm install
```

**3. Configurar Variáveis de Ambiente**

O projeto requer um arquivo `.env` para as configurações. Copie o arquivo de exemplo para criar o seu ou utlize as informações principais de email para agilizar seu trabalho no `.env.example`

```bash
cp .env.example .env
```

Abra o arquivo `.env` e preencha as variáveis conforme a tabela abaixo.

| Variável         | Descrição                                               | Exemplo                                |
| :--- | :--- | :--- |
| `DB_HOST`        | Host do banco de dados (mantenha `localhost` com Docker). | `localhost`                            |
| `DB_PORT`        | Porta do banco de dados.                                | `5432`                                 |
| `DB_USERNAME`    | Usuário do banco de dados.                              | `docker`                               |
| `DB_PASSWORD`    | Senha do banco de dados.                                | `docker`                               |
| `DB_DATABASE`    | Nome do banco de dados.                                 | `expenses_db`                          |
| `JWT_SECRET`     | Chave secreta para assinar os tokens JWT.               | `UMA_CHAVE_FORTE_E_SECRETA`            |
| `JWT_EXPIRES_IN` | Tempo de expiração do token.                            | `3600s`                                |
| `MAIL_HOST`      | Host do serviço de e-mail (ex: Mailtrap Sandbox).       | `sandbox.smtp.mailtrap.io`             |
| `MAIL_PORT`      | Porta do serviço de e-mail.                             | `2525`                                 |
| `MAIL_USER`      | Usuário do serviço de e-mail.                           | `seu-usuario-mailtrap`                 |
| `MAIL_PASS`      | Senha do serviço de e-mail.                             | `sua-senha-mailtrap`                   |
| `MAIL_FROM`      | E-mail remetente.                                       | `"Expenses App" <from@example.com>`    |

**4. Iniciar o Banco de Dados**

Com o Docker em execução, inicie o container do PostgreSQL.

```bash
docker run -d --name expenses-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=0000 -e POSTGRES_DB=expenses_db -p 5432:5432 -v pgdata:/var/lib/postgresql/data postgres:15

```

**5. Executar a Aplicação**

Inicie a API em modo de desenvolvimento.

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Testando os Endpoints

Utilize um cliente de API para interagir com os endpoints.

- `POST /auth/register` - Cria um novo usuário.
- `POST /auth/login` - Autentica um usuário e retorna um `accessToken`.
- `GET /expenses` - Lista as despesas do usuário autenticado.
- `POST /expenses` - Cria uma nova despesa.
- `GET /expenses/:id` - Busca uma despesa específica.
- `PATCH /expenses/:id` - Atualiza uma despesa.
- `DELETE /expenses/:id` - Remove uma despesa.

**Nota sobre Autenticação:**
Para acessar os endpoints de despesas, é necessário incluir o `accessToken` no cabeçalho `Authorization` da requisição.

**Formato:** `Authorization: Bearer seu_token_aqui`

## Executando os Testes

Para rodar os testes unitários, utilize o seguinte comando:

```bash
npm run test
