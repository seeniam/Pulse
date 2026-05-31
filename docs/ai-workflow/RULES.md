# Regras do Project Pulse

## Regras de Segurança

- Nunca versionar token real do ClickUp.
- Manter `CLICKUP_TOKEN` somente em `.env` local.
- Incluir apenas `.env.example` com valores fictícios.
- Nunca chamar a API do ClickUp diretamente pelo frontend.
- Nunca enviar token para o browser em payloads, logs, erros ou variáveis públicas.
- Validar no README que o usuário precisa criar o próprio `.env`.
- Tratar erros do ClickUp sem expor headers, token ou detalhes sensíveis.

## Regras de Implementação

- Manter a solução simples e entregável em 24h.
- Preferir TypeScript para backend e frontend.
- Usar backend Node.js com Express ou similar.
- Usar frontend React.
- Implementar integração real com:
  `GET https://api.clickup.com/api/v2/list/{list_id}/task`
- O backend deve adicionar `status_critico` antes de enviar dados ao frontend.
- `status_critico` deve ser `true` quando:
  - a prioridade da tarefa for `urgent`; ou
  - a tarefa estiver sem atualizações há mais de 3 dias.
- Preferir `date_updated` da tarefa como base para inatividade.
- O frontend deve exibir dashboard executivo, não uma lista simples.
- O dashboard deve ter colunas `To Do`, `Doing` e `Done`.
- O dashboard deve destacar tarefas críticas visualmente.
- O dashboard deve permitir filtro por responsável ou nome da tarefa.
- O resumo no topo deve mostrar pelo menos:
  - Total de Tarefas;
  - Tarefas Críticas;
  - Concluídas.

## Regras de IA

- Antes de codar, analisar a estrutura atual do repositório.
- Antes de alterar arquivos, identificar stack, scripts, dependências e ponto de entrada.
- Não inventar integração falsa com ClickUp.
- Não criar mocks como substituto da integração real na entrega principal.
- Não fazer overengineering: evitar filas, bancos, autenticação própria ou arquitetura pesada sem necessidade.
- Preservar alterações existentes do usuário.
- Manter alterações pequenas, revisáveis e alinhadas ao plano.
- Validar cada etapa antes de avançar para a próxima.
- Explicar riscos e tradeoffs de forma objetiva.

## Regras de Entrega

- Publicar em repositório GitHub público sem segredos.
- Incluir README com:
  - descrição do projeto;
  - stack;
  - requisitos;
  - variáveis de ambiente;
  - comandos para rodar;
  - como validar a integração.
- Incluir `.gitignore` cobrindo `.env`, `node_modules`, builds e logs.
- Incluir `.env.example` sem valores reais.
- Garantir que o projeto rode localmente com comandos documentados.
- Gravar vídeo de até 3 minutos mostrando:
  - dashboard;
  - filtro;
  - tarefas críticas;
  - resumo executivo;
  - explicação breve da arquitetura e segurança do token.
