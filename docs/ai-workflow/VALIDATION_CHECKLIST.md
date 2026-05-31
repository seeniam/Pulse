# Checklist de Validação

## Checklist Técnico

- [ ] Projeto usa Node.js no backend.
- [ ] Backend usa Express ou similar.
- [ ] Frontend usa React.
- [ ] TypeScript é usado preferencialmente no backend e frontend.
- [ ] Existe `.gitignore` com `.env` e `node_modules`.
- [ ] Existe `.env.example` sem token real.
- [ ] `CLICKUP_TOKEN` é lido somente no backend.
- [ ] `CLICKUP_LIST_ID` é lido por variável de ambiente.
- [ ] Backend chama `GET https://api.clickup.com/api/v2/list/{list_id}/task`.
- [ ] Frontend não chama ClickUp diretamente.
- [ ] Backend adiciona `status_critico`.
- [ ] `status_critico` é `true` para prioridade `urgent`.
- [ ] `status_critico` é `true` para tarefa sem atualização há mais de 3 dias.
- [ ] Erros não expõem token, headers sensíveis ou dados secretos.
- [ ] Scripts de dev/build estão documentados.
- [ ] Projeto roda localmente seguindo README.

## Checklist Visual

- [ ] Primeira tela parece dashboard executivo.
- [ ] Resumo no topo mostra Total de Tarefas.
- [ ] Resumo no topo mostra Tarefas Críticas.
- [ ] Resumo no topo mostra Concluídas.
- [ ] Existem colunas `To Do`, `Doing` e `Done`.
- [ ] Tarefas críticas têm destaque visual evidente.
- [ ] Filtro por nome da tarefa funciona.
- [ ] Filtro por responsável funciona.
- [ ] Layout é legível em desktop.
- [ ] Layout continua usável em tela menor.
- [ ] Estados de loading, vazio e erro são compreensíveis.

## Checklist README

- [ ] README descreve o Project Pulse.
- [ ] README informa stack usada.
- [ ] README lista requisitos locais.
- [ ] README explica variáveis de ambiente.
- [ ] README mostra como criar `.env` a partir de `.env.example`.
- [ ] README mostra como instalar dependências.
- [ ] README mostra como rodar backend e frontend.
- [ ] README mostra como validar a integração ClickUp.
- [ ] README explica a regra de `status_critico`.
- [ ] README informa que o token nunca deve ser exposto no frontend.

## Checklist Vídeo

- [ ] Vídeo tem até 3 minutos.
- [ ] Mostra o dashboard funcionando.
- [ ] Mostra resumo executivo no topo.
- [ ] Mostra colunas `To Do`, `Doing` e `Done`.
- [ ] Mostra destaque de tarefas críticas.
- [ ] Mostra filtro por responsável ou nome.
- [ ] Explica rapidamente a arquitetura backend/frontend.
- [ ] Explica que o token fica no `.env` do backend.
- [ ] Explica que a integração com ClickUp é real.
- [ ] Mostra ou menciona o endpoint backend consumindo tarefas.
- [ ] Finaliza com repositório GitHub público.
