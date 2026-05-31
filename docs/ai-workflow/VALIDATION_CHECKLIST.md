# Checklist de Validacao

## Checklist Tecnico

- [ ] Projeto usa Node.js no backend.
- [ ] Backend usa Express ou similar.
- [ ] Frontend usa React.
- [ ] TypeScript e usado preferencialmente no backend e frontend.
- [ ] Existe `.gitignore` com `.env` e `node_modules`.
- [ ] Existe `.env.example` sem token real.
- [ ] `CLICKUP_TOKEN` e lido somente no backend.
- [ ] `CLICKUP_LIST_ID` e lido por variavel de ambiente.
- [ ] Backend chama `GET https://api.clickup.com/api/v2/list/{list_id}/task`.
- [ ] Frontend nao chama ClickUp diretamente.
- [ ] Backend adiciona `status_critico`.
- [ ] `status_critico` e `true` para prioridade `urgent`.
- [ ] `status_critico` e `true` para tarefa sem atualizacao ha mais de 3 dias.
- [ ] Erros nao expõem token, headers sensiveis ou dados secretos.
- [ ] Scripts de dev/build estao documentados.
- [ ] Projeto roda localmente seguindo README.

## Checklist Visual

- [ ] Primeira tela parece dashboard executivo.
- [ ] Resumo no topo mostra Total de Tarefas.
- [ ] Resumo no topo mostra Tarefas Criticas.
- [ ] Resumo no topo mostra Concluidas.
- [ ] Existem colunas `To Do`, `Doing` e `Done`.
- [ ] Tarefas criticas tem destaque visual evidente.
- [ ] Filtro por nome da tarefa funciona.
- [ ] Filtro por responsavel funciona.
- [ ] Layout e legivel em desktop.
- [ ] Layout continua usavel em tela menor.
- [ ] Estados de loading, vazio e erro sao compreensiveis.

## Checklist README

- [ ] README descreve o Project Pulse.
- [ ] README informa stack usada.
- [ ] README lista requisitos locais.
- [ ] README explica variaveis de ambiente.
- [ ] README mostra como criar `.env` a partir de `.env.example`.
- [ ] README mostra como instalar dependencias.
- [ ] README mostra como rodar backend e frontend.
- [ ] README mostra como validar a integracao ClickUp.
- [ ] README explica a regra de `status_critico`.
- [ ] README informa que o token nunca deve ser exposto no frontend.

## Checklist Video

- [ ] Video tem ate 3 minutos.
- [ ] Mostra o dashboard funcionando.
- [ ] Mostra resumo executivo no topo.
- [ ] Mostra colunas `To Do`, `Doing` e `Done`.
- [ ] Mostra destaque de tarefas criticas.
- [ ] Mostra filtro por responsavel ou nome.
- [ ] Explica rapidamente a arquitetura backend/frontend.
- [ ] Explica que o token fica no `.env` do backend.
- [ ] Explica que a integracao com ClickUp e real.
- [ ] Mostra ou menciona o endpoint backend consumindo tarefas.
- [ ] Finaliza com repositorio GitHub publico.
