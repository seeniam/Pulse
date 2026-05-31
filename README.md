# Project Pulse

Project Pulse e um dashboard executivo full stack para integrar com a API do ClickUp, processar tarefas e apresentar indicadores para lideranca.

O projeto usa backend em Node.js + Express + TypeScript e frontend em React + Vite + TypeScript. A integracao com ClickUp acontece somente no backend para manter o token fora do navegador.

## Estrutura

```text
.
|-- client/   # frontend React + Vite
|-- server/   # backend Node.js + Express
|-- docs/     # workflow e planejamento
|-- .env.example
|-- .gitignore
`-- README.md
```

## Requisitos

- Node.js 20+ recomendado
- npm 10+ recomendado

## Configuracao de ambiente

1. Crie um arquivo `.env` ou `.env.local` na raiz do projeto.
2. Use `.env.example` como referencia:

```env
CLICKUP_TOKEN=
CLICKUP_LIST_ID=
PORT=3333
```

O token do ClickUp deve permanecer apenas no backend. Nenhuma variavel sensivel deve ser exposta no frontend. O arquivo `.env.local` tambem e ignorado pelo Git e pode ser usado para credenciais locais.

- `CLICKUP_TOKEN`: token pessoal ou token de app autorizado no ClickUp.
- `CLICKUP_LIST_ID`: id da lista do ClickUp usada como origem das tarefas.
- `PORT`: porta local do backend. O padrao do projeto e `3333`.

Para encontrar o `CLICKUP_LIST_ID`, abra a lista no ClickUp e copie o id da URL da lista. Em muitas URLs ele aparece depois de `/li/`.

## Instalacao

Na raiz do projeto:

```bash
npm install
```

Isso instala as dependencias dos workspaces `server` e `client`.

## Executando o backend

```bash
npm run dev:server
```

API esperada:

- `GET http://localhost:3333/api/health`
- `GET http://localhost:3333/api/tasks`

Resposta esperada:

```json
{
  "status": "ok",
  "service": "project-pulse-api"
}
```

O endpoint `/api/tasks` faz uma chamada real para:

```text
GET https://api.clickup.com/api/v2/list/{CLICKUP_LIST_ID}/task
```

Ele retorna tarefas normalizadas com estes campos:

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

`status_critico` sera `true` quando a prioridade for `urgent` ou quando a tarefa estiver sem atualizacoes ha mais de 3 dias.

## Executando o frontend

```bash
npm run dev:client
```

O Vite exibira a URL local no terminal, normalmente `http://localhost:5173`.

## Builds

Backend:

```bash
npm run build:server
```

Frontend:

```bash
npm run build:client
```

Build de todos os workspaces:

```bash
npm run build
```

## Escopo atual

- Estrutura `server/` e `client/`
- Endpoint backend de health check
- Endpoint backend de tarefas integrado ao ClickUp
- Normalizacao de tarefas e calculo de `status_critico`
- Tela inicial do frontend
- Configuracao segura de `.env`

## Proximas etapas

- Construir o dashboard executivo com filtros, resumo e colunas de status
