# Project Pulse

Project Pulse e um dashboard executivo full stack para lideranca operacional. Ele integra tarefas reais do ClickUp, calcula criticidade no backend e apresenta uma visao clara de saude, gargalos e conclusoes.

## Objetivo

Entregar um painel executivo que permita:

- visualizar volume total de trabalho;
- identificar tarefas criticas rapidamente;
- acompanhar andamento por estagio (`To Do`, `Doing`, `Done`);
- filtrar tarefas por nome ou responsavel para tomada de decisao rapida.

## Stack

- Backend: Node.js + Express + TypeScript
- Frontend: React + Vite + TypeScript
- Integracao externa: ClickUp API v2
- Estrutura: monorepo simples com `server/` e `client/`

## Funcionalidades Entregues

- Integracao real com ClickUp em `GET /api/tasks`
- Variaveis sensiveis no backend via `.env`
- Payload normalizado para o frontend
- Regra `status_critico` calculada no backend
- Dashboard executivo com:
  - resumo de `Total de tarefas`, `Tarefas criticas` e `Concluidas`
  - board em `To Do`, `Doing` e `Done`
  - filtro por nome da tarefa ou responsavel
  - destaque visual para tarefas criticas

## Estrutura do Projeto

```text
.
|-- client/   # frontend React + Vite
|-- server/   # backend Node.js + Express
|-- docs/     # workflow e entrega
|-- .env.example
|-- .gitignore
`-- README.md
```

## Requisitos

- Node.js 20+ recomendado
- npm 10+ recomendado

## Configuracao do ClickUp

1. Gere ou use seu token pessoal da conta ClickUp.
2. Identifique o `CLICKUP_LIST_ID` da lista que sera monitorada.

Dica: em muitos links de lista do ClickUp, o id aparece apos `/li/`.

## Variaveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base em `.env.example`:

```env
CLICKUP_TOKEN=
CLICKUP_LIST_ID=
PORT=3333
CLIENT_ORIGIN=http://localhost:5173
VITE_API_BASE_URL=http://localhost:3333
```

Descricao das variaveis:

- `CLICKUP_TOKEN`: token de API do ClickUp.
- `CLICKUP_LIST_ID`: id da lista no ClickUp usada como fonte de tarefas.
- `PORT`: porta do backend local (padrao `3333`).
- `CLIENT_ORIGIN`: origem permitida pelo CORS do backend.
- `VITE_API_BASE_URL`: URL base usada pelo frontend para chamar o backend. Nao e segredo.

Variaveis do backend: `CLICKUP_TOKEN`, `CLICKUP_LIST_ID`, `PORT`, `CLIENT_ORIGIN`.
Variavel do frontend: `VITE_API_BASE_URL`.

## Instalacao

Na raiz do projeto:

```bash
npm install
```

## Como Rodar Localmente

Backend:

```bash
npm run dev:server
```

Frontend:

```bash
npm run dev:client
```

URL esperada do frontend: `http://127.0.0.1:5173` (ou `http://localhost:5173`).

## Como Testar a API

Health check:

- `GET http://localhost:3333/api/health`

Resposta esperada:

```json
{
  "status": "ok",
  "service": "project-pulse-api"
}
```

Tarefas:

- `GET http://localhost:3333/api/tasks`

Integracao usada:

```text
GET https://api.clickup.com/api/v2/list/{CLICKUP_LIST_ID}/task?include_closed=true
```

Formato de retorno (normalizado):

```json
{
  "tasks": [
    {
      "id": "task-id",
      "name": "Task name",
      "status": "to do",
      "priority": "urgent",
      "assignees": [],
      "dueDate": null,
      "dateUpdated": "1717000000000",
      "url": "https://app.clickup.com/t/task-id",
      "status_critico": true
    }
  ]
}
```

## Como Usar o Dashboard

1. Abra o frontend no navegador.
2. Veja os cards de resumo com total, criticas e concluidas.
3. Navegue pelas colunas `To Do`, `Doing` e `Done`.
4. Use o campo de busca para filtrar por nome da tarefa ou responsavel.
5. Clique em `Abrir no ClickUp` para abrir a tarefa original.

## Regra `status_critico`

Uma tarefa recebe `status_critico = true` quando:

1. `priority === "urgent"`; ou
2. `date_updated` (ClickUp) indica mais de 3 dias sem atualizacao.

Se `date_updated` vier ausente ou invalido, o calculo nao quebra e considera apenas as condicoes validas.

## Decisoes Tecnicas

- Integracao ClickUp isolada no backend para nao expor token.
- Frontend consome somente a API do backend do projeto.
- Payload reduzido para campos relevantes ao dashboard executivo.
- Classificacao visual de status no frontend para suportar valores customizados do ClickUp.

## Seguranca

- `CLICKUP_TOKEN` nunca vai para o frontend.
- `.env` e `.env.local` estao no `.gitignore`.
- Nao ha token real versionado no repositorio.
- Erros retornados pelo backend sao sanitizados, sem vazar credenciais.

## Limitacoes Conhecidas

- Sem autenticacao de usuario (escopo do teste tecnico).
- Sem cache ou retries avancados no backend.

## Deploy Publico

### Backend no Render

Configuracao sugerida:

- Root Directory: `server`
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Health Check Path: `/api/health`

Variaveis de ambiente no Render:

- `CLICKUP_TOKEN`: token de API do ClickUp.
- `CLICKUP_LIST_ID`: id da lista monitorada.
- `CLIENT_ORIGIN`: URL publica do frontend na Vercel, por exemplo `https://seu-app.vercel.app`.

O Render define `PORT` automaticamente. O servidor usa `process.env.PORT`.

### Frontend na Vercel

Configuracao sugerida:

- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`

Variavel de ambiente na Vercel:

- `VITE_API_BASE_URL`: URL publica do backend no Render, por exemplo `https://project-pulse-api.onrender.com`.

`VITE_API_BASE_URL` nao contem segredo. O token do ClickUp permanece somente no backend.

## Proximos Passos Possiveis

1. Adicionar testes unitarios para `status_critico` e classificacao de status do frontend.
2. Incluir observabilidade basica (logs estruturados e metricas simples).
3. Configurar pipeline de CI para build de backend e frontend.
