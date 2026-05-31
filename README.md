# Project Pulse

Project Pulse é um dashboard executivo full stack integrado ao ClickUp. Ele transforma tarefas operacionais em uma visão simples para a liderança: saúde geral, gargalos, tarefas críticas e entregas concluídas.

## Demo Online

- Frontend: https://pulse-dize.vercel.app
- Backend health: https://pulse-tqpw.onrender.com/api/health
- Backend tasks: https://pulse-tqpw.onrender.com/api/tasks

Observação: o endpoint de tarefas depende das variáveis de ambiente configuradas no backend e da lista ClickUp usada no deploy.

## Por Que Este Projeto Existe

O objetivo do teste técnico era integrar com a API real do ClickUp, processar tarefas no backend e apresentar indicadores para tomada de decisão. O Project Pulse ajuda uma liderança a responder rapidamente:

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
- Filtro por nome da tarefa ou responsável.
- Destaque visual para tarefas críticas.
- Deploy público em Render e Vercel.
- Observabilidade básica com logs JSON seguros.
- Testes unitários para as regras principais.

## Regra `status_critico`

O backend adiciona `status_critico` antes de enviar as tarefas ao frontend.

Uma tarefa é crítica quando:

1. `priority === "urgent"`; ou
2. `date_updated` indica mais de 3 dias sem atualização.

Se `date_updated` vier ausente ou inválido, o cálculo não quebra e considera apenas as condições válidas.

## Como Validar `status_critico` por Atraso

A regra de atraso pode ser conferida sem expor token e sem depender de payload bruto do ClickUp:

- Teste unitário: `npm run test:server` cobre tarefas com `dateUpdated` antigo, recente, ausente e inválido.
- API local: `GET http://localhost:3333/api/tasks` retorna `dateUpdated` e `status_critico` no payload normalizado.
- ClickUp real: uma tarefa sem atualização há mais de 3 dias deve aparecer como crítica mesmo sem prioridade `urgent`.

Se a lista atual não tiver uma tarefa real antiga, a validação visual pode ser feita criando ou mantendo uma tarefa sem atualização por mais de 3 dias. A regra continua coberta por teste unitário determinístico.

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

- `server/`: backend Express responsável por autenticar no ClickUp, buscar tarefas, normalizar dados e calcular `status_critico`.
- `client/`: frontend React responsável por exibir o dashboard executivo.
- `docs/`: workflow, roteiro de vídeo e documentação de apoio.

Fluxo:

```text
ClickUp API -> Backend Express -> Frontend React -> Usuário
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

1. Instale as dependências na raiz:

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

## Variáveis de Ambiente

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

- `CLICKUP_TOKEN`: token de API do ClickUp. É segredo.
- `CLICKUP_LIST_ID`: id da lista ClickUp monitorada.
- `PORT`: porta local do backend. Padrão: `3333`.
- `CLIENT_ORIGIN`: origem permitida pelo CORS do backend.

Frontend:

- `VITE_API_BASE_URL`: URL base do backend. Não é segredo.

Nunca commite `.env` ou `.env.local`.

## Como Configurar o ClickUp

1. Crie ou escolha um Workspace no ClickUp.
2. Crie um Space, Folder e List, ou use uma List existente.
3. Crie tarefas com status variados, como `pendente`, `em progresso` e `concluído`.
4. Configure prioridades, incluindo pelo menos uma tarefa `urgent` para testar criticidade.
5. Gere um Personal API Token no ClickUp.
6. Copie o id da List para `CLICKUP_LIST_ID`.

Em muitos links do ClickUp, o id da lista aparece depois de `/li/`.

## Endpoints

### `GET /`

Retorna um diagnóstico simples da API.

### `GET /api/health`

Retorna status, nome do serviço, uptime e timestamp.

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

O backend não retorna o payload bruto completo do ClickUp.

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
- Frontend: classificação de status em `To Do`, `Doing` e `Done`.

Os testes usam dados fake mínimos e não chamam a API real do ClickUp.

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

Cada request registra método, path, status HTTP e duração em milissegundos.

O endpoint `GET /api/tasks` registra:

- total de tarefas;
- total de críticas;
- distribuição por status;
- duração da chamada ao ClickUp.

Por segurança, os logs não incluem:

- `CLICKUP_TOKEN`;
- header `Authorization`;
- body completo;
- payload bruto completo do ClickUp.

Em produção, os logs podem ser vistos no painel do Render.

## Deploy

### Backend no Render

Configuração:

- Root Directory: `server`
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Health Check Path: `/api/health`

Variáveis no Render:

- `CLICKUP_TOKEN`
- `CLICKUP_LIST_ID`
- `CLIENT_ORIGIN`

O Render define `PORT` automaticamente. O servidor usa `process.env.PORT`.

### Frontend na Vercel

Configuração:

- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`

Variável na Vercel:

- `VITE_API_BASE_URL`: URL pública do backend Render.

Depois de obter a URL final da Vercel, atualize `CLIENT_ORIGIN` no Render com essa origem.

## Segurança

- O token do ClickUp fica somente no backend.
- `.env` e `.env.local` estão ignorados pelo Git.
- O frontend usa apenas `VITE_API_BASE_URL`, que não é segredo.
- Erros da API são sanitizados.
- O payload entregue ao frontend é normalizado.
- CORS é configurável por `CLIENT_ORIGIN`.
- Headers sensíveis e token não são logados.

## Decisões Técnicas

- Monorepo `server/` e `client/` para manter a entrega simples.
- Express foi usado pela simplicidade e clareza para o teste.
- Vite foi usado pela velocidade no frontend.
- Vitest cobre funções puras de maior risco.
- `status_critico` fica no backend para centralizar regra de negócio.
- O payload é normalizado para evitar acoplamento ao formato bruto do ClickUp.
- Não há banco nem autenticação própria porque não eram requisitos do teste.

## Limitações Conhecidas

- Sem autenticação de usuários.
- Sem banco de dados próprio.
- Sem refresh automático em tempo real.
- Observabilidade básica, sem APM completo.
- Testes unitários focados nas regras principais, sem E2E.
- Suporta uma lista ClickUp por configuração de ambiente.

## Próximos Passos Possíveis

1. Adicionar refresh manual ou automático controlado.
2. Melhorar filtros por status e prioridade.
3. Adicionar testes de integração da API com mocks.
4. Adicionar monitoramento externo ou dashboard de métricas.
5. Melhorar responsividade/mobile se necessário.
6. Suportar múltiplas listas ou projetos do ClickUp.

## Roteiro de Vídeo

O roteiro de demonstração está em [docs/VIDEO_SCRIPT.md](docs/VIDEO_SCRIPT.md).
