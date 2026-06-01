# Project Pulse

Project Pulse é um dashboard executivo full stack integrado ao ClickUp. Ele transforma tarefas operacionais em uma visão clara para liderança: saúde geral, gargalos, tarefas críticas e entregas concluídas.

## Demo Online

- Frontend: https://pulse-dize.vercel.app
- Backend health: https://pulse-tqpw.onrender.com/api/health
- Backend tasks: https://pulse-tqpw.onrender.com/api/tasks
- Vídeo demonstrativo: https://www.loom.com/share/08f6c233087547b8bfcc805d66cbc049

Observação: o endpoint de tarefas depende das variáveis de ambiente do backend e da lista ClickUp configurada no deploy.

## Por Que Este Projeto Existe

O objetivo do teste técnico era integrar com a API real do ClickUp, processar tarefas no backend e apresentar indicadores para tomada de decisão. O Project Pulse ajuda a responder rapidamente:

- Quantas tarefas estão no fluxo?
- Quais tarefas exigem atenção imediata?
- Onde existem gargalos em andamento?
- O que já foi concluído?

## Funcionalidades Entregues

- Integração real com ClickUp em `GET /api/tasks`.
- Busca de tarefas abertas e fechadas com `include_closed=true`.
- Paginação defensiva na leitura da API do ClickUp.
- Campo `status_critico` calculado no backend.
- Payload normalizado antes de chegar ao frontend.
- Dashboard executivo com cards de resumo.
- Colunas `To Do`, `Doing` e `Done`.
- Busca textual por nome da tarefa ou responsável.
- Filtros rápidos executivos (críticas, sem responsável, em andamento e concluídas).
- Ordenação inteligente nas colunas, com tarefas críticas primeiro.
- Skeleton de carregamento para resumo, filtros e colunas.
- Microinterações leves com foco em acessibilidade.
- Insight executivo calculado a partir das tarefas filtradas.
- Atualização manual dos dados sem recarregar a página.
- Indicador de última sincronização.
- Suporte a tema claro e escuro com preferência persistida no navegador.
- Deploy público em Render e Vercel.
- Observabilidade básica com logs JSON seguros.
- Testes unitários para regras principais.

## Regra `status_critico`

O backend adiciona `status_critico` antes de enviar as tarefas ao frontend.

Uma tarefa é crítica quando:

1. `priority === "urgent"`; ou
2. `date_updated` indica mais de 3 dias sem atualização.

Se `date_updated` vier ausente ou inválido, o cálculo não quebra e considera apenas condições válidas.

## Como Validar `status_critico` por Atraso

- Teste unitário: `npm run test:server` cobre tarefas com `dateUpdated` antigo, recente, ausente e inválido.
- API local: `GET http://localhost:3333/api/tasks` retorna `dateUpdated` e `status_critico` no payload normalizado.
- ClickUp real: uma tarefa sem atualização há mais de 3 dias aparece como crítica mesmo sem prioridade `urgent`.

Se a lista atual não tiver tarefa antiga, a validação visual pode ser feita criando ou mantendo uma tarefa sem atualização por mais de 3 dias.

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

- `server/`: autentica no ClickUp, busca tarefas, normaliza dados e calcula `status_critico`.
- `client/`: exibe o dashboard executivo e consome apenas o backend.
- `docs/ai-workflow/`: documentação de workflow técnico.

Fluxo:

```text
ClickUp API -> Backend Express -> Frontend React -> Usuário
```

O frontend nunca chama o ClickUp diretamente.

## Estrutura de Pastas

```text
.
|-- client/
|   |-- src/
|   `-- package.json
|-- server/
|   |-- src/
|   `-- package.json
|-- docs/
|   `-- ai-workflow/
|-- .env.example
|-- .gitignore
|-- package.json
`-- README.md
```

## Como Rodar Localmente

1. Instale dependências na raiz:

```bash
npm install
```

2. Crie o arquivo `.env` na raiz com base em `.env.example`.

3. Terminal 1 — Backend local:

```bash
npm run dev:server
```

O backend roda em `http://localhost:3333` e expõe:

- `http://localhost:3333/`
- `http://localhost:3333/api/health`
- `http://localhost:3333/api/tasks`

4. Terminal 2 — Frontend local:

```bash
npm run dev:client
```

O frontend roda em `http://127.0.0.1:5173` (ou `http://localhost:5173`) e consome o backend local.

