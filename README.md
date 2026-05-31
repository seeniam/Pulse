# Project Pulse

Project Pulse e a fundacao de um dashboard executivo full stack para integrar com a API do ClickUp, processar tarefas e apresentar indicadores para lideranca.

Nesta etapa, o projeto entrega a base profissional do monorepo, com backend em Node.js + Express + TypeScript e frontend em React + Vite + TypeScript, sem ainda implementar a integracao real com ClickUp.

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

1. Crie um arquivo `.env` na raiz do projeto.
2. Use `.env.example` como referencia:

```env
CLICKUP_TOKEN=
CLICKUP_LIST_ID=
PORT=3333
```

O token do ClickUp deve permanecer apenas no backend. Nenhuma variavel sensivel deve ser exposta no frontend.

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

Resposta esperada:

```json
{
  "status": "ok",
  "service": "project-pulse-api"
}
```

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

## Escopo desta etapa

- Estrutura `server/` e `client/`
- Endpoint backend de health check
- Tela inicial do frontend
- Configuracao segura de `.env`

## Proximas etapas

- Integrar backend com a API real do ClickUp
- Adicionar calculo de `status_critico`
- Construir o dashboard executivo com filtros, resumo e colunas de status

