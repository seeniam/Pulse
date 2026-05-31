# ForgeFlow Workflow - Project Pulse

## Objetivo

Orientar a implementação incremental do teste técnico Project Pulse, mantendo o escopo simples, auditável e entregável em até 24h.

O workflow existe para garantir que:

- a integração com ClickUp seja real e fique isolada no backend;
- o token nunca seja exposto no frontend ou em arquivos versionados;
- o backend adicione `status_critico` de forma determinística;
- o frontend entregue um dashboard executivo, não apenas uma lista de tarefas;
- cada etapa tenha validação clara antes de avançar.

## Etapas

1. Diagnóstico do repositório
   - Identificar stack existente, scripts, dependências e pontos de entrada.
   - Confirmar se o projeto está vazio, parcial ou já inicializado.
   - Registrar riscos antes de codar.

2. Fundação do projeto
   - Criar estrutura simples full stack com TypeScript.
   - Separar `backend` e `frontend`, ou usar monorepo leve se isso acelerar a entrega.
   - Configurar scripts mínimos de desenvolvimento, build e validação.

3. Backend e integração ClickUp
   - Ler `CLICKUP_TOKEN` e `CLICKUP_LIST_ID` via `.env`.
   - Criar endpoint backend que consulta:
     `GET https://api.clickup.com/api/v2/list/{list_id}/task`
   - Normalizar os campos necessários para o dashboard.
   - Adicionar `status_critico`.

4. Regras de criticidade
   - `status_critico = true` quando a prioridade da tarefa for `urgent`.
   - `status_critico = true` quando a tarefa estiver sem atualizações há mais de 3 dias.
   - Usar dados reais do ClickUp, preferindo `date_updated` para a regra de inatividade.

5. Frontend executivo
   - Construir dashboard com resumo no topo.
   - Exibir colunas `To Do`, `Doing` e `Done`.
   - Destacar visualmente tarefas críticas.
   - Adicionar filtro por responsável ou nome da tarefa.

6. Validação e polimento
   - Validar fluxo com variáveis de ambiente reais localmente.
   - Conferir que token não aparece no bundle, logs ou README.
   - Revisar responsividade, estados de loading/erro e clareza visual.

7. Entrega
   - Atualizar README com setup, variáveis de ambiente e comandos.
   - Publicar GitHub público sem segredos.
   - Gravar vídeo de até 3 minutos mostrando setup, dashboard e critérios técnicos.

## Agentes

- ForgeFlow Orchestrator
  - Mantém o plano incremental, controla escopo e quality gates.

- Repo Analyst
  - Analisa estrutura, stack, scripts, dependências e pontos de entrada antes de alterações.

- Backend Builder
  - Implementa Express ou similar, integração ClickUp, normalização e regra `status_critico`.

- Frontend Builder
  - Implementa React, layout executivo, filtros, colunas e destaques visuais.

- QA Reviewer
  - Valida critérios técnicos, segurança de token, build, UX e checklist de entrega.

## Skills

- Análise de repositório Node/React/TypeScript.
- Implementação de APIs REST com Express ou similar.
- Consumo seguro de API externa via backend.
- Modelagem simples de dados para dashboard.
- UI React orientada a dashboard executivo.
- Validação de variáveis de ambiente e proteção de segredos.
- Revisão final para entrega técnica e vídeo curto.

## Quality Gates

1. Gate de diagnóstico
   - Estrutura atual documentada.
   - Stack e scripts identificados ou ausência deles registrada.
   - Nenhum código de aplicação alterado antes do plano.

2. Gate de segurança
   - `.env` fora do versionamento.
   - `.env.example` sem token real.
   - Token usado somente no backend.
   - Frontend sem chamada direta para ClickUp.

3. Gate de backend
   - Endpoint backend consulta ClickUp real.
   - Tratamento de erro básico implementado.
   - `status_critico` calculado no backend.
   - Dados enviados ao frontend sem segredos.

4. Gate de frontend
   - Dashboard tem resumo executivo.
   - Tarefas organizadas em `To Do`, `Doing`, `Done`.
   - Críticas têm destaque visual claro.
   - Filtro funciona por responsável ou nome.

5. Gate de entrega
   - Build ou validação local executada.
   - README explica setup e variáveis.
   - Checklist final revisado.
   - Vídeo planejado com roteiro de até 3 minutos.
