# ForgeFlow Workflow - Project Pulse

## Objetivo

Orientar a implementacao incremental do teste tecnico Project Pulse, mantendo o escopo simples, auditavel e entregavel em ate 24h.

O workflow existe para garantir que:

- a integracao com ClickUp seja real e fique isolada no backend;
- o token nunca seja exposto no frontend ou em arquivos versionados;
- o backend adicione `status_critico` de forma deterministica;
- o frontend entregue um dashboard executivo, nao apenas uma lista de tarefas;
- cada etapa tenha validacao clara antes de avancar.

## Etapas

1. Diagnostico do repositorio
   - Identificar stack existente, scripts, dependencias e pontos de entrada.
   - Confirmar se o projeto esta vazio, parcial ou ja inicializado.
   - Registrar riscos antes de codar.

2. Fundacao do projeto
   - Criar estrutura simples full stack com TypeScript.
   - Separar `backend` e `frontend`, ou usar monorepo leve se isso acelerar a entrega.
   - Configurar scripts minimos de desenvolvimento, build e validacao.

3. Backend e integracao ClickUp
   - Ler `CLICKUP_TOKEN` e `CLICKUP_LIST_ID` via `.env`.
   - Criar endpoint backend que consulta:
     `GET https://api.clickup.com/api/v2/list/{list_id}/task`
   - Normalizar os campos necessarios para o dashboard.
   - Adicionar `status_critico`.

4. Regras de criticidade
   - `status_critico = true` quando a prioridade da tarefa for `urgent`.
   - `status_critico = true` quando a tarefa estiver sem atualizacoes ha mais de 3 dias.
   - Usar dados reais do ClickUp, preferindo `date_updated` para a regra de inatividade.

5. Frontend executivo
   - Construir dashboard com resumo no topo.
   - Exibir colunas `To Do`, `Doing` e `Done`.
   - Destacar visualmente tarefas criticas.
   - Adicionar filtro por responsavel ou nome da tarefa.

6. Validacao e polimento
   - Validar fluxo com variaveis de ambiente reais localmente.
   - Conferir que token nao aparece no bundle, logs ou README.
   - Revisar responsividade, estados de loading/erro e clareza visual.

7. Entrega
   - Atualizar README com setup, variaveis de ambiente e comandos.
   - Publicar GitHub publico sem segredos.
   - Gravar video de ate 3 minutos mostrando setup, dashboard e criterios tecnicos.

## Agentes

- ForgeFlow Orchestrator
  - Mantem o plano incremental, controla escopo e quality gates.

- Repo Analyst
  - Analisa estrutura, stack, scripts, dependencias e pontos de entrada antes de alteracoes.

- Backend Builder
  - Implementa Express ou similar, integracao ClickUp, normalizacao e regra `status_critico`.

- Frontend Builder
  - Implementa React, layout executivo, filtros, colunas e destaques visuais.

- QA Reviewer
  - Valida criterios tecnicos, seguranca de token, build, UX e checklist de entrega.

## Skills

- Analise de repositorio Node/React/TypeScript.
- Implementacao de APIs REST com Express ou similar.
- Consumo seguro de API externa via backend.
- Modelagem simples de dados para dashboard.
- UI React orientada a dashboard executivo.
- Validacao de variaveis de ambiente e protecao de segredos.
- Revisao final para entrega tecnica e video curto.

## Quality Gates

1. Gate de diagnostico
   - Estrutura atual documentada.
   - Stack e scripts identificados ou ausencia deles registrada.
   - Nenhum codigo de aplicacao alterado antes do plano.

2. Gate de seguranca
   - `.env` fora do versionamento.
   - `.env.example` sem token real.
   - Token usado somente no backend.
   - Frontend sem chamada direta para ClickUp.

3. Gate de backend
   - Endpoint backend consulta ClickUp real.
   - Tratamento de erro basico implementado.
   - `status_critico` calculado no backend.
   - Dados enviados ao frontend sem segredos.

4. Gate de frontend
   - Dashboard tem resumo executivo.
   - Tarefas organizadas em `To Do`, `Doing`, `Done`.
   - Criticas tem destaque visual claro.
   - Filtro funciona por responsavel ou nome.

5. Gate de entrega
   - Build ou validacao local executada.
   - README explica setup e variaveis.
   - Checklist final revisado.
   - Video planejado com roteiro de ate 3 minutos.
