# Project Pulse

Project Pulse e um dashboard executivo full stack integrado ao ClickUp. Ele transforma tarefas operacionais em uma visao simples para lideranca: saude geral, gargalos, tarefas criticas e entregas concluidas.

## Demo Online

- Frontend: https://pulse-dize.vercel.app
- Backend health: https://pulse-tqpw.onrender.com/api/health
- Backend tasks: https://pulse-tqpw.onrender.com/api/tasks

Observacao: o endpoint de tarefas depende das variaveis de ambiente configuradas no backend e da lista ClickUp usada no deploy.

## Por Que Esse Projeto Existe

O objetivo do teste tecnico era integrar com a API real do ClickUp, processar tarefas no backend e apresentar indicadores para tomada de decisao. O Project Pulse ajuda uma lideranca a responder rapidamente:

- Quantas tarefas estao no fluxo?
- Quais tarefas exigem atencao imediata?
- Onde existem gargalos em andamento?
- O que ja foi concluido?

## Funcionalidades Entregues

- Integracao real com ClickUp em `GET /api/tasks`.
- Busca de tarefas abertas e fechadas com `include_closed=true`.
- Paginacao defensiva na leitura da API do ClickUp.
- Campo `status_critico` calculado no backend.
- Payload normalizado antes de chegar ao frontend.
- Dashboard executivo com cards de resumo.
- Colunas `To Do`, `Doing` e `Done`.
- Filtro por nome da tarefa ou responsavel.
- Destaque visual para tarefas criticas.
- Deploy publico em Render e Vercel.
- Observabilidade basica com logs JSON seguros.
- Testes unitarios para as regras principais.

## Regra `status_critico`

O backend adiciona `status_critico` antes de enviar as tarefas ao frontend.

Uma tarefa e critica quando:

1. `priority === "urgent"`; ou
2. `date_updated` indica mais de 3 dias sem atualizacao.

Se `date_updated` vier ausente ou invalido, o calculo nao quebra e considera apenas as condicoes validas.

## Stack

- TypeScript
- Node.js
- Express
- React
- Vite
- Vitest
- Render
- Vercel
- ClickUp API v2

## Arquitetura

O projeto usa um monorepo simples:

- `server/`: backend Express responsavel por autenticar no ClickUp, buscar tarefas, normalizar dados e calcular `status_critico`.
- `client/`: frontend React responsavel por exibir o dashboard executivo.
- `docs/`: workflow, roteiro de video e documentacao de apoio.

Fluxo:

```text
ClickUp API -> Backend Express -> Frontend React -> Usuario
```

O frontend nunca conversa diretamente com o ClickUp. O token fica somente no backend.

## Estrutura de Pastas

```text
.
|-- client/
|   |-- src/
|   |-- package.json
|   `-- vite.config.ts
|-- server/
|   |-- src/
|   |-- package.json
|   `-- tsconfig.json
|-- docs/
|   |-- VIDEO_SCRIPT.md
|   `-- ai-workflow/
|-- .env.example
|-- .gitignore
|-- package.json
`-- README.md
```

## Como Rodar Localmente

1. Instale as dependencias na raiz:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz com base em `.env.example`.

3. Inicie o backend:

```bash
npm run dev:server
```

4. Em outro terminal, inicie o frontend:

```bash
npm run dev:client
```

5. Acesse:

- Frontend: `http://127.0.0.1:5173`
- Backend health: `http://localhost:3333/api/health`
- Backend tasks: `http://localhost:3333/api/tasks`

## Variaveis de Ambiente

Exemplo:

```env
# Backend
CLICKUP_TOKEN=
CLICKUP_LIST_ID=
PORT=3333
CLIENT_ORIGIN=http://localhost:5173

# Frontend
VITE_API_BASE_URL=http://localhost:3333
```

Backend:

- `CLICKUP_TOKEN`: token de API do ClickUp. E segredo.
- `CLICKUP_LIST_ID`: id da lista ClickUp monitorada.
- `PORT`: porta local do backend. Padrao: `3333`.
- `CLIENT_ORIGIN`: origem permitida pelo CORS do backend.

Frontend:

- `VITE_API_BASE_URL`: URL base do backend. Nao e segredo.

Nunca commite `.env` ou `.env.local`.

## Como Configurar o ClickUp