## Variáveis de Ambiente

### Backend (arquivo `.env` na raiz)

- `CLICKUP_TOKEN`: token da API do ClickUp (segredo).
- `CLICKUP_LIST_ID`: id da lista ClickUp monitorada.
- `PORT`: porta local do backend (padrão `3333`).
- `CLIENT_ORIGIN`: origem permitida pelo CORS do backend.

### Frontend

- `VITE_API_BASE_URL`: URL base do backend (não é segredo).

No código do frontend (`client/src/api/tasksApi.ts`), existe fallback para `http://localhost:3333` quando `VITE_API_BASE_URL` não está definido.

Em desenvolvimento local:

- O dashboard funciona sem `VITE_API_BASE_URL` por causa do fallback.
- Se quiser definir explicitamente, use `VITE_API_BASE_URL=http://localhost:3333`.

Em produção:

- Na Vercel, `VITE_API_BASE_URL` deve apontar para `https://pulse-tqpw.onrender.com`.
- No Render, `CLIENT_ORIGIN` deve apontar para `https://pulse-dize.vercel.app`.
- No Render, não defina `PORT` manualmente (a plataforma define automaticamente).

## Como Configurar o ClickUp

1. Crie ou escolha um Workspace no ClickUp.
2. Crie um Space, Folder e List, ou use uma List existente.
3. Crie tarefas com status variados (`pendente`, `em progresso`, `concluído`).
4. Configure prioridades (incluindo `urgent` para testar criticidade).
5. Gere um Personal API Token no ClickUp.
6. Copie o id da List para `CLICKUP_LIST_ID`.

Em muitos links do ClickUp, o id da lista aparece depois de `/li/`.

## Endpoints

### `GET /`

Retorna um diagnóstico simples da API.

### `GET /api/health`

Retorna status, nome do serviço, uptime e timestamp.

### `GET /api/tasks`

Consulta tarefas reais no ClickUp:

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

O backend não retorna payload bruto completo do ClickUp.

## Testes

```bash
npm run test
```

Executar apenas backend:

```bash
npm run test:server
```

Executar apenas frontend:

```bash
npm run test:client
```

Cobertura atual:

- Backend: regra `status_critico`.
- Frontend: classificação de status em `To Do`, `Doing` e `Done`.

## Builds

```bash
npm run build:server
npm run build:client
```

Ou tudo junto:

```bash
npm run build
```

## Observabilidade

O backend gera logs JSON por linha com:

- `level`
- `message`
- `timestamp`
- `context`

Cada request registra método, path, status HTTP e duração.

No `GET /api/tasks`, o log inclui total de tarefas, total de críticas, distribuição por status e duração da chamada ao ClickUp.

Os logs não incluem:

- `CLICKUP_TOKEN`
- header `Authorization`
- body completo
- payload bruto completo do ClickUp

## Deploy

### Backend no Render

- Root Directory: `server`
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Health Check Path: `/api/health`

Variáveis no Render:

- `CLICKUP_TOKEN`
- `CLICKUP_LIST_ID`
- `CLIENT_ORIGIN`

### Frontend na Vercel

- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`

Variável na Vercel:

- `VITE_API_BASE_URL=https://pulse-tqpw.onrender.com`

## Segurança

- O token do ClickUp fica somente no backend.
- `.env` e `.env.local` estão ignorados pelo Git.
- `VITE_API_BASE_URL` não é segredo.
- Erros da API são sanitizados.
- CORS é configurável por `CLIENT_ORIGIN`.

## Decisões Técnicas

- Monorepo `server/` e `client/` para simplificar a entrega.
- `status_critico` no backend para centralizar regra de negócio.
- Payload normalizado para evitar acoplamento ao formato bruto do ClickUp.
- Sem banco e sem autenticação própria por não serem requisitos do teste.

## Limitações Conhecidas

- Sem autenticação de usuários.
- Sem banco de dados próprio.
- Sem atualização automática em tempo real.
- Observabilidade básica (sem APM completo).
- Testes unitários focados nas regras principais (sem E2E).
- Suporta uma lista ClickUp por ambiente.

## Próximos Passos Possíveis

1. Adicionar atualização automática controlada, se fizer sentido.
2. Adicionar testes de integração da API com mocks.
3. Melhorar responsividade em telas menores.
4. Suportar múltiplas listas ou projetos do ClickUp.
5. Adicionar monitoramento externo.
