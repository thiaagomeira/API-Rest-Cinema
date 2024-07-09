# Cinema Management API

API RESTful para a gestão de cinemas, desenvolvida em Node.js com TypeScript e SQLite como banco de dados. A API permite a criação, leitura, atualização e exclusão (CRUD) de filmes, sessões e ingressos.

## Requisitos

- **Node.js** versão `18.18.2`. Recomendamos o uso do `nvm` (Node Version Manager) para gerenciar a versão do Node.js.

### Instalando o nvm

Se você ainda não possui o `nvm` instalado, siga os passos abaixo:

Para sistemas Windows, recomendamos o uso do nvm-windows.

```bash
https://github.com/coreybutler/nvm-windows
```

Após a instalação do nvm, reinicie o seu computador e instale a versão 18.18.2 do Node.js:

```bash
nvm install v18.18.2
```

```bash
nvm use 18.18.2
```

## Instalação

Clone o repositório:

```bash
git clone https://github.com/itaji-create/Time-4---RestInPeace
```

Instale as dependências:

```bash
npm install
```

Execute as migrações para criar as tabelas no banco de dados:

```bash
npm run typeorm:migrate
```

## Scripts Disponíveis

- `npm run typeorm:migrate`: Executa as migrações para criar as tabelas no banco de dados
- `npm run build`: Compila o projeto TypeScript para JavaScript.
- `npm start`: Inicia o servidor em modo de produção.
- `npm run dev`: Inicia o servidor em modo de desenvolvimento com recarga automática.

## Documentação da API

A documentação da API está disponível no formato Swagger. Após iniciar o servidor, você pode acessar a documentação através da seguinte URL:

```bash
http://localhost:3001/api-docs/#/
```

## Endpoints

### Filmes

- `GET /api/v1/movies`: Retorna a lista de filmes.
- `GET /api/v1/movies/:id`: Retorna detalhes de um filme específico.
- `POST /api/v1/movies`: Cria um novo filme.
- `PUT /api/v1/movies/:id`: Atualiza um filme existente.
- `DELETE /api/v1/movies/:id`: Deleta um filme.

### Sessões

- `POST /api/v1/movies/{movie_id}/sessions `: Cria uma nova sessão.
- `PUT /api/v1/movies/{movie_id}/sessions/:id`: Atualiza uma sessão existente.
- `DELETE /api/v1/movies/{movie_id}/sessions/:id  `: Deleta uma sessão.

### Ingressos

- `POST /api/v1/movies/{movie_id}/sessions/{session_id}/tickets`: Cria um novo ingresso.
- `PUT /api/v1/movies/{movie_id}/sessions/{session_id}/tickets/:id`: Atualiza um ingresso existente.
- `DELETE /api/v1/movies/{movie_id}/sessions/{session_id}/tickets/:id`: Deleta um ingresso.

## Regras de Negócio

### Filmes

Cada filme possui os campos `id`, `image`, `name`, `description`, `cast`, `genre`, `duration` e `release_date` (formato ISO 8601).

### Sessões

As sessões são vinculadas a filmes e possuem informações como data, horário e sala.

### Ingressos

Os ingressos são vinculados a sessões e usuários, e possuem informações como número do assento e preço.

## Licença

Este projeto está licenciado sob a Licença MIT.
