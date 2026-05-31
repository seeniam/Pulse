# Plano de Entrega Incremental

## Diagnostico Atual do Repositorio

O repositorio atual esta vazio do ponto de vista de aplicacao: foi encontrada apenas a pasta `.git`.

Nao foram identificados ainda:

- `package.json`;
- scripts de desenvolvimento ou build;
- dependencias;
- backend;
- frontend;
- ponto de entrada;
- README;
- arquivos de ambiente.

Isso indica que a implementacao deve comecar por uma fundacao simples, sem migracoes ou compatibilidade com codigo legado.

## Etapa 1 - Fundacao do Projeto

Objetivo: criar uma estrutura minima full stack com TypeScript.

Arquivos provaveis:

- `package.json`
- `backend/package.json`
- `backend/tsconfig.json`
- `backend/src/index.ts`
- `frontend/package.json`
- `frontend/tsconfig.json`
- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `.gitignore`
- `.env.example`
- `README.md`

Riscos:

- Criar estrutura pesada demais para o prazo.
- Duplicar configuracoes desnecessarias.
- Escolher ferramentas que exigem setup longo.

Validacoes:

- Scripts instalaveis e claros.
- Estrutura compreensivel para avaliador tecnico.
- `.env` ignorado pelo git.

## Etapa 2 - Backend ClickUp

Objetivo: criar API backend que consulta ClickUp com token seguro.

Arquivos provaveis:

- `backend/src/index.ts`
- `backend/src/config/env.ts`
- `backend/src/services/clickup.ts`
- `backend/src/routes/tasks.ts`
- `backend/src/types/task.ts`

Riscos:

- Expor token em erro ou log.
- Assumir campos incorretos do payload ClickUp.
- Nao tratar ausencia de `CLICKUP_LIST_ID` ou `CLICKUP_TOKEN`.

Validacoes:

- Endpoint backend chama ClickUp real.
- Token vem de `.env`.
- Erro de configuracao retorna mensagem segura.
- Frontend nao conhece o token.

## Etapa 3 - Normalizacao e `status_critico`

Objetivo: transformar tarefas do ClickUp em modelo simples para o dashboard.

Arquivos provaveis:

- `backend/src/services/clickup.ts`
- `backend/src/mappers/taskMapper.ts`
- `backend/src/types/task.ts`

Riscos:

- Prioridade `urgent` vir como objeto, string ou valor ausente.
- Datas do ClickUp virem como timestamp em milissegundos em string.
- Regra de mais de 3 dias ficar sensivel a timezone se implementada de forma confusa.

Validacoes:

- Tarefa com prioridade `urgent` fica critica.
- Tarefa com `date_updated` maior que 3 dias fica critica.
- Tarefa recente e nao urgente nao fica critica.
- Payload final inclui `status_critico`.

## Etapa 4 - Frontend Dashboard

Objetivo: construir a experiencia executiva em React.

Arquivos provaveis:

- `frontend/src/App.tsx`
- `frontend/src/api/tasks.ts`
- `frontend/src/components/SummaryCards.tsx`
- `frontend/src/components/KanbanColumn.tsx`
- `frontend/src/components/TaskCard.tsx`
- `frontend/src/styles.css`

Riscos:

- Virar lista simples em vez de dashboard.
- Layout quebrar em telas menores.
- Filtro nao considerar responsaveis com nomes ausentes.

Validacoes:

- Resumo exibe Total, Criticas e Concluidas.
- Existem colunas `To Do`, `Doing`, `Done`.
- Tarefas criticas tem destaque visual.
- Filtro por nome e responsavel funciona.
- Estados de loading e erro estao claros.

## Etapa 5 - README e Entrega

Objetivo: preparar repositorio publico e video.

Arquivos provaveis:

- `README.md`
- `.env.example`
- `docs/ai-workflow/VALIDATION_CHECKLIST.md`

Riscos:

- README esquecer variaveis obrigatorias.
- Video passar de 3 minutos.
- Subir segredo por acidente.

Validacoes:

- `git status` revisado antes de publicar.
- `.env` nao aparece em arquivos rastreados.
- README permite rodar projeto do zero.
- Roteiro do video cobre criterios obrigatorios.

## Ordem Recomendada

1. Criar fundacao full stack.
2. Implementar backend com ClickUp.
3. Implementar regra `status_critico`.
4. Implementar frontend executivo.
5. Validar localmente com `.env` real.
6. Revisar README, checklist e video.
