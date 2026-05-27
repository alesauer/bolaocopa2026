# Regras Operacionais — Projeto Bolão Copa 2026

# Objetivo

Este documento define as regras operacionais, diretrizes de desenvolvimento e padrões de interação para o projeto Bolão Copa 2026.

Todas as implementações, sugestões e decisões técnicas devem seguir rigorosamente as regras descritas neste documento.

---

# Regras Gerais de Interação

## RO01 — Confirmação Antes de Implementar

Após qualquer interação, sugestão técnica ou resposta envolvendo implementação:

- sempre perguntar ao usuário se deseja que a funcionalidade seja implementada
- nenhuma implementação deve ocorrer automaticamente sem confirmação explícita

---

## RO02 — Confirmação de Sugestões

Sempre que existir:

- sugestão de melhoria
- alteração arquitetural
- nova funcionalidade
- refatoração
- otimização
- mudança de stack
- biblioteca adicional

é obrigatório confirmar previamente com o usuário antes de prosseguir.

---

## RO03 — Seguir Estritamente os Arquivos .md

Todas as implementações devem seguir rigorosamente:

- especificações técnicas
- requisitos funcionais
- requisitos não funcionais
- regras de negócio
- documentos arquiteturais
- documentos markdown do projeto

Nenhuma funcionalidade fora dos documentos deve ser implementada sem aprovação.

---

## RO04 — Não Assumir Regras de Negócio

Nunca assumir:

- regras de pontuação
- fluxos administrativos
- comportamentos do sistema
- permissões
- integrações

sem confirmação explícita.

---

## RO05 — Aprovação Antes de Mudanças Estruturais

Mudanças envolvendo:

- banco de dados
- arquitetura
- autenticação
- containers
- APIs externas
- infraestrutura
- scheduler

sempre devem ser aprovadas previamente.

---

# Regras de Versionamento

## RV01 — Repositório Oficial

Todo o projeto deve ser mantido obrigatoriamente no repositório:

```text
https://github.com/alesauer/bolaocopa2026.git
```

---

## RV02 — Atualização do Repositório

Após implementações aprovadas:

- realizar commit
- atualizar repositório remoto
- manter histórico organizado

---

## RV03 — Organização de Commits

Os commits devem seguir padrão descritivo.

### Exemplos

```text
feat: implementa autenticação JWT
fix: corrige cálculo do ranking
refactor: reorganiza estrutura dos blueprints
style: ajusta layout da tela de login
```

---

## RV04 — Não Realizar Push Automático Sem Aprovação

Mesmo após implementação:

- confirmar com o usuário antes de realizar push final

---

# Regras de Desenvolvimento

## RD01 — Desenvolvimento Modular

Toda funcionalidade deve seguir:

- separação de responsabilidades
- modularização
- organização por domínio
- reutilização de código

---

## RD02 — Evitar Complexidade Desnecessária

Priorizar:

- simplicidade
- legibilidade
- manutenção fácil
- baixo acoplamento

Evitar overengineering.

---

## RD03 — Stack Oficial do Projeto

A stack oficial definida é:

| Camada | Tecnologia |
|---|---|
| Frontend | React |
| Backend | Flask |
| Banco | SQLite |
| Autenticação | JWT |
| Containerização | Docker |
| Scheduler | APScheduler |
| Proxy Reverso | Nginx |
| Infraestrutura | VPS Linux |

---

## RD04 — Mudanças de Stack

Qualquer alteração da stack oficial:

- deve ser justificada
- deve apresentar vantagens e desvantagens
- deve ser aprovada previamente

---

## RD05 — Persistência do Banco

O banco SQLite deve obrigatoriamente utilizar volume persistente.

---

## RD06 — Isolamento dos Serviços

Os serviços devem operar em containers separados.

---

## RD07 — Scheduler Separado

O scheduler não deve rodar dentro do processo principal do Flask.

Deve existir container dedicado para execução das tarefas automáticas.

---

# Regras de Segurança

## RS01 — Senhas

Senhas devem ser armazenadas utilizando hash seguro.

---

## RS02 — JWT

Rotas protegidas devem exigir autenticação JWT.

---

## RS03 — Variáveis Sensíveis

Dados sensíveis devem utilizar:

```text
.env
```

---

## RS04 — HTTPS

A aplicação deve utilizar HTTPS em ambiente de produção.

---

# Regras de APIs Externas

## RA01 — Cache Local

Dados obtidos das APIs externas devem ser armazenados localmente no SQLite.

---

## RA02 — Minimizar Consumo da API

Evitar chamadas desnecessárias às APIs externas.

Priorizar:

- cache local
- sincronização periódica
- atualização incremental

---

## RA03 — APIs Oficiais

As integrações devem priorizar:

- API-Football
- football-data.org
- OpenFootball JSON
- TheSportsDB

---

# Regras de Deploy

## RDEP01 — Containers Obrigatórios

Toda a aplicação deve operar utilizando Docker.

---

## RDEP02 — Docker Compose

O ambiente deve ser iniciado utilizando:

```text
docker-compose up -d
```

---

## RDEP03 — Ambiente de Produção

Deploy oficial será realizado em VPS Linux.

---

# Regras de Organização

## RORG01 — Estrutura de Diretórios

A estrutura de diretórios deve permanecer organizada e padronizada.

---

## RORG02 — Separação por Domínio

Blueprints, serviços e models devem ser separados por domínio funcional.

---

## RORG03 — Código Limpo

Priorizar:

- nomes claros
- funções pequenas
- reutilização
- legibilidade

---

# Regras Futuras

## RFUT01 — Escalabilidade Gradual

A arquitetura deve permitir crescimento gradual sem reescrita completa.

---

## RFUT02 — Migração Futura

O sistema deve facilitar futura migração para:

- PostgreSQL
- Redis
- FastAPI
- WebSocket

---

# Considerações Finais

Este documento define as regras obrigatórias de condução do projeto.

Todas as decisões técnicas, implementações e alterações devem respeitar integralmente estas diretrizes.

