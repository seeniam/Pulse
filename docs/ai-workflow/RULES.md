# Regras do Project Pulse

## Regras de Seguranca

- Nunca versionar token real do ClickUp.
- Manter `CLICKUP_TOKEN` somente em `.env` local.
- Incluir apenas `.env.example` com valores ficticios.
- Nunca chamar a API do ClickUp diretamente pelo frontend.
- Nunca enviar token para o browser em payloads, logs, erros ou variaveis publicas.
- Validar no README que o usuario precisa criar o proprio `.env`.
- Tratar erros do ClickUp sem expor headers, token ou detalhes sensiveis.

## Regras de Implementacao

- Manter a solucao simples e entregavel em 24h.
- Preferir TypeScript para backend e frontend.
- Usar backend Node.js com Express ou similar.
- Usar frontend React.
- Implementar integracao real com:
  `GET https://api.clickup.com/api/v2/list/{list_id}/task`
- O backend deve adicionar `status_critico` antes de enviar dados ao frontend.
- `status_critico` deve ser `true` quando:
  - a prioridade da tarefa for `urgent`; ou
  - a tarefa estiver sem atualizacoes ha mais de 3 dias.
- Preferir `date_updated` da tarefa como base para inatividade.
- O frontend deve exibir dashboard executivo, nao uma lista simples.
- O dashboard deve ter colunas `To Do`, `Doing` e `Done`.
- O dashboard deve destacar tarefas criticas visualmente.
- O dashboard deve permitir filtro por responsavel ou nome da tarefa.
- O resumo no topo deve mostrar pelo menos:
  - Total de Tarefas;
  - Tarefas Criticas;
  - Concluidas.

## Regras de IA

- Antes de codar, analisar a estrutura atual do repositorio.
- Antes de alterar arquivos, identificar stack, scripts, dependencias e ponto de entrada.
- Nao inventar integracao falsa com ClickUp.
- Nao criar mocks como substituto da integracao real na entrega principal.
- Nao fazer overengineering: evitar filas, bancos, autenticacao propria ou arquitetura pesada sem necessidade.
- Preservar alteracoes existentes do usuario.
- Manter alteracoes pequenas, revisaveis e alinhadas ao plano.
- Validar cada etapa antes de avancar para a proxima.
- Explicar riscos e tradeoffs de forma objetiva.

## Regras de Entrega

- Publicar em repositorio GitHub publico sem segredos.
- Incluir README com:
  - descricao do projeto;
  - stack;
  - requisitos;
  - variaveis de ambiente;
  - comandos para rodar;
  - como validar a integracao.
- Incluir `.gitignore` cobrindo `.env`, `node_modules`, builds e logs.
- Incluir `.env.example` sem valores reais.
- Garantir que o projeto rode localmente com comandos documentados.
- Gravar video de ate 3 minutos mostrando:
  - dashboard;
  - filtro;
  - tarefas criticas;
  - resumo executivo;
  - explicacao breve da arquitetura e seguranca do token.