1. Crie ou escolha um Workspace no ClickUp.
2. Crie um Space, Folder e List, ou use uma List existente.
3. Crie tarefas com status variados, como `pendente`, `em progresso` e `concluido`.
4. Configure prioridades, incluindo pelo menos uma tarefa `urgent` para testar criticidade.
5. Gere um Personal API Token no ClickUp.
6. Copie o id da List para `CLICKUP_LIST_ID`.

Em muitos links do ClickUp, o id da lista aparece depois de `/li/`.

## Endpoints

### `GET /`

Retorna um diagnostico simples da API.

### `GET /api/health`

Retorna status, nome do servico, uptime e timestamp.

### `GET /api/tasks`

Busca tarefas reais do ClickUp usando:

```text
GET https://api.clickup.com/api/v2/list/{CLICKUP_LIST_ID}/task?include_closed=true
```

Campos retornados ao frontend:

- `id`
- `name`
- `status`
- `priority`
- `assignees`
- `dueDate`
- `dateUpdated`
- `url`
- `status_critico`

O backend nao retorna o payload bruto completo do ClickUp.

## Testes

Rodar todos os testes:

```bash
npm run test
```

Rodar apenas backend:

```bash
npm run test:server
```

Rodar apenas frontend:

```bash
npm run test:client
```

Cobertura atual:

- Backend: regra `status_critico`.
- Frontend: classificacao de status em `To Do`, `Doing` e `Done`.

Os testes usam dados fake minimos e nao chamam a API real do ClickUp.

## Builds

Backend:

```bash
npm run build:server
```

Frontend:

```bash
npm run build:client
```

Todos os workspaces:

```bash
npm run build
```

## Observabilidade

O backend gera logs JSON por linha com:

- `level`
- `message`
- `timestamp`
- `context`

Cada request registra metodo, path, status HTTP e duracao em milissegundos.

O endpoint `GET /api/tasks` registra:

- total de tarefas;
- total de criticas;
- distribuicao por status;
- duracao da chamada ao ClickUp.

Por seguranca, os logs nao incluem:

- `CLICKUP_TOKEN`;
- header `Authorization`;
- body completo;
- payload bruto completo do ClickUp.

Em producao, os logs podem ser vistos no painel do Render.

## Deploy

### Backend no Render

Configuracao:

- Root Directory: `server`
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Health Check Path: `/api/health`

Variaveis no Render:

- `CLICKUP_TOKEN`
- `CLICKUP_LIST_ID`
- `CLIENT_ORIGIN`

O Render define `PORT` automaticamente. O servidor usa `process.env.PORT`.

### Frontend na Vercel

Configuracao:

- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`

Variavel na Vercel:

- `VITE_API_BASE_URL`: URL publica do backend Render.

Depois de obter a URL final da Vercel, atualize `CLIENT_ORIGIN` no Render com essa origem.

## Seguranca

- O token do ClickUp fica somente no backend.
- `.env` e `.env.local` estao ignorados pelo Git.
- O frontend usa apenas `VITE_API_BASE_URL`, que nao e segredo.
- Erros da API sao sanitizados.
- O payload entregue ao frontend e normalizado.
- CORS e configuravel por `CLIENT_ORIGIN`.
- Headers sensiveis e token nao sao logados.

## Decisoes Tecnicas

- Monorepo `server/` e `client/` para manter a entrega simples.
- Express foi usado pela simplicidade e clareza para o teste.
- Vite foi usado pela velocidade no frontend.
- Vitest cobre funcoes puras de maior risco.
- `status_critico` fica no backend para centralizar regra de negocio.
- O payload e normalizado para evitar acoplamento ao formato bruto do ClickUp.
- Nao ha banco nem autenticacao propria porque nao eram requisitos do teste.

## Limitacoes Conhecidas

- Sem autenticacao de usuarios.
- Sem banco de dados proprio.
- Sem refresh automatico em tempo real.
- Observabilidade basica, sem APM completo.
- Testes unitarios focados nas regras principais, sem E2E.
- Suporta uma lista ClickUp por configuracao de ambiente.

## Proximos Passos Possiveis

1. Adicionar refresh manual ou automatico controlado.
2. Melhorar filtros por status e prioridade.
3. Adicionar testes de integracao da API com mocks.
4. Adicionar monitoramento externo ou dashboard de metricas.
5. Melhorar responsividade/mobile se necessario.
6. Suportar multiplas listas ou projetos do ClickUp.

## Roteiro de Video

O roteiro de demonstracao esta em [docs/VIDEO_SCRIPT.md](docs/VIDEO_SCRIPT.md).
