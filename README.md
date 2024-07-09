# Cinema Management API

API RESTful para a gestão de cinemas, desenvolvida em Node.js com TypeScript e SQLite como banco de dados. A API permite a criação, leitura, atualização e exclusão (CRUD) de filmes, sessões e ingressos.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/itaji-create/Time-4---RestInPeace
```

Instale as dependências:

```bash
npm install
```

Executa as migrações para criar as tabelas no banco de dados:

```bash
npm run typeorm:migrate
```

## Scripts Disponíveis

- `npm run typeorm:migrate`: Executa as migrações para criar as tabelas no banco de dados
- `npm run build`: Compila o projeto TypeScript para JavaScript.
- `npm start`: Inicia o servidor em modo de produção.
- `npm run dev`: Inicia o servidor em modo de desenvolvimento com recarga automática.

## Endpoints

### Filmes

- `GET /movies`: Retorna a lista de filmes.
- `GET /movies/:id`: Retorna detalhes de um filme específico.
- `POST /movies`: Cria um novo filme.
- `PUT /movies/:id`: Atualiza um filme existente.
- `DELETE /movies/:id`: Deleta um filme.

### Sessões

- `GET /sessions`: Retorna a lista de sessões.
- `GET /sessions/:id`: Retorna detalhes de uma sessão específica.
- `POST /sessions`: Cria uma nova sessão.
- `PUT /sessions/:id`: Atualiza uma sessão existente.
- `DELETE /sessions/:id`: Deleta uma sessão.

### Ingressos

- `GET /tickets`: Retorna a lista de ingressos.
- `GET /tickets/:id`: Retorna detalhes de um ingresso específico.
- `POST /tickets`: Cria um novo ingresso.
- `PUT /tickets/:id`: Atualiza um ingresso existente.
- `DELETE /tickets/:id`: Deleta um ingresso.

## Regras de Negócio

### Filmes

Cada filme possui os campos `id`, `image`, `name`, `description`, `cast`, `genre`, `duration` e `release_date` (formato ISO 8601).

### Sessões

As sessões são vinculadas a filmes e possuem informações como data, horário e sala.

### Ingressos

Os ingressos são vinculados a sessões e usuários, e possuem informações como número do assento e preço.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona MinhaFeature'`).
4. Faça push para a branch (`git push origin feature/MinhaFeature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT.
