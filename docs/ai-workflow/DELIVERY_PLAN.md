# Plano de Entrega Incremental

## Diagnóstico Atual do Repositório

O repositório atual está vazio do ponto de vista de aplicação: foi encontrada apenas a pasta `.git`.

Não foram identificados ainda:

- `package.json`;
- scripts de desenvolvimento ou build;
- dependências;
- backend;
- frontend;
- ponto de entrada;
- README;
- arquivos de ambiente.

Isso indica que a implementação deve começar por uma fundação simples, sem migrações ou compatibilidade com código legado.

## Etapa 1 - Fundação do Projeto

Objetivo: criar uma estrutura mínima full stack com TypeScript.

Arquivos prováveis:

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
- Duplicar configurações desnecessárias.
- Escolher ferramentas que exigem setup longo.

Validações:

- Scripts instaláveis e claros.
- Estrutura compreensível para avaliador técnico.
- `.env` ignorado pelo git.

## Etapa 2 - Backend ClickUp

Objetivo: criar API backend que consulta ClickUp com token seguro.

Arquivos prováveis:

- `backend/src/index.ts`
- `backend/src/config/env.ts`
- `backend/src/services/clickup.ts`
- `backend/src/routes/tasks.ts`
- `backend/src/types/task.ts`

Riscos:

- Expor token em erro ou log.
- Assumir campos incorretos do payload ClickUp.
- Não tratar ausência de `CLICKUP_LIST_ID` ou `CLICKUP_TOKEN`.

Validações:

- Endpoint backend chama ClickUp real.
- Token vem de `.env`.
- Erro de configuração retorna mensagem segura.
- Frontend não conhece o token.

## Etapa 3 - Normalização e `status_critico`

Objetivo: transformar tarefas do ClickUp em modelo simples para o dashboard.

Arquivos prováveis:

- `backend/src/services/clickup.ts`
- `backend/src/mappers/taskMapper.ts`
- `backend/src/types/task.ts`

Riscos:

- Prioridade `urgent` vir como objeto, string ou valor ausente.
- Datas do ClickUp virem como timestamp em milissegundos em string.
- Regra de mais de 3 dias ficar sensível a timezone se implementada de forma confusa.

Validações:

- Tarefa com prioridade `urgent` fica crítica.
- Tarefa com `date_updated` maior que 3 dias fica crítica.
- Tarefa recente e não urgente não fica crítica.
- Payload final inclui `status_critico`.

## Etapa 4 - Frontend Dashboard

Objetivo: construir a experiência executiva em React.

Arquivos prováveis:

- `frontend/src/App.tsx`
- `frontend/src/api/tasks.ts`
- `frontend/src/components/SummaryCards.tsx`
- `frontend/src/components/KanbanColumn.tsx`
- `frontend/src/components/TaskCard.tsx`
- `frontend/src/styles.css`

Riscos:

- Virar lista simples em vez de dashboard.
- Layout quebrar em telas menores.
- Filtro não considerar responsáveis com nomes ausentes.

Validações:

- Resumo exibe Total, Críticas e Concluídas.
- Existem colunas `To Do`, `Doing`, `Done`.
- Tarefas críticas têm destaque visual.
- Filtro por nome e responsável funciona.
- Estados de loading e erro estão claros.

## Etapa 5 - README e Entrega

Objetivo: preparar repositório público e vídeo.

Arquivos prováveis:

- `README.md`
- `.env.example`
- `docs/ai-workflow/VALIDATION_CHECKLIST.md`

Riscos:

- README esquecer variáveis obrigatórias.
- Vídeo passar de 3 minutos.
- Subir segredo por acidente.

Validações:

- `git status` revisado antes de publicar.
- `.env` não aparece em arquivos rastreados.
- README permite rodar projeto do zero.
- Roteiro do vídeo cobre critérios obrigatórios.

## Ordem Recomendada

1. Criar fundação full stack.
2. Implementar backend com ClickUp.
3. Implementar regra `status_critico`.
4. Implementar frontend executivo.
5. Validar localmente com `.env` real.
6. Revisar README, checklist e vídeo.
